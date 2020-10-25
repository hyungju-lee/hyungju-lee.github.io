---
title: 5. 텍스트 오버랩 효과 만들기
layout: post
date: '2020-10-24 14:13'
categories:
- js_interactive_web2
---

## 5. 텍스트 오버랩 효과 만들기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step4/index.html){:target="_blank"}

같은 텍스트 두개를 포개어놓는 방법이다.  
왼쪽 영역과 오른쪽 영역에 속한 텍스트들이 왔다갔다하면서 마치 색깔이 반전되는 듯한 효과처럼 보이게 하는 기법이다.  

왼쪽과 오른쪽으로 나뉜 영역 하위 요소엔 `width: 200%`를 준다.  
그리고 오른쪽 요소엔 `margin-left: -100%`를 준다.  

`animation` 속성은 합쳐서 쓰지 말자.  
합쳐서 사용하면 IE에서 작동을 안한다.