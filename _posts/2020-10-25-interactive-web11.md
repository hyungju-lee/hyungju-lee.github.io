---
title: 9. 스크롤 UI 만들기
layout: post
date: '2020-10-25 15:12'
categories:
- js_interactive_web2
---

## 9. 스크롤 UI 만들기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step1/index.html){:target="_blank"}

`background-attachment` 속성은 편하긴하나 사파리, IE에서 심하게 떨린다.  
그리고 모바일 기기에서 작동하지 않는 경우도 있다.

`position: fixed`로 하는 것이 훨씬 안정적이고 크로스브라우징 효과도 좋다.  
아니면 모더나이즈 js로 처리해도 된다.

---

확실히 스크립트 정리는 애플 인터렉션 강좌 코드가 더 깔끔하다.

```javascript
(function () {
    var winScrollTop;
    var section = Array.prototype.slice.call(document.querySelectorAll(".interaction_section"));
    var offsetTop = [];
    var offsetBottom = [];
    var naviListBun = Array.prototype.slice.call(document.querySelectorAll(".nav_list li a"));

    var setValue = function () {
        winScrollTop = pageYOffset;
        section.forEach(function (value, index) {
            offsetTop[index] = value.offsetTop;
            offsetBottom[index] = value.offsetTop + value.getBoundingClientRect().height;
        })
    }

    var sectionActive = function (index) {
        listActive(index);
        changeText(index);
        changeColor(index);
    }

    var listActive = function (index) {
        var list = Array.prototype.slice.call(document.querySelectorAll(".nav_list li a"));
        list.forEach(function (val, index) {
            val.classList.remove("active");
        })
        list[index].classList.add("active");
    }

    var changeText = function (index) {
        var targetText = document.querySelector(".fix_tit strong");
        var list = document.querySelectorAll(".nav_list li a span");
        var getText = list[index].innerText;

        targetText.innerText = getText;
    }

    var changeColor = function (index) {
        var targetText = document.querySelector(".fix_tit");
        if (index === 1 || index === 2) {
            targetText.classList.add("black");
        } else {
            targetText.classList.remove("black");
        }
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

    var currentYPosition = function () {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) return self.pageYOffset;
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    var elmYPosition = function (eID) {
        // querySelector 는 IE8까지 지원
        // document.getElementById() 는 더 아래 버전까지 지원
        var elm = document.querySelector(eID);
        var y = elm.offsetTop;
        var node = elm;
        // position: relative 기준이 되는 부모요소로 부터의 상대적인 offsetTop값이기 때문에 아래와 같이해야된다.
        // 아아 부모에 position: relative;가 있던 없던 있으면 있는대로 아래식으로, 없으면 없는대로 body를 기준으로 잡기에 아래식으로 원하는 값을 구할 수 있다.
        // 좋은 코드네.
        // 아니면 좀 더 편하게 코드를 작성하기 위해서 getBoundingClientRect 이 메서드를 고려해보는 것도 괜찮다.
        while (node.offsetParent && node.offsetParent !== document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        }
        return y;
    }

    var smoothScroll = function (eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        return false;
    }

    var init = function () {
        setValue();
        checkInSection();
    }

    addEventListener("scroll", function () {
        winScrollTop = pageYOffset;
        checkInSection();
    })

    addEventListener("resize", function () {
        setValue();
        checkInSection();
    })

    naviListBun.forEach(function (val, i) {
        val.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScroll(this.hash);
        })
    })

    addEventListener("load", function () {
        init();
    })
})()
```