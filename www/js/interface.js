

define(["jquery"],function($){

    var deviceReadyDeferred = $.Deferred();

    var appEventHandler = {
        initialize: function(){
            var self = this;
            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                document.addEventListener("deviceReady",self.onDeviceReady,false);
            } else {
                self.onDeviceReady(false);
            }
            return deviceReadyDeferred;
        },
        onDeviceReady:function(){
            var self = this;
            deviceReadyDeferred.resolve();
            if (navigator.userAgent.match(/Android/i)) {
                document.addEventListener("backbutton", onBackKeyDown, false);
            }
        },

        unInitialize: function(){
            var self =this;
            document.removeEventListener("deviceReady",self.onDeviceReady,false);
            if (navigator.userAgent.match(/Android/i)) {
                 document.removeEventListener("backbutton", this.onBackKeyDown, false);
            }
        }
    };
    function onBackKeyDown(){
        navigator.notification.confirm(
            '按确定退出程序!',  // message
            onConfirm,              // callback to invoke with index of button pressed
            '确定要退出程序吗?',            // title
            '确定,取消'          // buttonLabels
        );
    }
    function onConfirm(button){
        if(button==1){
            navigator.app.exitApp(); //选择了确定才执行退出
        }
    }
    return appEventHandler;

});









///*
// 对cordova与native提供的一些接口封装
// */
//var pictureSource;  //设定图片来源
//var destinationType; //选择返回数据的格式
//
//
//var app = {
//    // Application Constructor
//    device:{},
//    position:{},
//    initialize: function() {
//        this.bindEvents();
//    },
//    bindEvents: function() {
//        document.addEventListener('deviceready', this.onDeviceReady, false);
//
//    },
//    onDeviceReady: function() {
//        app.receivedEvent('deviceready');
//        pictureSource=navigator.camera.PictureSourceType;
//        destinationType=navigator.camera.DestinationType;
//        document.addEventListener("backbutton", onBackKeyDown, false);
//
//    },
//    // Update DOM on a Received Event
//    receivedEvent: function(id) {
//        this.device = device;
//
//        // act.alert(//'Device Name: '     + device.name     + '\n' +   2.3以前我们用做name   之后改为Model
//        //                         'Device Cordova: '  + app.device.cordova  + '\n' +
//        //                         'Device Platform: ' + device.platform + '\n' +
//        //                         'Device UUID: '     + device.uuid     + '\n' +
//        //                         'Device Model: '    + device.model    + '\n' +
//        //                         'Device Version: '  + device.version  + '\n');
//
//    },
//    alert:function(o){//alert  提示
//        typeof navigator.notification ==='undefined' ?alert(o) : navigator.notification.alert(o,null ,'提示', '确定');
//    },
//    vibrate:function(){//震动
//        navigator.notification.vibrate(1000);
//    },
//    beep:function(){//蜂鸣声音
//        navigator.notification.beep(1);
//    },
//    deviceM:function(){//手机设备信息
//        return this.device;
//    },
//    geolocation:function(){//地理位置
//
//        navigator.geolocation.getCurrentPosition(app.geolocationSuccess,app.geolocationError);
//    },
//    geolocationSuccess:function(position){
//        app.position =position;
//
//    },
//    geolocationError:function(){
//        this.alert('code: '    + error.code    + '\n' +
//            'message: ' + error.message + '\n');
//    },
//    network:function(){//查看网络
//        return navigator.network.connection.type;
//    },
//    getmyphoto:function(caa,cab){//拍照
//        navigator.camera.getPicture(caa||caa(),cab||cab(), { quality: 50, destinationType: destinationType.FILE_URI }); //FILE_URI DATA_URL
//    }
//
//
//};
//
//function onBackKeyDown(){
//    navigator.notification.confirm(
//        '按确定退出程序!',  // message
//        onConfirm,              // callback to invoke with index of button pressed
//        '确定要退出程序吗?',            // title
//        '确定,取消'          // buttonLabels
//    );
//}
//function onConfirm(button) {
////alert('You selected button ' + button);
//    if(button==1){
//        navigator.app.exitApp(); //选择了确定才执行退出
//    }
//}
//// interface   getmyPic
//function getmyPic(caa,cab){
//    navigator.camera.getPicture(caa||caa(), cab||cab(), { quality: 50, destinationType: destinationType.FILE_URI }); //FILE_URI DATA_URL
//}
////地理位置 geolocation
//function getmyLocal(caa,cab){
//    navigator.geolocation.getCurrentPosition(caa||caa(), cab||cab());
//
//}
////upload  server  image
//
//
//function getUploadImgF(error) {
//    app.alert('code: '    + error.code    + '\n' +
//        'message: ' + error.message + '\n');
//}
//function getUploadImgS(imageData) {  //上传图片到服务器
//    uploadFileImg(imageData);
//}
//function uploadFileImg(pickUrl) {
//    var imageURI = pickUrl;
//    if(!imageURI)
//        alert('请先选择本地图片');
//    var options = new FileUploadOptions();
//    options.fileKey = "file";
//    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
//    //options.mimeType = "image/jpeg";//"video/mp4";    image/jpeg
//    var ft = new FileTransfer();
//    ft.upload(
//        imageURI,
//        encodeURI('http://172.16.139.20/php/upload_file.php'),//encodeURI('http://172.16.135.124:9090/api/fileupload'),
//        function(){
//            app.alert('上传成功!');
//            if(!imageURI.indexOf('cache')){//cache里的缓存图片清除
//                window.resolveLocalFileSystemURI(imageURI, function( fileEntry ){
//                    fileEntry.remove();
//                }, null);
//
//            }
//
//        },
//        function(){ app.alert('上传失败!');},
//        options);
//}
////upload picture
//function getUploadImg(){
//    var source =  navigator.camera.PictureSourceType.PHOTOLIBRARY;
//    navigator.camera.getPicture(getUploadImgS, getUploadImgF, { quality: 50,destinationType: destinationType.FILE_URI,mediaType: navigator.camera.MediaType.ALLMEDIA,sourceType: source }); //FILE_URI DATA_URL
//}
//
////  视频上传
//function getUploadVideo(){
//    navigator.device.capture.captureVideo(getUploadVideoS, getUploadVideoE, {limit: 1});
//
//}
//function getUploadVideoS(mediaFiles){
//    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//        uploadVideo(mediaFiles[i]);
//    }
//
//}
//function getUploadVideoE(){
//    var msg = 'An error occurred during capture: ' + error.code;
//    app.alert(msg, null, 'Uh oh!');
//}
//
//function uploadVideo(mediaFile){
//    var ft = new FileTransfer(),
//        path = mediaFile.fullPath,
//        name = mediaFile.name;
//
//    ft.upload(path,
//        "http://172.16.135.124:9090/api/fileupload",
//        function(result) {
//            app.alert('上传成功！');
//        },
//        function(error) {
//            app.alert('上传失败！');
//        },
//        { fileName: name });
//}
////时间戳转时间
//function stampTotime(now)   {
//    var   year=now.getFullYear();
//    var   month=now.getMonth()+1;
//    var   date=now.getDate();
//    var   hour=now.getHours();
//    var   minute=now.getMinutes();
//    var   second=now.getSeconds();
//    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
//}
////对iscroll扩展
//
//var xscroll = function (id,options,opt){
//    options=options||{};
//    options=$.extend({
//        useNativeScroll:true,
//        hideScrollbar:true,
//        hScroll: false,
//        vScroll: true,
//
//        onBeforeScrollStart: function (e) {
//            var target = e.target;
//            while (target.nodeType != 1) target = target.parentNode;
//            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
//                e.preventDefault();
//        }
//    },options);
//    if(opt){//所传参数是否为空 ==             对scrollend的处理 目前只对上拉处理
//
//        var upEl=typeof opt.upEl === 'string' ? $(opt.upEl)[0] : opt.upEl,//上拉Dom元素
//            text=opt.text||'正在加载中...',//提示文字
//            cls=opt.cls||'flip',//拉动时添加的class
//            loadingCls=opt.loadingCls||'loading',
//
//            upOffset=upEl.offsetHeight,//下拉的文字占的高度，（加载提示）
//
//            callback=opt.callback;//回调函数处理 opt的回调  不要随便乱用
//        //this.topOffset = upOffset;//上下滚动提示文字高度设置等高
//        //options.topOffset =upOffset;//隐藏上拉
//        options.onRefresh=function () { //刷新的提示语
//            if(upEl.className.match('loading')){
//                upEl.className='';
//                $('.pullUpLabel')[0].innerHTML = '加载更多...';
//            }
//
//        };
//        options.onScrollMove=function(){//上拉移动处理
//
//            if (this.y < (this.maxScrollY - 5) && !upEl.className.match('flip')) { //上拉
//                upEl.className = 'flip';
//                //upLabel.innerHTML= text;
//                $('.pullUpLabel')[0].innerHTML = '努力加载中...3';
//                this.maxScrollY = this.maxScrollY;
//            } else if (this.y > (this.maxScrollY + 5) && upEl.className.match('flip')) {
//                upEl.className = '';//恢复原样   超过底部5px 又变成加载更多字样
//                $('.pullUpLabel')[0].innerHTML = '加载更多...2';
//                this.maxScrollY = upOffset*4;
//            }
//        };
//        options.onScrollEnd=function(){
//            if (upEl.className.match('flip')) {
//
//                upEl.className='loading';
//                this.maxScrollY = upOffset*4;
//                callback&&callback('1');
//
//            }
//        }
//    }
//    return new iScroll(id,options)
//}