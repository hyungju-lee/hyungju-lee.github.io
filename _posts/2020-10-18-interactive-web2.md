---
title: 3. 간단한 애니메이션 모션그래픽 만들기
layout: post
date: '2020-10-18 08:51'
categories:
- js_interactive_web2
---

## 3. 간단한 애니메이션 모션그래픽 만들기

* [간단한 애니메이션 모션그래픽 만들기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step1/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#css">css</button>

`transform-origin` 속성 활용

{:.collapse #css}
```css
.motion .box_right {width: 30px;height:30px; background-color:#691c46;z-index:10; transform-origin: 199px 163px;  -webkit-transform-origin: 199px 163px; -moz-transform-origin: 199px 163px; -o-transform-origin: 199px 163px; -ms-transform-origin: 199px 163px;}
.motion .box_right {
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
        transform:rotate(-140deg);
    }
    100%{
        transform:rotate(4deg);
    }
}
```