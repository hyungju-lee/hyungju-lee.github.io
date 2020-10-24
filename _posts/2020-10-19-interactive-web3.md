---
title: 다중 페럴렉스 스크립트 작성하기
layout: post
date: '2020-10-19 23:35'
categories:
- js_interactive_web2
---

* [다중 페럴렉스 스크립트 작성하기](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section5/step3/){:target="_blank"}

## 다중 페럴렉스 스크립트 작성하기

![](/static/img/interaction/image24.jpg)

`parallaxSpeed`라는 변수로 페럴렉스 스피드 조절  
페럴렉스 스피드를 너무 빠르게하면 스크롤을 얼마 하지도 않았는데 페럴렉스 효과가 순식간에 끝날지도 모른다.  
그렇게되면 페럴렉스 효과를 만든 의미가 없어진다.  

페럴렉스가 시작되는 위치 그리고 속도는 중요한 요소이다.

![](/static/img/interaction/image25.jpg)

그리고 아래와 같이 요소들의 움직임을 제어하였다.

```javascript
/*action*/
parallaxList.eq(0).css({ // 계산된 값을 각각의 엘리먼에 css를 이용해 적용합니다
    transform: 'translate(0px,' + parallaxMoveDistance + 'px)'
});

parallaxList.eq(1).css({ // 계산된 값을 css를 이용해 적용합니다
    transform: 'translate(0px,' + parallaxMoveDistance * 2.1 + 'px)'
});

parallaxList.eq(2).css({ // 계산된 값을 css를 이용해 적용합니다
    transform: 'translate(0px,' + parallaxMoveDistance * 2.5 + 'px)'
});
```

![](/static/img/interaction/image26.jpg)

이 세 가지를 중점으로하여 페럴렉스 효과를 구현할 수 있다.

---

```javascript
/*리사이즈, 스크롤할때 변해야 할 값들*/
var winScrollTop; // 스크롤바의 높이를 담을 변수를 선업합니다
var sectionIsMoving = false;

var parallaxOffsetTop; //패럴럭스가 시작될 요소의 상단 위치값
var parallaxThisTop; //패럴럭스가 시작될 위치값을 구함
var parallaxSpeed = 1200; // 패럴럭스 요소의 스피드
var parallaxPercent; // 패럴럭스 백분율값을 담을 변수를 선업합니다
var parallaxStartValue = 1000; //패럴럭스요소가 200 위치에서 시작하도록 설정합니다.
var parallaxMoveDistance; // 패럴럭스 요소가 움직일 거리를 담을 변수 선업합니다

function setProperty() { // 스크롤할때 변할 값들을 셋팅해주는 함수
    winScrollTop = $(window).scrollTop(); //스크롤바의 현재 위치를 구합니다
    sectionMainTop = sectionMainVisual.offset().top; //섹션의 top값을 구합니다.
    sectionMainBottom = sectionMainTop + sectionMainVisual.height(); //섹션의 BOTTOM값을 구합니다.
    parallaxOffsetTop = parallaxBody.offset().top; //패럴럭스가 시작될 요소의 상단 위치값
    parallaxThisTop = winScrollTop - parallaxOffsetTop; //패럴럭스가 시작될 위치값을 구함.
    parallaxPercent = parallaxThisTop / parallaxSpeed * 100; // 이동할 거리 백분율 값을 담음
    parallaxMoveDistance = Math.max(parallaxStartValue - parallaxStartValue, Math.min(parallaxStartValue, parallaxStartValue - (parallaxStartValue * (parallaxPercent / 100)))); //패럴럭스 요소가 움직일 거리를 구합니다
}
```

1. `parallaxMoveDistance` 페럴렉스 요소가 이동할 거리를 구하는 수식이다.  
2. **`parallaxStartValue`는 페럴렉스에 의해 움직이는 요소의 시작점이다.**
3. `Math.max(a, b)` : a와 b 둘 중 더 큰 값을 구하는 수식이다.  
   페럴렉스가 끝나는 구간 이후와 이전을 구분해 페럴렉스 요소가 이동해야할 값을 정하는 수식이다.  
   그런데 `parallaxStartValue - parallaxStartValue` 이렇게 작성할거면 그냥 **0**이 낫지않나?
4. `Math.min(a, b)` : a와 b 둘 중 더 작은 값을 구하는 수식이다.  
   페럴렉스가 시작하는 구간 이후와 이전을 구분하여 페럴렉스 요소가 이동해야할 값을 정하는 수식이다.  
   페럴렉스가 시작하는 지점에 아직 진입안했다면 각 요소의 위치는 **1000** 그 이후라면 이제 계산된 결과에 따라... 이는 위에 말한 `Math.max` 수식에서 판단