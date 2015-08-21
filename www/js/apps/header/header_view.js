/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/utils/templates','apps/loading/loading_controller','apps/login/login_app'],function (CloudMAM,templates,loadingController) {
    CloudMAM.module('HeaderApp.Views',function(Views,ContactManager,Backbone,Marionette,$,_){
        Views.headerView = Marionette.ItemView.extend({
            template:templates.getTemplate("header/header"),
            tagName:'div',
            className:'navbar navbar-fixed-top fixedbar',
            events: {
                'click div.pro': 'DropdownSet',
                'click a#quit': 'Quit',
                'click #centerPerson':'personCenter'
            },
            initialize: function () {},
            onShow:function(){
                var UserInfo=  JSON.parse(localStorage.getItem('userInfo')),
                    userN = UserInfo.userName;
                $(this.el).children().children('#UserName').text(userN);
            },
            //click trigger dropdown-menu function
            personCenter: function () {
                loadingController.loadingData();
                require(["apps/person_center/person_detail/person_app"], function () {
                    CloudMAM.trigger("person:center");
                });
            },
            DropdownSet:function(e) {
                e.preventDefault();

                CloudMAM.trigger("dropmenu:dropdown");
            },
            Quit: function(e){
                e.preventDefault();

                CloudMAM.trigger("login:index");
            }
        })
    });
    return CloudMAM.HeaderApp.Views;
});