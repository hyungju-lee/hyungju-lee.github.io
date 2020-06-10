---
title: 스크롤 이벤트
layout: post
date: '2020-06-10 11:33:00'
categories:
- javascript
---

## 스크롤 이벤트

스크롤 방향을 알려주는 유용한 프로퍼티가 있다.  
바로 delta 프로퍼티이다.

```javascript
$(function(){
    // Firefox 는 mousewheel 이벤트가 없음, mousewheel 과 DOMMouseScroll 이벤트를 동시에 사용
    $("html, body").on('mousewheel DOMMouseScroll', function(e) {
        var E = e.originalEvent;
        delta = 0;

        // console.dir(e); // 이벤트가 일어나는 객체에 포함된 프로퍼티 확인
        console.dir(E); // 이벤트가 일어나는 객체의 프로터디 중에 originalEvent의 값 확인
        // console.log(E.detail); // e.originalEvent 내의 프로퍼티에 detail의 값 확인, detail 값이 6으로 나옴

        if (E.detail) {
            // Firefox의 DOMMouseScroll 이벤트 사용시
            // 마우스휠을 내릴 때 detail 값이 6 또는 3이 나온다. 버전마다 다르다.
            // 때문에 120으로 맞춰줄 필요가 있다.
            delta = E.detail * (120 / Math.abs(E.detail));
            console.log(delta);

            // $('body').text(delta);
        }else{
            // 익스, 크롬, 사파리, 오페라의 mousewheel 이벤트 사용시
            // 마우스휠을 내릴 때 wheelDelta 값이 -120이 나온다.
            delta = E.wheelDelta;
            console.log(delta);
            // $('body').text(delta);
        };
    });
});
```