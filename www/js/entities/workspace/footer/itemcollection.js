/**
 * Created by wangxinyan on 2014/8/1.
 */
define(['app','config/base','entities/workspace/footer/item','backbone.validation'],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.Collection.extend({
        url:baseConfig.serverEndport,
        model:Item

    });

    var API = {
        list: function(){

            var items = new ItemCollection([
                { footItemClass:'add'},
                {footItemClass:'search'},
                {footItemClass:'classification'},
                {footItemClass:'load-up'}
            ]);

            return items;
        }
    };

    CloudMAM.reqres.setHandler('workspace:footer:item',function(){
        return API.list();
    });

    return;
});