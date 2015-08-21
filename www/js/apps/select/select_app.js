/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/select/list/list_controller'],function (CloudMAM) {
    CloudMAM.module('SelectApp',function(Select,CloudMAM,Backbone,Marionette,$,_){

        Select.MainRouter = Marionette.AppRouter.extend({
            appRoutes:{
                'select':'list',
                'mainSpace/:id':'showItem'
            }
        });
        var API = {//app入口点击footerbar 的事件 trigger
            list:function(){//默认行为  构建list
                require(['apps/select/list/list_controller','apps/select/footer/footer_app'],function(Controller){
                    Controller.list();
                });
            },

            showItem:function(id){

            }

        };
        this.listenTo(CloudMAM,'select:list',function(){

            CloudMAM.navigate('workspace/select');//
            API.list();
        });

        CloudMAM.addInitializer(function(){
            new Select.MainRouter({
                controller:API
            });
        });

    });

    return CloudMAM.SelectApp;
});