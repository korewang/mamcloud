/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('Workspace.FooterApp.Views',function(Views,ContactManager,Backbone,Marionette,$,_){

        Views.FooterItemView = Marionette.ItemView.extend({
            template:templates.getTemplate("workspace/footer/item"),
            tagName:'div',
            className:'foot-bar4 col-xs-3 col-md-3',
            events:{
                'click a.search':'searchFile',
                'click a.add': 'add',
                'click a.classification': 'classify',
                'click a.load-up':'upDownloadList'
            },
            searchFile:function(e){
                e.preventDefault();
                CloudMAM.trigger('workspace:search');
            },
            add:function(e) {
                e.preventDefault();
                e.stopPropagation();
               CloudMAM.trigger("dialog:add");
            },

            classify:function(e) {
                e.preventDefault();
                e.stopPropagation();
                CloudMAM.trigger("dialog:classify");
            },
            upDownloadList: function (e) {
                e.preventDefault();
                e.stopPropagation();// transportList
                require(['apps/workspace/transport/transport_list_app'], function () {
                    CloudMAM.trigger("workspace:downloadUpList");
                });
            },
            onRender: function(){
               // console.log("worksapce footer rendered");
            },
            onShow: function(){
//                this.$('.load-up').on('touchy-longpress',function(){
//                        console.log('longpress');
//                })
            }
        });

        Views.FooterComView= Marionette.CompositeView.extend({
            className:'navbar navbar-fixed-bottom fixedbar',//'navbar navbar-fixed-bottom fixedbar',//'bottom-bar row',
            template: templates.getTemplate('workspace/list_container'),
            childView: Views.FooterItemView
        });

    });
    return CloudMAM.Workspace.FooterApp.Views;
});