define(['app','config/base','apps/utils/time_utils','backbone.validation'],function(CloudMAM,baseConfig,time_utils){

    var Item = Backbone.Model.extend({
        urlRoot: function(){
            var base = baseConfig.serverEndport + "/emc/";
            var type = this.get("entityTypeName");
            if( type === "Folder"){
                base += "folder";
            }else{
                base += "entity";
            }
            base += "/" + this.get("contentID");

            return base;
        },
        url: function(){
            var base = this.urlRoot();

            var op = this.get("type");
            if(op == "rename") { //修改
               // base += "/?entity=" + this.get("entity") + "&type=" + op;
            } else{//删除

            }
            return base;
        },
        defaults:{
            createTime:'',
            name:'',
            entityTypeName:'',
            id:''
        },
        initialize:function(){
            var CreateTime = this.get('createTime');//.indexOf('-') ? this.get('createTime') : time_utils.stampTotime(new Date(this.get('createTime'))),
                fileExt = this.get('fileTypeExt')||'未知',
                fileType = fileExt.split('.')[1] ? fileExt.split('.')[1] : fileExt.split('.')[0];

            this.set({createTime:CreateTime});
            this.set('fileTypeExt',fileType);
            if(this.get('entityTypeName')=='Folder'){//tfile  texe   tmp3  twav  tdoc
                this.set({iconType:'tfile'});
                this.set({iconS:'none'});
            }
            /*if(this.get('entityTypeName')=='Document' || this.get('entityTypeName')=='Other' || this.get('entityTypeName')=='Audio'){
                this.set({iconType:this.get('entityTypeName')});
                this.set({iconS:'none'});
                this.set({fileName:fileType});
            }*/
            if(this.get('entityTypeName')=='Document' || this.get('entityTypeName')=='Other'){//默认？
                this.set({iconType:'default'});
                this.set({iconS:'none'});
                this.set({fileName:fileType});
            }
            if(this.get('entityTypeName')=='Audio'){
                this.set({iconType:'default_music'});
                this.set({iconS:'none'});
                this.set({fileName:fileType});
            }
            if(this.get('entityTypeName')=='Clip' && this.get('status') != 1){
                this.set({iconType:'default_vedio'});//Clip
                this.set({iconS:'none'});
                this.set({fileName:fileType});//类型填写
            }
            if(this.get('entityTypeName')=='Picture' && this.get('status') != 1){//抽帧错误
                this.set({iconType:'default_pic'});//Picture
                this.set({iconS:'none'});
                this.set({fileName:fileType});//类型填写
            }
            if(this.get('keyFramePath')==null){
                this.set({iconS:'none'});
            }

        }

    });

    CloudMAM.reqres.setHandler('workspace:item:new',function(){
        return new Item();
    });

    return Item;
});