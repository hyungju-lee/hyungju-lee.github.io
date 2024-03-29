---
title: 5. 애플 웹사이트 따라하기 - study 공유 2
layout: post
date: '2020-08-23 09:15'
categories:
- js_interaction
---

## canvas

**canvas 태그는 도화지에 그림을 그리는 개념이다.**  
이를 유의하며 다음 글을 읽어보자.

**canvas로 애니메이션을 구현할 때 `clearRect()`** 메서드로 `canvas` 태그를 지우는 일을 종종 한다.

왜?

그 이유는 너무나도 당연한 이유지만 **canvas 안에 그려진 그림들은 '객체'가 아니기 때문**이다.  
`canvas` 태그 안에 그려진 그림들이 div 태그나 span 태그 같은 객체라면 일일이 지울 필요가 없다.  
하지만 `canvas` 태그는 그렇지 않기 때문에 다시 지워서 다시 그려야되는 작업을 해줘야된다.

예를 들어 포토샵에 도형을 하나 그렸다고 생각해보자.  
해당 도형을 클릭하면 선택이되고 좌표나 색상 정보 등이 표시된다.  
그렇기 때문에 해당 도형을 가지고 애니메이션을 만들기 쉽다.  
해당 도형에 이 다음 시간에서의 좌표값만 입력하면 되기 때문이다.
**이를 다시 말하지만 추상화가 잘되었다고 한다. canvas는 이전에도 언급했지만 추상화가 잘 안된 경우이다.**  
**또 다른 말론 포토샵과 같은 경우를 '보류모드'라 하고 canvas를 '즉시모드'라 한다.**

여튼 `canvas` 태그에 그린 그림들은 그렇지 않다.  
그렇기 때문에 그림들을 **다시 '지우고' 다시 '그리면서' 마치 애니메이션이 발생하고 있는 것처럼** 보이게 만들어줘야 된다.

## requestAnimationFrame

* [참조링크](https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC){:target="_blank"}

위 링크에 정리가 아주 잘 되어있다.  

아주 쉽게 말하자면 위 메서드는 브라우저 입장에서 애니메이션을 랜더링할 준비가 되었을 때 실행을 해달라는 의미를 가지고 있다.  
한마디로 **최적화**를 시켜준다는 것이다. 

`resize` 또는 `scroll` 이벤트는 굉장히 많이 발생하는 이벤트이다.  
이렇게 많이 발생하는 이벤트에 이벤트가 발생할 때마다 인터렉션을 일으키는 컬백펑션을 넣는다면 브라우저가 버벅일 수 있다.  
그걸 방지하기 위한 더 부드러운 애니메이션을 위한 **안전장치**라고 생각하면 된다.  

해당 메서드 말고도 다른 기법들도 있다.  
true/ false 를 활용해 이벤트 발생에 의한 컬백펑션 실행에 제한을 두는 **스로틀, throttle**  
마지막 이벤트가 발생한 시점에서만 컬백펑션이 실행되게 하는 **디바운스, debounce**

## canvas 최적화

* [링크](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Optimizing_canvas){:target="_blank"}