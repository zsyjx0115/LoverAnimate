function BoyWalk(){
	var $boy = $("#boy");
	var boyWalk = {};
	var boyHeight = $boy.height();
	var boyWidth = $boy.width();

	boyWalk.startWalk = function(distanceP,speed){
		var defer = $.Deferred();
		$boy.removeClass("pausewalk");
		$boy.addClass("walk");
		$boy.animate({
			'left': $(".main-content").width() * distanceP / 100  + 'px',
		},speed,function(){
			defer.resolve();
		});
		return defer;
	};

	boyWalk.pauseWalk = function(){		
		$boy.addClass("pausewalk");
	};

	boyWalk.stopToShop = function(){
		$boy.removeClass("walk");
		$boy.css({
			'background-position':'0px -291px'
		})
	}
	boyWalk.walkInShop = function(speed){
		$boy.removeClass("pausewalk");
		$boy.addClass("walk");

		var defer = $.Deferred();
		var $door = $(".shopdoor");
		var doorLeft = $door.offset().left;
		var boyLeft = $boy.offset().left;
		var distance = doorLeft + $door.width() / 2 - boyLeft - boyWidth/2;

		$boy.transition({
			//'transform':'translateX(' + distance +'px,translateY(0),scale(0.4,0.4)',
			'left': boyLeft + distance + 'px',
			'scale': '0.4',
			'opacity':'0'
		},speed,'ease-in',function(){
			defer.resolve();
		})

		return defer;
	}

	boyWalk.walkOutShop = function(speed){
		$boy.removeClass("pausewalk");
		$boy.addClass("walkWithFlower");

		var defer = $.Deferred();
		var $door = $(".shopdoor");
		var doorLeft = $door.offset().left;
		var boyLeft = $boy.offset().left;
		var distance = boyLeft - doorLeft;

		$boy.transition({
			//'transform':'translateX(' + distance +'px,translateY(0),scale(1,1)',
			'left': boyLeft + distance + 'px',
			'scale': '1',
			'opacity':'1',
			'delay':'2000ms'
		},speed,'ease-out',function(){
			defer.resolve();
		})

		return defer;
	}

	boyWalk.walkToGirl = function(speed){
		var defer = $.Deferred();
		var $girl = $("#girl");
		var boyTop = $boy.offset().top;
		var boyLeft = $boy.offset().left;
		var distanceX = $girl.offset().left - boyLeft - boyWidth;
		var distanceY = boyTop - $girl.offset().top;
		$boy.transition({
			'left': boyLeft + distanceX + 20 + 'px',
			'top': (boyTop - distanceY) + 'px'
		},speed,'linear',function(){
			defer.resolve();
		});

		return defer;
	}

	boyWalk.stopToGirl = function(){
		$boy.removeClass("walk");
		$boy.removeClass("walkWithFlower");
		$boy.css({
			'background-position':'-151px 0px'
		})
	}

	return boyWalk;
}

$.support.transition = (function(){ 
    var thisBody = document.body || document.documentElement,
    thisStyle = thisBody.style,
    support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
                   
    //alert(support); 
})();