/**
 * Created by wangxinyan on 2014/8/28.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('Router.LoadingAPP', function (LoadingApp,CloudMAM,Backbone,Marionette,$,_) {
        LoadingApp.loadingRouter = Marionette.AppRouter.extend({
            appRoutes:{
                'loading':'loading',
                'login/loading':'loading'
            }
        });
        var LoadingAppController={
            loading:function(){
                require(['apps/loading/loading_controller'],function(loadingController){
                    loadingController.loadingData();
                });
            }
        };
        CloudMAM.addInitializer(function(){
            new LoadingApp.loadingRouter({
                controller:LoadingAppController
            });
        });
        this.listenTo(CloudMAM,'login:index',function(){
            LoadingAppController.loading();
        });
    });
    return CloudMAM.Router.LoadingAPP;
});