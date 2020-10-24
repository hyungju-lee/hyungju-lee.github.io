---
title: 컨텐츠 고정하는 css와 html 작성
layout: post
date: '2020-10-24 18:16'
categories:
- js_interactive_web2
---

## 컨텐츠 고정하는 css와 html 작성

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step1/index.html){:target="_blank"}

이 예제에선 스크롤시 섹션을 고정하는데 `position: sticky` 속성을 사용한다.  
IE를 제외한 대부분의 브라우저에서 작동한다.  

이번 7번째 주제에서도 보면 알겠지만, 이 강좌에서는 마스킹 효과를 구현할 때 '요소'들을 적극 활용한 것을 알 수 있다.  
아직 스크롤 인터렉션 강좌 1편이라그런지 `canvas` 태그는 사용안한 것으로 보인다.

## position : sticky 작성시 주의할 점

1. position: sticky 속성을 준 요소엔 top 속성을 반드시 줘야된다.
2. sticky 속성을 가진 요소의 부모 요소에 overflow: hidden 속성을 사용하면 안된다.  
   overflow: hidden 속성을 사용하려면 sticky를 준 요소에 주면된다.

## IE에서 페럴렉스 효과를 구현할 때 중요한 점.

가장 바깥요소, 제일 부모요소에게 `position: fixed`를 줘야 화면 떨림 현상이 없어진다.

![](/static/img/interaction/image33.jpg)