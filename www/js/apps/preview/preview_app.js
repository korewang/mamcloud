/**
 * Created by wangyu on 2014/8/18.
 */
define(["app","apps/workspace/list/list_controller"],function(CloudMAM){
    CloudMAM.module("PreviewApp",function(Dialog,CloudMAM,Backbone,Marionette,$,_){

        Dialog.Router = Marionette.AppRouter.extend({
            appRoutes:{
                'previewDialog': 'preview'
            }
        });
        var API = {
            preview:function(options){
                require(["apps/preview/preview_controller"],function(Controller){
                    Controller.previewDialog(options);
                });
            }
        };
        this.listenTo(CloudMAM,"dialog:preview",function(options){
            API.preview(options);
        });
        CloudMAM.addInitializer(function(){
            new Dialog.Router({
                controller: API
            });
        });
    });

    return CloudMAM.DialogApp;
});