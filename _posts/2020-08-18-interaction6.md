---
title: 3. 애플 웹사이트 따라하기 2 - 3. canvas 변형(transformations)
layout: post
date: '2020-08-17 21:35'
categories:
- js_interaction
---

* [canvas 변형(transformations)](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/%EB%B3%80%ED%98%95){:target="_blank"}

## 변형 (transformations)

이 튜토리얼에 앞서 `canvas 그리드`와 **좌표 공간**에 대해 알아보았다.  
지금까지는 기본적인 그리드를 사용해 요구에 맞추어 전체 `canvas`의 크기를 바꾸기만 했다.  
**`Transformation(변형)`에는 그리드를 원점에서 다른 위치로 옮기고, 회전하며, 확대, 축소까지 하는 더 강력한 방법들이 있다.**

## 상태(state)의 저장과 복원

변형(transformation) 메서드를 살펴보기 전에 두 가지 다른 메서드를 보도록 하자.  
일단 여러분이 더 복잡한 그림(drawings)을 그리기 시작하면 반드시 있어야 하는 메서드들이다.  

**`save()`**  
`canvas`의 모든 상태를 저장한다.

**`restore()`**
가장 최근에 저장된 `canvas` 상태를 복원한다.

**<span style="color:Red">drawing(canvas) 상태(state)</span>는 스택(stack)에 쌓인다.  
`save()` 메서드가 호출될 때마다 현재 <span style="color:Red">drawing(canvas) 상태(state)</span>가 스택 위로 푸시된다.  
<span style="color:Red">drawing(canvas) 상태(state)</span>는 다음과 같이 이루어진다.**

* 이전부터 적용된 변형(가령, `translate`와 `rotate`와 `scale` 같은.. 아래의 내용을 보면된다.)
* 다음 속성(attributes)의 현재 값 :  
  `strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `lineDashOffset`, 
  `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation`, `font`, 
  `textAlign`, `textBaseline`, `direction`, `imageSmoothingEnabled`
* 현재의 `clipping path`, 이것은 다음 섹션에서 다루도록 하겠다.

여러분은 원하는 만큼 `save()` 메서드를 많이 호출할 수 있다.  
**`restore()` 메서드를 호출할 때마다 마지막으로 저장된 상태가 스택에서 튀어나와 저장된 설정들을 모두 복원시킨다.**

## save와 restore canvas 상태(state) 예제

