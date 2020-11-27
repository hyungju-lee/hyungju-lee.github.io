---
title: 클릭 무한 슬라이드 인터렉션
layout: post
date: '2020-11-27 18:31'
categories:
- js_interaction
---

## 클릭 무한 슬라이드 인터렉션

며칠전에 예전에 다니던 학원선생님의 부탁으로 신기한 인터렉션을 만들어봤습니다.  
느낌만 따라한거라 똑같진 않습니다.  
해당 페이지와 따라만들어본거 공유드립니다.

* [링크](https://www.gogoro.com/smartscooter/s-performance/s2/cafe-racer/){:target="_blank"}

위 인터렉션 따라서 만들어본 페이지 : [https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event3-ie10.html](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-5/tap-event3-ie10.html){:target="_blank"}

* 위 사이트에서 canvas 태그로 만들어서 따라서 만들어봤습니다.  
  하지만 정확히 어떤 원리로 만든건진 모르겠습니다.
  저는 `createElement` 메소드로 가상의 `canvas` 태그를 만들어 해당 `canvas` 에 이미지들을 차례대로 그려 넣었고, 그 `canvas` 의 그림을 전체 추출하여 `HTML` 상에 있는 **실제 canvas 태그에 그려넣었습니다. 이때 사용한 메소드는 `getImageData` 와 `putImageData` 입니다.**  
  CORS 정책에 의하여 로컬서버에서만 제대로 작동하는 메소드인 것 같습니다. (특히, 크롬은 CORS 정책이 더 엄격합니다.)
* CORS 링크 : [https://developer.mozilla.org/ko/docs/Web/HTTP/CORS](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS){:target="_blank"}
* CORS 란 간단하게 말해 서버에서 정보를 쉽게 빼내가지 못하도록 하는 일종의 정책같은 것입니다. 그래서 코드상 문제가 없어도 서버에서 통신을 끊어버리는? 그런 개념같습니다.
* **한계** : IE에선 새로고침할 때 이미지들의 `naturalWidth` `naturalHeight` 값을 제대로 못불러오는 버그가 있습니다. (다른 거 만들땐 안 이랬는데..) 그래서 일단 차선책으로 `setTimeout` 함수를 사용했습니다. 해당 내용은 코드에 **주석**으로 달아놨습니다.