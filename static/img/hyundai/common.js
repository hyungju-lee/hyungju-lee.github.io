/**
 *  
 *  JS  Name    : common.js
 *  Description : common
 *  author      : GGCM93
 *  since       : 2019. 10. 17.
 *  version     : 1.0
 *  Modification Information
 *     since                author                      description
 *  ===========    =====================        ===========================
 *  2019. 12. 19.      GGCM93               SR번호 : 175998 [DIVE Web] 12/19일 배포
 *  2019.10.17.    GGCM93        최초 생성
 */
var isIE = window.navigator.userAgent.indexOf('MSIE ') > -1; // IE10
	isIE = window.navigator.userAgent.indexOf('Trident/') > -1; // IE11

var isReadyScreen = false;
this.readyScreen = function(){
	if (isReadyScreen) return;
	isReadyScreen = true;

	function eventCheck() {		
		eventType = 'click';
	}
	eventCheck();			
	
	var lastScrollTop = 0;	//scroll position history
	var _scroller = $(window);

	var windowScrollingFunc = function(el) {
		var scr = _scroller; //scroll basic value
		var _scrTop = scr.scrollTop();
		var hdH = $('#wHeader').height();
		
		if ( _scrTop >=0) {
		  if ( _scrTop <= 0 ) {
			$('body').removeClass('scrolled');
			$('body').removeClass('scrollUp');
		  } else if ( _scrTop >= 0 ) {
			$('body').addClass('scrolled');
			if (_scrTop > lastScrollTop){	//scrollUP/Down
				$('body').removeClass('scrollUp');
			} else {
				$('body').addClass('scrollUp');
			}
		  }
		} else {
		  $('body').removeClass('scrolled');
		  $('body').removeClass('scrollUp');
		}
		
		lastScrollTop = _scrTop;//scroll position history
		
		//TOP버튼
		var _scrMove;
		if( $('.btn-move-top').length>0) {
			
			_scrMove  =	$('#wrap').height()*0.4;
			if ( _scrTop >= _scrMove){
				$('.btn-move-top').addClass('active');
			}else{
				$('.btn-move-top').removeClass('active');
			}
		}
	};

	windowScrollingFunc(_scroller);	//document Ready

	$(window).on('scroll',function(){
		windowScrollingFunc(_scroller);
	});
	
	//* GNB Event
	var gnbMenu = ( function() {
		var gList = $(".gnb-1depth");
		var gItem = gList.find(">li");
		var btnGnbSub = gList.find(".btn-gnb-sub");
		var gItem_mg = 50; //gItem margin value
		var gPos = new Array();
		var gWidth = new Array();
		var gOver = new Array();
		var gActive = null;
		
		var gBar = '<div class="nav-bar"></div>';
		var gBarS = $(gBar);
		$('.gnb').append(gBarS);
		gBarS.hide();

		setTimeout(function() {
			gItem.each(function() {
				var _gIdx = $(this).index();
				if(_gIdx==0) {
					gPos.push(0);
				}else{
					var prevItem = 0;
					for(var j=0;j<=(_gIdx-1);j++){
						prevItem=prevItem+parseInt(gItem.eq(j).width())+gItem_mg;
					}
					gPos.push(parseInt(prevItem));
				}
				
				gWidth.push($(this).width());
				gOver.push(false);
			});
		},400);		
		
		$(window).on("resize", function() {
			positionCheck();
		});
	
		//1depth 메뉴 위치 저장
		function positionCheck(){
			gPos = new Array();
			gWidth = new Array();
			gOver = new Array();
			gItem.each(function() {
				var _gIdx = $(this).index();
				if(_gIdx==0) {
					gPos.push(0);
				}else{
					var prevItem = 0;
					for(var j=0;j<=(_gIdx-1);j++){
						prevItem=prevItem+parseInt(gItem.eq(j).width())+gItem_mg;
					}
					gPos.push(parseInt(prevItem));
				}
				gWidth.push($(this).width());
				gOver.push(false);
			});
		}

		//마우스 오버시
		gItem.off("mouseenter.gnb focusin.gnb").on("mouseenter.gnb focusin.gnb",function() {
			var gIdx = $(this).index();
			var widthGap = 0;
			
			positionCheck();

			gActive = setTimeout(function() {
				if(gOver[gIdx] == false) {
					$('.gnb-1depth > li').find('.gnb-2depth').hide();
					$('.gnb-1depth > li').eq(gIdx).addClass('on').find('.gnb-2depth').show();
					if(gList.hasClass('bg-nav')) {
						gBarS.stop().animate({
							"width" : gWidth[gIdx]+"px",
							"left" : gPos[gIdx]
						},400);
					}else{
						gBarS.css({
							"display" : "block",
							"width" : gWidth[gIdx]+"px",
							"left" : gPos[gIdx]
						});
						gList.addClass("bg-nav");
					}
					
					gOver[gIdx] = true;
				}
			},100);
		});
		gItem.off("mouseleave.gnb").on("mouseleave.gnb",function() {
			var gIdx = $(this).index();
			
			gOver[gIdx] = false;
			$('.gnb-1depth > li').eq(gIdx).removeClass('on').find('.gnb-2depth').hide();
			clearTimeout(gActive);
			
			gBarS.css({
				"width" : gWidth[gIdx]+"px",
				"left" : gPos[gIdx]
			});
		});
		gList.off("mouseleave.gnb").on("mouseleave.gnb",function() {
			$(this).removeClass("bg-nav");
			gBarS.hide();
		});
		
		$("#wContainer").on('focusin', function() {
           gBarS.hide();
        });
	})();
	//*/
	
	//* 헤더 검색
	var btnSearchTop = ( function() {
		$('.top-head .btn-search').on(eventType, function(e){
			$('.top-search-wrap').addClass('active');			
		});
		$('.top-search-wrap .btn-search-close').on(eventType, function(e){
			$('.top-search-wrap').removeClass('active');
		});
	})();
	//*/
	
	//* 탑버튼 스크롤 효과
	var btnMoveTop = ( function() {
		$('.btn-move-top').on(eventType, function(){
			var currentYOffset = self.pageYOffset;
			var initYOffset = currentYOffset;
			var intervalId = setInterval(function(){
			  currentYOffset -= initYOffset * 0.05;
			  document.body.scrollTop = currentYOffset ;
			  document.documentElement.scrollTop = currentYOffset;
			  if(self.pageYOffset == 0){
				clearInterval(intervalId);
			  }
			}, 20);
		  });
	})();
	//*/

	//* common Tab
	var commonTab = ( function(e) {
		var clickEvent = [
			'.tab-list li'
		];
		$.fn.clickOn = function(e){
			$(this).click(function(e){
				e.preventDefault();
				var with_siblings = $(this).siblings();
				with_siblings.removeClass('current');
				$(this).addClass('current');

				var $cont_sub = $(this).closest('.tab-wrap').find('.tab-cont'),
					_cont_sub_idx = $cont_sub.length;

				if(_cont_sub_idx>0){
					var _gb = $(this).index();
					$cont_sub.removeClass('active');
					$cont_sub.eq(_gb).addClass('active');
				}
			});
		};
		$(clickEvent.join(',')).clickOn();
		
	})();
	//*/
	
	//* tab Menu
	var tabMenuWrap = ( function() {
		var $target = $('.tab-menu-wrap');
		if ($target.length > 0) {
			//페이지 리로드 없이 리스트 데이터만 변경 될 경우
			$('.tab-menu-list .btn-tmenu').on('click', function(e){
				e.preventDefault();
				$(this).parent().addClass('on').siblings().removeClass('on'); //현재 메뉴 설정
				_tabMenuIdx = $('.tab-menu-list li.on').index();
				
			});
		}
	})();
	//*/
	
	//* select Toggle
	var selectSet = ( function() {
		var $target = $('.select-set .btn-select');
		$target.on(eventType, function(){
			$(this).closest('.select-set').toggleClass('active');		
		});		
	})();
	//*/
	
	//* motion Bar ( ex : 상세페이지 app 바로가기 )
	var motionBar = ( function() {
		var $target = $('.motion-bar');
		var marginLeft = parseInt($target.find('.btn-app').css('margin-left'));
		
		var sTop;
		if($target.length>0) {
			$(window).scroll(function(e){
				sTop = $(window).scrollTop();
				//$target.find('.btn-app').css('margin-left',marginLeft - $(this).scrollLeft());
				if($('.content-detail .body-wrap').height() < $(window).height()*0.7) {
					$target.removeClass('hide').addClass('stop');
				}else{
					if(sTop >= (Math.abs( (window.innerHeight-$('.content-detail .body-wrap').offset().top) - ($('.cont-cover').height() + $('#wFooter').height() )) ) && sTop < $('#wFooter').offset().top - window.innerHeight) {
						$target.removeClass('hide stop');
					}else if(sTop >= $('#wFooter').offset().top - window.innerHeight){
						$target.addClass('stop');
					}else{
						$target.addClass('hide');
					}
				}
				
			});
		}
	})();
	//*/
};	

//* 메인 페이지
this.mainEvent = function() {
	if( $('.wMain').length>0) {
		//* promotion Banner Swiper
		var promotionSwiper = ( function() {
			var $target = $('.promotion-banner .swiper-container');
			if ($target.length > 0) {
				var _realSlide = $target.find('.swiper-slide').length;
				var libfullSlide = new Swiper('.promotion-banner .swiper-container', {
					slidesPerView : 1,
					autoplay: {
						delay: 5000
					},
					autoplayDisableOnInteraction : true,
					loop : true,
					spaceBetween: 30,
					speed: 1250,
					effect: 'fade',
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					}
				});
				if(_realSlide<=1) {
					$target.find('.swiper-pagination').hide();
					libfullSlide.autoplay.stop();
				}
			}
		})();
		//*/
	}
};
//*/

//* Space Culuture
this.libraryEvent = function(){
		
	//* library visual fullSwiper
	var libraryFullSwiper = ( function() {
		var $target = $('.library .full-swiper');
		if ($target.length > 0) {
			var libfullSlide = new Swiper('.library .full-swiper ', {
				spaceBetween: 30,
				effect: 'fade',
                pagination: {
					el: '.swiper-pagination',
					clickable: true,
                }
            });
			if($target.find('.swiper-slide').length<=1) $target.find('.swiper-pagination').hide();
		}
	})();
	//*/

	
};
//*/

//* 콘텐츠 상세
this.contentView = function(){
	
	if( $('.wDetail').length>0) {

		//* row 텍스트 더보기
		var rowBtnMore = ( function() {
			$('.row .btn-more-area').remove();
		})();
		//*/
	
	}
};
//*/

//* What's on
this.whatsOnEvent = function(){
	if( $('.wWhatson').length>0) {
		//table-type-calendar 위치
		var marginLeft = parseInt($('.monthly-table').css('margin-left'));
		$(window).on('scroll',function(){
			var _whatsScrTop = $(window).scrollTop(),
				_whatsScrBottom = $(document).height()-426;
			
			var _rightMarin = $('#calenderView').width()- $('.monthly-table').width();
			
			if (_whatsScrTop > $('#calenderView').offset().top ) {
				
				//left 경우 : $('.monthly-table').addClass('fixed').css('margin-left', marginLeft - $(this).scrollLeft());
				//right 경우
				$('.monthly-table').addClass('fixed').css('margin-left',-(marginLeft-_rightMarin)-$(this).scrollLeft());
					
				if(_whatsScrTop >= _whatsScrBottom) {
					$('.monthly-table').removeClass('fixed').css('margin-left',0);
				}
			}else{
				$('.monthly-table').removeClass('fixed').css('margin-left',0);
			}
		});
		
		var calendarClickEvent = [
			'.calendar-body td.eventday a',
			'.calendar-body td.showday a',
			'.wWhatson .btn-today'
		];
		$(calendarClickEvent.join(',')).click(function(e){
			$('.btn-move-top').click();
		});
	}
};
//*/

//* modal Pop
var $nowModal; //선택한 modal 버튼
//modal 팝업 열기
function openModalPopup(pop){
	$target = $(pop);	
	if($target.find('.modal-backdrop').length==0) $target.prepend('<div class="modal-backdrop"></div>');
	$target.addClass('show');
	$('body').addClass('fixed');
}
//modal 팝업 닫기
function hideModalPopup(pop){
	$target = $(pop);
	$target.removeClass('show');
	$('.modal-backdrop').remove();
	$target.attr('tabindex','0');
	$('body').removeClass('fixed');
	if($nowModal) $nowModal.focus();
	$nowModal='';
}
this.modalPop = function(){
	// 포커스 이동
	var modalClickEvent = [
		'.btn-share'
	];
	$(modalClickEvent.join(',')).click(function(e){
		e.preventDefault();
		if($(this).hasClass('link-review')) {
			$nowModal=$('.visit-review li').eq($(this).parent().index()).find('.link-review');
		}else{
			$nowModal=$(this);
		}
	});		
	//공통 닫기
	$('.btn-modal-close').on('click', function () {
		hideModalPopup('.modal');
	});
};
//*/

$(document).ready(function() {
	readyScreen(); //공통
	mainEvent(); //메인페이지
    contentView(); //콘텐츠 상세
	whatsOnEvent(); //What's on
	modalPop() //popup
	libraryEvent(); //space culute
});

(function(){

})();


//* accordion Event
var eventAccodion = function(idx) {
	var $this = $('.accordion-item').eq(idx),
		$thisWrap = $this.closest('.accordion-wrap'),
		$thisDesc = $this.find('.acc-desc');
		if ($this.hasClass('on')) {
			$this.removeClass('on');
			$thisDesc.stop().animate({'height' : 0},200);
		}else{
			$thisWrap.find('.acc-desc').stop().animate({'height' : 0},200);
			$this.addClass('on').siblings().removeClass('on');
			$thisDesc.stop().animate({'height' : $thisDesc.find('.inner').outerHeight()},200);
		}	
}
//*/

//* full Pop
//full 팝업 열기
function openFullPop(pop){
	$target = $(pop);
	$('body').addClass('fixed');
	$target.addClass('show').attr('tabindex','-1').focus();
	$target.stop().animate({'top' : '0','bottom' : '0'},150);
}
//full Close
function closeFullPop(pop){
	$target = $(pop);
	$('body').removeClass('fixed');
	$target.stop().animate({'top' : '100%','bottom' : '-100%'},150);
	$target.delay(300).removeClass('show').attr('tabindex','0');
}
//*/

//* 메인 팝업
//쿠키값 조회
function getCookie(c_name){
	try {
		var i,x,y,cookies=document.cookie.split(";");
		for (i=0;i<cookies.length;i++) {
			x=cookies[i].substr(0,cookies[i].indexOf("="));
			y=cookies[i].substr(cookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			
			if (x==c_name) {
				if (decodeURIComponent) return decodeURIComponent(y);
			}        
		}
	} catch (e) {}
}
//쿠키값 설정
function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=encodeURIComponent(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value +'; path=/ ';
}
//*/


//* 큐레이터 안내
function curatList(objAnchor){

	if(!objAnchor) objAnchor=0;

	var _listNum = $('.curat-list > li:not(.curat-cont)').find('.curat-box').index(objAnchor);
	
	//var $currentArtist = $('.curat-list > li:not(.curat-cont)').eq(_listNum).find('.artist').html();
	$('.curat-list > li').eq(_listNum).addClass('on').siblings().removeClass('on');
	var isAniCurate = false;
	if(isAniCurate) return;
	isAniCurate = true;

	var _sectionIdx = 4, //한줄당 아티스트
		//_curatSpaceValue = 7, //padding value
		_curatLine = Math.ceil($('.curat-list > li').size()/_sectionIdx),
		_artistHeight = 0,
		_curatHeight = 0,
		_putListIdx = (Math.floor(_listNum/_sectionIdx)+1);
		if($('.curat-list .curat-box').size() < (_putListIdx+1)) {
			_putListIdx = $('.curat-list > li:not(.curat-cont)').size() - 1;
		}


	function curatHeight() {
		if($('.curat-list > li.on').size()>0) _artistHeight =  $('.curat-list > li.on .curat-cont').outerHeight();
		
		_curatHeight = ($('.curat-list > li:not(.on)').outerHeight()*_curatLine);
		_curatHeight = _curatHeight + _artistHeight;
		$('.curat-list').css({height:_curatHeight});
	}
	curatHeight();
	
	for (var i=1;i<=_curatLine;i++) {
		var _myHeight = $('.curat-list > li:not(.on)').outerHeight()*i;
		if(i>=_putListIdx) _myHeight = _myHeight + _artistHeight;
		for (var j=0;j<_sectionIdx;j++) {
			$('.curat-list > li').eq((_sectionIdx*i)+j).css({"margin-top":_myHeight});
		}
	}	
}
//*/

//* 방문인증 
$(window).load(function() {
	visitReviewAni();
});
function visitReviewAni(){
	$target = $('.visit-review .visit-review-list');

	//스와이프
	function modalVisit(idx) {
		var visitPopSlide = new Swiper('.modal .swiper-visit-wrap', {  
			navigation: {
				nextEl : '.swiper-button-next',
				prevEl : '.swiper-button-prev',
			},
			initialSlide : idx,
			on: {
			}
		});	
	}
	var _targetSize = 0;
	var _fullWidth = $(document).width();
	 
	$target.find('> li').each(function(idx, element) {
		var _thisWidth = $(this).find('.review-img-area .img-responsive').width()+4;
		//$(this).css("width",_thisWidth);
		_targetSize = _targetSize+_thisWidth;
	});
	_targetSize = _targetSize+2
	
	//keyframe
	if (_targetSize>=_fullWidth*0.5) {
		$target.css('width',_targetSize);
		$target.css('min-width','auto');
		var reviewHtml = $('.visit-review .review').html();

		function playRuning() {
			$('.visit-review-list').css('animation-play-state','running');
		 }
		function playStop() {
			$('.visit-review-list').css('animation-play-state','paused');
		 }
		$('.visit-review .review').html(reviewHtml+reviewHtml+reviewHtml);

		$.keyframe.define([
			{
			  name: 'animationBefore',
			  '0%': {
				'transform': 'translate3d(0, 0, 0)'
			  },
			  '50%': {
				'transform': 'translate3d(-'+_targetSize+'px, 0, 0)'
			  },
			  '100%': {
				'transform': 'translate3d(0, 0, 0)'
			  }
			},{
			name: 'animationMid',
			  '0%': {
				'transform': 'translate3d('+_targetSize+'px, 0, 0)'
			  },
			  '50%': {
				'transform': 'translate3d(0, 0, 0)'
			  },
			  '100%': {
				'transform': 'translate3d(-'+_targetSize+'px, 0, 0)'
			  }
			},{
			name: 'animationAfter',
			 '0%': {
				'transform': 'translate3d('+_targetSize*2+'px, 0, 0)'
			  },
			  '50%': {
				'transform': 'translate3d('+_targetSize+'px, 0, 0)'
			  },
			  '100%': {
				'transform': 'translate3d(0, 0, 0)'
			  }
			}
		]);

		$('.visit-review-list').eq(0).playKeyframe({
			name: 'animationBefore',
			duration: "430s",
			timingFunction: 'linear',
			iterationCount: 'infinite'
		});
		$('.visit-review-list').eq(1).playKeyframe({
			name: 'animationMid',
			duration: "430s",
			timingFunction: 'linear',
			iterationCount: 'infinite'
		});
		$('.visit-review-list').eq(2).playKeyframe({
			name: 'animationAfter',
			duration: "430s",
			timingFunction: 'linear',
			iterationCount: 'infinite'
		});
		$('.visit-review-list .link-review').on('click', function(e){
			playStop();
		});
		$('.modal-gallery .btn-modal-close').on('click', function(e){
			playRuning();
		});
	}else{
		$target.css('text-align','center');
	}
	//modal 열기
	$('.visit-review-list .link-review').on('click', function(e){
		e.preventDefault();
		openModalPopup('#reviewPopup');	
		modalVisit($(this).parent().index()); //스와이프 실행
	});
	//modal 닫기
	$('#reviewPopup .btn-modal-close').on('click', function(e){
		hideModalPopup('#reviewPopup');	
	});
}
//*/


//* library Main what's On
function libraryWhatson(){
	//size setting
	$target = $('.library-whatson .view-type-list');
	var _targetSize = 320;
	$target.css('width',_targetSize*$target.find('> li').size());
	//5개부터 swiper 실행
	if ($target.find('> li').size()>=5) {
		var popSlide = new Swiper('.swiper-whatson-wrap', {    
			slidesPerView: 4,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			}
		});	
	}
}
//*/

//* Detial Page Tiele Motion
function pageLocation() {
			//GET VARIABLES
				var $articleContent = $('.wDetail .content-detail'),
						panelHeight = 100,
						articleOffset = $articleContent.offset();
				var _headerHeight = $('.wDetail .cont-header').height(),
					_articleHeight = $articleContent.height(),
					_windowHeight = $(window).height(),
					_articleOffsetTop = articleOffset.top - panelHeight;
			
			//ON SCROLL
			$(window).on('scroll ready load resize resizeEnd', function(event) {
				var scrollTop = $(window).scrollTop(),
					scrollBottom = $(document).height() - $(window).height()-$(window).scrollTop(),
					scrollProgress = ($(document).height() -  scrollBottom )/$(document).height();

				// HEADER ANIMATION
				if (scrollTop < _headerHeight) {			
					$('body').removeClass('contentPart').removeClass('bottomPart');
				} else if (scrollTop >= _headerHeight) {
					$('body').addClass('contentPart').removeClass('bottomPart');
				}
				
				if (scrollProgress >= 0 && scrollProgress <= 1) {
					$('.page-location .progress').removeClass('hide').css('width', 100 * scrollProgress + "%");
				} else if (scrollProgress > 1) {
					//$('body').removeClass('contentPart'); //.addClass('bottomPart');
				} else if (scrollProgress < 0) {
					$('.page-location .progress').addClass('hide').css('width', "0%");
				}
			});
			
			//HOVER
			$('.page-location').mouseenter(function(){
				$('body').addClass('location-over');
			});
			$('.wHeader').mouseleave(function(){
				$('body').removeClass('location-over');
			});
}
//*/
