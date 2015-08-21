/**
 * Created by wangxinyan on 2014/8/3.
 */

define(['app'],function (CloudMAM) {
    CloudMAM.module('Select.FooterApp',function(FooterApp,CloudMAM,Backbone,Marionette,$,_){
        FooterApp.onStart = function(){

        };
        FooterApp.onStop = function(){

        };
        FooterApp.footerSelectRouter=Marionette.AppRouter.extend({

        });
        var API = {
            footer:function(){
                require(['apps/select/footer/footer_controller'],function(FooterController){
                    FooterController.footerIndex();
                });
            }
        };

        this.listenTo(CloudMAM,'select:footer:show',function(){
            API.footer();
        });
        CloudMAM.addInitializer(function(){
            new FooterApp.footerSelectRouter({
                controller:API
            });
        });
    });
    return CloudMAM.Select.FooterApp;

});