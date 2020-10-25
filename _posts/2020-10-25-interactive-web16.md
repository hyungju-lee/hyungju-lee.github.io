---
title: 9. 도전과제 - 단 한번 실행되어야할 함수와 계속 실행되어야할 함수 분리
layout: post
date: '2020-10-25 20:22'
categories:
- js_interactive_web2
---

## 9. 도전과제 - 단 한번 실행되어야할 함수와 계속 실행되어야할 함수 분리

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step5/index.html){:target="_blank"}

```javascript
var sectionActive = function (index) {
    listActive(index);
    changeText(index);
    changeColor(index);
    changeImage(index);
    parallax();
}

var checkInSection = function () {
    switch (true) {
        case (winScrollTop >= offsetTop[0] && offsetBottom[0] > winScrollTop) :
            sectionActive(0);
            break
        case (winScrollTop >= offsetTop[1] && offsetBottom[1] > winScrollTop) :
            sectionActive(1);
            break
        case (winScrollTop >= offsetTop[2] && offsetBottom[2] > winScrollTop) :
            sectionActive(2);
            break
        case (winScrollTop >= offsetTop[3] && offsetBottom[3] > winScrollTop) :
            sectionActive(3);
            break
        case (winScrollTop >= offsetTop[4] && offsetBottom[4] > winScrollTop) :
            sectionActive(4);
            break
        case (winScrollTop >= offsetTop[5] && offsetBottom[5] > winScrollTop) :
            sectionActive(5);
            break
        case (winScrollTop >= offsetTop[6] && offsetBottom[6] > winScrollTop) :
            sectionActive(6);
            break
        case (winScrollTop >= offsetTop[7] && offsetBottom[7] > winScrollTop) :
            sectionActive(7);
            break
        default :
            break
    }
}

addEventListener("scroll", function () {
    winScrollTop = pageYOffset;
    checkInSection();
})
```

![](/static/img/interaction/image45.jpg)

스크롤할 때마다 위의 자바스크립트 함수식들이 수도없이 많이 호출됨을 보여준다.  
이 부분을 단 한번만 실행되도록 수정하도록 하겠다.  

```javascript
var currentIndex = -1;
var sectionActive = function (index) {
    if (index !== currentIndex) {
        listActive(index);
        changeText(index);
        changeColor(index);
        changeImage(index);
    }
    parallax();
    currentIndex = index;
}
```

위와 같이 바꿔주면 한번만 실행되어야할 함수식들은 한번만 실행되게 된다.