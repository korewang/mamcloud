/**
 * Created by wangxinyan on 2014/10/21.
 */
define(['app','apps/person_center/person_detail/person_view','config/base','apps/utils/download_file','entities/person_center/userInfo/item_collection'],function(CloudMAM,Views,baseConfig,uploadHead){
    var PersonController = Marionette.Controller.extend({
        index:function(options){

            options=options||{};
            var self = this;
            var personView =  null,
                popView = new Views.popWindow();

            var items =CloudMAM.request('get:userInfoDetail',{});
            $.when(items).done(function(infoDetail){
                var users = JSON.parse(infoDetail);
                var models = Backbone.Model.extend({
                    defaults:{
                        headurl:'images/base/head-portrait.png'
                    },
                    initialize :function(){
                        //alert("you create me");
                        //监听属性更改事件
                        this.bind('change',function(){

                        });
                    }
                });
                var myModel = new models(users.userInfo);
                if(users.userInfo.headUrl!='aa'){
                    myModel.set('headUrl',users.userInfo.headUrl);
                }
                myModel.sync('read',myModel,{//usedStatistics   interface
                    url:baseConfig.serverEndport+'/emc/usedStatistics/import',
                    success: function (responese) {//user detail info
                        var Capacity = responese.total;//  reset  model
                        myModel.set('totalFileSieze',Capacity.totalFileSize);
                        myModel.set('userPermissionSpace',Capacity.userPermissionSpace);
                        myModel.set('usedPercent',Capacity.usedPercent+'%');
                        personView=  new Views.PersonItemView({
                            model: myModel
                        });
                        CloudMAM.mainRegion.show(personView);
                        personView.clientHeight();
                        self.listenTo(personView,'change:photo',function(){
                            // open  pop window
                            CloudMAM.loadingRegion.show(new Views.popWindow());
                        });
                    },
                    error: function (re) {
                        alert(re.statusText);
                       // CloudMAM.trigger("workspace:list");//stat==1
                       //status==2
                        personView=  new Views.PersonItemView({
                            model: myModel
                        });
                        CloudMAM.mainRegion.show(personView);
                        personView.clientHeight();
                        self.listenTo(personView,'change:photo',function(){
                            // open  pop window
                            CloudMAM.loadingRegion.show(new Views.popWindow());
                        });
                    }
                });
                CloudMAM.loadingRegion.empty();
            });
            self.listenTo(CloudMAM,'upload:actPhotoGallery', function (upType) {
                uploadHead.uploadHeadImg(upType);
            });
            CloudMAM.headerRegion.empty();
            CloudMAM.footerRegion.empty();


        }
    });

    return new PersonController();
});