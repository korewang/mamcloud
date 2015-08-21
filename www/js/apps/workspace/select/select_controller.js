/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/workspace/select/select_view','apps/workspace/workspace_view','apps/workspace/select/footer/footer_app'],function (CloudMAM,Views,spaceView) {
    var SelectController = Marionette.Controller.extend({
        showSelect:function(options){
            options=options||{};
            var self = this;
            var selectPanelItem = new Views.SelectPanelView();
            var workspaceRegion = new spaceView.WorkspaceLayout();
            workspaceRegion.panelRegion.show(selectPanelItem);
            CloudMAM.mainRegion.show(workspaceRegion);
            self.listenTo(selectPanelItem,'cancel:all:select',function(){
                alert("11ss");
                CloudMAM.trigger('position:folder');
            });
//            var items = CloudMAM.request('select:item:list');
//            var listView = new Views.SelectView({
//                collection:items
//            });
//            listView.on('itemview:selected:show',function(childView,model){
//                console.log('111');
//            });
//            var panelView = new Views.SelectPanelView();
//
//            var mainLayout = new Views.SelectLayout();
//            self.listenTo(mainLayout,'show',function(){
//                mainLayout.panelRegion.show(panelView);
//                mainLayout.listRegion.show(listView);
//            });
//            CloudMAM.mainRegion.show(mainLayout);
//            CloudMAM.trigger('select:footer:show');//footer 接收


        }
    });
    var controller=new SelectController();
    return controller;
});