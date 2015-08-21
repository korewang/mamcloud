/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('SelectApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){
            //title
        Views.SelectPanelView = Marionette.ItemView.extend({
            template:templates.getTemplate('select/list_panel'),
            className:'listTitle',
            events:{
                'click #cancelSelect':'narToBack',
                'click #selectAll':'selectedAllItem'
            },
            selectedAllItem:function(){

            },
            narToBack:function(){
                CloudMAM.trigger('workspace:list');
            }
        });
        //item view
        Views.SelectItemView = Marionette.ItemView.extend({
            template:templates.getTemplate('select/list_item'),
            className:'itemView' ,//  selected
            events:{
                'click':'itemSelected'
            },
            itemSelected:function(e){
                    console.log(this);
                e.preventDefault();
                e.stopPropagation();
                this.trigger("selected:show",this.model);
            },
            trigger:{
                'click':"selectedItem:show",
                'click':function(){alert(125);}
            },
            onRender: function(){

                if(this.model.get("selected")){
                   this.$el.addClass("selected");
                }
            }
        });
        //  composite view
        Views.SelectView = Marionette.CompositeView.extend({
            className:'listItemView',
            template: templates.getTemplate('select/list_container'),
            childView: Views.SelectItemView,
//            triggers: {
//                'click .itemView': {
//                    event: "selected:self",
//                    preventDefault: true,
//                    stopPropagation: false
//                }
//            },
            onRender:function(){ }

        });
        ///   select  region
        Views.SelectLayout = Marionette.LayoutView.extend({
            template:templates.getTemplate('select/list_layout'),
            className:'contents',
            regions: {
                panelRegion: "#panelRegion",
                listRegion: "#listRegion"
            }
        });

    });
    return CloudMAM.SelectApp.Views;
});