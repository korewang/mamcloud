/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app'],function (CloudMAM) {
    CloudMAM.module('SearchApp',function(SearchApp,CloudMAM,Backbone,Marionette,$,_){
        SearchApp.onStart = function(){

        };
        SearchApp.onStop = function(){

        };

        SearchApp.Router = Marionette.AppRouter.extend({
            appRoutes:{
                'search':'list',
                'searchlist/:id':'showItem'
            }
        });
        var API = {
            list:function(){
                console.log('serarch');
                console.log( CloudMAM.mainRegion);
                require(['apps/search/list/list_controller'],function(searchController){
                    searchController.list();
                });
            },
            showItem:function(id){

            }
        };
        this.listenTo(CloudMAM,'search:list',function(){
            CloudMAM.navigate('search');//
            API.list();
        });
        CloudMAM.addInitializer(function(){
            new SearchApp.Router({
                controller:API
            });
        });
    });
    return CloudMAM.SearchApp;
});