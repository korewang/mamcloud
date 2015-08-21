/**
 * Created by wangyu on 2014/7/31.
 */
define(["app"],function(CloudMAM){
    CloudMAM.module("DialogApp",function(Dialog,CloudMAM,Backbone,Marionette,$,_){

        Dialog.Router = Marionette.AppRouter.extend({
            appRoutes:{
                'addDialog': 'newFile',
                'classifyDialog': 'classify'
            }
        });

        var API = {
            newFile:function(){
                require(["apps/dialog/add_controller"],function(Controller){
                    Controller.addDialog();
                });
            },
            classify:function(){
                require(["apps/dialog/classify_controller"],function(DialogController){
                    DialogController.classifyDialog();
                });
            }
        };

        this.listenTo(CloudMAM,"dialog:add",function(){

            API.newFile();

        });

        this.listenTo(CloudMAM,"dialog:classify",function(){
            API.classify();
        });

        CloudMAM.addInitializer(function(){
            new Dialog.Router({
                controller: API
            });
    });
    });

    return CloudMAM.DialogApp;
});