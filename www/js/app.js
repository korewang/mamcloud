/*
* open sourse
* */

define(["marionette"],function(Marionette){

    var CloudMAM = new Marionette.Application();

    CloudMAM.addRegions({//定义模块
        headerRegion: "#header",
        mainRegion : "#container",
        footerRegion: "#footer",
        dialogRegion: "#dialog",
        loadingRegion: "#loadingData"
    });

    CloudMAM.navigate = function(route,options){
        options || (options={});

        Backbone.history.navigate(route,options);
    };

    CloudMAM.getCurrentRoute = function(){
        return Backbone.history.fragment;
    };
    CloudMAM.on("start", function(){
        
        if( Backbone.history) {
            ///需要在history开始路由前，完成controller的加载
            ///
            require(["apps/login/login_app","apps/workspace/workspace_app","apps/dialog/dialog_app","apps/preview/preview_app"],function(){

                Backbone.history.start();
                if(CloudMAM.getCurrentRoute() === "") {
                    CloudMAM.trigger("login:index");//可以
                }
            });
        }
       

    });

    return CloudMAM;
});
