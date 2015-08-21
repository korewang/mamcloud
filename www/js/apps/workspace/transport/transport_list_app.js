/**
 * Created by wangxinyan on 2014/10/9.
 */
/*
* 主要是应用传输列表的model view  controller设计
* */
define(['app'],function(CloudMAM){
    CloudMAM.module('Router.TransportApp',function(TransportAppRouter,CloudMAM,Backbone,Marionette,$,_){
        TransportAppRouter.transportRouter = Marionette.AppRouter.extend({
            appRoutes:{
                'transport':'transport'
            }
        });
        var TransportAppController={
            transport:function(){
                require(['apps/workspace/transport/transport_list_controller'],function(transportControlller){
                    transportControlller.listIndex();
                });
            }
        };
        CloudMAM.addInitializer(function(){
            new TransportAppRouter.transportRouter({
                controller:TransportAppController
            });
        });
        this.listenTo(CloudMAM,'workspace:downloadUpList',function(){
           // CloudMAM.navigate('transport');
            TransportAppController.transport();
        });
    });

    return CloudMAM.TransportAppRouter;
});