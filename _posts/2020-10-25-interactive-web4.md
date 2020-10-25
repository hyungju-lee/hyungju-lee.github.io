---
title: 7. 컨텐츠 고정하는 css와 html 작성
layout: post
date: '2020-10-25 09:44'
categories:
- js_interactive_web2
---

## 7. 컨텐츠 고정하는 css와 html 작성

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step1/index.html){:target="_blank"}

오른쪽 시계 이미지 영역에 `position: sticky` 속성을 사용했다.  

![](/static/img/interaction/image44.jpg)

그리고 시계 이미지 영역 내부는 위와 같이 슬라이드될 수 있도록 마크업읗 했다.  
이미지들은 `float: left` 속성으로 나열했다.  
이미지들 부모 요소엔 `width: 780px`을 주어 `float: left`된 요소들이 옆으로 올 수 있도록 했다.  

이는 부모에게 `width`값 안 주고 `display: inline-block`으로 `white-space: nowrap` 속성으로도 정렬할 수 있을 것 같다.  
이게 더 유동적이고 편한 방법일 것 같음~!

