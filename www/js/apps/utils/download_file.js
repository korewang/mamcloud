/**
 * Created by wangxinyan on 2014/8/18.
 */
define(['jquery','config/base'],function ($,urlRoot) {


    var fileDown={
        tipsPath:true,
        downloadfiles:function(options){
            options=options||{};
            var self = this,
                filename = options.fn,
                fileid = options.conID,
                path = options.urlPath ? options.urlPath: 'images/base/default_other.png';
            /*check  net*/

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                //创建目录
                fileSystem.root.getDirectory("MCloudDownload", {create:true},
                    function(fileEntry){

                        var _localFile = "MCloudDownload/"+filename,
                            _url = urlRoot.uploadData+"/api/getfile/"+fileid;
                        fileSystem.root.getFile(_localFile, {create:true,exclusive:false}, function(fileEntry){
                            var targetURL = fileEntry.toURL();
                            self.downloadPic(_url,targetURL,filename,path);
                           /* var targetURL = fileEntry.toURL(),
                                fileTransfer = new FileTransfer(),
                                uri = encodeURI(_url);
                            //本地存储
                            var downlist = localStorage.getItem('downloadlist');
                            if(!downlist){
                                var downListArray = [],
                                    unionObj = {'name':filename,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':path,'titleType':'正在下载','emctype':'d'};
                                upListArray.push(unionObj);
                                localStorage.setItem('downloadlist',JSON.stringify(downListArray));//第一笔数据存储
                            }else{
                                //多比数据存   已经存过的本地
                                var hasMoreData = JSON.parse('downloadlist'),
                                    unionObjs = {'name':filename,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':path,'titleType':'正在下载','emctype':'d'};
                                hasMoreData.push(unionObjs);
                                localStorage.setItem('downloadlist',JSON.stringify(hasMoreData));
                            }
                            fileTransfer.onprogress = self.showUploadingProgress;
                            navigator.notification.progressStart("", "当前下载进度");
                            fileTransfer.download(uri,targetURL,function(entry){
                                //success
                                var getLocList = JSON.parse(localStorage.getItem('downloadlist'));
                                _.each(getLocList,function(e){
                                    if(e.name == filename){
                                        e.transportType = '1';
                                        e.titleType = '下载成功';
                                    }
                                });
                                navigator.notification.progressStop();
                            },function(error){
                                self.alert("下载文件错误");
                                //error
                                var getLocList = JSON.parse(localStorage.getItem('downloadlist'));
                                _.each(getLocList,function(e){
                                    if(e.name == filename){
                                        e.transportType = '2';
                                        e.titleType = '下载失败';
                                    }
                                });
                                navigator.notification.progressStop();
                            });*/
                        },function(error){

                            self.alert('下载出错');
                        });
                    },
                    function(){  self.alert("创建目录失败");});
//                fileSystem.root.getFile(_localFile, null, function(fileEntry){ //cache has source file
//                }, function(){
                    //download net source!

                //});

            }, function(evt){
                self.alert("加载文件系统出现错误");
            });
        },
        downloadPic:function (url,targets,filename,path){
            var self = this,
                fileTransfer = new FileTransfer(),
                uri = encodeURI(url),
                userINFO = JSON.parse(localStorage.userInfo);
                USERCODE = userINFO.userCode;
          // fileTransfer.onprogress = self.showUploadingProgress;
           // navigator.notification.progressStart("", "当前下载进度");
            var downlist = localStorage.getItem('downloadlist'),
                userinfo = JSON.parse(localStorage.getItem('userInfo')),
                louser=userinfo.id;
            if(!downlist || downlist==null ||downlist=='null'){
                var downListArray = [],
                    unionObj = {'name':filename,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':path,'titleType':'正在下载','emctype':'d','mid':louser};
                downListArray.unshift(unionObj);
                localStorage.setItem('downloadlist',JSON.stringify(downListArray));//第一笔数据存储
            }else{
                //多比数据存   已经存过的本地
                var hasMoreData = JSON.parse(downlist),
                    unionObjs = {'name':filename,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':path,'titleType':'正在下载','emctype':'d','mid':louser};
                hasMoreData.unshift(unionObjs);
                localStorage.setItem('downloadlist',JSON.stringify(hasMoreData));
            }

            fileTransfer.download(uri,targets,function(entry){
               // navigator.notification.progressStop();
                var getLocList = JSON.parse(localStorage.getItem('downloadlist'));
                _.each(getLocList,function(e){
                    if(e.name == filename){
                        e.transportType = '1';
                        e.titleType = '下载成功';
                    }
                });
                if(self.tipsPath){
                    self.alert('文件已经下载到/sd/McloudDownload中');
                    self.tipsPath=false;
                }
                localStorage.setItem('downloadlist',JSON.stringify(getLocList));
            },function(error){
                self.alert("下载文件错误");
               // navigator.notification.progressStop();
                var getLocList = JSON.parse(localStorage.getItem('downloadlist'));
                _.each(getLocList,function(e){
                    if(e.name == filename){
                        e.transportType = '2';
                        e.titleType = '下载失败';
                    }
                });
                localStorage.setItem('downloadlist',JSON.stringify(getLocList));

            },true,{'userCode':USERCODE});
        },
        showUploadingProgress:function(progressEvt) {
            if( progressEvt.lengthComputable ){
                navigator.notification.progressValue( Math.round( ( progressEvt.loaded / progressEvt.total ) * 100) );
            }
        },
        //upload files
        transferFile:function (myparam) {
            var sid = myparam.sid,
                imageURI = myparam.path,
                sizelength = myparam.size,
                localPath = '',
                userInformation = JSON.parse(localStorage.getItem('userInfo')),
                musicF = /\.(mid|mp3|wav|wma|ra|ogg|flac|aac|ape|mpc|ac3|cda|m4a|mka|mp2|mpa|ofr|dts)$/,
                vedioF = /\.(mkv|mov|avi|wmv|mp4|rmvb|asf|swf|ts|mts|mpeg1|mpeg2|m4v|f4v|flv|3gp)$/,
                picF = /\.(bmp|jpg|tiff|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw)$/,
                self = this;
            if(musicF.test(imageURI)){
                localPath = 'images/base/default_music.png';
            }else if(vedioF.test(imageURI)){
                localPath = 'images/base/default_vedio.png';
            }else if(picF.test(imageURI)){
                localPath = 'images/base/default_pic.png';
            }else{
                localPath = 'images/base/default_other.png';
            }
            if(!imageURI){
                self.alert("请先选择本地文件");
            }
            var options = new FileUploadOptions(),
                params = new Object();
            options.fileKey = "file";
            params.folderCode = localStorage.getItem('contentID')||'';
            params.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.folderCode=localStorage.getItem('contentID')||'';
            params.importToken = sid+'_'+sizelength;
            params.userCode = userInformation.userCode;
            options.params=params;

            var uplist = localStorage.getItem('uplist'),
                userinfo = JSON.parse(localStorage.getItem('userInfo')),
                louser=userinfo.id;

            if(!uplist || uplist==null){
                var upListArray = [],
                    unionObj = {'name':options.fileName,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':localPath,'titleType':'正在上传','emctype':'u','mid':louser};
                upListArray.unshift(unionObj);
                localStorage.setItem('uplist',JSON.stringify(upListArray));//第一笔数据存储
            }else{
                //多比数据存   已经存过的本地
                var hasMoreData = JSON.parse(uplist),
                    unionObjs = {'name':options.fileName,'createTime':(new Date()).getTime(),'transportType':'','keyFramePath':localPath,'titleType':'正在上传','emctype':'u','mid':louser};
                hasMoreData.unshift(unionObjs);
                localStorage.setItem('uplist',JSON.stringify(hasMoreData));
            }
            var ft = new FileTransfer();
            ft.onprogress = self.showUploadingProgress;
            navigator.notification.progressStart("", "当前上传进度");
            ft.upload(
                imageURI,
                encodeURI(urlRoot.uploadData+"/api/fileupload"),//encodeURI('http://172.16.135.124:9090/api/fileupload'),//encodeURI('http://172.16.139.20/php/upload_file.php'),//
                function(){
                    if(imageURI.indexOf('cache')){//cache里的缓存图片清除
                        window.resolveLocalFileSystemURI(imageURI, function( fileEntry ){
                            fileEntry.remove();
                        }, null);
                    }
                    var getLocList = JSON.parse(localStorage.getItem('uplist'));
                    _.each(getLocList,function(e){
                        if(e.name == options.fileName){
                            e.transportType = '1';
                            e.titleType = '上传成功';
                        }
                    });
                    localStorage.setItem('uplist',JSON.stringify(getLocList));
                    self.alert("上传成功");
                    navigator.notification.progressStop();
                },
                function(){
                    var getLocList = JSON.parse(localStorage.getItem('uplist'));
                    _.each(getLocList,function(e){
                        if(e.name == options.fileName){
                            e.transportType = '2';
                            e.titleType = '上传失败';
                        }
                    });
                    localStorage.setItem('uplist',JSON.stringify(getLocList));
                    self.alert("上传失败");
                    navigator.notification.progressStop();
                },
                options);
        },
        isAllowUpload:function(params){
            var options = params||{},
                self = this;
            $.ajax({
                url:urlRoot.serverEndport+'/ec/importCheck', //后台处理程序
                type:'post',         //数据发送方式
                dataType:'json',     //接受数据格式
                data:{"fileSize":params.size},         //要传递的数据
                success:function(response){
                    params.sid = response;
                     self.transferFile(options);
                },
                error:function(re){
                    self.alert(re.responseJSON.message)
                }
            });
        },
        uploadFiles:function(mediatype){
            var self = this,
                medType = mediatype,
                orderType = (medType=='image')? navigator.camera.MediaType.PICTURE : navigator.camera.MediaType.VIDEO,
                netStyle = navigator.network.connection.type,// wifi  2g  3g 4g  none
                setNet = localStorage.getItem('wifiCtrlUp')||'on';// on  off;

            if(netStyle != 'wifi' && setNet=='on'){
                /*wifi 下使用上传下载*/
                Mytoast.showToast("请在设置里关闭wifi传输",1);
                return ;
            }
            if(netStyle == 'wifi' && setNet=='off'){
                /*数据流量下使用上传下载*/

                Mytoast.showToast("请在设置里打开wifi传输",1);
                return ;
            }
            navigator.camera.getPicture(function(imgpath){
                    //success   先调取server的对比剩余空间   bitmap.getByteCount();
                    Mytoast.fileLength(function(sizeLen){
                        self.isAllowUpload({'path':imgpath,'size':sizeLen});
                    },imgpath);

                }, function (error) {
                    //error
                   // self.alert('code: '+ error.code+ '\n' +'message: ' + error.message + '\n');
                },
                { quality: 50,
                    destinationType: navigator.camera.DestinationType.FILE_URI,
                    mediaType: orderType,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );
        },
        captureSuccess:function(ob){
            /*
            * array   size  is byte
            * in here this is not fileDown
            * is  windows dom
            * */
            var content = ob[0];
            fileDown.isAllowUpload({'path':content.fullPath,'size':content.size});
        },
        captureError: function () {

        },
        upCameraAction: function (Obj) {
            var self = this,
                type = Obj.types,
                netStyle = navigator.network.connection.type,// wifi  2g  3g 4g  none
                setNet = localStorage.getItem('wifiCtrlUp')||'on';// on  off;
            if(netStyle != 'wifi' && setNet=='on'){
                /*wifi 下使用上传下载*/
                Mytoast.showToast("请在设置里关闭wifi传输",1);
                return ;
            }
            if(netStyle == 'wifi' && setNet=='off'){
                /*数据流量下使用上传下载*/

                Mytoast.showToast("请在设置里打开wifi传输",1);
                return ;
            }
            if(type=="video"){
                navigator.device.capture.captureVideo(self.captureSuccess, self.captureError, {limit: 1});
            }else{
                navigator.camera.getPicture(function(imagePath){
                    var fullPath = imagePath.replace('file:///','');
                    Mytoast.fileLength(function(sizeLen){
                        self.isAllowUpload({'path':imagePath,'size':sizeLen});
                    },fullPath);
                },null,{
                    quality : 100,
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType : Camera.PictureSourceType.CAMERA,
                   // allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                   // targetWidth: 360,
                   // targetHeight: 360,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: true
                });
            }

        },
        //user  header  photo
        transferHeadImg:function(pickUrl){
            var imageURI = pickUrl,
                self = this;
            if(!imageURI){
                self.alert("请先选择本地文件");
            }
            var options = new FileUploadOptions(),
                params = new Object();
            options.fileKey = "file";
          //  params.folderCode = localStorage.getItem('contentID')||'';
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            params.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
           // options.folderCode=localStorage.getItem('contentID')||'';
            options.params=params;
            //options.mimeType = "image/jpeg";//"video/mp4";    image/jpeg
            /*nation record
             *if('images/base/other_file.png'){}  now use modify path
             **/

            var ft = new FileTransfer();
            ft.onprogress = self.showUploadingProgress;
            navigator.notification.progressStart("", "当前上传进度");
            ft.upload(
                imageURI,
                encodeURI(urlRoot.serverEndport+"/uic/headImg"),//encodeURI('http://172.16.139.2/php/upload_file.php'),//
                function(response){
                    navigator.notification.progressStop();
                    self.alert("上传成功");
                    var headerPath = JSON.parse(response.response).avatarUrls;
                    if(headerPath != 'aa'){//审核失败的
                        $('#resetPhoto').attr('src',headerPath);
                    }
                    //cache里的缓存图片清除
                    /*
                    if(imageURI.indexOf('cache')){
                        window.resolveLocalFileSystemURI(imageURI, function( fileEntry ){
                            fileEntry.remove();
                        }, null);
                    }*/
                },
                function(err){
                    self.alert(err.code);
                    navigator.notification.progressStop();
                },
                options);
        },
        uploadHeadImg:function(option) {
            var self = this,
                upType = option.utype||'Gallery';

            if(upType == 'Gallery'){
                navigator.camera.getPicture(function(imgpath){
                        //success
                        self.transferHeadImg(imgpath);
                    }, function (error) {
                        // self.alert('code: '+ error.code+ '\n' +'message: ' + error.message + '\n');
                    },
                    { quality: 50,
                        destinationType: navigator.camera.DestinationType.FILE_URI,
                        mediaType: navigator.camera.MediaType.PICTURE,
                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                    }
                );
            }else{
                //used photo
                navigator.camera.getPicture(function(imagePath){
                    self.transferHeadImg(imagePath);
                },null,{
                    quality : 100,
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType : Camera.PictureSourceType.CAMERA,
                    allowEdit : true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 360,
                    targetHeight: 360,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                });
            }
        },
        alert:function(o){//alert  提示
            typeof navigator.notification ==='undefined' ?alert(o) : navigator.notification.alert(o,null ,'提示', '确定');
        }
    }

    return fileDown;
});