---
title: URL HASH를 활용해 네비게시연 리모컨 만들기
layout: post
date: '2020-10-24 16:43'
categories:
- js_interactive_web2
---

## URL HASH를 활용해 네비게시연 리모컨 만들기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step7/index.html){:target="_blank"}

`this.hash` 프로퍼티를 활용해 `a` 태그의 `href` 값을 읽어온다.

```javascript
$("a").on("click", function () { 
    if ($(this.hash).offset()) { // 이동할 요소가 있는지 없는지 구분, 없는데 아래처럼 해당 offset().top으로 가게끔하면 에러가 난다.
        $('html').animate({
            scrollTop:$(this.hash).offset().top
        }, 500);
    }
})
```

![](/static/img/interaction/image32.jpg)

위와 같이 작성해 움직이면 URL 뒤에 해당 해시값이 붙게된다.