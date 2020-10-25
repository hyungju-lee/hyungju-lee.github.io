---
title: 2. CSS 애니메이션과 키프레임에 대한 이해
layout: post
date: '2020-10-17 15:27'
categories:
- js_interactive_web2
---

## 2. CSS 애니메이션과 키프레임에 대한 이해

* [CSS 애니메이션과 키프레임에 대한 이해](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step2/index.html){:target="_blank"}

```css
.model {width:400px; height: 400px; margin:0 auto; background-color: #2f9c0a}
.model {
animation-name: move_model;
animation-duration: 4s; /*한번 재생걸리는시간*/
animation-delay: 0s; /*애니메이션 지연*/
animation-direction: alternate; /* 애니메이션 재생방향 alternate :순방향, reverse: 역방향*/
animation-iteration-count: infinite; /* 애니메이션 재생횟수 infinite 무한*/
animation-play-state: paused; /* 애니메이션 재생여부  running :재생 (기본값), paused(애니메이션정지)*/
animation-timing-function: linear; /*애니메이션 가속도 설정 linear, ease, ease-in, ease-out, custom 등*/
animation-fill-mode: both; /* forwards:애니메이션이 끝날 때 요소의 마지막 키 프레임의 스타일 값을 유지, backwards:첫 번째 키 프레임에 의해 설정된 스타일 값을 얻음, both:애니메이션이 시작되기 전에 첫 번째 키 프레임에서 설정 한 스타일 값을 가져 오도록하고 애니메이션이 끝날 때 마지막 키 프레임의 스타일 값을 유지 */
}
.model.active {
    animation-play-state: running;
}

@keyframes move_model {
    0%{
        transform:translate(-200px,0px);
    }
    50% {
    	transform:translate(200px,0px);
    }
    100%{
        transform:translate(600px, 200px);
    }
}
```

* <button data-toggle="collapse" data-target="#jQuery">jQuery</button>

{:.collapse #jQuery}
```javascript
$(function(){
    setTimeout(function(){
        $('.model').addClass('active');
    },2000);
});
```

* <button data-toggle="collapse" data-target="#javaScript">javaScript</button>

{:.collapse #javaScript}
```javascript
(function () {
    setTimeout(function () {
        document.querySelector(".model").classList.add("active");
    }, 2000)
})()
```

`animation-fill-mode`의 `both` 속성, 이번에 제대로 알게된 것 같다.  
앞으로 이 개념 유의하면서 사용하도록 하자.

위와 같은 개념으로 스크롤 위치값에 따라 애니메이션을 구현할 것이다.