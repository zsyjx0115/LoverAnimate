$(document).ready(function(){
	var swipe = pageMove();
	//swipe.moveBack($(".main-content").width(),5000);	
	var boyWalk = BoyWalk();
	var shop = ShopTrans();
	//MusicPlay().playmusic();
	//test
	/*swipe.moveBack(2,1000,0);
	boyWalk.startWalk(46,2000)*/
	swipe.moveBack(1,10000,8500);
	boyWalk.startWalk(66,9000)
			.then(function(){				
				return boyWalk.startWalk(56,5000);
			})
			.then(function(){
				return boyWalk.startWalk(46,5000);
			})
			.then(function(){
				boyWalk.pauseWalk();
				boyWalk.stopToShop();
				return shop.opendoor(2000);
			})
			.then(function(){
				shop.lightlamp();
				return boyWalk.walkInShop(3000);
			})
			.then(function(){
				shop.birdFly();
				return boyWalk.walkOutShop(3000);
			})
			.then(function(){
				boyWalk.startWalk(70,4000)
				swipe.moveBack(2,10000,2000);
				return shop.closedoor(2000);
			})
			.then(function(){
				shop.darklamp();				
				return boyWalk.startWalk(20,8000);
			})
			.then(function(){
				return boyWalk.walkToGirl(4000);
			})
			.then(function(){
				return boyWalk.stopToGirl();
			})
			.then(function(){
				$("#girl").addClass("girlturn");
				$("#boy").addClass("boyturn");
				setTimeout(function(){
					$(".logo").addClass('logolightSpeedIn')
	                setTimeout(function() {
	                    $(".logo").addClass('logoshake');
	                },1000);
	            },1000);

				var flower = Flower();
				flower.show();
			})
});

//设置背景布景的格局大小
function pageMove(){
	var container = $(".main-content");
	var content = $(".content");
	var backs = content.find("li");
	var width = container.width();
	var height = container.height();
	var swipe = {};

	content.css({
		width: (width * backs.length) + 'px',
		height: height + 'px'
	});

	$.each(backs,function(index){
		var back = backs.eq(index);
		back.css({
			width: width + 'px',
			height: height + 'px'
		})
	})

	 // 切换背景图片动画
    swipe.moveBack = function(distance,speed,delay) {
        content.css({
            'transition-timing-function': 'linear',
            'transition-duration': speed + 'ms',
            'transition-delay': delay + 'ms',
             'transform': 'translate3d(-' + distance * width + 'px,0px,0px)' //设置页面X轴移动
        });
    };
    return swipe;
}

function MusicPlay(){
	var music={};
	// 音乐配置
    var audioConfig = {
        enable: true, // 是否开启音乐
        playURl: './audio/happy.wav', // 正常播放地址
        cycleURL: './audio/circulation.wav' // 正常循环播放地址
    };

    /////////
    //背景音乐 //
    /////////
    var Hmlt5Audio = function(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
    }

    // 开始
    music.playmusic = function (){
        var audio1 = Hmlt5Audio(audioConfig.playURl);
        audio1.end(function() {
            Hmlt5Audio(audioConfig.cycleURL,true);
        });
    };

    return music;
}

function Flower(){
	var flower = {};
	var parent = $(".c_background");
	flower.generate = function(){
		var newflower = $("<div class='flowerRotate'></div>");
		var random = Math.ceil(Math.random() * 6);
		newflower.addClass("snowflake"+random+"");
		var randomleft = Math.floor(Math.random() * parent.width() / 2 + parent.width() / 4);
		var ranopacity = Math.random();
		ranopacity = ranopacity > 0.5? ranopacity: 1;
		newflower.css({
			'opacity': ranopacity,
			'left': randomleft + 'px',
			/*'background': 'url("images/snowflake/snowflake'+1+'.png") 0 0 no-repeat'*/
		});
		parent.append(newflower);
		return newflower;		
	}

	flower.show = function(){
		$this = this;
		setInterval(function(){
			var randomleft = Math.floor(Math.random() * parent.width());
			var div = $this.generate();
			div.addClass("f-rotate");
			var duration = parent.height() * 10 + Math.random() * 15000
			var translatex = randomleft - div.offset().left;
			randomleft = Math.abs(translatex) > 500 ? 500 : randomleft;
			div.transition({
				'left': randomleft + 'px',
				'top': parent.height() + 'px',
				/*'transform': 'translate3d('+ translatex +'px,'+parent.height() + 'px)',*/
				'opacity': 0.3
			},duration,'ease-out',function(){
				$(this).remove();
			})
		},200);		
	}
	return flower;
}