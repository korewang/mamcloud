/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('HeaderApp',function(HeaderApp,CloudMAM,Backbone,Marionette,$,_){

//        HeaderApp.headerRouter=Marionette.AppRouter.extend({
//
//        });

        var API = {
            header:function(){
                require(['apps/header/header_controller'],function(headerController){
                    console.log('header---=');
                    headerController.headerIndex();
                });
            }
        };
        this.listenTo(CloudMAM,'workspace:list',function(){
            //console.log('slistento');
            API.header();
           //CloudMAM.navigate('workspace');//router  添加
        });
//        CloudMAM.addInitializer(function(){
//            new HeaderApp.headerRouter({
//                controller:API
//            });
//        });
        this.listenTo(HeaderApp,"start", function(){
            API.header();
        });
    });
    return CloudMAM.HeaderApp;

});