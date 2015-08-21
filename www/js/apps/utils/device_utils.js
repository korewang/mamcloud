define([],function(){

	var deviceUtils ={
        position:{},
        mobile:'ontouchend' in window,
		alert:function(o){//alert  提示
            typeof navigator.notification ==='undefined' ?alert(o) : navigator.notification.alert(o,null ,'提示', '确定');
        },
        prompt:function(title,message,resultCallback,buttonlabel,defaultText){
            if(mobile){
                navigator.notification.prompt(
                        message||"请在输入框内输入",  // title下的显示信息
                    resultCallback,              // 按下按钮后触发的回调函数，返回按下按钮的索引
                        title||"提示",            // 标题
                        buttonlabel||["确定","取消"],          // 按钮标签
                        defaultText||''// default  text
                )
            }else{
                var rename=prompt(message,defaultText||'');
                if (rename!=null && rename!=""){
                    //调用update
                    resultCallback||resultCallback();
                }
            }
        },
        vibrate:function(){//震动
            navigator.notification.vibrate(1000);
        },
        beep:function(){//蜂鸣声音
            navigator.notification.beep(1);
        },
        deviceM:function(){//手机设备信息
            return this.device;
        },
        geolocation:function(){//地理位置

            navigator.geolocation.getCurrentPosition(this.geolocationSuccess,this.geolocationError);
        },
        geolocationSuccess:function(position){
            this.position =position;

        },
        geolocationError:function(){
            this.alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        },
        network:function(){//查看网络
            return navigator.network.connection.type;
        },
        getmyphoto:function(caa,cab){//拍照
            navigator.camera.getPicture(caa||caa(),cab||cab(), { quality: 50, destinationType: destinationType.FILE_URI }); //FILE_URI DATA_URL
        }
    }

    return deviceUtils;

 });