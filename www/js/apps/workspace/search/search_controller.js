/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app',
        'apps/workspace/search/search_view',
        'apps/workspace/select/select_view',
        'apps/utils/scroll_utils',
        'config/base',
        'apps/utils/download_file',
        'apps/workspace/workspace_view',
        'entities/workspace/itemcollection'],function (CloudMAM,Views,SelectViews,xscroll,urlRoots,downLoadFiles) {
    var SearchController = Marionette.Controller.extend({
        scrollH:null,
        showSearch: function () {

            var self = this;
            var serachPanelView = new Views.SearchPanelView();//title

            var mainLayout = new Views.SearchLayout();//layout 布局
            self.listenTo(mainLayout,'show',function(){//layout 显示
                mainLayout.searchPanelRegion.show(serachPanelView);//title 填充
            });
            self.listenTo(serachPanelView,'search:listitem',function(params){//搜索
                self.list(params);
            });
            CloudMAM.trigger("hide:footer");//隐藏footer菜单啊
            CloudMAM.mainRegion.show(mainLayout);//index页面的mainRegion显示   list目前先不做处理
            self.scrollH = mainLayout.resetHeight();
            $('#scrollWrapper').height(self.scrollH);

        },
        list:function(params,options){
            options=options||{};
            params = params||{};
            var self = this;
            var searchResultScroll = null;
            var i=1;
            var items = CloudMAM.request('search:item:list',params);

            $.when(items).done(function(itemss) {
                var searchResultView = new Views.WorkpaceView({
                    collection: itemss
                });
                var serachPanelView = new Views.SearchPanelView(params);//title
                var selectPanel = new SelectViews.SelectPanelView({"type":"search"});//选择一个的时候用selectpanel
              //  var workspacePanelView = new Views.WorkspacePanelView();
                var mainLayout = new Views.SearchLayout();//layout 布局
                self.listenTo(mainLayout,'show',function(){//layout 显示
                    mainLayout.searchPanelRegion.show(serachPanelView);//title 搜索框view
                    //mainLayout.workspacePanelRegion.show(workspacePanelView);//title 填充
                    mainLayout.searchResultRegion.show(searchResultView);// list  item填充数据
                });
                CloudMAM.mainRegion.show(mainLayout);
                $('#scrollWrapper').height(self.scrollH);
                //xscroll  设置
                searchResultScroll = xscroll('scrollWrapper',{hScrollbar:false},{upEl:'#pullUp',downEl:'#pullDown',callback:function(re){
                    if(re=='1' ){//等于1
                        if(i<itemss.state.totalPages){
                            i++;
                            itemss.parameters.set("page",i);
                            setTimeout(function () {
                                searchResultScroll.refresh();
                            },800);
                        }
                    }
                }
                });
                //监听搜索中点击素材的操作
                self.listenTo(searchResultView,'childview:item:itemclicked',function(args){
                    var model = args.model,
                        typeName = model.get('entityTypeName'),
                        FocusLen = searchResultView.selectItem.length;
                    /*
                    * 检测如果是选中了一个就可以吧点击进入播放的素材禁止
                    * */
                    if(FocusLen > 0){
                        if(model.get("selected")){
                            model.set("selected",false);
                            if(FocusLen ==1){
                                /*此处做的 操作就是吧panel select all  and confirm all  footer  remove  model
                                *此处的view 必须重新new出来  因为如果切换 之前的变量被内存回收
                                * */
                                if(serachPanelView.isDestroyed){
                                    serachPanelView =  new Views.SearchPanelView(params);
                                }
                                 mainLayout.searchPanelRegion.show(serachPanelView);
                                CloudMAM.footerRegion.empty();//清空footer
                             }
                            args.trigger('item:itemlongpressSub',args);
                        }else{
                            model.set("selected",true);
                            args.trigger('item:itemlongpressAdd',args);
                        }
                        return;
                    }
                    if(typeName === 'Clip' || typeName === 'Picture' || typeName === 'Audio'){
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
                    }else{
                        downLoadFiles.alert("此文件无法预览！");
                    }
                });
                /*
                * 开始做选择数据的操作，长按list的时候对选中状态
                * 底部按钮的操作，下载，重命名，移动到。。功能
                * */
                //长按的选中状态
                self.listenTo(searchResultView,'childview:item:itemlongpressAdd',function(args){

                   //update  style  销毁view之后重新赋值

                    if(selectPanel.isDestroyed){
                        selectPanel = new SelectViews.SelectPanelView({"type":"search"});
                    }
                   //  args.model.set('selected',false);
                    mainLayout.searchPanelRegion.show(selectPanel);//全选和取消全选view
                    searchResultView.selectItem.push(args);
                    selectPanel.titleNumber(searchResultView.selectItem);
                    CloudMAM.trigger('select:footer:show',{'type':'search','obj':searchResultView.selectItem});
                });
                //长按减少选中
                self.listenTo(searchResultView,"childview:item:itemlongpressSub",function(args){
                    //CloudMAM.trigger('workspace:select');
                    var uids = args.model.attributes.id,
                        len = searchResultView.selectItem.length,
                        seleArray = searchResultView.selectItem;
                    //mainLayout.panelRegion.show(selectPanel);//选择的panel改变
                    //菜单panel的更减少
                    for(var i=0;i<len;i++){
                        if(seleArray[i].model.get("id")==uids){
                            seleArray.splice(i,1);
                            selectPanel.titleNumber(seleArray);
                            if(len != 1){
                                CloudMAM.trigger('select:footer:show',{'type':'search','obj':seleArray});
                            }
                            return;
                        }
                    }
                });
                //全选
                self.listenTo(CloudMAM,'workspace:selectedAll:item',function(){
                   // searchResultView.selectItem = itemss.models;//model赋予compositeView 的数组
                    searchResultView.selectItem=[];
                    _.each(itemss.models,function(args){
                        args.set("selected",true);
                        searchResultView.selectItem.push({'model':args});
                    });
                    selectPanel.titleNumber(searchResultView.selectItem);
                    CloudMAM.trigger('select:footer:show',{'type':'search','obj':searchResultView.selectItem});
                });
                //取消全选
                self.listenTo(CloudMAM,'cancel:all:item',function(){
                    // CloudMAM.trigger('position:folder');
                    if(serachPanelView.isDestroyed){
                        serachPanelView = new Views.SearchPanelView(params);
                    }
                    mainLayout.searchPanelRegion.show(serachPanelView);
                    CloudMAM.footerRegion.empty();
                    searchResultView.selectItem =[];
                    _.each(itemss.models,function(args){
                        args.set("selected",false);
                    });
                });
                //footer 四个栏目的选中 download
                self.listenTo(CloudMAM,'search:download:items', function () {
                    var downloadItems = searchResultView.selectItem,
                        itemsID = '',
                        entityTypeName = '',
                        fileName = '',
                        keyPath = '';
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
                //删除
                self.listenTo(CloudMAM,'search:delete:items',function(){
                    var deleteModel = searchResultView.selectItem,
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
                    //CloudMAM.trigger('workspace:list');//删除文件之后就返回顶级
                    searchResultScroll.refresh();
                });
                //重命名
                self.listenTo(CloudMAM,'search:update:items',function(){

                    var selected = searchResultView.selectItem,
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
                //  移动到其他文件夹
                self.listenTo(CloudMAM,'search:folderEntity:move',function(){
                    require(['apps/moveto/moveto_app'],function(){
                        CloudMAM.trigger('moveTo:items',searchResultView.selectItem);
                    });
                });
                //搜索内容监听
                self.listenTo(serachPanelView,'search:listitem',function(params){//搜索
                    self.list(params);
                });
                CloudMAM.loadingRegion.empty();
            });
           //index页面的mainRegion显示   list目前先不做处理
        }
    });
    return new SearchController();
});