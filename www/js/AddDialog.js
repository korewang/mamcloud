
/*
author  wangyu
date    20140724
page    main.html  js

*/
// var  $clickpic  = $('<div class="C_dialog"></div>');
// var  $clickpic.append('<div class="fix_dialog row"><div class="col-xs-6 col-md-6"><a class="video"></a></div><div class="col-xs-6 col-md-6"><a class="audio"></a></div></div><div class="fix_dialog row"><div class="col-xs-6 col-md-6"><a class="img"></a></div><div class="col-xs-6 col-md-6"><a class="doc"></a></div></div><div class="fix_dialog row"><div class="col-xs-6 col-md-6"><a class="other"></a></div><div class="col-xs-6 col-md-6"><a class="all"></a></div></div>');

$(document).ready(function(){
  $(".js-add").click(function(){

  	 /*var $textAndPic = $('<div></div>');
        $textAndPic.append('Who\'s this? <br />');
        $textAndPic.append('<img src="./images/pig.ico" />');*/
    BootstrapDialog.show({
    	title: '选择分类',
    	message: '<div class="C_dialog "><div class="fix_dialog  row"><div class="col-xs-6 col-md-6 "><a class="video"></a></div><div class="col-xs-6 col-md-6"><a class="audio"></a></div></div><div class="fix_dialog row"><div class="col-xs-6 col-md-6"><a class="img"></a></div><div class="col-xs-6 col-md-6"><a class="doc"></a></div></div><div class="fix_dialog  row"><div class="col-xs-6 col-md-6"><a class="other"></a></div><div class="col-xs-6 col-md-6"><a class="all"></a></div></div></div>'
    });
  });

});
