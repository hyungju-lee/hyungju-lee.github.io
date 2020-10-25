---
title: 1. 이동할 거리 백분율 구하는 방법
layout: post
date: '2020-10-12 06:26'
categories:
- js_interactive_web2
---

## 1. 이동할 거리 백분율 구하는 방법

* [이동할 거리 백분율 구하는 방법](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section2/step1/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#javaScript">javaScript</button>

{:.collapse #javaScript}
```javascript
(function () {
    var text = document.querySelector(".progress .txt"); 
    var progressBar = document.querySelector(".progress .bar"); 
    var render = function (textPercent, scrollPercent) {
        text.innerText = textPercent + "%"; 
        progressBar.style.width = scrollPercent + "%";
    }
    var getPercent = function () {
        var scrollHeight = document.body.scrollHeight; 
        var scrollRealHeight = (scrollHeight - innerHeight); 
        var winScrollTop = pageYOffset; 
        var scrollPercent = (winScrollTop / scrollRealHeight) * 100;
        var textPercent = Math.floor(scrollPercent);
        render(textPercent, scrollPercent);
    }
    var init = function () {
        getPercent();
    }
    init();
    addEventListener("scroll", function () {
        getPercent();
    })
})()
```

* <button data-toggle="collapse" data-target="#jQuery">jQuery</button>

{:.collapse #jQuery}
```javascript
(function (win, $) {
    var text = $('.progress .txt');
    var progressBar = $('.progress .bar');
    var render = function (textPercent, scrollPercent) {
        text.text(textPercent + '%');
        progressBar.css({
            width : scrollPercent + '%'
        });
    }
    var getPercent = function () {
        var scrollHeight = $('body').prop('scrollHeight');
        var scrollRealHeight = (scrollHeight - $(win).height());
        var winScrollTop = $(win).scrollTop();
        var scrollPercent = (winScrollTop / scrollRealHeight) * 100;
        var textPercent = Math.floor(scrollPercent);
        render(textPercent, scrollPercent);
    }
    var init = function () {
        getPercent();
    }
    $(win).on('scroll', function(){
        getPercent();
    });
    init(); //초기화
})(window, window.jQuery)
```

* <button data-toggle="collapse" data-target="#compare">javaScript jQuery compare</button>

{:.collapse #compare}
```javascript
(function () {
    var text = document.querySelector(".progress .txt"); // var text = $('.progress .txt');
    var progressBar = document.querySelector(".progress .bar"); // var progressBar = $('.progress .bar');
    var render = function (textPercent, scrollPercent) {
        text.innerText = textPercent + "%"; // text.text(textPercent + '%');
        progressBar.style.width = scrollPercent + "%";
        // progressBar.css({
        // 	width : scrollPercent + '%'
        // });
    }
    var getPercent = function () {
        var scrollHeight = document.body.scrollHeight; // var scrollHeight = $(document).height();
        var scrollRealHeight = (scrollHeight - innerHeight); // var scrollRealHeight = (scrollHeight - $(win).height());
        var winScrollTop = pageYOffset; // var winScrollTop = $(win).scrollTop();
        var scrollPercent = (winScrollTop / scrollRealHeight) * 100;
        var textPercent = Math.floor(scrollPercent);
        render(textPercent, scrollPercent);
    }
    var init = function () {
        getPercent();
    }
    init();
    addEventListener("scroll", function () {
        getPercent();
    })
    // 	$(win).on('scroll', function(){
    // 		getPercent();
    // 	});
})()
```