/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/utils/templates','apps/loading/loading_controller'],function (CloudMAM,templates,loadingController) {
    CloudMAM.module('WorkspaceApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){
        Views.SearchPanelView = Marionette.ItemView.extend({
            template: templates.getTemplate('search/list_panel'),
            className:'listTitle',
            initialize: function(options){
                options = options || {};

                this.q = options.q;

            },
            events:{
                'click .input-group-btn':'searchFile',
                'click #narBack':'narback'
            },
            searchFile:function(e){
                e.preventDefault();
                loadingController.loadingData();
                var seaVal = $('#seaVal').val();
                this.trigger('search:listitem',{q:seaVal,webType:"mobile"});

            },
            narback:function(){//back  list home
                loadingController.loadingData();
                CloudMAM.trigger('workspace:list');
            },
            onRender: function(){
                this.$(".js-searchInputField").val(this.q || "");
            }


        });

        Views.SearchLayout = Marionette.LayoutView.extend({
            template:templates.getTemplate('search/list_layout'),
            className:'contents',
            regions: {
                searchPanelRegion: "#searchPanelRegion",
                workspacePanelRegion:"#workspacePanelRegion",
                searchResultRegion: "#searchResultRegion"
            },
            onRender: function () {
            },
            resetHeight:function(){
                var scrollHeight = $('body').height()-$('.navbar-fixed-top').height()-$('#searchPanelRegion').height();
                return scrollHeight;
            }
        });

    });
    return CloudMAM.WorkspaceApp.Views;
});