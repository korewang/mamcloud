/**
 * Created by wangxinyan on 2014/9/23.
 */
define(['app','config/base','entities/moveto/item','backbone.validation',"backbone.paginator"],function(CloudMAM,baseConfig,Item){

    var ItemCollection = Backbone.PageableCollection.extend({
        url: baseConfig.moveFolderPort+'-1',

        model:Item,
        state: {
            firstPage: 1,//1-based，（分页从1开始符合阅读习惯)
            lastPage: null,//这是基于firstPage 算出来的 不可修改
            pageSize: 15,//默认
            totalPages: null,
            totalRecords: null,//  server-mode 可填此参数
            sortKey: "createtime",//默认
            order: 1,//desc  默认-1    为0则不会发送服务端
            currentPage: 1//初始页索引,默认和firstPage相同,若不同则指定

        },


        queryParams: {
            totalPages: null,//默认"键" "total_pages" 设置为null 则会从querystring中移除
            totalRecords: null,//默认"键""total_entries" 设置为null 则会从querystring中移除
            sortKey: "sort", // 默认"键" "sort_by"
            order: "order", //默认"键" "order"
            currentPage: "page",//默认"键" "page"
            pageSize: "size", //默认"键" "per_page"
            webType:"pc",  //pc  接口不同pc  筛选的时候mobile是不允许筛选出文件夹的
            //directions:"" 默认"键" { "-1": "asc", "1": "desc" }
            directions: {
                "-1": "asc",//"asc",
                "1": "desc"
            },
            q: "", //关键帧
            folderCode: "",//文件夹code
            type: ""//素材类型
        },

        //修改本地数据状态：如：总个数/当前页索引/
        parseState: function (response, queryParams, state, options) {
            ///console.log("Enter parseState");
//            if(localStorage.getItem('xscroll')){
//                CloudMAM.trigger('list:xscroll:refresh');
//            }
            return {
                totalRecords: response.totalCount,
                totalPages: response.totalPage,
                currentPage: response.page
            };
        },


        parseRecords: function(response,options){
           // console.log("parseRecords:" ,response.entities);
            return response;

        },

        initialize: function(params,options){
            var self = this;
            params = params || {};
            self.queryParams.folderCode = params.folderId || "";
            self.queryParams.q  = params.q || "";
            self.queryParams.type = params.type || "";
            self.queryParams.webType = params.webType || "";
            options || (options ={});

            var operationParam = options.parameters || {page : 1};
            this.parameters = new Backbone.Model(operationParam);
            console.log('self.queryParams.folderCode',self.queryParams.folderCode);

            this.listenTo(this.parameters,"change:page",this.pageBy);//数据滚动加载
           // this.listenTo(this.parameters,"change:order",this.orderBy);//数据排序
            this.listenTo(this.parameters,"change:folderCode",this.folderCodeBy);//进入文件夹子目录

            this.once("sync",function(){
                // console.log("sync: ---------");
                this.allData = _.clone(this);

            },this);
        },

        pageBy: function(params){//翻页滚动
            var page = parseInt(this.parameters.get("page"),10);
            var self = this;
            //保存原有的数据
            self.allData = _.clone(self);
            this.getPage(page,{reset:true}).done(function(){
                //将新的数据append到所有数据上
                var newDatas = self.models;

                //将新获取的数据增加到列表中
                //self.set(newDatas);
                _.each(newDatas,function(item){
                    self.allData.add(item,{silent: true});
                });
                self.reset(self.allData.models);
                /// console.log("合并以后:",self.models);
                CloudMAM.trigger('list:workspace:refresh');//发生trigger  listControl接收   refresh  滚动条
            });
        },
        orderBy:function(params){//类型刷新    创建时间    创建名称
            var options = this.parameters.get("order");
            var self = this;
            // console.log(self.parameters.get('page'));
            self.state.sortKey=options.key;
            self.state.order = options.direction;

            self.getPage(1, { reset: true }).done(function(){
                //  console.log('done::ok  orderBy over  ');
            });
        },
        folderCodeBy:function(params){//点击folder
           // console.log("params.getFolderCode",params.get('folderCode'));
            var options = this.parameters.get("folderCode");
            var self = this;
            self.url = baseConfig.moveFolderPort+params.get('folderCode');
            self.queryParams.folderCode = options;
            self.getPage(1, { reset: true });
            CloudMAM.loadingRegion.empty();//隐藏loading
        }
    });

    var API = {
        getEntitiesByParams: function(params,options){
            //tfile  texe   tmp3  twav  tdoc
            params = params || {};
            options = options||{};
            var listV = new ItemCollection(params);
            var deferred = $.Deferred();
            deferred.then(options.success,options.error);
            var response = listV.fetch(_.omit(options,'success','error'));
            response.done(function(){
                deferred.resolveWith(response,[listV]);
            }).fail(function(){
                deferred.rejectWith(response,arguments);
            });
            return deferred.promise();

        }

    };
    var getOperation = function(params){
        params = params ||{};
        return API.getEntitiesByParams(params);
    };
    CloudMAM.reqres.setHandler('moveto:item:list',function(params){
        return getOperation(params);
    });

    /*CloudMAM.reqres.setHandler('search:item:list',function(params){
        return getOperation(params);
    });
    */
    return ItemCollection;
});