define(['app'],function(CloudMAM){
    CloudMAM.module('Router.LoginApp',function(LoginAppRouter,CloudMAM,Backbone,Marionette,$,_){
        LoginAppRouter.loginRouter = Marionette.AppRouter.extend({
            appRoutes:{
                'login':'login'
            }
        });
        var LoginAppController={
                login:function(){
                    require(['apps/login/login_controller'],function(loginControlller){
                        loginControlller.loginIndex();
                        console.log('login===  ');
                    });
                }
        };
        CloudMAM.addInitializer(function(){
            new LoginAppRouter.loginRouter({
                controller:LoginAppController
            });
        });
        this.listenTo(CloudMAM,'login:index',function(){
            CloudMAM.navigate('login');
            LoginAppController.login();
        });
    });

    return CloudMAM.LoginAppRouter;
});