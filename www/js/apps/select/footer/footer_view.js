/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('Select.FooterApp.Views',function(Views,ContactManager,Backbone,Marionette,$,_){

        Views.FooterItemView = Marionette.ItemView.extend({
            template:templates.getTemplate("select/footer/item"),
            tagName:'div',
            className:'foot-bar4 col-xs-3 col-md-3'
        });

        Views.FooterComView= Marionette.CompositeView.extend({
            className:'navbar navbar-fixed-bottom fixedbar',//'navbar navbar-fixed-bottom fixedbar',//'bottom-bar row',
            template: templates.getTemplate('workspace/list_container'),
            childView: Views.FooterItemView
        });

    });
    return CloudMAM.Select.FooterApp.Views;
});