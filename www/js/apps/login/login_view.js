define(['app','apps/utils/templates'],function(CloudMAM,templates){
   CloudMAM.module('LoginApp.Views',function(Views,CloudMAM,Backbone,Marionette,$,_){
       Views.LoginViewHead = Marionette.ItemView.extend({
           template:templates.getTemplate('login/login_header'),
           className:'container'
       });

       Views.LoginViewMain = Marionette.ItemView.extend({
           template:templates.getTemplate("login/login_main"),
           tagName:'div',
           className:'container',
           events:{
              /*'focusin #inputEmail3':'userFocus',
              'focusout #inputEmail3':'userFocusOut',
              'focus #inputPassword3':'userPFocus',*/
              'click button#loginCloud':'SingleIn'
           },
           initialize:function(){
                this.contentHeight = '';
           },
           userFocus: function (e) {
               // alert($('body').height());
               console.log('in', $(e.currentTarget));

               /*
               * desgin
               * form  body  height is max element , if max body elemnt offset.top add element.height - body offset.top
               * is loing-content offset.top - xx px is  move position. if min body is nothing to do
               * */
               var bodyHeight = $('body').height(),//
                   eleItem = $(e.currentTarget),
                   elementHeight = eleItem.height(),
                   eleOffTop = eleItem.offset().top,
                   contentOffTop = $('.login-content').offset().top,
                   contentFrame = $('.login-content'),
                   marTop='';
               this.contentHeight = contentOffTop;
               if(bodyHeight < eleOffTop){
                   marTop = contentOffTop-(eleOffTop + elementHeight - bodyHeight);
                   contentFrame.offset({top:marTop});
               }
           },
           userFocusOut: function () {
                console.log('out');
               $('.login-content').offset({top:this.contentHeight});
           },
           SingleIn:function(e) {
               e.preventDefault();

               var userName = $('#inputEmail3').val(),
                   userPwd = $('#inputPassword3').val();

               CloudMAM.trigger("login:userlogin",{username: userName,password: userPwd});
           }

       });
       Views.LoginViewFooter = Marionette.ItemView.extend({
           template:templates.getTemplate('login/login_footer'),
           className:'bottom-bar row'
       });
        Views.LoginLayout = Marionette.LayoutView.extend({
            template:templates.getTemplate('login/login_layout'),
            regions: {
                loginHeaderRegion: "#login_header",
                loginMainRegion: "#login_main",
                loginFooterRegion: "#login_footer"
            }
        });
   });
    return CloudMAM.LoginApp.Views;
});