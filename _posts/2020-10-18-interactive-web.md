---
title: 애니메이션 가속도를 처리하는 방법
layout: post
date: '2020-10-18 08:31'
categories:
- js_interactive_web2
---

## 애니메이션 가속도를 처리하는 방법

* [애니메이션 가속도를 처리하는 방법](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step3/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#jQuery">jQuery</button>

{:.collapse #jQuery}
```javascript
$(function(){
	$('.tit_area .f_content').addClass('active')
})
```

* <button data-toggle="collapse" data-target="#javaScript">javaScript</button>

{:.collapse #javaScript}
```javascript
(function () {
	addEventListener("load", function () {
		document.querySelector(".tit_area .f_content").classList.add("active");
	})
})()
```

## 사용자 정의 타이밍 펑션 개발자 창에서 수정하는 방법

![](/static/img/interaction/image22.jpg)
![](/static/img/interaction/image23.jpg)