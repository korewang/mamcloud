define([],function(){
//时间戳转时间

	function stampTotime(now)   {
	    var   year=now.getFullYear();
	    var   month=now.getMonth()+1;
	    var   date=now.getDate();
	    var   hour=now.getHours();
	    var   minute=now.getMinutes();
	    var   second=now.getSeconds();
	    return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;


	}

	return {stampTotime:stampTotime};

});