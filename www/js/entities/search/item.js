/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','config/base','backbone.validation'],function(CloudMAM,baseConfig){

    var Item = Backbone.Model.extend({
        urlRoot:baseConfig.serverEndport

    });

    CloudMAM.reqres.setHandler('search:item:new',function(){
        return new Item();
    });

    return Item;
});