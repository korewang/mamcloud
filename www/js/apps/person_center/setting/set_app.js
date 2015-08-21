/**
 * Created by wangxinyan on 2014/10/22.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('Router.PersonSetApp', function (PersonSetAppRouter,CloudMAM,Backbone,Marionette,$,_) {
        PersonSetAppRouter.SetRouter = Marionette.AppRouter.extend({
            appRouters:{
                personset:'personset'
            }
        });
        var PersonSetAppController = {
            personset: function () {
                require(['apps/person_center/setting/set_controller'], function (setController) {
                    setController.index();
                });
            }
        };
        CloudMAM.addInitializer(function () {
           new PersonSetAppRouter.SetRouter({
               controller:PersonSetAppController
           });
        });
        this.listenTo(CloudMAM,'person:set', function () {
            CloudMAM.navigate('personset');
            PersonSetAppController.personset();
        });
    });
    return CloudMAM.PersonSetAppRouter;
});