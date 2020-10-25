---
title: 7. 반응형 모바일버전 작성하기
layout: post
date: '2020-10-25 10:25'
categories:
- js_interactive_web2
---

## 7. 반응형 모바일버전 작성하기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step3/index.html){:target="_blank"}

```css
@media only screen and (max-width: 1024px) {
    .interaction_box h2 {font-size:32px;}
    
    .fix_motion .fix_wrap {height: 3000px;} /* 모바일 버전에서 스크롤 거리를 설정함 */
    
    .fix_motion .fix_wrap .tit {font-size:54px; margin:auto;}
    .fix_motion .fix_wrap .text_box {float:none; position: sticky; position: -webkit-sticky; left:0; top:0; z-index:50; width: 100%; padding-top:100px;}
    .fix_motion .fix_wrap .text_box p {position:absolute; left:0; top:100px; width: 100%; max-width:100%; padding:0 20px; font-size:18px; text-align: center; box-sizing: border-box; opacity: 0; transition:opacity .5s;}
    .fix_motion .fix_wrap .text_box p.active {opacity: 1;}
    .fix_motion .fix_wrap .text_box p.txt02 {margin-top:0;}
    .fix_motion .fix_wrap .text_box p.txt03 {margin-top:;}
    .fix_motion .fix_wrap .text_box p.txt04 {margin-top:; margin-bottom:0;}
    
    .fix_motion .fix_wrap .device_fix {top: calc(100vh - 360px); width: 100%;}
    .fix_motion .fix_wrap .device_fix .watch_img {width: 160px; height: 272px;}
    .fix_motion .fix_wrap .device_fix .watch_img .slide_wrap {top: 66px; width: 120px; height: 146px;}
    .fix_motion .fix_wrap .device_fix .watch_img .slide_wrap .sldie {width: 480px;}
    .fix_motion .fix_wrap .device_fix .watch_img .slide_wrap .sldie figure {width:120px;}
}
```

모바일 버전에선 스크롤 거리를 직접 `height: 3000px`로 설정했다.  
그 이유는 모바일에서는 텍스트들이 `position: absolute`로 설정되어있기 때문이다.

```javascript
var isMobile; // 화면사이즈 체크 변수

function scrollFunc() { //스크롤할때 실행될 함수
    setProperty(); //스크롤할때 변할 값들을 셋팅해주는 함수
    if (isMobile) { //모바일일 경우 다르게 처리하도록
        contentInMobile(); //모바일 배경이미지와 텍스트를 처리하는 함수
    } else {
        contentIn(); //pc 배경이미지와 텍스트를 처리하는 함수
    }
}

function setProperty() { //스크롤할때 변할 값들을 셋팅해주는 함수
    isMobile = $(window).width() <= 1024 ? true : false;
    scrollHeight = scrollBody.height(); // 스크롤 높이
    sectionOffsetTop = scrollBody.offset().top; //섹션의 오프셋 탑 변수

    scrollRealHeight = (scrollHeight - $(window).height()); //실제로 스크롤해야될 높이값을 구합니다
    winScrollTop = $(window).scrollTop(); //스크롤바의 현재 위치를 구합니다
    sectionScrolTop = winScrollTop - sectionOffsetTop

    scrollPerecnt = sectionScrolTop / scrollRealHeight; // 스크롤 / 스크롤 길이로 비율을 구합니다
    percent = scrollPerecnt * 100; //백분율을 구합니다
}

function contentInMobile() { //섹션 진입후 처리될 기능정의

    var deviceImg = $('.device_fix .slide_wrap figure');
    var imgWidth = deviceImg.width();

    if (percent >= 5 && percent < 25) {
        imageChange(imgWidth * 0); //(이미지넓이 x 이미지 인덱스) 이미지가 이동할 값을 넘겨줍니다
        $('.fix_motion .text_box p').removeClass('active');
        $('.fix_motion .text_box .txt01').addClass('active');
    }

    if (percent >= 25 && percent < 45) {
        imageChange(imgWidth * 1); //(이미지넓이 x 이미지 인덱스) 이미지가 이동할 값을 넘겨줍니다
        $('.fix_motion .text_box p').removeClass('active');
        $('.fix_motion .text_box .txt02').addClass('active');
    }

    if (percent >= 45 && percent < 65) {
        imageChange(imgWidth * 2); //(이미지넓이 x 이미지 인덱스) 이미지가 이동할 값을 넘겨줍니다
        $('.fix_motion .text_box p').removeClass('active');
        $('.fix_motion .text_box .txt03').addClass('active');
    }

    if (percent >= 65 && percent <= 85) {
        imageChange(imgWidth * 3); //(이미지넓이 x 이미지 인덱스) 이미지가 이동할 값을 넘겨줍니다
        $('.fix_motion .text_box p').removeClass('active');
        $('.fix_motion .text_box .txt04').addClass('active');
    }

    if (percent > 85 || percent < 5) {
        imageChange(imgWidth * 3); //(이미지넓이 x 이미지 인덱스) 이미지가 이동할 값을 넘겨줍니다
        $('.fix_motion .text_box p').removeClass('active');
    }
}

$(window).on("resize", function () {
    scrollFunc(); //스크롤할때 변할 값들을 셋팅해주는 함수
});
```