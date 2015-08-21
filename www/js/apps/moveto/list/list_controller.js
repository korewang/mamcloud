/**
 * Created by wangxinyan on 2014/9/23.
 */
define(['app','apps/moveto/list/list_view','apps/utils/scroll_utils','config/base','apps/utils/download_file','apps/loading/loading_controller','entities/moveto/item_collection'],function (CloudMAM,Views,xscroll,urlRoots,notice,loadingController) {
    var MovingController = Marionette.Controller.extend({
        showMove:function(params){
            params = params|| {};//"folderCode":"-1"
            var self = this,
                moveEmcList = params,
                listScroll = '',
                eleItem = CloudMAM.request('moveto:item:list',params),//moveto:item:list
                headerItemView = new Views.moveheaderView(),
                footerView = new Views.moveFooterView(),
                contentLayout = new Views.moveContentLayoutView();

            $.when(eleItem).done(function(responseItem) {
                var compositeListView = new Views.movecompositeView({
                    collection: responseItem
                });
                contentLayout.listCRegion.show(compositeListView);
                //添加滚动条
                listScroll = xscroll('scrollWrapper',{hScrollbar:false},{upEl:'#pullUp',downEl:'#pullDown',callback:function(re){
                        if(re=='1' ){//equals  1
                            setTimeout(function () {
                                listScroll.refresh();
                            },800);
                        }
                    }
                });
                self.listenTo(contentLayout,'btn:back', function () {
                    //进入上级
                    $('.move_to_title').text('当前文件夹');//TITLE标题
                    $('#moveTo').text('移动到:当前文件夹');
                    var len = contentLayout.goBackArray.length,
                        code = '';
                    if(len==0){
                        return;
                    }else{
                        if(len == 1){
                            code = -1;
                            contentLayout.goBackArray=[];
                        }else{
                            var obj = contentLayout.goBackArray[len-2];
                            code = obj.model.get('code');
                            contentLayout.goBackArray.splice(len-1,1);
                            $('.move_to_title').text(obj.model.get('name'));
                            $('#moveTo').text('移动到:'+obj.model.get('name'));
                        }
                    }
                    responseItem.parameters.set("folderCode",code);
                    localStorage.setItem("createFolder",code);//创建文件夹的父文件
                });
                self.listenTo(compositeListView,'childview:enter:item',function(obj){
                    loadingController.loadingData();
                    var obj = obj ||{};
                    responseItem.parameters.set("folderCode",obj.model.get('code'));
                    contentLayout.goBackArray.push(obj);
                    $('.move_to_title').text(obj.model.get('name'));
                    $('#moveTo').text('移动到:'+obj.model.get('name'));
                    localStorage.setItem("createFolder",obj.model.get('code'));//本地存储code在新建文件夹的时候用到
                });
                self.listenTo(headerItemView,'new:folder',function(){//新建文件夹
                    var createName  =prompt('新建文件夹','');
                    if(createName!=undefined){

                        var folderModel = Backbone.Model.extend({
                            urlRoot:urlRoots.serverEndport+'/emc/folder/',
                            defaults:{
                                parentFolderCode:localStorage.getItem('createFolder')||'-1',
                                name:createName
                            }
                        });
                        var modelFolder = new folderModel();
                        modelFolder.sync('create',modelFolder,{
                            success:function(res){
                                responseItem.add(res);
                                notice.alert("创建文件夹成功");
                                listScroll.refresh();
                            },error:function(errRes){
                                notice.alert("创建文件夹失败");
                            }
                        })
                    }
                });
                self.listenTo(footerView,'save:entityFolder', function () {
                    var entityType = '',//素材、文件夹类型
                        contentId = '',
                        syncType = 'update',//Ajax请求类型
                        syncTypePath = '',//Ajax请求url的分类  素材和文件夹接口不同
                        EemModel = '',
                        destinationFolder = localStorage.getItem("createFolder"),//移动目的 文件夹内
                        emcModel = Backbone.Model.extend({//重新创建一个Model 提供给Ajax请求数据所用
                            //urlRoot:urlRoots.serverEndport+syncTypePath,
                            defaults:{
                                parentFolderCode:destinationFolder||'-1',//需要移动的目的文件夹
                                publicfolder:destinationFolder||'-1',//移动素材接口参数
                                name:'',
                                code:destinationFolder||'-1'

                            }
                        });
                    //此处暂时不用moveEmcList  代替用params
                    _.each(moveEmcList,function(moveModelColl){
                        entityType = moveModelColl.model.get('entityTypeName');
                        contentId = moveModelColl.model.get('contentID');
                        syncTypePath = (entityType == 'Folder')?'/emc/folder/'+contentId :'/emc/entity/'+contentId;
                        /*if(entityType == 'Folder'){
                            //移动文件夹到文件夹
                            syncTypePath ='/emc/folder/'+contentId;
                        }else{
                            //移动素材到文件夹
                            syncTypePath = '/emc/entity/'+contentId;
                        }*/
                        EemModel = new emcModel();
                        EemModel.sync(syncType,EemModel,{
                            url:urlRoots.serverEndport+syncTypePath,
                            contentType:'application/json',
                            success: function () {
                                notice.alert("移动成功");
                                //移动成功后的回调
                                CloudMAM.trigger('workspace:list');//返回home
                            },
                            error: function () {
                                notice.alert("移动失败");
                            }
                        });
                    });

                });
                CloudMAM.loadingRegion.empty();//隐藏loading
            });

            CloudMAM.headerRegion.show(headerItemView);
            CloudMAM.mainRegion.show(contentLayout);
            CloudMAM.footerRegion.show(footerView);
            //计算scroll的滚动高度
            contentLayout.modifyLayout();
        }
    });
    return new MovingController();
});
/*
*
*
* require(['app'],function(CloudMAM){

 CloudMAM.trigger('workspace:list');
 })

* */


