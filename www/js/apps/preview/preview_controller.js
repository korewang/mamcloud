/**
 * Created by wangyu on 2014/8/18.
 */
define(["app","apps/preview/preview_view"],function(CloudMAM, Views){
    var PreviewController = Marionette.Controller.extend({
        previewDialog:function(options){
            options=options||{};
            var self = this,
                preView = new Views.View();
            CloudMAM.dialogRegion.show(preView);
            //there options is an Object has two attribute url and idModel
            options.idModel.sync('read',options.idModel,{
                url:options.url+options.idModel.get('contentID'),
                success: function (response) {
                    var framePath = response.mediaPlayAddress,
                        frameposter = response.keyFramePath;
                    $('#titleEntityName').text(response.name);
                    if(options.idModel.get('status')==1){
                         if(options.idModel.get('entityTypeName') === 'Picture'){
                            var img = new Image(),
                                screenW = $('#playMedia').width(),
                                screenH = $('#playMedia').height(),
                                marginT = '',
                                marginL = '';
                            img.src = framePath;
                            img.onload=function(){
                                if(screenW >= this.width && screenH >= this.height){
                                    marginT = (screenH - this.height)/2;
                                    marginL = (screenW - this.width)/2;
                                    img.style.marginLeft = marginL+'px';
                                    img.style.marginTop = marginT+'px';
                                }else if(screenW >= this.width && screenH < this.height){//图片高度大于屏高
                                    img.style.height = screenH+'px';
                                    this.width = (this.width/this.height)*screenH;//避免出错精确居中
                                    marginL = (screenW - this.width)/2;
                                    img.style.marginLeft = marginL+'px';
                                }else{//height  width beyound natural  and  image width outer frame
                                    console.log('outping');
                                    img.style.width = screenW+'px';
                                    this.height = (this.height/this.width)*screenW;
                                    marginT = (screenH - this.height)/2;
                                    img.style.marginTop = marginT+'px';
                                }/*else if(screenW < this.width && screenH >= this.height){ //图片宽度大于屏宽
                                    img.style.width = screenW+'px';
                                    this.height = (this.height/this.width)*screenW;
                                    marginT = (screenH - this.height)/2;
                                    img.style.marginTop = marginT+'px';
                                }*/
                                $(".P_dialog_col").append(img);
                                //$(".P_dialog_col").html('<img class="preview-img" src="'+framePath+'">');
                            };
                        }else if(options.idModel.get('entityTypeName') === 'Audio'){
                            $(".P_dialog_col").html('<a class="preview-audio-img" ></a><audio class="preview-audio" controls="controls" autoplay src="'+framePath+'"></audio>');
                        }
                    }else{
                        $(".P_dialog_col").addClass('failFileBg');
                       // $(".P_dialog_col").html('<div class="failFileBg"></div>');
                    }
                },
                error: function (re) {
                    navigator.notification.alert("获取数据异常！",null ,'提示', '确定');
                }
            });
            self.listenTo(preView,'close:dialogs', function () {//g关闭dialog
                CloudMAM.dialogRegion.empty();
            });
           // preView.requestFullScreen();
            //手动js模态触发模态框的显示与隐藏
            $("#preview-dialog").modal('toggle');
        }
    });
    return new PreviewController();
});