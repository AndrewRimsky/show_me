// JavaScript Document
	var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var cache = [];
var players= [];
var Businka = {};
var	elements = {};
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
			loader: {
				type:'circles',
				delay: 1000
			},
			bgColor: 'rgba(0,0,0,.9)',
			animationBg: 'fade',
			fadeBg: 400,
			slide: 'standard',
			skin: 'businka',
			target: '.test',
			image: [],
			ui: 'outside',
			active: 0,
			thumb: true,
			group: false,
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
			preloader: function (){
				$deferred = $.Deferred();
				var t = this.image;
				var loadStatus = false;
    			loadStatus = {count: t.length, loaded: 0};
    for(var i = 0; i < t.length; i++){
      var tmp = new Image();
     	   tmp.src = t[i];
   		   tmp.onload = function(){
      		     loadStatus.loaded++;
 			       if(loadStatus.loaded >= loadStatus.count){
					   $deferred.resolve();
						return $deferred.promise();
   				   }	
 				 return loadStatus;
		   };
	}
				},
			ytControllerStop: function (numSlides, crtSlide){
			//	var crtVideo = $(cache).find(g);
			// console.log(crtVideo);
				if ($(numSlides[crtSlide]).hasClass('has-video')){
					$(numSlides[crtSlide]).children('.simple').remove();
					}
				},
				ytControllerPlay: function (numSlides, crtSlide){
				if ($(numSlides[crtSlide]).hasClass('has-video')){
					$('.has-video').append(cache[crtSlide]);
					}
				},
			convertURI: function(uri){
return uri.replace(/https\:\/\/www\.youtube\.com\/watch\?v=/, "https://www.youtube.com/embed/");
					},
			initializeV: function(newURI, el, k){
						$(elements.pages).append(el[k] = $("<div class='bk-pages-content has-video'>"));
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"?"+$.param(this.youtube)+"' allowfullscreen frameborder='0'>";
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
			getImage: function (){
				var a = $(this.target).toArray();
				for (var i=0; i<a.length;i++){
					this.image.push({href: $(a[i]).data('businka-image'), caption:$(a[i]).data("businka-caption"), group:$(a[i]).data("businka-group")}); 
					};
				},
			innerBuild: function() {
				$(elements.main).append(elements.pages = $("<div>").addClass("bk-pages"));
										$(elements.main).append(elements.quit = $("<div>").addClass("qt-btn"));
												$(elements.main).append(elements.next = $("<div>").addClass("bk-ui-right "+this.ui));
														$(elements.main).append(elements.prev = $("<div>").addClass("bk-ui-left "+this.ui));
									$(elements.main).append(elements.thumb = $("<div>").addClass("bk-thumbs-container"));
									console.log(elements);
							return elements;
				},
		    build: function (){
				$deferred = $.Deferred();
				if (this.fadeBg !== false && this.animationBg === 'fade'){
				 $('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+this.skin+" "+ this.loader.type));
				 // $('body').prepend($('<div class="loader '+ this.loader.type +'">').css({
					  				//	'width': $(window).width(),
									//	'height': $(window).height()
									//   }));
						   	this.innerBuild();
							console.log(this.loader.type);
							$(elements.pages).hide();
							$(elements.thumb).hide();
							$.when(this.preloader()).then(function (){
								//window.onload = function(){
								$(elements.pages).fadeIn('fast');
								$(elements.thumb).fadeIn('fast');
								});
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
						$(elements.pages).hide();
						$(elements.thumb).hide();
						$(elements.main).animate({width:"100%"}, 600, 'linear', function(){
							$(elements.pages).fadeIn(1000);
							$(elements.thumb).fadeIn(1000);
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
				 $deferred.resolve();
				 return $deferred.promise();
				 },
			
			show: function (opt, src){
			 var n = Object.create(Businka);
			 console.log(n.animationBg);
			 $.extend(true, n, opt);
			 $.extend(n.image, src);
			$.when(n.build()).then(function(){
				$(elements.main).removeClass(n.loader.type);
				});
				this.fixB();
			 if(src){
				 var el =[];
				 var th = [];
				 if (typeof(n.image[0]) === 'object'){	 
					 for(var k=0;k<n.image.length; k++){
						 	if(/youtu/.test(n.image[k].href)){
								var newURI = n.convertURI(n.image[k].href);
								 n.initializeV(newURI, el, k);
								console.log(cache); 
								if(n.thumb){
									$(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb video-thumb'>"));
							 		$(th[k]).css("background-image","url("+n.getVideoThumb(n.image[k].href)+")");
									}
								} 
								else {
							 $(elements.pages).append(el[k] = $("<div class='bk-pages-content'>"));
							 $(el[k]).append("<img src="+n.image[k].href+" class='bk-image'>");
							 $(el[k]).append("<div class='bk-image-caption'>"+n.image[k].caption+"</div>");
							 if (n.thumb){
							 $(elements.thumb).append(th[k] = $("<div data-index='"+k+"' class= 'bk-thumb'>"));
							 $(th[k]).css("background-image","url("+n.image[k].href+")");
							 }
								}
						 };
					 };
				 if (typeof(n.image[0]) === 'string'){
					 for(var k=0;k<n.image.length;k++){
						 $(elements.pages).append(el[k] = $("<div class='bk-pages-content'>"));
						 $(el[k]).append("<img src="+n.image[k]+" class='bk-image'/>");
						 if (n.thumb){
							 $(elements.thumb).append(th[k] = $("<div class= 'bk-thumb-wrap'>"));
							 $(th[k]).css("background-image","url("+n.image[k]+")");
							 };
						 }
					 }
				 };
		
			 this.controller();
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
				this.hidePlayers();
				$(elements.quit).bind('click', function(){$(elements.main).remove();});
				var numSlides= $('.bk-pages-content');
				var count = numSlides.length;
				var crtSlide = this.active;
				$(numSlides[crtSlide]).addClass('active'); 
				$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
				if (this.slide !== 'infinite' && crtSlide === 0){
					$(elements.prev).hide();
					};
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
					$(numSlides[crtSlide]).toggleClass('active');
					m.ytControllerPlay(numSlides, crtSlide);
					$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
					m.checkr(crtSlide,numSlides);
					});
				},
	
		 };
		 
	})();