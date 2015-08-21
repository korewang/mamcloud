/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','config/base','entities/search/item','backbone.validation'],function(CloudMAM,baseConfig,Item){

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
                    title:'111',
                    createDate: '2014-08-01'
                },
                {
                    iconPath:'images/base/1_main_p_28.png',
                    iconType:'tfile',
                    title:'222',
                    createDate: '2014-08-03'
                },
                {
                    iconPath:'images/base/1_main_p_28.png',
                    iconType:'tdoc',
                    title:'333',
                    createDate: '2014-08-04'
                },
                {
                    iconPath:'images/base/1_main_p_31.png',
                    iconType:'tmp3',
                    title:'555',
                    createDate: '2014-08-01'
                }


            ]);

            return items;
        }
    };

    CloudMAM.reqres.setHandler('search:item:list',function(){
        return API.list();
    });

    return;
});