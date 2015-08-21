/**
 * Created by wangyu on 2014/7/31.
 */
define(["app","apps/utils/templates"], function(CloudMAM,templates){

    CloudMAM.module("DialogApp.Classify.View",function(ClassifyView, CloudMAM, Backbone, Marionette, $, _){
        ClassifyView.ClassifyDialogView = Marionette.ItemView.extend({
            tagName: "div",
            template: templates.getTemplate("dialogs/classify-dialog"),
            events:{
                'click .js-classify':'fileTypeClassify'
            },
            fileTypeClassify:function(e){
                e.preventDefault();//filetypeclassify
                var fileClass =e.target.className.split(' '),
                    titlepanel = $(e.target).parent().text(),
                    fileType = fileClass[fileClass.length-1];
                this.trigger("classify:type",{type :fileType,title_name:titlepanel});
                $("#classify-click-dialog").modal('hide');


            }
        });
    });

    return CloudMAM.DialogApp.Classify.View;
});