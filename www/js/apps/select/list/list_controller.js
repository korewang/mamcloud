/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/select/list/list_view','entities/select/itemcollection'],function (CloudMAM,Views) {
    var SelectController = Marionette.Controller.extend({
        list:function(options){
            options=options||{};
            var self = this;
            var items = CloudMAM.request('select:item:list');
            var listView = new Views.SelectView({
                collection:items
            });
            listView.on('itemview:selected:show',function(childView,model){
                console.log('111');
            });
            var panelView = new Views.SelectPanelView();

            var mainLayout = new Views.SelectLayout();
            self.listenTo(mainLayout,'show',function(){
                mainLayout.panelRegion.show(panelView);
                mainLayout.listRegion.show(listView);
            });
            CloudMAM.mainRegion.show(mainLayout);
            CloudMAM.trigger('select:footer:show');//footer 接收




//            this.listenTo("childView:selected:show",function(args){
//              //  args.model.set("selected",true);
//            })
        }
    });
    var controller=new SelectController();
    return controller;
});