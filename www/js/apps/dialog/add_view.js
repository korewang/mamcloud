/**
 * Created by wangyu on 2014/7/31.
 */
define(["app","apps/utils/templates"], function(CloudMAM,templates){

    CloudMAM.module("DialogApp.Add.View",function(AddView, CloudMAM, Backbone, Marionette, $, _){
        AddView.AddDialogView = Marionette.ItemView.extend({
            tagName: "div",
            template: templates.getTemplate("dialogs/dialog"),
            events: {
                "touchend div.js-add-video": "Add_Video",
                "touchend div.js-add-folder": "Add_Folder",
                "touchend div.js-add-img": "Add_Img",
                "touchend div.js-add-cvideo": "Add_Cvideo",
                "click div.js-add-pic": "Add_Pic"
//                "click div.js-add-doc": "Add_Doc",
//                "click div.js-add-other": "Add_Other",
//                "click div.js-add-all": "Add_All"
            },
            initialize: function () {

            },
            //拍视频上传
            Add_Cvideo:function(e){
                e.preventDefault();
                CloudMAM.trigger("dialog:add:cvideo");
            },
            //添加音视频
            Add_Video: function(e){
                e.preventDefault();
                CloudMAM.trigger("dialog:add:video");
            },

            //添加新文件
            Add_Folder: function(e){
                e.preventDefault();
                CloudMAM.trigger("dialog:add:folder");
            },
            //添加图片
            Add_Img: function(e){
                e.preventDefault();

                CloudMAM.trigger("dialog:add:img");
            },
            //添加拍照图片
            Add_Pic: function(e){
                e.preventDefault();
                CloudMAM.trigger("dialog:add:pic");
            },
            //添加文档
            Add_Doc: function(e){
                e.preventDefault();

                CloudMAM.trigger("dialog:add:doc");
            },

            //添加其他
            Add_Other: function(e){
                e.preventDefault();

                CloudMAM.trigger("dialog:add:other");
            },

            //添加所有内容
            Add_All: function(e){
                e.preventDefault();

                CloudMAM.trigger("dialog:add:all");
            }
        });
    });

    return CloudMAM.DialogApp.Add.View;
});