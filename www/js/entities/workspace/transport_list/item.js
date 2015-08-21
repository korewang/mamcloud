/**
 * Created by wangxinyan on 2014/10/10.
 */
define(['app','config/base','backbone.validation'],function(CloudMAM,baseConfig){

    var FooterItem = Backbone.Model.extend({
        urlRoot:baseConfig.serverEndport,
        defaults:{
            transportType:'正在上传',//上传 下载区别
            name:'',
            createTime:''

        },
        initialize: function () {
            if(this.get('transportType')){

            }
            switch (this.get('transportType')){
                case '11':
                    this.set('dd','up');
            }

        }

    });

    CloudMAM.reqres.setHandler('workspace:transport:list',function(){
        return new FooterItem();
    });

    return FooterItem;
});