// JavaScript Document
	var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var cache = [];
var players= [];
var Businka = {};
	var	elements = {};
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
			preloader: function (){
				$deferred = $.Deferred();
				for (var q=0;q<Businka.image.length;q++){
                    $('<img src="'+Businka.image[q].href+'"/>').appendTo('body').hide();
					console.log(Businka.image.length);
					console.log(q);
					if(q===Businka.image.length-1){
						console.log('end of loop');
						$deferred.resolve();
						return $deferred.promise();
						}
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
						cache[k] = "<iframe id='player"+k+"' class='simple' src='"+newURI+"?"+$.param(Businka.youtube)+"' allowfullscreen frameborder='0'>";
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
												$(elements.main).append(elements.next = $("<div>").addClass("bk-ui-right "+Businka.ui));
														$(elements.main).append(elements.prev = $("<div>").addClass("bk-ui-left "+Businka.ui));
									$(elements.main).append(elements.thumb = $("<div>").addClass("bk-thumbs-container"));
									console.log(elements);
							return elements;
				},
		    build: function (){
				$deferred = $.Deferred();
				if (Businka.fadeBg !== false && Businka.animationBg === 'fade'){
				 $('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+Businka.skin+" "+ Businka.loader.type));
				 // $('body').prepend($('<div class="loader '+ Businka.loader.type +'">').css({
					  				//	'width': $(window).width(),
									//	'height': $(window).height()
									//   }));
						   	Businka.innerBuild();
							$(elements.pages).hide();
							$(elements.thumb).hide();
							$.when(Businka.preloader()).then(function (){
								$(elements.pages).fadeIn('fast');
								$(elements.thumb).fadeIn('fast');
								});
							}
				else if (Businka.animationBg === 'slide-left' || Businka.animationBg === 'slide-right') 
				{
					$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+Businka.skin));
					if (Businka.animationBg === 'slide-left'){
					$(elements.main).css({"width":"0", "right":"0"});
					} else {
						$(elements.main).css({"width":"0"});
						}
						Businka.innerBuild();
						$(elements.pages).hide();
						$(elements.thumb).hide();
						$(elements.main).animate({width:"100%"}, 600, 'linear', function(){
							$(elements.pages).fadeIn(1000);
							$(elements.thumb).fadeIn(1000);
							});
	
				} 
				else if (Businka.animationBg === 'slide-top' || Businka.animationBg === 'slide-bottom')
				{
						$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+Businka.skin));
					if (Businka.animationBg === 'slide-top'){
					$(elements.main).css({"height":"0", "bottom":"0"});
					} else {
						$(elements.main).css({"height":"0"});
						}
						Businka.innerBuild();
						$(elements.pages).hide();
						$(elements.thumb).hide();
						$(elements.main).animate({height:"100%"}, 600, 'linear', function(){
							$(elements.pages).fadeIn(1000);
							$(elements.thumb).fadeIn(1000);
							});
				}
				else
				 {
					$('body').prepend(elements.main = $("<div>").addClass("bk-wrap-"+Businka.skin+" "+Businka.loader.type));
					Businka.innerBuild();
					if (Businka.loader){
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
		
			 n.controller();
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
				Businka.hidePlayers();
				$(elements.quit).bind('click', function(){$(elements.main).remove();});
				var numSlides= $('.bk-pages-content');
				var count = numSlides.length;
				var crtSlide = Businka.active;
				$(numSlides[crtSlide]).addClass('active'); 
				$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
				if (Businka.slide !== 'infinite' && crtSlide === 0){
					$(elements.prev).hide();
					};
				$(elements.next).on('click', function(){
						Businka.ytControllerStop(numSlides, crtSlide);
						$(numSlides[crtSlide]).toggleClass('active');
						$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						crtSlide++;
						$(numSlides[crtSlide]).toggleClass('active');
						Businka.ytControllerPlay(numSlides, crtSlide);
						$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						Businka.checkr(crtSlide, numSlides);
				});
				$(elements.prev).on('click', function(){
						Businka.ytControllerStop(numSlides, crtSlide);
						$(numSlides[crtSlide]).toggleClass('active');
						$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						crtSlide--;
						$(numSlides[crtSlide]).toggleClass('active');
						Businka.ytControllerPlay(numSlides, crtSlide);
						$('.bk-thumb[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
						Businka.checkr(crtSlide, numSlides);
				});
				$('.bk-thumb').on('click', function(){
					$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
					Businka.ytControllerStop(numSlides, crtSlide);
					$(numSlides[crtSlide]).toggleClass('active');
					crtSlide = $(this).data("index");
					$(numSlides[crtSlide]).toggleClass('active');
					Businka.ytControllerPlay(numSlides, crtSlide);
					$('[data-index="'+crtSlide+'"]').toggleClass('active-thumb');
					Businka.checkr(crtSlide,numSlides);
					});
				},
	
		 };
		 
	})();