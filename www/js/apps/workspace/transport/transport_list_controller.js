/**
 * Created by wangxinyan on 2014/10/9.
 */
define(['app',
        'apps/workspace/transport/transport_list_view',
        'apps/utils/scroll_utils',
        'entities/workspace/transport_list/item_collection'],function (CloudMAM,Views,xscroll) {
    var TransportController = Marionette.Controller.extend({
        listIndex: function (params) {
            params = params||{};
            var self = this;

            var headerItemView = new Views.headerView();
            var headerTitleView =  new Views.headerTitle();
            var headerTitlePopView =  new Views.headerTitlePop();
            var footerItemView = new Views.footerView();
            var collecLayoutView = new Views.collecLayout();
            var userid =  JSON.parse(localStorage.getItem('userInfo')).id;
            //var item = new Backbone.Collection(JSON.parse(localStorage.getItem('uplist')),[]);
            var item = new Backbone.Collection;
            var listScroll =  null;
            _.each(JSON.parse(localStorage.getItem('uplist')),function(ri){
                if(ri.mid == userid) {
                    item.add(ri);
                }
            });
            //var item = CloudMAM.request('workspace:transport:list');
            var CollectionListView = new Views.collectView({
                collection: item
            });
            self.listenTo(collecLayoutView,'show',function(){
                collecLayoutView.CollectRegion.show(CollectionListView);
                $('#CollectRegion').height($('body').height() - $('.move_to_header_bar').height() - $('#pullDown').height());
                listScroll = new iScroll('CollectRegion',{vScrollbar:false,hScrollbar:false});
                //listScroll.refresh();
            });

            CloudMAM.mainRegion.show(collecLayoutView);
            CloudMAM.headerRegion.show(headerItemView);
            CloudMAM.footerRegion.show(footerItemView);
            //title  点击选择全部的时候操作
            self.listenTo(headerItemView,'selected:all', function () {
                _.each(item.models, function (e) {
                    if(e.get('transportType')!=''){
                        e.set('selected',true);
                    }
                });
            });
            self.listenTo(headerItemView,'cancelSelected:all', function () {
                console.log(headerTitleView);
                headerItemView.titleRegion.show(new Views.headerTitle());//pop显示
                $('.footerCenter').addClass('none');
                _.each(item.models, function (e) {
                    if(e.get('transportType')!=''){
                        e.set('selected',false);
                    }
                })
            });
            self.listenTo(CollectionListView,'childview:item:cancelSelect',function(params){
                params = params||{};
                var ay = _.filter(CollectionListView.selectedArray,function(num){
                    if(num.cid != params.cid){
                        return this;
                    }
                });
                if(ay.length == 0){
                    headerItemView.titleRegion.show(new Views.headerTitle());//pop显示
                    $('.footerCenter').addClass('none');
                }
                CollectionListView.selectedArray=ay;
                $('#dropselected').text('已选择'+ay.length+'个');
            });
            self.listenTo(CollectionListView,'childview:item:selected',function(params){
                params = params||{};
                CollectionListView.selectedArray.push(params);
                headerItemView.titleRegion.show(new Views.headerTitlePop());//pop显示
                $('.footerCenter').removeClass('none');//footer 显示
                $('#dropselected').text('已选择'+CollectionListView.selectedArray.length+'个');
            });
            self.listenTo(headerItemView,'transport:list:data', function (options) {
                options = options||{};
                CollectionListView.selectedArray=[];//clear
                $('.footerCenter').addClass('none');
                headerItemView.titleRegion.show(new Views.headerTitle());
                var receiveData = (options.type=='upload')?JSON.parse(localStorage.getItem('uplist')):JSON.parse(localStorage.getItem('downloadlist')),
                    resetData = [];
                _.each(receiveData,function(ri){
                    if(ri.mid==userid){
                        resetData.push(ri);
                    }
                });
                item.reset();
                item.add(resetData);
                listScroll.refresh();//fresh
            });
            self.listenTo(footerItemView,'delete:itemlist', function () {
                //list  delete
                _.each(CollectionListView.selectedArray, function (mo) {
                   mo.destroy();
                });

                var updateIist =  _.filter(item.models,function(num){
                    if(num.get('selected')!=true){
                        return this;
                    }
                });
                if(item.models[0].get('emctype')=='u'){
                    //uplist
                    localStorage.setItem('uplist',JSON.stringify(updateIist));
                }else{
                    //down
                    localStorage.setItem('downloadlist',JSON.stringify(updateIist));
                }
                //localStorage.setItem('testUplist',JSON.stringify(updateIist));//只是上传list
                //_.where(item,{'selected':true});
                headerItemView.titleRegion.show(new Views.headerTitle());//pop显示
                $('.footerCenter').addClass('none');//footer hidden
                listScroll.refresh();//fresh
            });
            headerItemView.titleRegion.show(headerTitleView);//默认title
          //  $('#CollectRegion').height($('body').height() - $('.move_to_header_bar').height() - $('#pullDown').height());

            $('#CollectRegion').height($('body').height()- $('#header').height());
            listScroll.refresh();
        }
    });
    return new TransportController();
});