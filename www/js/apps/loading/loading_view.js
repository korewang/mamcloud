/**
 * Created by wangxinyan on 2014/8/28.
 */
define(["app","apps/utils/templates"],function (CloudMAM,templates) {
    CloudMAM.module('LoadingApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){
        Views.loadingItemView = Marionette.ItemView.extend({
            template:templates.getTemplate('loading/loading'),
            id:'loading',
            className:'container',
            initialize:function(){
                setTimeout(function(){
                   if(!CloudMAM.loadingRegion.isEmpty){
                       Mytoast.showToast("网络状态不佳",1);
                       CloudMAM.loadingRegion.empty();
                   }

                },8000);
            },
            resetLoadPosition:function(){
                var bodyH = $(window).height(),
                    margintop = (bodyH-70)/2;
                $('.centerload').css('margin-top',margintop);
            }
        });

    });
    return CloudMAM.LoadingApp.Views;
});