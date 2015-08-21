/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/workspace/select/footer/footer_view','config/base','apps/loading/loading_controller','entities/select/footer/itemcollection'],function (CloudMAM,Views,urlRoots,loadingController) {
    var FooterController = Marionette.Controller.extend({
        footerIndex:function(options){
            options=options||{};
            options.obj = options.obj ||[];
            var self =this;
            var items = CloudMAM.request('select:footer:item');
            var footerCompositeView = new Views.FooterComView({
                collection:items
            });
            /*
            * 此时的options 是两个地方来的  一个是首页的传来的是数组，
            * 二个是从搜索来的传来的obj  {'type':'search','obj':array}
            * */
            if(options.length==1||options.obj.length == 1){//点击多个文件的时候不能重命名
                items.models[2].set('footItemClass','reName');
            }else{
                items.models[2].set('footItemClass','reName unclicked');
            }
            self.listenTo(footerCompositeView,'childview:item:deletefile', function () {//delete
                if(options.type){
                    CloudMAM.trigger('search:delete:items');
                    return;
                }
                CloudMAM.trigger('delete:items');

            });
            self.listenTo(footerCompositeView,'childview:item:rename', function () {//update
                if(options.type){
                    CloudMAM.trigger('search:update:items');
                    return;
                }
                CloudMAM.trigger('update:items');
            });
            self.listenTo(footerCompositeView,'childview:item:moveto', function () {//workspace list list_controller
                loadingController.loadingData();
                if(options.type){
                    CloudMAM.trigger('search:folderEntity:move');
                    return;
                }
                CloudMAM.trigger('folderEntity:move');
                //移动文件素材
            });
            self.listenTo(footerCompositeView,'childview:item:download', function () {
                if(options.type){
                    CloudMAM.trigger('search:download:items');
                    return;
                }
                CloudMAM.trigger('download:items');
            });
//            self.listenTo(CloudMAM,'set:rename:style',function(args){//设置选中一个和多个文件的footer菜单区别
//                if(args.length==1){
//
//                }else{
//
//                }
//            });
            CloudMAM.footerRegion.show(footerCompositeView);
        }
    })
    return new FooterController();
});