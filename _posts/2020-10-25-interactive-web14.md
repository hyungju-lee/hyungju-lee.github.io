---
title: 9. 3D 모델에 사물입히기
layout: post
date: '2020-10-25 18:42'
categories:
- js_interactive_web2
---

## 9. 3D 모델에 사물입히기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step3/index.html){:target="_blank"}

```css
/* 큐브 css (section10-2 추가) */
.cube_wrap {position: fixed; top:50%; left:50%; width: 294px; height: 582px; perspective: 600px; transform: translate(-50%, -50%)}
.cube_wrap .cube_box {position: relative; height: 100%; transform-style: preserve-3d}
.cube_wrap .cube_box .cube_face {position: absolute; left: 0; top: 0; width: 100%; height: 100%;}
.cube_wrap .cube_box .cube_face.front {background:url("../images/iphone_front.png") no-repeat; transform: rotateY(0deg) translateZ(19px)} /* left, right에 위치하는 요소의 너비 400px, 그거의 반값인 200px만큼 translateZ값으로 준다. */
.cube_wrap .cube_box .cube_face.back {background:url("../images/iphone_back.png") no-repeat; transform: rotateY(180deg) translateZ(19px)}
.cube_wrap .cube_box .cube_face.left {left:50%;width:38px;height:582px;margin-left:-19px;background:url("../images/iphone_left.png") no-repeat; transform: rotateY(-90deg) translateZ(147px)}
.cube_wrap .cube_box .cube_face.right {left:50%;width:38px;height:582px;margin-left:-19px;background:url("../images/iphone_right.png") no-repeat; transform: rotateY(90deg) translateZ(147px)}
.cube_wrap .cube_box .cube_face.top {top:50%;width:294px;height:38px;margin-top:-19px;background:url("../images/iphone_top.png") no-repeat; transform: rotateX(90deg) translateZ(291px)}
.cube_wrap .cube_box .cube_face.bottom {top:50%;width:294px;height:38px;margin-top:-19px;background:url("../images/iphone_bottom.png") no-repeat; transform: rotateX(-90deg) translateZ(291px)}
```

```javascript
var parallax = function () {
    var scrollHeight = document.body.scrollHeight;
    var scrollRealHeight = scrollHeight - innerHeight;
    var scrollPercent = winScrollTop / scrollRealHeight;
    var parallaxDistance = 1100;
    var moveDistance = parallaxDistance * scrollPercent;

    document.querySelector(".cube_box").style.transform = "rotateX("+ moveDistance +"deg) rotateY("+ moveDistance +"deg) translateZ(-200px)";
    document.querySelector(".fix_tit").style.transform = "rotateX("+ moveDistance +"deg) rotateY("+ moveDistance +"deg) translate3d(-50%, -50%, -200px)";
}
```