define([],function(){

	var xscroll = function (id,options,opt){
	    options=options||{};
	    options=$.extend({
	        useNativeScroll:true,
	        hideScrollbar:true,
	        hScroll: false,
	        vScroll: true,

	        onBeforeScrollStart: function (e) {
	            var target = e.target;
	            while (target.nodeType != 1) target = target.parentNode;
	            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
	                e.preventDefault();
	        }
	    },options);
	    if(opt){//所传参数是否为空 ==             对scrollend的处理 目前只对上拉处理

	        var upEl=typeof opt.upEl === 'string' ? $(opt.upEl)[0] : opt.upEl,//上拉Dom元素
                downEl = typeof opt.downEl === 'string' ? $(opt.downEl)[0] : opt.downEl, // 下拉刷新
	            text=opt.text||'正在加载中...',//提示文字
	            cls=opt.cls||'flip',//拉动时添加的class
	            loadingCls=opt.loadingCls||'loading',

	            upOffset=downEl.offsetHeight,//下拉的文字占的高度，（加载提示）
                downOffset = downEl.offsetHeight,//  上拉文字展的高度    提示
	            callback=opt.callback;//回调函数处理 opt的回调  不要随便乱用
	        //this.topOffset = upOffset;//上下滚动提示文字高度设置等高
	        options.topOffset =upOffset;//隐藏上拉
	        options.onRefresh=function () { //刷新的提示语
	            if(upEl.className.match('loading')){
	                upEl.className='';
	                $('.pullUpLabel')[0].innerHTML = '加载更多...';
	            }else  if(downEl.className.match('loading')){
                    downEl.className = '';
                    $('.pullDownLabel')[0].innerHTML='刷新加载更多...';
                }

	        };
	        options.onScrollMove=function(){//上拉移动处理

	          /*  if (this.y < (this.maxScrollY - 5) && !upEl.className.match('flip')) { //上拉
	                upEl.className = 'flip';
	                //upLabel.innerHTML= text;
	                $('.pullUpLabel')[0].innerHTML = '努力加载中...3';
	                this.maxScrollY = this.maxScrollY;
	            } else if (this.y > (this.maxScrollY + 5) && upEl.className.match('flip')) {
	                upEl.className = '';//恢复原样   超过底部5px 又变成加载更多字样
	                $('.pullUpLabel')[0].innerHTML = '加载更多...2';
	                this.maxScrollY = upOffset*4;
	            }
                   */

                if (this.y > 5 && !downEl.className.match('flip')) {
                    downEl.className = 'flip';
                    downEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                    this.minScrollY = 0;
                } else if (this.y < 5 && downEl.className.match('flip')) {
                    downEl.className = '';
                    downEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    this.minScrollY = -downOffset;
                } else if (this.y < (this.maxScrollY - 5) && !upEl.className.match('flip')) {
                    upEl.className = 'flip';
					
                    upEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                    this.maxScrollY = this.maxScrollY;
                } else if (this.y > (this.maxScrollY + 5) && upEl.className.match('flip')) {
                    upEl.className = '';
                    upEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                    this.maxScrollY = upOffset;
                }
	        };
	        options.onScrollEnd=function(){
	          /*  if (upEl.className.match('flip')) {

	                upEl.className='loading';
	                this.maxScrollY = upOffset*4;
	                callback&&callback('1');

	            }*/


                if (downEl.className.match('flip')) {
                    downEl.className = 'loading';
                    downEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                    //pullDownAction(); // Execute custom function (ajax call?)
                    callback&&callback('0');
                } else if (upEl.className.match('flip')) {
                    upEl.className = 'loading';
                    upEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                   // pullUpAction(); // Execute custom function (ajax call?)
                    callback&&callback('1');
                }
	        }
	    }
	    return new iScroll(id,options)
	}

	return xscroll;

});