/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app',
        'apps/workspace/list/list_view',
        'apps/workspace/select/select_view',
        'config/base',
        'apps/utils/scroll_utils',
        'apps/utils/download_file',
        'apps/loading/loading_controller',//loading
        'apps/workspace/workspace_view',
        'entities/workspace/itemcollection',
        'apps/workspace/select/footer/footer_app'],
        function(CloudMAM,Views,SelectViews,urlRoots,xscroll,downLoadFiles,loadingController){
    var WorkspaceController = Marionette.Controller.extend({
        foldName:'所有内容',
        foldId:'',
        list:function(params,options){
            localStorage.removeItem('xscroll');//删除本地存储
            params = params|| {};
            options=options||{};
            localStorage.setItem('contentID','');//切换用户的时候避免上传出foldercode错误问题
            var self = this;
            var items = CloudMAM.request('workspace:item:list',params);
            var listscroll,
                i =1;
            var panelView = new Views.WorkspacePanelView(params);
            var mainLayout = new Views.WorkspaceLayout();
            //panelView txt

            var selectPanel = new SelectViews.SelectPanelView();

            $.when(items).done(function(itemss){
                var listView = new Views.WorkpaceView({
                    collection:itemss
                });

                self.listenTo(listView,'item:do:it',function(args){
                    //itemss.parameters.set("page",3);//加载数据  fetch
                    require(['apps/select/select_app'],function(){
                        CloudMAM.trigger('select:list');
                    });
                });
               //监听进入下级菜单
                self.listenTo(listView,"childview:item:itemclicked",function(args){
                   var model = args.model,
                       typeName = model.get('entityTypeName'),
                       folderName = model.get('name'),
                       folderId = model.get('contentID');
                        this.foldName = model.get('name');
                        this.foldId = model.get('contentID');
                        if(listView.selectItem.length==1 && model.get("selected")){
                            CloudMAM.trigger('workspace:list');
                            return;
                        }else if(listView.selectItem.length>0){
                            if(model.get("selected")){
                                model.set("selected",false);
                                args.trigger('item:itemlongpressSub',args);
                            }else{
                                model.set("selected",true);
                                args.trigger('item:itemlongpressAdd',args);
                            }
                            CloudMAM.trigger('select:footer:show',listView.selectItem);
                            return;
                        }

                        if(typeName === 'Folder' && listView.selectItem.length ==0){
                            //CloudMAM.trigger("workspace:list",{folderId:folderId});
                            //添加panel选择的文件夹
                            panelView.addFolderTitle({folderName:folderName,folderId:folderId});
                            itemss.parameters.set("folderCode",folderId);
                            localStorage.setItem('contentID',folderId);
                            setTimeout(function(){
                                listscroll.refresh();
                            },3000);

                        }else if(typeName === 'Clip' || typeName === 'Audio'||typeName === 'Picture'){
                            model.sync('read',model, {
                                url: urlRoots.serverEndport + "/emc/entity/" + model.get('contentID'),
                                success: function (response) {
                                    var framePath = response.mediaPlayAddress;
                                    Mytoast.openVideo(encodeURI(framePath));
                                },
                                error: function (re) {
                                    navigator.notification.alert("获取数据异常！",null ,'提示', '确定');
                                }
                            });
                        }else if(typeName === 'PictureAudio'){
                            StatusBar.hide();//title  shwo  callback cordova plugins statusbar
                            var urlwo = urlRoots.serverEndport+"/emc/entity/";
                            CloudMAM.trigger("dialog:preview",{url:urlwo,idModel:model});
                        }else{
                            downLoadFiles.alert("此文件无法预览！");
                        }
                });
                //长按处理

                self.listenTo(listView,"childview:item:itemlongpressAdd",function(params){

                    mainLayout.panelRegion.show(selectPanel);//选择的panel改变

                    //菜单panel的更改增多 model 否则跟全选的model不同到时候错误
                    listView.selectItem.push(params);
                    selectPanel.titleNumber(listView.selectItem);

                    CloudMAM.trigger('select:footer:show',listView.selectItem);

                });
                self.listenTo(listView,"childview:item:itemlongpressSub",function(params){

                    var uids = params.model.attributes.id,
                        len = listView.selectItem.length,
                        seleArray = listView.selectItem;
                    mainLayout.panelRegion.show(selectPanel);//选择的panel改变
                    //菜单panel的更减少
                    for(var i=0;i<len;i++){
                        if(seleArray[i].model.get("id")==uids){
                            seleArray.splice(i,1);
                            selectPanel.titleNumber(seleArray);
                            CloudMAM.trigger('select:footer:show',seleArray);
                            return;
                        }
                    }

                });
                //监听footer选择移动文件或素材的操作
                self.listenTo(CloudMAM,'folderEntity:move',function(){
                    require(['apps/moveto/moveto_app'],function(){
                        CloudMAM.trigger('moveTo:items',listView.selectItem);
                    });
                });
                //footer的删除文件处理
                self.listenTo(CloudMAM,'delete:items', function () {
                    var deleteModel = listView.selectItem,
                        contentIdUrl='';
                    _.each(deleteModel, function (args) {
                        contentIdUrl = args.model.get('entityTypeName')==='Folder' ?  '/emc/folder/' + args.model.get('contentID'): '/emc/entity/' + args.model.get('contentID');
                        if(!args.model.get("entityCount")) {
                            args.model.destroy({
                                url: urlRoots.serverEndport + contentIdUrl,
                                error: function (model, res) {
                                    downLoadFiles.alert(JSON.parse(res.responseText).message);
                                }
                            });
                        }
                    });
                    CloudMAM.trigger('workspace:list');//删除文件之后就返回顶级
                    listscroll.refresh();
                });
                //footer的更改item名字处理
                self.listenTo(CloudMAM,'update:items', function () {
                    var selected = listView.selectItem,
                        len = selected.length;
                    if(len==1){
                        navigator.notification.prompt(
                            '请输入更改名称',  // 显示信息
                            function(argument){
                                if(argument.buttonIndex==1 &&argument.input1 != ''){
                                    var modifyModel = selected[0].model;
                                    if(modifyModel.get("entityTypeName").toLowerCase()=="folder"){
                                        modifyModel.set("name",argument.input1);
                                        modifyModel.set("code",modifyModel.get("contentID"));
                                        modifyModel.set("ParentFolderCode","");
                                        modifyModel.save().done(function (data) {
                                            modifyModel.set("name",data.name);
                                        });
                                    }else{
                                        modifyModel.set("name",argument.input1);
                                        modifyModel.set("publicfolder","");
                                        modifyModel.save().done(function (data) {
                                            modifyModel.set("name",data.name);
                                        });
                                    }
                                    CloudMAM.trigger('workspace:list');//返回首页
                                }
                            },              // 按下按钮后触发的回调函数，返回按下按钮的索引
                            "提示",            // 标题
                            ["确定","取消"],          // 按钮标签
                            ''// default  text
                        );
                    }
                });
                //footer 的批量下载处理
                self.listenTo(CloudMAM,'download:items', function () {
                    var downloadItems = listView.selectItem,
                        itemsID = '',
                        entityTypeName = '',
                        fileName = '',
                        keyPath = '',
                        netStyle = navigator.network.connection.type,// wifi  2g  3g 4g  none
                        setNet = localStorage.getItem('wifiCtrlUp')||'on';// on  off;

                    if(netStyle != 'wifi' && setNet=='on'){
                        /*wifi 下使用上传下载*/
                        Mytoast.showToast("请在设置里关闭wifi传输",1);
                        return ;
                    }
                    if(netStyle == 'wifi' && setNet=='off'){
                        /*数据流量下使用上传下载*/

                        Mytoast.showToast("请在设置里打开wifi传输",1);
                        return ;
                    }
                    //alert tips
                    downLoadFiles.alert('文件已经转入后台下载，可以在传输列表中查看!');
                    downLoadFiles.tipsPath = true;//重置tipspath  做提示
                    _.each(downloadItems, function (args) {

                        entityTypeName =  args.model.get('entityTypeName');//定义非folder的可以进行下载
                        //fileName = args.model.get('contentID');
                        //entityTypeName: "Folder"
                        if(entityTypeName!='Folder'){
                            itemsID = args.model.get('contentID');
                            fileName = args.model.get('name');
                            keyPath = args.model.get('keyFramePath');
                            downLoadFiles.downloadfiles({fn:fileName,conID:itemsID,urlPath:keyPath});//调用下载接口
                        }
                    });
                    CloudMAM.trigger('workspace:list');//返回首页
                });
                self.listenTo(mainLayout,'show',function(){
                    mainLayout.panelRegion.show(panelView);
                    $('#folderNameTitle').text(params.title_name||'所有内容');//dom 操作
                    mainLayout.listRegion.show(listView);
                    listscroll = xscroll('scrollWrapper',{hScrollbar:false},{upEl:'#pullUp',downEl:'#pullDown',callback:function(re){
                            if(re=='1'){//equals  1
                                if(i<itemss.state.totalPages){
                                    loadingController.loadingData();
                                    i++;
                                    itemss.parameters.set("page",i);
                                }else{
                                    //$('.pullUpLabel').innerHTML = '没有更多'pullUp
                                    Mytoast.showToast('没有更多数据加载',1);
                                }
                                localStorage.setItem('xscroll','12');
                                mainLayout.wrapperHeight();
                            }
                        }
                    });
                   /*
                   * 此处的做法是可以在当前文件夹取消全选的时候可以退出 并还是在当前文件夹下
                   * */
                    if(params.folderName){///当前位置改变
                        panelView.addFolderTitle({folderName:params.folderName,folderId:params.folderId});

                    }

                 });
                //选择全部
                self.listenTo(CloudMAM,'workspace:selectedAll:item',function(){
                   // listView.selectItem = itemss.models;//model赋予compositeView 的数组
                    listView.selectItem=[];
                    _.each(itemss.models,function(args){
                        args.set("selected",true);
                        listView.selectItem.push({'model':args});
                    });
                    selectPanel.titleNumber(listView.selectItem);
                    CloudMAM.trigger('select:footer:show',listView.selectItem);
                });
                //取消全选的时候操作
                self.listenTo(selectPanel,'cancel:all:select',function(){
                   // CloudMAM.trigger('position:folder');
                    CloudMAM.trigger('workspace:list',{"folderId":this.folderId,"folderName":this.folderName});
                    localStorage.setItem('contentID',this.folderId);//重置contentID
                });
                //取消全选的时候操作
                self.listenTo(CloudMAM,'position:folder',function(){
                    // panelView.addFolderTitle({folderName:folderName,folderId:folderId});
                    //CloudMAM.trigger('workspace:list',{"folderId":this.folderId,"folderName":this.folderName});
                   // localStorage.setItem('contentID',this.folderId);//重置contentID
                });
                //刷新scroll
                //panel  排序  原来是poplar panelView 现在改为刷新显示的排序 mainLayout
                panelView.listenTo(mainLayout,'sort:method:change',function(options){
                    itemss.parameters.set("order",options);
                });
                //title  点击后的相应 返回

                self.listenTo(panelView,'sort:title:reset',function(options){
                    options = options||{};//获取options uid
                    itemss.parameters.set("folderCode",options.uid||'');

                });
                //新增文件夹
                self.listenTo(CloudMAM,"dialog:add:folder",function(){
                    $("#add-click-dialog").modal('hide');
                    var contien = localStorage.getItem('contentID');
                    navigator.notification.prompt(
                        '新增文件夹名称',  // 显示信息
                        function(argument){
                            if(argument.buttonIndex==1 &&argument.input1 != ''){
                                itemss.parameters.set("parentFolderCode",contien);
                                itemss.parameters.set("name",argument.input1);
                                itemss.parameters.sync('create',itemss.parameters,{
                                    url:urlRoots.serverEndport+'/emc/folder/',
                                    success: function (response) {
                                        response.parentFolderCode=contien;
                                        response.entityTypeName= "Folder";
                                        response.entityCount=0;
                                        itemss.add(response);
                                        listscroll.refresh();
                                    },
                                    error: function (er) {
                                        downLoadFiles.alert('添加文件夹失败！');
                                    }

                                });

                           }
                        },              // 按下按钮后触发的回调函数，返回按下按钮的索引
                        "提示",            // 标题
                        ["确定","取消"],          // 按钮标签
                        ''// default  text
                    );

                });
                CloudMAM.mainRegion.show(mainLayout);//装入region
                mainLayout.wrapperHeight();
                listscroll.refresh();
                CloudMAM.loadingRegion.empty();//隐藏loading
            });
            //排序  名称和 时间
            //  开音视频上传
            self.listenTo(CloudMAM,"dialog:add:video",function(){//视频
                downLoadFiles.uploadFiles("vedio");
                $("#add-click-dialog").modal('hide');
            });
            self.listenTo(CloudMAM,"dialog:add:img",function(){//img
                downLoadFiles.uploadFiles("image");
                $("#add-click-dialog").modal('hide');
            });
            self.listenTo(CloudMAM,"dialog:add:pic", function () {
                //拍照就上传的操作
                downLoadFiles.upCameraAction({'types':'pic'});
                $("#add-click-dialog").modal('hide');
            });
            self.listenTo(CloudMAM,"dialog:add:cvideo", function () {
                //拍视频就上传的操作
                downLoadFiles.upCameraAction({'types':'video'});
                $("#add-click-dialog").modal('hide');
            });
            self.listenTo(CloudMAM,"list:xscroll:refresh",function(){
                CloudMAM.loadingRegion.empty();
                listscroll.refresh();
            });
            CloudMAM.trigger('workspace:list:show');//底部菜单加载trigger事件

        },
        stampTotime:function (now)   {
                var year=now.getFullYear(),
                    month=now.getMonth()+ 1,
                    date=now.getDate(),
                    hour=now.getHours(),
                    minute=now.getMinutes(),
                    second=now.getSeconds();
                return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        }
    });

    return new WorkspaceController();
});