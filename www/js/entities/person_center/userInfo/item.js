/**
 * Created by wangxinyan on 2014/11/4.
 */
/**
 * Created by wangxinyan on 2014/9/23.
 */
define(['app','config/base','apps/utils/time_utils','backbone.validation'],function(CloudMAM,baseConfig,time_utils){

    var Item = Backbone.Model.extend({
        urlRoot:baseConfig.moveFolderPort,
        defaults:{
            iconType:'tfile',
            iconS:'none'
        },
        initialize:function(){

        }

    });

    CloudMAM.reqres.setHandler('moveto:item:new',function(){
        return new Item();
    });

    return Item;
});