/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','config/base','entities/workspace/item','backbone.validation'],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.Collection.extend({
        url:baseConfig.serverEndport,
        model:Item

    });

    var API = {
        list: function(){
            //tfile  texe   tmp3  twav  tdoc
            var items = new ItemCollection([
                {
                    iconPath:'images/base/1_main_p_28.png',
                    iconType:'tfile',
                    title:'什么名字啊',
                    createDate: '2014-08-01'
                },
                {
                    iconPath:'images/base/1_main_p_28.png',
                    iconType:'tfile',
                    title:'爱的是发的',
                    createDate: '2014-08-01'
                },
                {
                    iconPath:'images/base/1_main_p_31.png',
                    iconType:'tmp3',
                    title:'阿萨德发生',
                    createDate: '2014-08-01'
                }



            ]);

            return items;
        }
    };

    CloudMAM.reqres.setHandler('select:item:list',function(){
        return API.list();
    });

    return;
});