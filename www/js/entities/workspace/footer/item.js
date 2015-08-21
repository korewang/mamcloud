/**
 * Created by wangxinyan on 2014/8/1.
 */
define(['app','config/base','backbone.validation'],function(CloudMAM,baseConfig){

    var FooterItem = Backbone.Model.extend({
        urlRoot:baseConfig.serverEndport

    });

    CloudMAM.reqres.setHandler('workspace:footer:item',function(){
        return new FooterItem();
    });

    return FooterItem;
});