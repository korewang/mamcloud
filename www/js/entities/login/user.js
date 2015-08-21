define(['app','config/base','backbone.validation'],function(CloudMAM,baseConfig){
/*
* 由于pc端没有一cordova的扩展接口，在mobile应用是吧network
* 和login_controller.js 的network打开以便于调用检测网络连接
* */

    var API = {
        login:function(userInfo){
           /* var netState = navigator.network.connection.type;
            if(netState =='none'){
                navigator.notification.alert("No network connection!",null ,'提示', '确定');
                return ;
            }
*/
            var response = Backbone.ajax({
                url: baseConfig.serverEndport+'/uic/login',
                contentType:'application/x-www-form-urlencoded',
                type: 'POST',
                data: {
                    username:userInfo.username,
                    password:userInfo.password,
                    rememberMe:false,//boolean
                    logintype:'mobile'
                }
            });
            return response.promise();

        }
    };
    CloudMAM.reqres.setHandler('CloudMAM:login:login',function(userInfo){
        return API.login(userInfo);
    });
});