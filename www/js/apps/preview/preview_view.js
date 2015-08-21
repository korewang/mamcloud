/**
 * Created by wangyu on 2014/8/18.
 */
define(["app","apps/utils/templates"], function(CloudMAM,templates){

    CloudMAM.module("PreviewApp.View",function(PreviewView, CloudMAM, Backbone, Marionette, $, _){
        PreviewView.View = Marionette.ItemView.extend({
            tagName: "div",
            className:"fullScreen",
            template: templates.getTemplate("preview/preview"),
            onShow:function(){

            },
            events:{
              'webkitfullscreenchange':function(){
                  if (document.webkitIsFullScreen == false) {
                      $('#playMedia').empty()
                          .removeClass('failFileBg');
                  }
              },
              'click #narbar':'backToListView'
            },
            backToListView: function (e) {
                e.preventDefault();
                e.stopPropagation();
               StatusBar.show();//title phone show
               this.trigger('close:dialogs');
            },
            requestFullScreen:function () {

                var de = document.getElementById('playMedia');
                if(!de){
                    return;
                }
                if (de.requestFullscreen) {
                    de.requestFullscreen();
                } else if (de.mozRequestFullScreen) {
                    de.mozRequestFullScreen();
                } else if (de.webkitRequestFullScreen) {
                    de.webkitRequestFullScreen();
                }

               // document.removeEventListener("webkitfullscreenchange",FShandler,false);
               // document.addEventListener("webkitfullscreenchange",FShandler,false);

            }
        });
    });

    return CloudMAM.PreviewApp.View;
});