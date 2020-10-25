---
title: 9. 도전과제 - 천천히 등장하는 배경색 구현, 섹션에 도착시 3D 모델이 회전하도록 구현
layout: post
date: '2020-10-25 20:35'
categories:
- js_interactive_web2
---

## 9. 도전과제 - 천천히 등장하는 배경색 구현, 섹션에 도착시 3D 모델이 회전하도록 구현

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step6/index.html){:target="_blank"}

```css
#a {height: 3000px}
.cube_wrap .cube_box.side {transform: rotateY(90deg) scale(1.5);}
.cube_wrap .cube_box.upper_side {transform: rotateX(90deg) scale(1.1);}
.cube_wrap .cube_box.back {transform: rotateY(-180deg) scale(1.5);}
```

```javascript
var parallax = function () {
    var scrollHeight = document.querySelector("#a").offsetHeight;
    var scrollRealHeight = scrollHeight - innerHeight;
    var scrollPercent = winScrollTop / scrollRealHeight;
    var opacityValue = Math.min(1, scrollPercent);

    document.querySelector(".dim").style.opacity = opacityValue;
}
```