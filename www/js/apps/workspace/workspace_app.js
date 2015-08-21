/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/workspace/footer/footer_app'],function (CloudMAM) {
    CloudMAM.module("WorkspaceApp",
        function(Workspace,CloudMAM,Backbone,Marionette,$,_){
            Workspace.onStart = function(){
                //CloudMAM.trigger('workspace:list:show');
            };
            Workspace.onStop = function(){};
            Workspace.MainRouter = Marionette.AppRouter.extend({
                appRoutes:{
                    'workspace':'list',
                    'workspace/search':'search'
                }
            });
            var API = {//app入口点击footerbar 的事件 trigger
                list:function(controller,params){//默认行为  构建list
                    params = params || {};
                    controller.list(params);

                },
                search:function(controller,options){
                    controller.showSearch(options);
                },
                select: function (controller,options) {
                    controller.showSelect(options);
                }

            };

            var ModuleManager = {
                modules: {},
                doAction: function(moduleName,params){
                var self = this;
                var defer = $.Deferred();
                if(self.modules[moduleName] != undefined) {
                    self.modules[moduleName].destroy();
                }
                //不借助缓存
                if(moduleName == 'list')
                {
                  require(['apps/workspace/list/list_controller','apps/header/header_app'],function(mainController){

                      self.modules['list'] = mainController;
                      defer.resolve();
                  });

                }
                else if(moduleName == 'search'){
                  require(['apps/workspace/search/search_controller','apps/header/header_app'],function(searchController){
                      self.modules['search'] = searchController;
                      defer.resolve();
                  });
                }
                else if(moduleName == 'select'){
                  require(['apps/workspace/select/select_controller','apps/header/header_app'],function(selectedController){
                      self.modules['select'] = selectedController;
                      defer.resolve();
                  });
                }

                $.when(defer).then(function () {
                    API[moduleName](self.modules[moduleName],params);
                });

              }

            };

            this.listenTo(CloudMAM,'workspace:list',function(params,options){
               // console.log("workspace_app: workspace:list",params);
                params = params || {};
                options = options || {};
                var routerPath = 'workspace';
                if(params && params.folderId){
                    routerPath += "/";
                    routerPath += params.folderId;
                }
                CloudMAM.navigate(routerPath);
                ModuleManager.doAction("list",params);

            });
            this.listenTo(CloudMAM,'workspace:search',function(params,options) {
                params = params || {};
                options = options || {};
                var routerPath = 'workspace/search';
                CloudMAM.navigate(routerPath);
                ModuleManager.doAction("search",params);

            });
            //监听选择
            this.listenTo(CloudMAM,'workspace:select',function(params,options) {
                params = params || {};
                options = options || {};
                var routerPath = 'workspace/select';

                CloudMAM.navigate(routerPath);
                ModuleManager.doAction("select",params);

            });


            CloudMAM.addInitializer(function(){
                new Workspace.MainRouter({
                    controller:API
                });
            });
        });
    return CloudMAM.WorkspaceApp;
});