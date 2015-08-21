/**
 * Created by wangxinyan on 2014/9/23.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('MoveToApp',function(MoveToApp,CloudMAM,Backbone,Marionette,$,_){
        MoveToApp.onStart = function(){

        };
        MoveToApp.onStop = function(){

        };
        MoveToApp.Router = Marionette.AppRouter.extend({
            appRoutes:{
                'moveto':'list',
                'moveto/:id':'listTo'
            }
        });
        var API = {
            list:function(options){
                require(['apps/moveto/list/list_controller'],function(moveController){
                    moveController.showMove(options);
                });
            },
            listTo:function(id){

            }
        };
        this.listenTo(CloudMAM,'moveTo:items',function(options){
            options=options||{};
            CloudMAM.navigate('moveto');
            API.list(options);
        });
        CloudMAM.addInitializer(function(){
            new MoveToApp.Router({
                controller:API
            });
        });
    });
    return CloudMAM.MoveToApp;
});