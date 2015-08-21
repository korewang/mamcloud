/**
 * Created by wangxinyan on 2014/10/10.
 */
define(['app','config/base','entities/workspace/transport_list/item','backbone.validation'],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.Collection.extend({
        url:baseConfig.serverEndport,
        model:Item

    });

    var API = {
        list: function(options){
//transportType   11 成功     10失败    ''正在传  下载
            var items='';
            options = options||{};
            if(options.type=='downList'){
                items = new ItemCollection(JSON.parse(localStorage.getItem('downlist')));
            }else{
                //items = new ItemCollection(JSON.parse(localStorage.getItem('uplist')));
                 items = new ItemCollection([
                { createTime:'add',name:'asf地方大锅饭  地方的舒服舒服',transportType:'正在下载'},
                {createTime:'search',name:'as额额额3333服舒服',transportType:'下载失败'},
                {createTime:'classification',name:'a第三关导入',transportType:'上传失败'},
                {createTime:'load-up',name:'a111sd',transportType:'正在上传'}
            ]);
            }
            return items;
        }
    };

    CloudMAM.reqres.setHandler('workspace:transport:list',function(options){
        return API.list(options);
    });
});