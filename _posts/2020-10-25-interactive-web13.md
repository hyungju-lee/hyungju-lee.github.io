---
title: 9. CSS 3D 모델 만들기
layout: post
date: '2020-10-25 17:52'
categories:
- js_interactive_web2
---

## 9. CSS 3D 모델 만들기

* [참고링크1](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/cube.html){:target="_blank"}
* [참고링크2](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/index.html){:target="_blank"}

육면체 구현 할땐 `translateZ` 값과 `rotate`값을 활용한다.  
부모요소엔 `transform-style: preserve-3d` 그리고 그 한단계 더 부모요소엔 `perspective: 600px`을 주어 육면체가 적용되었는지 확인한다.

```css
/* 큐브 css */
.cube_wrap {width: 400px; height: 400px; perspective: 600px}
.cube_wrap .cube_box {position: relative; height: 100%; transform-style: preserve-3d}
.cube_wrap .cube_box .cube_face {position: absolute; left: 0; top: 0; width: 100%; height: 100%; border: 3px solid #fff}
.cube_wrap .cube_box .cube_face.front {transform: rotateY(0deg) translateZ(200px)} /* left, right에 위치하는 요소의 너비 400px, 그거의 반값인 200px만큼 translateZ값으로 준다. */
.cube_wrap .cube_box .cube_face.back {transform: rotateY(180deg) translateZ(200px)}
.cube_wrap .cube_box .cube_face.left {transform: rotateY(-90deg) translateZ(200px)}
.cube_wrap .cube_box .cube_face.right {transform: rotateY(90deg) translateZ(200px)}
.cube_wrap .cube_box .cube_face.top {transform: rotateX(90deg) translateZ(200px)}
.cube_wrap .cube_box .cube_face.bottom {transform: rotateX(-90deg) translateZ(200px)}
```

```javascript
var parallax = function () {
    var scrollHeight = document.body.scrollHeight;
    var scrollRealHeight = scrollHeight - innerHeight;
    var scrollPercent = winScrollTop / scrollRealHeight;
    var parallaxDistance = 1100;
    var moveDistance = parallaxDistance * scrollPercent;

    document.querySelector(".cube_box").style.transform = "rotateX("+ moveDistance +"deg) rotateY("+ moveDistance +"deg)"
}

var changeColor = function (index) {
    var targetText = document.querySelector(".fix_tit");
    if (index === 1 || index === 2) {
        targetText.classList.add("black");
        document.querySelectorAll(".cube_face").forEach(function (val, i) {
            val.style.borderColor = "rgba(0, 0, 0, 0.6)";
        })
    } else {
        targetText.classList.remove("black");
        document.querySelectorAll(".cube_face").forEach(function (val, i) {
            val.style.borderColor = "#fff";
        })
    }
}
```