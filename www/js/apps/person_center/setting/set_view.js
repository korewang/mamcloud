/**
 * Created by wangxinyan on 2014/10/22.
 */
define(['app','apps/utils/templates','apps/utils/download_file','apps/loading/loading_controller'],function(CloudMAM,templates,download,loadingController){
    CloudMAM.module('PersonApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){


        Views.PersonSetItemView = Marionette.ItemView.extend({
            template:templates.getTemplate("person_center/setting/set"),
            tagName:'div',
            className:'installPage',
            events:{
                'click #narback':'backWorkspace',
                'click #downloadPath':'downloadLocation',
                'click #onOff':'wifiController'
            },
            downloadLocation: function () {
                download.alert('默认下载地址:/sd/McloudDownload');
            },
            backWorkspace: function () {
                loadingController.loadingData();
                CloudMAM.trigger("person:center");
            },
            onShow:function(){
                var isWifi = localStorage.getItem('wifiCtrlUp')||'on';
                if(isWifi=='on'){
                    $('#onOff')[0].src="images/base/wifi_onoff.png";
                    $('#onOff').removeClass('wifioff');
                }else{
                    $('#onOff')[0].src="images/base/wifi_off.png";
                    $('#onOff').addClass('wifioff');
                }
            },
            wifiController: function () {
                if($('#onOff').hasClass('wifioff')){
                    $('#onOff')[0].src="images/base/wifi_onoff.png";
                    $('#onOff').removeClass('wifioff');
                    localStorage.setItem('wifiCtrlUp','on');
                    //打开wifi传输，传输将不耗费流量
                    /* wifi 下使用上传下载，不浪费流量*/
                    Mytoast.showToast("打开wifi传输，传输将不耗费流量",1);
                }else{
                    $('#onOff')[0].src="images/base/wifi_off.png";
                    $('#onOff').addClass('wifioff');
                    /* 2g 3g 4g 下使用，不使用wifi
                    若关闭wifi传输，就会消耗2G/3G/4G流量，确定关闭？
                    确定   取消
                    关闭wifi传输，将耗费流量
                     */
                    /*请在设置里打开wifi传输*/
                    localStorage.setItem('wifiCtrlUp','off');
                    Mytoast.showToast("关闭wifi传输，将耗费2G/3G/4G流量",1);
                }

            },
            clientHeight:function(){
                var he = $('body').height();
                $('.installPage').height(he);
            }

        });
    });
    return CloudMAM.PersonApp.Views;
});