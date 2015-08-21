/**
 * Created by wangyu on 2014/7/31.
 */
define(["app","apps/dialog/classify_view",'apps/loading/loading_controller'],function(CloudMAM, Views,loadingController){
    var ClassifyDialogController = Marionette.Controller.extend({

        classifyDialog:function(options){

            options=options||{};
            var self = this;

            var classifyDialogView = new Views.ClassifyDialogView();
            self.listenTo(classifyDialogView,'classify:type',function(params){

                ///workspace  发一个trigger事件
           /*   type :Clip      音视频
                type :Audio     音频
                type :Picture   图片
                type :Document  文档
                type :Other     其他
                type :''        所有*/
                loadingController.loadingData();
                CloudMAM.trigger("workspace:list",params);
            });
            CloudMAM.dialogRegion.show(classifyDialogView);
            $("#classify-click-dialog").modal('toggle');
        }
    });

    return new ClassifyDialogController();
});