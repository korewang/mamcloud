/**
 * Created by wangxinyan on 2014/10/9.
 */
define(['app','apps/utils/templates','apps/loading/loading_controller'],function (CloudMAM,templates,loadingController) {
    CloudMAM.module('transportApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_) {
       //header title view


        Views.headerTitle = Marionette.ItemView.extend({
            className:'move_to_title',
            template:templates.getTemplate('workspace/transport/header_title'),
            tagName:'div'
        });
        Views.headerTitlePop = Marionette.ItemView.extend({
            className:'move_to_title dropdown titleR',
            template:templates.getTemplate('workspace/transport/header_title_pop'),
            tagName:'div'
        })
       //header  view

        Views.headerView = Marionette.LayoutView.extend({
            className:'',
            template:templates.getTemplate('workspace/transport/transport_header'),
            tagName:'div',
            regions:{
                titleRegion:'#transferList'
            },
            initialize:function(){

            },
            events:{
                'click #backToWorkspace': function () {
                    loadingController.loadingData();
                    CloudMAM.trigger('workspace:list');//返回home
                },
                'click #downloadList':'downloadList',
                'click #uploadList':'uploadList',
                'click #selectAll':'selectedAll',
                'click #cancelSelect':'cancelSelect'
            },
            downloadList: function (e) {
                e.stopPropagation();
                e.preventDefault();
                this.upload = false;
                if(!$(e.target).hasClass('actived')){
                    $(e.target).addClass('actived').siblings('#uploadList').removeClass('actived');
                    this.trigger('transport:list:data',{'type':'downloadlist'});
                }
            },
            uploadList: function (e) {
                e.stopPropagation();
                e.preventDefault();
                if(!$(e.target).hasClass('actived')){
                    $(e.target).addClass('actived').siblings('#downloadList').removeClass('actived');
                    this.trigger('transport:list:data',{'type':'upload'});
                }

            },
            selectedAll: function () {
                this.trigger('selected:all');
            },
            cancelSelect: function () {
                this.trigger('cancelSelected:all');
            },
            onRender: function () {

            }
        });
        Views.itemView = Marionette.ItemView.extend({//成功
            className:'nameSuccess',
            template:templates.getTemplate('workspace/transport/success_list_item'),
            tagName:'div',
            events:{
                'touchend':'longPress'
            },
            initialize: function () {
                this.listenTo( this.model,'change',this.render);
            },
            longPress: function () {
                if(this.$('.contentView').hasClass('selected')){
                   /// this.$('.contentView').removeClass('selected');
                    this.model.set('selected',false);
                    this.trigger('item:cancelSelect');
                }else{
                  //  this.$('.contentView').addClass('selected');
                    this.model.set('selected',true);
                    this.trigger('item:selected');
                }
            },
            onRender: function () {
                if(this.model.get('selected')){
                    this.$('.contentView').addClass('selected');
                }else{
                    this.$('.contentView').removeClass('selected');
                }
            }
        });
        Views.loadingItemView = Marionette.ItemView.extend({//正在传
            className:'testname',
            template:templates.getTemplate('workspace/transport/list_item'),
            tagName:'div'
        });
        Views.failItemView = Marionette.ItemView.extend({//失败
            className:'fail',
            template:templates.getTemplate('workspace/transport/fail_list_item'),
            tagName:'div',
            events:{
                'touchend':'selectedItem'
            },
            initialize: function () {
                this.listenTo( this.model,'change',this.render);//自动render
                this.model.bind('destroy', this.remove, this);
            },
            selectedItem: function () {
                if(this.$('.contentView').hasClass('selected')){
                   // this.$('.contentView').removeClass('selected');
                    this.model.set('selected',false);
                    this.trigger('item:cancelSelect');
                }else{
                   /// this.$('.contentView').addClass('selected');
                    this.model.set('selected',true);
                    this.trigger('item:selected');
                }
            },
            remove: function () {
                $(this.el).remove();
            },
            clear: function () {
                this.model.destroy();
            },
            onRender: function () {
                if(this.model.get('selected')){
                    this.$('.contentView').addClass('selected');
                }else{
                    this.$('.contentView').removeClass('selected');
                }
            }
        });
        Views.collecLayout = Marionette.LayoutView.extend({
            template:templates.getTemplate("workspace/transport/transport_item_container"),
            regions: {
                CollectRegion: "#CollectRegion"
            }
        });
        Views.collectView = Marionette.CollectionView.extend({
            className:'listItemView name',
           // template:templates.getTemplate("workspace/transport/transport_item_container"),
            //childView: Views.itemView//分类选择不同的view
            getChildView: function (item) {

                item.set('createTime',this.formatDate(item.get('createTime')));
                if(item.get('transportType')=='1'){//success
                    return Views.itemView;
                }else if(item.get('transportType')==''){//doing
                    return Views.loadingItemView;
                }else{//fail
                    return Views.failItemView;
                }
            },
            initialize: function () {
                    this.selectedArray=[];
                   // this.listenTo(this.collection,'add',this.render);
            },
            formatDate: function(now){
                //timestamp to time
                var datetime = new Date(now);
                var   year=datetime.getFullYear();
                var   month=datetime.getMonth()+1;
                var   date=datetime.getDate();
                var   hour=datetime.getHours();
                var   minute=datetime.getMinutes();
                var   second=datetime.getSeconds();
                return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            }
        });
        Views.footerView = Marionette.ItemView.extend({
            //footerView
            className:'navbar navbar-fixed-bottom fixedbar footerCenter none',
            tagName:'div',
            template:templates.getTemplate('workspace/transport/transport_footer'),
            events:{
                'click #deleteFile':'deleteFile'
            },
            deleteFile: function () {
                this.trigger("delete:itemlist");
            }
        })
    });
    return CloudMAM.transportApp.Views;
});