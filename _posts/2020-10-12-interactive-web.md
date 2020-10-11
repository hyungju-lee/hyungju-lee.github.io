---
title: 이동할 거리 백분율 구하는 방법
layout: post
date: '2020-10-12 06:26'
categories:
- js_interactive_web2
---

## 이동할 거리 백분율 구하는 방법

* [이동할 거리 백분율 구하는 방법](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section2/step1/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#script">script</button>

{:.collapse #script}
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