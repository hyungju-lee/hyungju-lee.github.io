---
title: 모바일 처리 및 최종 결과물 확인하기
layout: post
date: '2020-10-18 12:11'
categories:
- js_interactive_web2
---

## 모바일 처리 및 최종 결과물 확인하기

* [모바일 처리 및 최종 결과물 확인하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step4/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#html">html</button>

{:.collapse #html}
```html
<div class="wrap">
    <div class="motion_area">
        <div class="bg one active"></div>
        <div class="bg two"></div>
        <div class="bg three"></div>
        <div class="bg four"></div>

        <div class="motion_rope"></div>
        <div class="motion_object">
            <div class="box"></div>
            <div class="box_right"></div>
        </div>
        <div class="motion_moon"></div>
    </div>
</div>
```

* <button data-toggle="collapse" data-target="#css">css</button>

{:.collapse #css}
```css
.motion_object {position: fixed; left:10%; top:100px; z-index:30; width:300px; will-change: transform;}
.motion_object img {width: 100%;}
.motion_object div {position: absolute; top:0; left:50%; margin-left:-150px; width:300px; font-size:0;}
.motion_object .box {width:200px; height:200px; z-index:20; background-color: #00b8ff}
.motion_object .box_right {width: 30px;height:30px; background-color:#691c46;z-index:10; transform-origin: 199px 163px;  -webkit-transform-origin: 199px 163px; -moz-transform-origin: 199px 163px; -o-transform-origin: 199px 163px; -ms-transform-origin: 199px 163px;}
.motion_object .box_right {
animation-name: hand_move;
animation-duration: .8s; /*한번 재생걸리는시간*/
animation-delay: 0s; /*애니메이션 지연*/
animation-direction: alternate; /* 애니메이션 재생방향 alternate :순방향, reverse: 역방향*/
animation-iteration-count: infinite; /* 애니메이션 재생횟수 infinite 무한*/
animation-play-state: running; /* 애니메이션 재생여부  running :재생 (기본값), paused(애니메이션정지)*/
animation-timing-function: linear; /*애니메이션 가속도 설정 linear, ease, ease-in, ease-out, custom 등*/
animation-fill-mode: both;
}

@keyframes hand_move {
    0%{
        transform:rotate(-14deg);
    }
    100%{
        transform:rotate(4deg);
    }
}

@-webkit-keyframes hand_move {
    0%{
        -webkit-transform:rotate(-14deg);
    }
    100%{
        -webkit-transform:rotate(4deg);
    }
}

/* 스크롤 배경 만들기 */
.motion_area {position:relative; width:100%; height:6000px; background-color:#000;}
.motion_area .bg {position: absolute; left:0; top:0; width: 100%; height: 100%; opacity:0; transition:opacity .5s;}
.motion_area .bg.one {background-color: #50bdf3} /* 아침 */
.motion_area .bg.two {background-color: #358ccb} /* 점심 */
.motion_area .bg.three {background-color: #3535ff} /* 이른저녁 */
.motion_area .bg.four {background-color: #222222} /* 밤 */
.motion_area .bg.active {opacity: 1;}
.motion_area .motion_rope {position: fixed; left:10%; top:0; z-index:20; width:20px; height: 100%; background-color: rosybrown}
.motion_area .motion_moon {visibility:hidden; position:fixed; right:100px; top:100px; z-index:20; width:200px; height: 200px; border-radius: 50%; background-color: yellow; opacity: 0; transform:translateY(-100px); -webkit-transform:translateY(-100px); -moz-transform:translateY(-100px); -o-transform:translateY(-100px); -ms-transform:translateY(-100px); transition:1s;}
.motion_area .motion_moon.active {visibility:visible; opacity:1; transform:translateY(0px); -webkit-transform:translateY(0px); -moz-transform:translateY(0px); -o-transform:translateY(0px); -ms-transform:translateY(0px);}

@media only screen and (max-width: 767px) {
.motion_area .motion_moon {right:20px; width:100px;}
.motion_object {top:calc(100vh - 473px);} /* 모바일에서는 스크롤 속도가 빠르기 때문에 패럴요소가 움직이는 거리가 길경우 떨림 현상이 생길 수 있으므로 픽스드 처리합니다. */
}
```

* <button data-toggle="collapse" data-target="#jQuery">jQuery</button>

{:.collapse #jQuery}
```javascript
$(function(){

    /*변수및 요소 선언*/
    var scrollBody = $('.motion_area'); //부모 스크롤 엘리먼트
    var parallaxDistance = 210; // 패럴럭스 요소가 움직이는 거리 조절

    /*움직일 요소들*/
    var bgContent = scrollBody.find('.bg'); //변수에 모션그래픽 캐릭터를 지정합니다.
    var objectBody = scrollBody.find('.motion_object'); //변수에 모션그래픽 캐릭터를 지정합니다.
    var moonBody = scrollBody.find('.motion_moon'); // 변수에 달님을 지정합니다.

    /*스크롤할때 변해야 할 값들*/
    var scrollHeight; // 스크롤 높이
    var scrollRealHeight; //실제로 스크롤해야될 높이를 담을 변수를 선업합니다
    var winScrollTop; // 스크롤바의 높이를 담을 변수를 선업합니다
    var percent; // 스크롤 백분율값을 담을 변수를 선업합니다
    var moveDistance; // 패럴럭스 요소가 움직일 거리를 담을 변수 선업합니다

    function setProperty(){ // 스크롤할때 변할 값들을 셋팅해주는 함수

        scrollHeight = scrollBody.height(); // 스크롤 높이
        scrollRealHeight = (scrollHeight - $(window).height()); //실제로 스크롤해야될 높이값을 구합니다
        winScrollTop = $(window).scrollTop(); //스크롤바의 현재 위치를 구합니다
        var scrollPerecnt = winScrollTop / scrollRealHeight; //거리와 현재 위치를 기준으로 비율을 구합니다
        percent = scrollPerecnt * 100; //백분율 구하기
        moveDistance = scrollPerecnt * parallaxDistance; //패럴럭스 요소가 움직일 거리 실제 높이에 백분율값을 곱하고 시간차 움직임을 위해 패럴러스 거리값을 곱합니다.


    }

    function motionFunc(){ // 스크롤할때 계속 호출될 모션 함수 선언

        setProperty(); // 스크롤할때 변해야할 값들의 변수를 선언
        changeBackgound(); //백그라운드를 바꿔주는 함수
        parallaxMove(); //캐럭터 패럴럭스 움직임을 처리해주는 함수

    }

    function changeBackgound(){//해당 높이가 됐을때 백그라운드를 바꿔주는 함수
        if(percent < 25){
            setBackground(0);
        }else if(percent >= 25 && percent < 50){
            setBackground(1);
        }else if(percent >= 50 && percent < 75){
            setBackground(2);
            moonBody.removeClass('active'); //달님 퇴장
        }else if(percent >= 75 && percent < 100){
            setBackground(3);
            moonBody.addClass('active'); //달님 등장

        }
    }

    function setBackground(index){ // 필요한 백그라운드 이미지로 교체해주는 함수

        bgContent.removeClass('active');
        bgContent.eq(index).addClass('active');
    }

    function parallaxMove(){ //캐럭터 패럴럭스 움직임을 처리해주는 함수
        objectBody.css({ // 계산된 값을 css를 이용해 적용합니다
            transform : 'translate(0px,'+ moveDistance +'px)'
        });
    }

    function init(){ //최초 한번실행
        motionFunc();
    }

    $(window).on("scroll resize", function(e){ //스크롤 이벤트 바인딩
        motionFunc();
    })

    init(); //start


});
```

* <button data-toggle="collapse" data-target="#javaScript">javaScript</button>

{:.collapse #javaScript}
```javascript
(function () {
    var scrollBody = document.querySelector(".motion_area");
    var parallaxDistance = 210;
    var bgContent = scrollBody.querySelectorAll(".bg");
    var objectBody = scrollBody.querySelector(".motion_object");
    var moonBody = scrollBody.querySelector(".motion_moon");
    var scrollHeight;
    var scrollRealHeight;
    var winScrollTop;
    var percent;
    var moveDistance;

    var setProperty = function () {
        scrollHeight = scrollBody.offsetHeight;
        scrollRealHeight = scrollHeight - innerHeight;
        winScrollTop = pageYOffset;
        var scrollPerecnt = winScrollTop / scrollRealHeight;
        percent = scrollPerecnt * 100;
        moveDistance = scrollPerecnt * parallaxDistance;
    }

    var setBackground = function (index) {
        bgContent.forEach(function (el) {
            el.classList.remove("active");
        })
        bgContent[index].classList.add("active");
    }

    var changeBackgound = function () {
        if (percent < 25) {
            setBackground(0);
        } else if (percent >= 25 && percent < 50) {
            setBackground(1);
        } else if (percent >= 50 && percent < 75) {
            setBackground(2);
            moonBody.classList.remove('active'); //달님 퇴장
        } else if (percent >= 75 && percent < 100) {
            setBackground(3);
            moonBody.classList.add('active'); //달님 등장
        }
    }

    var parallaxMove = function () {
        objectBody.style.transform = 'translate(0px,'+ moveDistance +'px)';
    }

    var motionFunc = function () {
        setProperty();
        changeBackgound();
        parallaxMove();
    }

    var init = function () {
        motionFunc();
    }

    init();
    addEventListener("scroll", function () {
        motionFunc();
    })
    addEventListener("resize", function () {
        motionFunc();
    })
})()
```