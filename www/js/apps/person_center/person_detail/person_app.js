/**
 * Created by wangxinyan on 2014/10/21.
 */
define(['app'],function(CloudMAM){
    CloudMAM.module('Router.PersonCenterApp',function(PersonCenterAppRouter,CloudMAM,Backbone,Marionette,$,_){
        PersonCenterAppRouter.PersonRouter = Marionette.AppRouter.extend({
            appRoutes:{
                'personcenter':'personcenter'
            }
        });
        var PersonAppController={
            personcenter:function(){
                require(['apps/person_center/person_detail/person_controller'],function(PersonController){
                    PersonController.index();
                });
            }
        };
        CloudMAM.addInitializer(function(){
            new PersonCenterAppRouter.PersonRouter({
                controller:PersonAppController
            });
        });
        this.listenTo(CloudMAM,'person:center',function(){
            CloudMAM.navigate('personcenter');
            PersonAppController.personcenter();
        });
    });

    return CloudMAM.PersonCenterAppRouter;
});