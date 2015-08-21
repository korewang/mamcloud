/**xx
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/utils/templates'],function (CloudMAM,templates) {
    CloudMAM.module('WorkspaceApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){

        Views.WorkspacePanelView = Marionette.ItemView.extend({//panel 有日期  名称筛选
            template: templates.getTemplate('workspace/list_panel'),
            className:'listTitle',
            events:{//move  list_view.js
                'click #sort-entity-name-asc':'sortByEntityNameAsc',//asc>|
                'click #sort-entity-name-des':'sortByEntityNameDes',//des
                'click #sort-create-time-asc':'sortByCreatTimeAsc',
                'click #sort-create-time-des':'sortByCreatTimeDes',//|>
                'click .panelAllFile a':'resetTitle',
                'click #narBackFolder':'narBackFolders'
            },
            initialize: function (options) {
               //this.model.set('titleName',options.title_name);
                this.titleArarry=[{folderId:'',folderName:'所有内容'}];//初始化
                this.folderId = null;
            },
            onShow: function () {
                $('.titleL').hide();
            },
            sortByCreatTimeAsc : function(e){

                this.handleSortOperation(e,{
                    key:"createtime",
                    direction: -1
                });
            },
            sortByCreatTimeDes : function(e){

                this.handleSortOperation(e,{
                    key:"createtime",
                    direction: 1
                });
            },
            sortByEntityNameAsc:function(e){

                this.handleSortOperation(e,{
                    key:"entityname",
                    direction: -1
                });
            },
            sortByEntityNameDes:function(e){

                this.handleSortOperation(e,{
                    key:"entityname",
                    direction: 1
                });
            },
            handleSortOperation : function(e,options){
                e.preventDefault();
                this.$el.children('.dropdown').removeClass('open');
                this.trigger("sort:method:change",options);
            },
            resetTitle:function(e){//重置panel title
                e.preventDefault();
                var clickedTitle = e.target,
                    uid = $(clickedTitle).attr('uid');
                this.removeFolderTitle({uid:uid});//移除到制定文件夹
                this.trigger("sort:title:reset",{uid:uid});//重新获取数据生成list
            },
            onRender:function(args){
            },
            narBackFolders: function () {
                var titleLength = this.titleArarry.length;
                    backFolder = this.titleArarry[titleLength-2],
                    folderId = backFolder.folderId,
                    folderNames = backFolder.folderName;
                this.folderId = backFolder.folderId;
                this.titleArarry.splice(titleLength-1,1);//删除数组节点
                this.trigger("sort:title:reset",{uid:folderId});
                $('#folderNameTitle').text(folderNames);
                if(titleLength===2){
                    $('.titleL').hide();
                }
            },
            addFolderTitle:function(options){//添加panel的面包序
                $('.titleL').show();
                this.titleArarry.push(options);
                $('#folderNameTitle').text(options.folderName);//随时更改title
               // this.$el.children('.contenLeftPanel').children('.panelAllFile').append('<a class="panelbar" uid='+options.folderId+'>'+options.folderName+'</a>');
               // console.log(this.titleArarry);
            },
            removeFolderTitle:function(options){//移除panel面包序
                options = options||{};
                var title = $(this.$el).children('.contenLeftPanel').children('.panelAllFile').children('a'),
                    len=title.length-1;
                for(len;len>0;len--){
                    if(title.eq(len).attr('uid')==options.uid){
                        return;
                    }else{
                        title.eq(len).remove();
                    }
                }
            }
        });

        Views.WorkSpaceItemView = Marionette.ItemView.extend({
            template:templates.getTemplate('workspace/list_item'),
            className:'itemView js-long-touch',
            tagName: 'div',
            events:{
                'touchstart .js-workspace-item':'touchstartitem',
                'touchmove .js-workspace-item':'touchmoveitem',
                'touchend .js-workspace-item':'touchenditem',// 'touchend':'item:itemclicked',
                'touchy-longpress .js-workspace-item':'longpress'
            },
            initialize:function(){
                this.touchspace = '';//默认的点击并不是end
                this.touchEndStamp='';
                this.touchStartStamp='';
                this.touchspacex = '';
                this.touchspacey = '';
                this.touchEndPageX = '';
                this.touchEndPageY = '';
                this.touchStartPageX = '';
                this.touchStartPageY = '';
                this.listenTo(this.model,"change",function(){
                    this.render();
                });
            },
            touchstartitem: function (e) {
                this.touchStartStamp = e.timeStamp;
                this.touchStartPageX = e.originalEvent.targetTouches[0].pageX;
                this.touchStartPageY = e.originalEvent.targetTouches[0].pageY;
                $(e.target).addClass('actived');
            },
            touchmoveitem: function (e) {},
            touchenditem:function(e){//点击
                this.touchEndStamp = e.timeStamp;
                this.touchEndPageX = e.originalEvent.changedTouches[0].pageX;
                this.touchEndPageY = e.originalEvent.changedTouches[0].pageY;
                this.touchspacex =Math.abs(this.touchStartPageX - this.touchEndPageX);
                this.touchspacey =Math.abs(this.touchStartPageY - this.touchEndPageY);
                this.touchspace = this.touchEndStamp-this.touchStartStamp;
                if(this.touchspace>50 && this.touchspace<150 && this.touchspacex < 5 && this.touchspacey < 5 ){
                    this.trigger('item:itemclicked');
                }
               // this.trigger('item:itemclicked');
                $(e.target).removeClass('actived');
            },
            longpress:function(e, phase, $target, data){//长按事件
                var self = this;
                if($($target).parent().hasClass('selected')){
                    this.trigger('item:itemlongpressSub',this);
                    self.model.set("selected",false);
                }else{
                    self.model.set("selected",true);
                    this.trigger('item:itemlongpressAdd',this);
                }
                $(e.target).removeClass('actived');
            },
            onRender: function(){
                var self = this;
                //this.delegateEvents();
                if(this.model.get("selected")){
                    this.$(".js-workspace-item").parent().addClass('selected')
                }
                else{
                    this.$(".js-workspace-item").parent().removeClass('selected')
                }

                self.$('.js-workspace-item').on('touchy-longpress',function(){});

            },
            onShow:function(){

                var bodyW = $('body').width();

                this.$(".rightTitle").css('width',bodyW-90+'px');
            },
            onBeforeDestroy: function(){
                var self = this;
              //  self.$el.unbind('touchy-longpress',null);
            }

        });//  item View

        Views.WorkpaceView = Marionette.CompositeView.extend({
            className:'listItemView',
            template: templates.getTemplate('workspace/list_container'),
            childView: Views.WorkSpaceItemView,
            initialize:function(){
                this.selectItem =[];
            },
            onRender:function(){
            }


        });



    });
    return CloudMAM.WorkspaceApp.Views;
});