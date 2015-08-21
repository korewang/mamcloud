/**
 * Created by wangxinyan on 2014/9/23.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('moveToApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_) {
        Views.moveheaderView = Marionette.ItemView.extend({
            //header
            className:'navbar move_to_header_bar fixedbar',
            template:templates.getTemplate("moveto/moveto_header"),
            tagName:'div',
            events:{
                'click #backToWorkspace': function () {
                    CloudMAM.trigger('workspace:list');//返回home
                },
                'click #createDocument': function () {
                    this.trigger("new:folder");
                }
            }
        });
        Views.moveContentLayoutView = Marionette.LayoutView.extend({
            className:'move_layout',
            template:templates.getTemplate("moveto/moveto_item_layout"),
            regions:{
                listCRegion:'#listCRegions'
            },
            events:{
                'click #goback':'narBackList'
            },
            initialize:function(){
                this.goBackArray=[];
            },
            narBackList: function () {
                this.trigger('btn:back');
            },
            modifyLayout: function () {
                var panelH = $('#panelRegion').height(),
                    fixedPanelT = $('.move_to_header_bar').height(),
                    fixedPanelB = $('.navbar-fixed-bottom').height(),
                    bodyH = $('body').height()-fixedPanelT-fixedPanelB-panelH;
                $(this.$el).children('#scrollWrapper').height(bodyH);
            }
        });
        Views.movecontentItemView = Marionette.ItemView.extend({
            //list  item
            className:'itemView js-long-touch',
            template:templates.getTemplate("moveto/moveto_item"),
            tagName:'div',
            events:{
                'click .js-workspace-item':'enterInDocument'
            },
            enterInDocument:function(){
                // console.log('d',this.model);
                this.trigger('enter:item',this.model);
            }
        });
        Views.movecompositeView = Marionette.CompositeView.extend({
            //content view CompositeView
            className:'listItemView',

            template:templates.getTemplate("moveto/moveto_item_container"),
            childView: Views.movecontentItemView,
            childViewContainer:''
        });
        Views.moveFooterView = Marionette.ItemView.extend({
            //footerView
            className:'navbar navbar-fixed-bottom fixedbar move_to_footer',
            tagName:'div',
            template:templates.getTemplate("moveto/moveto_footer"),
            events:{
                'touchend #moveTo':'saveToEmc'
            },
            saveToEmc: function () {
                this.trigger('save:entityFolder');
            }
        });

    });
    return CloudMAM.moveToApp.Views;
});