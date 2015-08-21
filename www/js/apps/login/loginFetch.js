/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['config/base'],function (baseConfig) {
    var Datas = Backbone.Model.extend({
        initialize :function(){
            //alert("you create me");
            //监听属性更改事件
            this.bind('change',function(){
                   // alert(this.get('userName'));
            });
            this.bind("invalid",function(model,error){
                alert('error'+error);
            });
        },
        idAttribute:'_id',
        url:baseConfig.serverEndport+'/emc/folder/count/5',
        defaults:{
            _id:'2',
            url:baseConfig.serverEndport,
            userName:'',
            userPwd:''
        },
        validate:function(attributes){
            if(attributes.userName == ""||attributes.userPwd == ""){
                return "userName is error!";
            }
        }
    });
    return Datas;
});