---
title: 8. 이미지 시퀀스를 활용한 캔버스 스크립트 작성하기
layout: post
date: '2020-10-25 13:41'
categories:
- js_interactive_web2
---

## 8. 이미지 시퀀스를 활용한 캔버스 스크립트 작성하기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step2/index.html){:target="_blank"}

음 그런데 확실히 애플 인터렉션 강의가 여기 canvas 강의보단 조금 더 한수 위인 것 같다.  
거기는 2배수 이미지도 신경쓰고 스크립트 정리도 여기보다 잘 되어있는 듯한 느낌?이다.  
이 예제는 `canvas` 태그에 `transform`을 안 주었는데, 애플 인터렉션은 해당 `prop`으로 주고 width, height는 브라우저의 너비에 맞게 자바스크립트를 통해 축소했다.  
가운데 정렬도 `transform`을 자바스크립트로 준 반면 이 예제는 `css`로 줬다.

이 예제는 `css`를 활용할 수 있음 최대한 활용하자 느낌이고 애플 인터렉션은 `js`를 사용할 수 있음 최대한 활용하자인 것같다.  
난 애플 인터렉션 쪽이 더 나은 선택같다.  
css랑 js랑 섞이게되면 나중에 좀 어려워진다.  
이런 js로 컨트롤되는건 js로 하는 것이 더 나아보인다.

그리고 `requestAnimationFrame`을 활용해 좀 더 부드러운 인터렉션을 구현한 것도 그 강좌 내용이 한수 위인듯한 느낌을 준다.  

그리고 개인적으로도 페럴렉스 인터렉션은 **클래스 추가/제거로 제어 안하는 것이 더 좋은 것같다.**  
**클래스로 제어하면 스크롤이 휘리릭 빨리 지나갔을시에 만약 추가되었다가 제거되는 인터렉션이라면 인터렉션도 발동안하고 지나갈 가능성이 크기 때문이다.**  
**그래서 이러한 점도 애플 인터렉션 강좌에서 구현한 자바스크립트 코드가 더 나아보인다.**

그래도 여기 기법 중에서도 좋은 기법을 참고해 애플 인터렉션 강좌 기법과 합친다면 더 좋을 것 같다.

## 이미지가 모두 로드되었는지 체크하는 이유

사용자가 이미지가 모두 로드되기 전에 스크롤을 하면 어떻게 될까?  
캔버스에 그려지는 상품의 모습이 정상적으로 노출되지 않을 것이다.  
이러한 이유 때문에 이미지가 모두 로드 되었는지를 체크하는 것이다.

## 로딩스피너 마크업을 넣는다면 페이지가 다 불러와진 후에 로딩스피너 제거 코드는 어디다가넣으면 될까?

```javascript
if (imageIterator === imgLength) { //이미지가 로드된 횟수와 이미지 렝스가 같아질 경우에 인터렉션 함수들을 호출함
    setProperty(); //스크롤할때 변할 값들을 셋팅해주는 함수
    setCanvas(); //캔버스 기본값 셋팅
    bindEvent(); //스크롤 이벤트 바인드
    scrollFunc(); //스크롤할때 실행될 함수
}
```

위 if 문 안에다가 넣으면 된다.