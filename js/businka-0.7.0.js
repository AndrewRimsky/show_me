// JavaScript Document
	var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var cache = [];
var players= [];
var Businka = {};
var	elements = {};
var thumbVim = null;
var dmThumb = null;
var getBrowser = function() {
    var b = "unknown";
    try {
        var e;
        var f = e.width;
    } catch (e) {
        var err = e.toString();
        if(err.search("not an object") !== -1){
            return "safari";
        } else if(err.search("Cannot read") !== -1){
            return "chrome";
        } else if(err.search("e is undefined") !== -1){
            return "firefox";
        } else if(err.search("Unable to get property 'width' of undefined or null reference") !== -1){
            if(!(false || !!document.documentMode) && !!window.StyleMedia){
                return "edge";
            } else {
                return "IE";
            }
        } else if(err.search("cannot convert e into object") !== -1){
            return "opera";
        } else {
            return undefined;
        }
    }
};
console.log(getBrowser());


	
(function (){
	
	Businka = {
			flkrCount: null,
			flkrId: null,
			ykId: null,
			thumbPosition: 'bottom',
			instaType: 'img',
			instaOpt: {
				hidecaption: 1,
			},
			uiSize: 'normal',
			uiSrc: {
					prev: 'skin/basic/prev',
					next: 'skin/basic/next',
					quit: 'skin/basic/quit'
			},
			uiThumbSrc: {
				next: null,
				prev: null	
			},
			captionBg: 'rgba(0,0,0,0.8)',
		    captionColor: 'rgb(255,255,255)',
			uiColor: '#fff',
			uiThumbColor: null,
			uiThumbBg: 'rgba(0,0,0,1)',
			thumbBg: 'rgba(0,0,0,.6)',
			bgColor: 'rgba(0,0,0,.8)',
			bgImage: null,
			tmp: [],
			loader: {
				type:'circles',
				delay: 2000
			},
			thCont: [],
			keys: {37: 1, 38: 1, 39: 1, 40: 1},
			preventDefault: function (e) {
  e = e || window.event;
  if (e.preventDefault){
      e.preventDefault();
  e.returnValue = false;  
  }
},
			preventDefaultForScrollKeys: function (e) {
    if (e.keyCode === 37||e.keyCode === 38||e.keyCode === 39||e.keyCode === 40) {
        e.preventDefault(e);
	}
        return false;
},
			disableScroll: function () {
	var p = this;
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', p.preventDefault, false);
  }
  window.onwheel = p.preventDefault; 
  window.onmousewheel = document.onmousewheel = p.preventDefault; 
  window.ontouchmove  = p.preventDefault;
  document.onkeydown  = p.preventDefaultForScrollKeys;
},
			enableScroll: function () {
				console.log('scrollable');
	var p = this;
    if (window.removeEventListener){
        window.removeEventListener('DOMMouseScroll', p.preventDefault, false);
	}
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
},
			animationBg: 'fade',
			fadeBg: 400,
			slide: 'standard',
			skin: 'businka',
			target: null,
			image: [],
			ui: 'outside',
			active: 0,
			thumb: 1,
			thumbMobile: 0,
			group: false,
			swipeSlide: 0,
			youtubeRegEx: /(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?/,
			vimeoRegEx: /(http:|https:)?\/\/(www\.)?(vimeo.com)\/((\D\w+)?\/(\D\w+)?\/(\D\w+))?/,
			dailymotionRegEx: /^.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/,
			vimeoThumb: 'https://i.vimeocdn.com/video/',
			vimeoId: null,
			dailymotionId: null,
			isElementInViewport: function (el) {
				var rect = el.getBoundingClientRect();
				console.log(rect);
    			return (
					rect.top >= 0 &&
					rect.left >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&     
					rect.right <= (window.innerWidth || document.documentElement.clientWidth)
				);
			},
			controlThumbs: function(){
				var t =this;
				var out =[];
				var th = $('.bk-thumb').toArray();
				var thCount = Math.floor(window.innerWidth/(80+(window.innerWidth * 0.01)));
				var contCount = Math.ceil(th.length/thCount);
				console.log(contCount);
				if(contCount>1){
					for (var i=0;i<contCount;i++){
					$(elements.thumb).append(t.thCont[i] = $('<div data-thumb-portion="'+i+'">').addClass('bk-multi-thumb'));
						if (i>0){
							$(t.thCont[i]).addClass('bk-hidden');
						} else if (i===0){
							$(t.thCont[i]).addClass('bk-active-thumb-cont');
						}
					console.log(t.thCont[i]);
					}
				}
				console.log(window.innerWidth);
				console.log(thCount);
				var thArrays = [];
				var newCount = thCount;
				for (var i=0;i<th.length;){
					var multi = i/thCount;
					if (multi>0){
						newCount = thCount * (multi+1);
					}
					if (newCount>th.length){
						thArrays[multi] = th.slice(i);
					} else{
						thArrays[multi] = th.slice(i, newCount);
					}
					i += thCount;
				}
				for (var i=0;i<thArrays.length;i++){
					var sub = thArrays[i];
					var par = t.thCont[i];
					for (var l=0;l<sub.length;l++){
						$(par).append(sub[l]);
					}
				}
				if (thArrays.length>1){
					$('.bk-thumbs-container').prepend(elements.thumbUiPrev = $("<div>").addClass('bk-thumb-ui thumb-prev'));
					$('.bk-thumbs-container').append(elements.thumbUiNext = $("<div>").addClass('bk-thumb-ui thumb-next'));
					$('.bk-thumb-ui').css('background-color', t.uiThumbBg);
					if (!this.uiThumbSrc.next){
						this.uiThumbSrc.next = this.uiSrc.next;
						this.uiThumbSrc.prev = this.uiSrc.prev;
					}
					$(elements.thumbUiPrev).append("<img src='"+this.uiThumbSrc.prev+".png' alt='previous thumbs' srcset='"+this.uiThumbSrc.prev+".svg' class='bk-svg bk-thumb-ctrl'>");
					$(elements.thumbUiNext).append("<img src='"+this.uiThumbSrc.next+".png' alt='next thumbs' srcset='"+this.uiThumbSrc.next+".svg' class='bk-svg bk-thumb-ctrl'>");
				}
				t.convertToSvg();
				$(elements.thumbUiNext).on('click', function(){
					var crtCont = $('.bk-active-thumb-cont').data('thumb-portion');
					if(crtCont < contCount-1){
					$('.bk-active-thumb-cont').animate({
						marginRight: window.innerWidth,
						opacity: 0
					}, 200, function(){
						$(this).toggleClass('bk-hidden bk-active-thumb-cont');
						var next = $('[data-thumb-portion="'+(crtCont+1)+'"]');
						next.css({'margin-left': window.innerWidth,
							  'opacity': '0'});
						next.toggleClass('bk-hidden bk-active-thumb-cont');
						next.animate({
							marginLeft: 0,
							opacity: 1
						}, 200);
					});
					} else {
						return;
					}
				});
				$(elements.thumbUiPrev).on('click', function(){
					var crtCont = $('.bk-active-thumb-cont').data('thumb-portion');
					if(crtCont > 0){
					$('.bk-active-thumb-cont').animate({
						marginLeft: window.innerWidth,
						opacity: 0
					}, 200, function(){
						$(this).toggleClass('bk-hidden bk-active-thumb-cont');
						var next = $('[data-thumb-portion="'+(crtCont-1)+'"]');
						next.css({'margin-right': window.innerWidth,
							  'opacity': '0'});
						next.toggleClass('bk-hidden bk-active-thumb-cont');
						next.animate({
							marginRight: 0,
							opacity: 1
						}, 200);
					});
					} else {
						return;
					}
				});
				console.log(thArrays.length);
			},
			
			 ////// TOUCH //////
	
		 	swipe: {
			distance: null,
			targetEl: null, 
			fCount: 0, //fingerCount: 0
			sX: 0,
			stY: 0,
			cX: 0,
			cY: 0,
			dX: 0,
			dY: 0,
			hDiff: 0,
			vDiff: 0,
			minL: 20, 
			swipeL: 0,
			swipeA: null,
			swipeD: null,
		},
			touchStart: function (event, passedName){
		event.preventDefault();
		this.swipe.fCount = event.touches.length;
		if ( this.swipe.fCount === 1 ) {
			this.swipe.sX = Math.round(event.touches[0].pageX);
			this.swipe.sY = Math.round(event.touches[0].pageY);
			this.swipe.targetEl = passedName;
		} else {
			this.touchCancel(event);
		}
		console.log('touched at '+ this.swipe.sX + ' ' +this.swipe.sY +' '+this.swipe.fCount);
	},
			touchMove: function (event) {
		if ( event.touches.length === 1 ) {
			this.swipe.cX = Math.round(event.touches[0].pageX);
			this.swipe.cY = Math.round(event.touches[0].pageY);
			this.swipe.swipeL = Math.round(Math.sqrt(Math.pow(this.swipe.cX - this.swipe.sX,2) + Math.pow(this.swipe.cY - this.swipe.sY,2)));
			this.swipe.distance = Math.round(this.swipe.cX-this.swipe.sX);
			$('.active').css({'left': this.swipe.distance, 'transition':'left .1s ease-in-out'});
		} else {
			this.touchCancel(event);
		}
		console.log('moved at '+ this.swipe.cX + ' ' +this.swipe.cY);
	},
	 		touchEnd: function(event) {
		event.preventDefault();
		if ( this.swipe.fCount === 1 ) {
			
			console.log ('difference is '+this.swipe.swipeL);
			if ( this.swipe.swipeL >= this.swipe.minL ) {
				this.caluculateAngle();
				console.log(this.swipe.swipeA);
				this.determineSwipeDirection();
				console.log(this.swipe.swipeD)
				this.processingRoutine();
				this.touchCancel(event); 
			} else {
				this.touchCancel(event);
			}	
		} else {
			this.touchCancel(event);
		}
		console.log('touch done '+ this.swipe.swipeL);
	},
			touchCancel: function (event) {
		this.swipe.fCount = 0;
		this.swipe.sX = 0;
		this.swipe.sY = 0;
		this.swipe.cX = 0;
		this.swipe.cY = 0;
		this.swipe.dX = 0;
		this.swipe.dY = 0;
		this.swipe.hDiff = 0;
		this.swipe.vDiff = 0;
		this.swipe.swipeL = 0;
		this.swipe.swipeA = null;
		this.swipe.swipeD = null;
		this.swipe.targetEl = null;
	},
			caluculateAngle: function() {
		var X = this.swipe.sX-this.swipe.cX;
		var Y = this.swipe.cY-this.swipe.sY;
		var Z = Math.round(Math.sqrt(Math.pow(X,2)+Math.pow(Y,2))); 
		var r = Math.atan2(Y,X); 
		this.swipe.swipeA = Math.round(r*180/Math.PI); 
		if ( this.swipe.swipeA < 0 ) { 
		this.swipe.swipeA =  360 - Math.abs(this.swipe.swipeA); }
	},
			determineSwipeDirection: function () {
		if ( (this.swipe.swipeA <= 45) && (this.swipe.swipeA >= 0) ) {
			this.swipe.swipeD = 'left';
		} else if ( (this.swipe.swipeA <= 360) && (this.swipe.swipeA >= 315) ) {
			this.swipe.swipeD = 'left';
		} else if ( (this.swipe.swipeA >= 135) && (this.swipe.swipeA <= 225) ) {
			this.swipe.swipeD = 'right';
		}
	},
			processingRoutine: function () {
		$('.active').css({'left':'0',});
		var m = this;
		var numSlides= $('.bk-pages-content');
		var count = numSlides.length;
		if ( this.swipe.swipeD === 'left' ) {
			m.ytControllerStop(numSlides, this.swipeSlide);
						$(numSlides[this.swipeSlide]).toggleClass('active');
						$('[data-index="'+this.swipeSlide+'"]').toggleClass('active-thumb');
						console.log(this.swipeSlide);
						 if (this.swipeSlide === numSlides.length-1){
							 this.swipeSlide = 0;
						 } else{
						this.swipeSlide++;
						 }
						console.log(this.swipeSlide);
						$(numSlides[this.swipeSlide]).toggleClass('active');
						$(numSlides[this.swipeSlide]).css({
							'animation':'0.4s right 0s ease-in-out 1'
						});
						m.ytControllerPlay(numSlides, this.swipeSlide);
						$('[data-index="'+this.swipeSlide+'"]').toggleClass('active-thumb');
						m.checkr(this.swipeSlide, numSlides);
		} else if ( this.swipe.swipeD === 'right' ) {
			m.ytControllerStop(numSlides, this.swipeSlide);
						$(numSlides[this.swipeSlide]).toggleClass('active');
						$('.bk-thumb[data-index="'+this.swipeSlide+'"]').toggleClass('active-thumb');
						console.log(this.swipeSlide);
						 if (this.swipeSlide === 0){
							 this.swipeSlide = numSlides.length-1;
						 } else{
							 this.swipeSlide--;
							 }
							 console.log(this.swipeSlide);
						$(numSlides[this.swipeSlide]).toggleClass('active');
						$(numSlides[this.swipeSlide]).css({
							'animation':'left 0.4s ease-in-out 1'
						});
						m.ytControllerPlay(numSlides, this.swipeSlide);
						$('.bk-thumb[data-index="'+this.swipeSlide+'"]').toggleClass('active-thumb');
						m.checkr(this.swipeSlide, numSlides);
		} 
	},
		
			////// TOUCH //////
			
			instaEmbed: function(uri){
				uri = 'https://api.instagram.com/oembed?url='+uri+'&'+$.param(this.instaOpt);
				console.log(uri);
				return uri;
			},
			fixB: function(){
				var o = getBrowser();
				if (o === 'safari'){
					console.log('Safari');
					$('<style>.active {height: 90% !important;}</style>').appendTo('head');
				}
				else if(o === 'firefox'){
						$('<style>.active {height: 90% !important;}</style>').appendTo('head');
						$('<style>.bk-pages {padding: 0 !important;}</style>').appendTo('head');
						} else {
							console.log('error');
							}
				},
			preloader: function (images, elements, tmp){
				var t = images;
				var loadStatus = {count: t.length, loaded: 0};
    for(var i = 0; i < t.length; i++){
   			tmp[i] = new Image();
			tmp[i].onload = (function(){
      		     loadStatus.loaded++;
			   if(loadStatus.loaded >= loadStatus.count){
					   console.log('loaded');
   				   }
 				 return loadStatus;
		   })();
     	   tmp[i].src = t[i].href;
	}
				console.log(tmp);
				console.log(loadStatus.count);
				console.log(loadStatus.loaded);
				},
			ytControllerStop: function (numSlides, crtSlide){
			//	var crtVideo = $(cache).find(g);
			// console.log(crtVideo);
				if ($(numSlides[crtSlide]).hasClass('has-video'+crtSlide+'')){
					$(numSlides[crtSlide]).children('.simple').remove();
					}
				},
			ytControllerPlay: function (numSlides, crtSlide){
				if ($(numSlides[crtSlide]).hasClass('has-video'+crtSlide+'')){
					console.log(crtSlide);
					$(numSlides[crtSlide]).append(cache[crtSlide]);
					}
				},
			videoDetect: function(uri){
					
			},
			convertURI: function(uri){
				if (this.youtubeRegEx.test(uri)){
				return uri.replace(this.youtubeRegEx, "https://www.youtube.com/embed/");
				} 
				else if (this.vimeoRegEx.test(uri)){
				this.vimeoId = uri.replace(this.vimeoRegEx, "");
				var vimId = this.vimeoId;
				$.ajax({
					type:'GET',
					url: 'https://vimeo.com/api/v2/video/' + vimId + '.json',
					jsonp: 'callback',
					dataType: 'jsonp',
				   success: function(data){
					thumbVim = data[0].thumbnail_large;
					$('[data-vimeo-id="'+vimId+'"]').css("background-image","url("+thumbVim+")");
				   }
				});
				return uri.replace(this.vimeoRegEx, "https://player.vimeo.com/video/");
				} 
				else if (this.dailymotionRegEx.test(uri)){
					console.log('its ok');
					 var match = uri.match(this.dailymotionRegEx);
					console.log(match);
						if (match !== null) {
							if(match[4] !== undefined) {
								this.dailymotionId = match[4];
							}
        					this.dailymotionId = match[2];
						}
					var dmId = this.dailymotionId;
					console.log(dmId);
					$.ajax({
						//https://api.dailymotion.com/video/x3w5kh3.json
						//x3w5kh3
						type:'GET',
						url: 'https://api.dailymotion.com/video/' + dmId + '?fields=thumbnail_720_url',
						dataType: "jsonp",
						cache: true,
						success: function(data){
							console.log(data);
							dmThumb = data.thumbnail_720_url;
						$('[data-dailymotion-id="'+dmId+'"]').css("background-image","url("+dmThumb+")");
							console.log(data);
							console.log(dmThumb);
						}
					});
					uri = 'https://www.dailymotion.com/embed/video/'+this.dailymotionId;
					return uri;
				}
				else if (/youku/.test(uri)){
				var ykId = uri.match(/id\_([\w]*==)/)[1];
				uri = 'http://player.youku.com/embed/'+ykId;
					console.log(uri);
				return uri;
				}
					},
			instaIni: function(insta, el, k, th){
				$(elements.pages).append(el[k] = $("<div class='bk-pages-content bk-insta-img'>"));
				$(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb'>"));
				console.log(insta);
				var z = this;
				$.ajax({
					type: 'GET',
					url: insta,
					dataType: "jsonp",
					success: function(data){
						if (z.instaType === 'img'){
							$(el[k]).append('<img src="'+data.thumbnail_url+'" class="bk-image">');
							$(el[k]).removeClass('bk-insta-img');
						} else {
						$(el[k]).append(data.html);
						}
						if (z.thumb){
							$(th[k]).css("background-image","url("+data.thumbnail_url+")");
							console.log(th[k]);
							console.log(elements.thumb);
						}
						console.log(data);
					}
				});
			},
			getFlickrImg: function (flkrId, method, apiKey, idType, perPage, el, k, th){
				var l = this;
				$.ajax({
					type:"GET",
					url: "https://api.flickr.com/services/rest/?method="+method+"&api_key="+apiKey+idType+flkrId+"&per_page="+perPage+'&format=json&nojsoncallback=1',
					success: function(data){
						console.log(data);
						var url, photo;
						photo = data.photoset.photo;
						for (var i=0, m=k;i<photo.length;i++){
						url = 'http://farm' + photo[i].farm + '.static.flickr.com/' +
            			photo[i].server + '/' + photo[i].id + '_' + photo[i].secret;
							console.log(url);
						$(elements.pages).append(el[m] = $("<div class='bk-pages-content'>"));
						$(el[m]).append('<img src="'+url+'_b.jpg" class="bk-image">');	
						if (l.thumb){
							$(elements.thumb).append(th[m] = $("<div data-index='"+m+"' class= 'bk-thumb'>"));
							$(th[m]).css("background-image","url("+url+"_s.jpg)");
						}
						m++;
						}
        			}
				});
			},
			flkrIni: function(uri, el, k, th){
				var ids, method, apiKey, idType, perPage;
				perPage = this.flkrCount||20;
				apiKey = '66ea4ec1f18e77991d6a497fe75f23ff';
				if (/albums/.test(uri)){
					ids = uri.match(/albums\/([\w-]*)/);
					this.flkrId = ids[1];
					method = 'flickr.photosets.getPhotos';
					idType = '&photoset_id=';
					this.getFlickrImg(this.flkrId, method, apiKey, idType, perPage, el, k, th);
				} else {
					ids = uri.match(/photos\/([\w-]*)/);
					this.flkrId = ids[1];
					method = 'flickr.people.getPhotos';
					idType = '&user_id=';
					this.getFlickrImg(this.flkrId, method, apiKey, idType, perPage, el, k, th);
				} 
			},
			initializeV: function(newURI, el, k){
					if (/youtu/.test(newURI)){
						$(elements.pages).append(el[k] = $("<div class='bk-pages-content video has-video"+k+"'>"));
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"?"+$.param(this.youtube)+"' allowfullscreen frameborder='0'>";
					} else if (/vimeo/.test(newURI)){
						$(elements.pages).append(el[k] = $("<div class='bk-pages-content video has-video"+k+"'>"));
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"?"+$.param(this.vimeo)+"' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'>";
					} else if (/youku/.test(newURI)){
						$(elements.pages).append(el[k] = $("<div class='bk-pages-content video has-video"+k+"'>"));
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"' allowfullscreen frameborder='0'>";
					} 
					else {
						$(elements.pages).append(el[k] = $("<div class='bk-pages-content video has-video"+k+"'>"));
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"?"+$.param(this.dailymotion)+"' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'>";
					}
						console.log(cache);
						},
			getVideoThumb: function (url){
				return url.replace(/https\:\/\/www\.youtube\.com\/watch\?v=/, 'https://img.youtube.com/vi/') +'/0.jpg';
				},
			hidePlayers: function(){
				for (var o =0;o<cache.length;o++){
						$(cache[o]).hide();
						}
				},
			hideAddressBar: function (){
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
},
			youtube: {
				autohide: 1,
				autoplay: 1,
				color: 'red',
				controls: 1,
				disablekb: 0,
				enablejsapi: 1,
				end: null,
				fs: 1,
				iv_load_policy: 1,
				loop: 0,
				modestbranding: 1,
				rel: 0,
				showinfo: 1,
				theme: 'dark',
				},
			vimeo: {
				api: 0,	
				autopause: 0,
				autoplay: 1	,
				byline: 1,		
				color: 'ffffff',
				loop: 0,		 
				portrait: 0,
				title: 1
			},
			dailymotion:{
				autoplay: 1,
				controls: 1,
				related: 1,
				muted: 0,
				quality: 'auto',
				social: 1,
				start: 0,	 
				highlight: 'ffcc33',	
				logo: 1,
				'ui-start-screen-info': 1,
				'ui-theme': 'dark',	
			},
			convertToSvg: function(){
				var l = this;
				$('img.bk-svg').each(function(){
    				var $img = $(this);
    				var imgID = $img.attr('id');
					var imgClass = $img.attr('class');
					var imgURL = $img.attr('srcset');

					$.get(imgURL, function(data) {
						var $svg = $(data).find('svg');
						if(typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass+' replaced-svg');
        				}
        				$svg = $svg.removeAttr('xmlns:a');
						$svg.attr('height','45');
						$svg.attr('width','45');
						 if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							 $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
						 }
						if(/bk-controls/.test(imgClass)){
							$svg.attr('viewBox', '0 0 50 80');
							if (l.uiSize === 'small'){
								$svg.attr('width', '60');
								$svg.attr('height', '130');
								$('.bk-ui-el').addClass('bk-no-padding');
							} else if (l.uiSize === 'large'){
								$svg.attr('width', '100');
								$svg.attr('height', '150');
							} else {
								$svg.attr('width', '80');
								$svg.attr('height', '140');
							}
						}
						$svg.attr('style', 'fill: '+l.uiColor+'');
						if(/thumb/.test(imgClass)) {
							$svg.attr('viewBox', '5 10 40 30');
							$svg.attr('height','100%');
							$svg.attr('width','40');
							if (!l.uiThumbColor){
								l.uiThumbColor = l.uiColor;
							}
							$svg.attr('style', 'fill: '+l.uiThumbColor+'');
						}
						$svg.find('defs').remove();
						$img.replaceWith($svg);

					}, 'xml');

				});	
			},
			innerBuild: function() {
				$(elements.main).append(elements.pages = $("<div>").addClass("bk-pages"));
										$(elements.main).append(elements.quit = $("<div>").addClass("qt-btn bk-ui-el"));
												$(elements.main).append(elements.next = $("<div>").addClass("bk-ui-right bk-ui-el "+this.ui));
														$(elements.main).append(elements.prev = $("<div>").addClass("bk-ui-left bk-ui-el "+this.ui));
									if (this.thumbPosition === 'top'){
									$(elements.main).prepend(elements.thumb = $("<div>").addClass("bk-thumbs-container bk-top-thumb"));	
									$(elements.quit).addClass('bk-top-fix');
									$('.outside').css('top','50%');
									} else {
									$(elements.main).append(elements.thumb = $("<div>").addClass("bk-thumbs-container bk-bottom-thumb"));
									}
				$(elements.prev).append("<img src='"+this.uiSrc.prev+".png' alt='previous image' srcset='"+this.uiSrc.prev+".svg' class='bk-svg bk-controls'>");
				$(elements.next).append("<img src='"+this.uiSrc.next+".png' alt='next image' srcset='"+this.uiSrc.next+".svg' class='bk-svg bk-controls'>");
				$(elements.quit).append("<img src='"+this.uiSrc.quit+".png' alt='close lightbox' srcset='"+this.uiSrc.quit+".svg' class='bk-svg'>");
									if (this.thumbBg){
										$(elements.thumb).css('background-color', this.thumbBg);
									}
							this.convertToSvg();						
							return elements;
				},
		    build: function (){
				//$deferred = $.Deferred();
				//if ($(window).width() > 768)
				//{
				this.disableScroll();
				var l = this;
				//} 
				//$('body').bind('touchmove', function(e){e.preventDefault();});
				if (this.fadeBg !== false && this.animationBg === 'fade'){
				 $('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+this.skin+""));
					$(elements.main).append(elements.loader = $("<div>").addClass("bk-wrap-"+this.skin+" "+ this.loader.type));
					$(elements.main).css({'opacity':'0'}).fadeTo('fast', 1);
					
				 // $('body').prepend($('<div class="loader '+ this.loader.type +'">').css({
					  				//	'width': $(window).width(),
									//	'height': $(window).height()
									//   }));
						   	this.innerBuild();
							console.log(this.loader.type);
							//$(elements.pages).delay(this.loader.delay).fadeIn();
							//$(elements.thumb).delay(this.loader.delay).fadeIn();
				}
				else if (this.animationBg === 'slide-left' || this.animationBg === 'slide-right') 
				{
					$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+this.skin));
					if (this.animationBg === 'slide-left'){
					$(elements.main).css({"width":"0", "right":"0"});
					} else {
						$(elements.main).css({"width":"0"});
						}
						this.innerBuild();
						$(elements.main).animate({width:"100%"}, 600, 'linear', function(){
							setTimeout(function(){
								$(elements.main).addClass(l.loader.type);
							}, 200);
							});
	
				} 
				else if (this.animationBg === 'slide-top' || this.animationBg === 'slide-bottom')
				{
						$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+this.skin));
					if (this.animationBg === 'slide-top'){
					$(elements.main).css({"height":"0", "bottom":"0"});
					} else {
						$(elements.main).css({"height":"0"});
						}
						this.innerBuild();
						$(elements.pages).hide();
						$(elements.thumb).hide();
						$(elements.main).animate({height:"100%"}, 600, 'linear', function(){
							$(elements.pages).fadeIn(1000);
							$(elements.thumb).fadeIn(1000);
							});
				}
				else
				 {
					$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+this.skin+" "+this.loader.type));
					this.innerBuild();
					if (this.loader){
					$(elements.pages).hide();
					$(elements.thumb).hide();
					$(elements.pages).show().delay(2000);
					$(elements.thumb).show().delay(2000);
					}
				}
				$(elements.main).css({
					'background-color': this.bgColor,
					'background-image': 'url('+this.bgImage+')'
				});
				 //$deferred.resolve();
				 //return $deferred.promise();
				 },	
			fixr: function(){
			console.log($(window).width());
			if($(window).width() < 700){
				console.log('mobile');
				var m = $(window).height() + 72 + 'px';
				console.log(m);
            $('body').css({
				'height': m,
			});
			}
		},
			mobileFix: function(){
				if(window.innerWidth < 700){
					var hFix = window.innerHeight += 60;
					hFix += 'px';
					console.log(hFix);
					$(elements.main).css({
						'overflow':'scroll',
						'height': hFix,
					});
				}
			},
			getImage: function (){
					if(getBrowser() === 'chrome'){
					this.target = document.activeElement;
					} else {
						this.target = event.target || event.srcElement;
					}
					console.log(document.activeElement);
					var capt = $(this.target).data('businka-caption');
					var imgs = $(this.target).data('businka-image');
					if (capt){
						if (typeof(capt) !== 'string'){
							for (var i= 0;i<capt.length;i++){
								this.image[i] = {href: imgs[i], caption: capt[i]};
							} 
						} else {
								this.image = [];
								this.image[0]= {href: imgs, caption: capt};
							}
					} else {
						this.image = imgs;
					}
				},
			show: function (opt, src){
			 //var n = Object.create(Businka);
				var n = $.extend({}, Businka);
								console.log(n);
			n.image = [];
			 console.log(n.animationBg);
			 $.extend(true, n, opt);
			 $.extend(n.image, src);
								console.log(n);
			if (!src){
				n.getImage();
				if(!opt && $(this.target).data('businka-options')){
					$.extend(true, n, $(this.target).data('businka-options'));
				}
			}
			 $.when(n.build()).then(function(){
				 	n.preloader(n.image, elements, n.tmp);
					setTimeout(function(){
						$(elements.loader).remove();
						 $(elements.pages).css({
							'opacity':'1'
						});
						$(elements.thumb).css({
							'opacity':'1'
						});
						n.controller();
					}, n.loader.delay);
				 n.fixB();
				 
				 var el =[];
				 var th = [];
				 if (typeof(n.image[0]) === 'object'){	 
					 for(var k=0;k<n.image.length; k++){
			if(/youtu/.test(n.image[k].href)||/vimeo/.test(n.image[k].href)||/dailymotion/.test(n.image[k].href)||/youku/.test(n.image[k].href)){
								console.log(k);
								var newURI = n.convertURI(n.image[k].href);
								console.log(newURI);
								 n.initializeV(newURI, el, k);
								if(n.thumb){
									
								 if($(window).width() <= 768 && !n.thumbMobile){
									$(elements.thumb).remove();
									 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
								 } else { 
									$(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb video-thumb'>"));
									if(/youtu/.test(n.image[k].href)){
							 		$(th[k]).css("background-image","url("+n.getVideoThumb(n.image[k].href)+")");
									} else if (/vimeo/.test(n.image[k].href)){
										$(th[k]).attr("data-vimeo-id", n.vimeoId);
										console.log(thumbVim);
									} else if(/dailymotion/.test(n.image[k].href)){
										$(th[k]).attr("data-dailymotion-id", n.dailymotionId);
										console.log(dmThumb);
									}
								 }
									
									} else if ($(window).width() < 700){
								 $(elements.thumb).remove();
							 }
									else
							 {
								 $(elements.thumb).remove();
								 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
							 }
								} 
						 else if (/instagr/.test(n.image[k].href)||/flickr/.test(n.image[k].href)){
							 	if (/flickr/.test(n.image[k].href)){
									n.flkrIni(n.image[k].href, el, k, th);
								} else {
									var insta = n.instaEmbed(n.image[k].href);
									n.instaIni(insta, el, k, th);
								}
							 if (n.thumb){
								 if($(window).width() <= 768 && !n.thumbMobile){
									$(elements.thumb).remove();
									 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
								 }
								} else if ($(window).width() < 700){
								 $(elements.thumb).remove();
							 }
									else
							 {
								 $(elements.thumb).remove();
								 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
							 }
						 }
						 		else {
							 $(elements.pages).append(el[k] = $("<div class='bk-pages-content'>"));
							 $(el[k]).append(n.tmp[k]);
							$(n.tmp[k]).addClass('bk-image');
							 $(el[k]).append("<div class='bk-image-caption'>"+n.image[k].caption+"</div>");
									$('.bk-image-caption').css({
										'color': n.captionColor,
										'background': n.captionBg,
									});
							 if (n.thumb){
								 if($(window).width() <= 768 && !n.thumbMobile){
									$(elements.thumb).remove();
									 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
								 } else {
							 $(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb'>"));
							 $(th[k]).css("background-image","url("+n.image[k].href+")");
								 }
							 } 
									else if ($(window).width() < 700){
								 $(elements.thumb).remove();
							 }
									else
							 {
								 $(elements.thumb).remove();
								 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
							 }
								
						 };
					 };
				 }
				 if (typeof(n.image[0]) === 'string'){
					 for(var k=0;k<n.image.length;k++){
						 if(/youtu/.test(n.image[k].href)){
								var newURI = n.convertURI(n.image[k].href);
								 n.initializeV(newURI, el, k);
								if(n.thumb){
									$(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb video-thumb'>"));
							 		$(th[k]).css("background-image","url("+n.getVideoThumb(n.image[k].href)+")");
									}
								} 
								else {
						 $(elements.pages).append(el[k] = $("<div class='bk-pages-content'>"));
						 $(el[k]).append(n.tmp[k]);
						 if (n.thumb){
							 if($(window).width() <= 768 && !n.thumbMobile){
									$(elements.thumb).remove();
									 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
								 } else {
							 $(elements.thumb).append(th[k] = $("<div class= 'bk-thumb-wrap'>"));
							 $(th[k]).css("background-image","url("+n.image[k].href+")");
							 }
							 } else if ($(window).width() < 700){
								 $(elements.thumb).remove();
							 }
									else
							 {
								 $(elements.thumb).remove();
								 $(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
							 };
						 }
					 }
					 }
				 	
				});
			 },
			checkr: function(crtSlide, numSlides){
				 if (crtSlide === 0){
						$(elements.prev).hide();
					} else {
						$(elements.prev).show();
						};
					if (crtSlide === numSlides.length-1){
						$(elements.next).hide();
						} else {
							$(elements.next).show();
						};
				 },
			controller: function (){
				var m = this;
				m.hidePlayers();
				m.controlThumbs();
				var count = $('.bk-pages-content');
				console.log(count);
				if (count.length <= 1)
				{
					$('.'+m.ui).remove();
					$(elements.thumb).remove();
					$(elements.pages).css({
									'height':'100%', 
								 }); 
									 $('.bk-pages-content').css({
									'height':'100%', 
								 }); 
				} else {
					$('.'+m.ui).css({
							'opacity':'.7'
						});
				}
				$(elements.quit).bind('click', function(){$(elements.main).remove(); m.enableScroll(); m.swipeSlide=0;});
				var numSlides= $('.bk-pages-content');
				var crtSlide = this.active;
				$(numSlides[crtSlide]).toggleClass('active');
				$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
				if (this.slide !== 'infinite' && crtSlide === 0){
					$(elements.prev).hide();
					};
				if(crtSlide===0 && $('.has-video0')){
					m.ytControllerPlay(numSlides,crtSlide);
				};
					if ('ontouchstart' in window && count.length <= 1) {
						   $('.'+m.ui).remove();
                           $(".bk-pages-content").bind('touchstart', function(){
							   m.touchStart(event, 'bk-pages-content');
							   });
							$(".bk-pages-content").bind('touchmove', function(){
								m.touchMove(event);
							});
							$(".bk-pages-content").bind('touchcancel', function(){
								m.touchCancel(event);
							});
							$(".bk-pages-content").bind('touchend', function(){
								m.touchEnd(event);
							});
							$(".simple").bind('touchstart', function(){
							   m.touchStart(event, '.simple');
							   });
							$(".simple").bind('touchmove', function(){
								m.touchMove(event);
							});
							$(".simple").bind('touchcancel', function(){
								m.touchCancel(event);
							});
							$(".simple").bind('touchend', function(){
								m.touchEnd(event);
							});
							m.swipeSlide = crtSlide;
							$('.bk-thumb').on('click', function(){
					$('[data-index="'+m.swipeSlide+'"]').toggleClass('active-thumb');
					m.ytControllerStop(numSlides, m.swipeSlide);
					$(numSlides[m.swipeSlide]).toggleClass('active');
					m.swipeSlide = $(this).data("index");
					console.log(m.swipeSlide);
					$(numSlides[m.swipeSlide]).toggleClass('active');
					m.ytControllerPlay(numSlides, m.swipeSlide);
					$('[data-index="'+m.swipeSlide+'"]').toggleClass('active-thumb');
					m.checkr(m.swipeSlide,numSlides);
					});
					
} else {
				$(elements.next).on('click', function(){
						m.ytControllerStop(numSlides, crtSlide);
						$(numSlides[crtSlide]).toggleClass('active');
						$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						crtSlide++;
						$(numSlides[crtSlide]).toggleClass('active');
						m.ytControllerPlay(numSlides, crtSlide);
						$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						m.checkr(crtSlide, numSlides);
				});
				$(elements.prev).on('click', function(){
						m.ytControllerStop(numSlides, crtSlide);
						$(numSlides[crtSlide]).toggleClass('active');
						$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						crtSlide--;
						$(numSlides[crtSlide]).toggleClass('active');
						m.ytControllerPlay(numSlides, crtSlide);
						$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						m.checkr(crtSlide, numSlides);
				});

				$('.bk-thumb').on('click', function(){
					$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
					m.ytControllerStop(numSlides, crtSlide);
					$(numSlides[crtSlide]).toggleClass('active');
					crtSlide = $(this).data("index");
					m.swipeSlide = crtSlide;
					console.log(m.swipeSlide);
					$(numSlides[crtSlide]).toggleClass('active');
					m.ytControllerPlay(numSlides, crtSlide);
					$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
					m.checkr(crtSlide,numSlides);
					});
}
				},
				
		 };
	
		 
	})();