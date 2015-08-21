define(['app','apps/login/login_view','entities/login/user','apps/loading/loading_controller','config/base'],function(CloudMAM,Views,userModel,loadingController,urlRoots){
    var LoginController = Marionette.Controller.extend({
        loginIndex:function(options){

           options=options||{};
            var self = this;
            var headerView = new Views.LoginViewHead();
            var mainView = new Views.LoginViewMain();
            var footerView = new Views.LoginViewFooter();
            var layoutView = new Views.LoginLayout();
           // var netState = navigator.network.connection.type;
            self.listenTo(layoutView,"show",function(){
                layoutView.loginHeaderRegion.show(headerView);
                layoutView.loginMainRegion.show(mainView);
                layoutView.loginFooterRegion.show(footerView);
                var userv = JSON.parse(localStorage.getItem("usersp"))||"";
                $('#inputEmail3').val(userv.u||"");
                $('#inputPassword3').val(userv.p||"");
            });

            CloudMAM.mainRegion.show(layoutView);

            CloudMAM.headerRegion.empty();
            CloudMAM.footerRegion.empty();
           /* if(netState =='none'){
                navigator.notification.confirm(
                    '设置网络后再使用,是否设置？',
                    self.onConfirm,
                    '提示',
                    '确认,取消'
                );
            }*/
            self.listenTo(CloudMAM,'login:userlogin',function(userInfo){
                loadingController.loadingData();//显示loading
                var login = CloudMAM.request('CloudMAM:login:login',userInfo);
                $.when(login).done(function(response){
                    var status = response.status;
                    if(status==200){
                        localStorage.setItem("userInfo",JSON.stringify(response['userInfo']));
                        localStorage.setItem("usersp",JSON.stringify({"u":$('#inputEmail3').val(),"p":$('#inputPassword3').val()}));
                        self.changeUpdateStyle();
                        CloudMAM.trigger('workspace:list');//go  main  page
                    }else{
                        CloudMAM.loadingRegion.empty();
                        navigator.notification.alert(response.message,null ,'提示', '确定');
                    }
                }).fail(function (res) {
                    //go  main  page//CloudMAM.trigger('workspace:list');

                    CloudMAM.loadingRegion.empty();
                     var resdata = res.responseText||'连接服务器失败！',
                         tips = resdata.message||'连接服务器失败！';
                     navigator.notification.alert(tips,null ,'提示', '确定');


                });

            });

        },
        changeUpdateStyle:function(){
            //上传列表
            var listU = _.each(JSON.parse(localStorage.getItem('uplist')),function(ri){
                if(ri.transportType == '') {
                    //更改状态  1是成功  ‘’是进行中   其他是错误
                    ri.transportType = '2';
                }
            });
            localStorage.setItem('uplist',JSON.stringify(listU));
            // 下载列表
            var listD = _.each(JSON.parse(localStorage.getItem('downloadlist')),function(ri){
                if(ri.transportType == '') {
                    ri.transportType = '2';
                }
            });
            localStorage.setItem('downloadlist',JSON.stringify(listD));

        },
        onConfirm:function(buttonIndex){
            var self = this;
            if(buttonIndex == 1){//open  wifi setting
                Mytoast.openSet();
            }else{
                navigator.app.exitApp();
            }
        }
    });

    return new LoginController();
});