/**
 * Created by wangxinyan on 2014/11/4.
 */
define(['app','config/base','entities/person_center/userInfo/item','backbone.validation',"backbone.paginator"],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.PageableCollection.extend({
        url: baseConfig.serverEndport+'/sc/search',

        model:Item,


        initialize: function(){
            var self = this;

        }


    });

    var API = {
        list: function(){
            var response = Backbone.ajax({
                url: baseConfig.serverEndport+'/uic/userInfoDetail',
               // contentType:'application/json',
                type: 'GET'
            });
            return response.promise();

        }

    };

    CloudMAM.reqres.setHandler('get:userInfoDetail',function(){
        return API.list();
    });
    return ItemCollection;
});