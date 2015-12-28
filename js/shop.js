function ShopTrans(){
	var $lamp = $(".lamp_dark");
	var shop={};
	var $left = $(".leftdoor");
	var $right = $(".rightdoor");
	
	shop.opendoor = function(speed){
		var defer = $.Deferred();
		var count = 2;
		var complete = function(){
			if(count == 1){
				defer.resolve();
			}
			else{
				count--;
			}
		};
		$left.animate({
			'left': '-50%'
		},speed,complete);
		$right.animate({
			'right': '-50%'
		},speed,complete);	
		return defer;
	}	

	shop.closedoor = function(speed){
		var defer = $.Deferred();
		var count = 2;
		var complete = function(){
			if(count == 1){
				defer.resolve();
			}
			else{
				count--;
			}
		};
		$left.animate({
			'left': '0%'
		},speed,complete);
		$right.animate({
			'right': '0%'
		},speed,complete);	
		return defer;
	}

	shop.lightlamp = function(){
		$lamp.addClass("lightlamp");
	}
	shop.darklamp = function(){
		$lamp.removeClass("lightlamp");
	}


	shop.birdFly = function(){
		var $bird = $(".bird");
		$bird.addClass("birdfly");
		$bird.animate({
			'right':'100%'
		},15000);
	}

	return shop;
}