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
            initialize:function(options){
                this.type = options;
            },
            selectedAllItem:function(){
                CloudMAM.trigger('workspace:selectedAll:item');
            },
            narToBack:function(){
                /*现在的需求是取消全选的时候返回主页
                *现在的需求是取消全选的时候再文件夹的当前位置
                *
                * */
                if(this.type){
                    CloudMAM.trigger('cancel:all:item');
                    return ;
                }
                this.trigger('cancel:all:select');
            },
            titleNumber:function(options){
                var titleNo = options||[];
                this.$('#dropselected').text('已选择'+titleNo.length+'文件');
            }
        });

    });
    return CloudMAM.SelectApp.Views;
});