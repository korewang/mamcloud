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
            footer:function(options){
                require(['apps/workspace/select/footer/footer_controller'],function(FooterController){
                    FooterController.footerIndex(options);
                });
            }
        };

        this.listenTo(CloudMAM,'select:footer:show',function(options){
            options = options||[];
            API.footer(options);
        });
        CloudMAM.addInitializer(function(){
            new FooterApp.footerSelectRouter({
                controller:API
            });
        });
    });
    return CloudMAM.Select.FooterApp;

});