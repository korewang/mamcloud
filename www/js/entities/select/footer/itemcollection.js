/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','config/base','entities/select/footer/item','backbone.validation'],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.Collection.extend({
        url:baseConfig.serverEndport,
        model:Item

    });

    var API = {
        list: function(){

            var items = new ItemCollection([
                { footItemClass:'download'},
                {footItemClass:'deleteFile'},
                {footItemClass:'reName'},
                {footItemClass:'moveTo'}
            ]);
            return items;
        }
    };

    CloudMAM.reqres.setHandler('select:footer:item',function(){
        return API.list();
    });

    return;
});