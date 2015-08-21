/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('WorkspaceApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){

        Views.WorkspaceLayout = Marionette.LayoutView.extend({
            template:templates.getTemplate('workspace/list_layout'),
            className:'contents',
            events:{
                'click #sort-entity-name-asc':'sortByEntityNameAsc',//asc>|
                //'touchend #sort-entity-name-asc':'sortByEntityNameAscEnd',//asc>|
                'click #sort-create-time-des':'sortByCreatTimeDes'//|>
                //'touchend #sort-create-time-des':'sortByCreatTimeDesEnd'//|>
            },
            sortByEntityNameAsc:function(e){
                $(e.target).addClass('actived').siblings().removeClass('actived');
                this.handleSortOperation(e,{
                    key:"entityname",
                    direction: -1
                });
            },
            sortByCreatTimeDes : function(e){
                $(e.target).addClass('actived').siblings().removeClass('actived');
                this.handleSortOperation(e,{
                    key:"createtime",
                    direction: 1
                });
            },
            handleSortOperation : function(e,options){
                e.preventDefault();
                this.trigger("sort:method:change",options);
            },
            regions: {
                panelRegion: "#panelRegion",
                listRegion: "#listRegion"
            },
            onShow: function () {},
            wrapperHeight: function (callback) {
                var panelH = $('.listTitle').height(),
                    fixedPanelT = $('.navbar-fixed-top').height(),
                    fixedPanelB = $('.navbar-fixed-bottom').height(),
                    bodyH = $('body').height()-fixedPanelT-fixedPanelB-panelH;
                $(this.$el).children('#scrollWrapper').height(bodyH);
                callback&&callback();
            }
        });//layout   main
    });
    return CloudMAM.WorkspaceApp.Views;
});