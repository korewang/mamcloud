/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('Workspace.FooterApp',function(FooterApp,CloudMAM,Backbone,Marionette,$,_){
        FooterApp.onStart = function(){ };
        FooterApp.onStop = function(){ };
        FooterApp.MainRouter = Marionette.AppRouter.extend({});
        var API = {
            footer:function(){
                require(['apps/workspace/footer/footer_controller'],function(FooterController){
                    FooterController.footerIndex();
                });
            }
        };
        this.listenTo(CloudMAM,'workspace:list:show',function(){
             API.footer();
        });
        CloudMAM.addInitializer(function(){
            new FooterApp.MainRouter({
                controller:API
            });
        });
    });

    return CloudMAM.Workspace.FooterApp;

});