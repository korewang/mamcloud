/**
 * Created by wangxinyan on 2014/10/21.
 */
define(['app','apps/utils/templates','apps/loading/loading_controller'],function(CloudMAM,templates,loadingController){
    CloudMAM.module('PersonApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){


        Views.PersonItemView = Marionette.ItemView.extend({
            template:templates.getTemplate("person_center/person_detail/person_detail"),
            tagName:'div',
            className:'installPage',
            events:{
              //  'click button#loginCloud':'SingleIn'
                'click #narback':'backWorkspace',
                'click #set':'set',
                'click #exitApp':'exitApplication',
                'click #resetPhoto':'resetPhoto'
            },
            onRender: function () {

            },
            backWorkspace: function () {
                loadingController.loadingData();
                CloudMAM.trigger('workspace:list');
            },
            resetPhoto:function(){
                // reset photo
                this.trigger('change:photo');

            },
            set: function () {
                loadingController.loadingData();
                require(['apps/person_center/setting/set_app'], function () {
                    CloudMAM.trigger('person:set');
                });
            },
            exitApplication: function () {
                navigator.notification.confirm(
                    '按确定退出程序!',  // message
                    this.onConfirm,              // callback to invoke with index of button pressed
                    '确定要退出程序吗?',            // title
                    '确定,取消'          // buttonLabels
                );
            },
            onConfirm: function (button) {
                if(button==1){
                    navigator.app.exitApp(); //选择了确定才执行退出
                }
            },
            clientHeight:function(){
                var he = $('body').height();
                $('.installPage').height(he);
            }

        });
        Views.popWindow = Marionette.ItemView.extend({
            template:templates.getTemplate("loading/loading_pop"),
            tagName:'div',
            id:'loading',
            className:'container',
            events:{
                  'click #popCamera':'popCamera',
                  'click #actPhoto':'actPhoto',
                  'click #actGallery':'actGallery'
            },
            popCamera: function () {
                CloudMAM.loadingRegion.empty();
            },
            actPhoto: function () {
                CloudMAM.trigger('upload:actPhotoGallery',{'utype':'Photo'});
            },
            actGallery: function () {
                CloudMAM.trigger('upload:actPhotoGallery',{'utype':'Gallery'});
            }
        })
    });
    return CloudMAM.PersonApp.Views;
});