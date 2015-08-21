/**
 * Created by wangyu on 2014/7/31.
 */

define(["app","apps/utils/templates","bootstrap","bootstrap-dialog.min"],function(CloudMAM, templates){

    CloudMAM.module("Dialog.App.Views",function(Views,ContactManager,Backbone,Marionette,$,_){

        Views.DialogView = Marionette.ItemView.extend({
            tagName: "div",
            template: templates.getTemplate("dialogs/dialog"),
            events: {
                "click .js-classify":  "classifyClicked"
            }
        });

        //内存管理需求： 添加和分类的对话框内容一致, 可以使用一个公共的方法
        //可以将公共的方法作为原型方法，节约内存空间

        _.extend(Views.DialogView.prototype,{
            classifyClicked: function(e){
                e.preventDefault();
                this.trigger("dialog:click");
                console.log("coming dialogApp event");
            }
        })
    });

    return  CloudMAM.Dialog.App.Views;
});