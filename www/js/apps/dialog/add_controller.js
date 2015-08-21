/**
 * Created by wangyu on 2014/7/31.
 */
define(["app","apps/dialog/add_view"],function(CloudMAM, Views){
    var DialogController = Marionette.Controller.extend({

        addDialog:function(options){

            options=options||{};
            var self = this;
            var addDialogView = new Views.AddDialogView();
            //console.log("AddDialog");

//            BootstrapDialog.show({
//                title: '添加新文件',
//                message: '<div class="C_dialog "><div class="fix_dialog  row"><div class="col-xs-6 col-md-6 "><a class="video"></a><p>音视频</p></div><div class="col-xs-6 col-md-6"><a class="audio"></a><p>音频</p></div></div><div class="fix_dialog row"><div class="col-xs-6 col-md-6"><a class="img"></a><p>图片</p></div><div class="col-xs-6 col-md-6"><a class="doc"></a><p>文档</p></div></div><div class="fix_dialog  row"><div class="col-xs-6 col-md-6"><a class="other"></a><p>其他</p></div><div class="col-xs-6 col-md-6"><a class="all"></a><p>所有内容</p></div></div></div>'
//            });
            CloudMAM.dialogRegion.show(addDialogView);
            //手动js模态触发模态框的显示与隐藏
            $("#add-click-dialog").modal('toggle');

            $(".modal-dialog").removeAttr("height");

           // $(".modal-dialog").css("height","45%");
            //console.log("toggle");

            //监听点击对话框里面添加音视频点击事件
//            self.listenTo(CloudMAM,"dialog:add:videos",function(){
//                //getUploadImg();
//                alert('111s');
//                return;
//
//
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面新建文件夹的点击事件
//            self.listenTo(CloudMAM,"dialog:add:folder",function(){
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面添加音频点击事件
//            self.listenTo(CloudMAM,"dialog:add:audio",function(){
//                console.log("already add audio");
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面添加图片点击事件
//            self.listenTo(CloudMAM,"dialog:add:img",function(){
//                alert("already add img");
//                getUploadImg();
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面添加文档点击事件
//            self.listenTo(CloudMAM,"dialog:add:doc",function(){
//                console.log("already add doc");
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面添加其他点击事件
//            self.listenTo(CloudMAM,"dialog:add:other",function(){
//                console.log("already add other");
//                $("#add-click-dialog").modal('hide');
//            });

            //监听点击对话框里面添加所有内容点击事件
//            self.listenTo(CloudMAM,"dialog:add:all",function(){
//                console.log("already add all");
//                $("#add-click-dialog").modal('hide');
//            });
        }
    });
    return new DialogController();
});