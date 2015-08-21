/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','config/base','backbone.validation'],function(CloudMAM,baseConfig){

    var FooterItem = Backbone.Model.extend({
        urlRoot:baseConfig.serverEndport

    });

    CloudMAM.reqres.setHandler('select:footer:item',function(){
        return new FooterItem();
    });

    return FooterItem;
});