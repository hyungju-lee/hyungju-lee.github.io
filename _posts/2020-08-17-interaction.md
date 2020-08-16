---
title: 1. CSS 레이아웃
layout: post
date: '2020-08-17 06:41'
categories:
- js_interaction
---

## CSS 레이아웃

## CSS BOX MODEL

`display: block` 속성은 **BOX MODEL**이라는 메커니즘이 적용이된다.  

![](/static/img/interaction/image00.png)

`box-sizing: content-box` 일 땐, 컨텐츠 바깥으로 잡히는 영역들이 추가가 되는 개념이다.  
`box-sizing: content-box` 는 기본값이다.  
현재 위 **box model**에선 컨텐츠의 너비가 300px이지만, padding, border, margin이 합해져 380px이 되었다.

![](/static/img/interaction/image01.png)

이번엔 `box-sizing: border-box` 가 적용된 경우를 살펴보겠다.  
**content-box**와 다르게 padding, border 까지는 width에 포함이된다.  
**box-sizing** 속성 자체를 **IE8** 부터 지원한다.  
그래서 편이상 이 속성을 많이 이용한다.

## CSS RESET

각 브라우저마다 기본으로 설정되어있는 속성들이 있다.  
이를 초기화해주는 개념이다.

과거엔

```css
* {
    margin: 0;
    padding: 0;
}
```

이런 식으로 작성을 많이 했었는데, **브라우저 렌더링** 속도에 영향을 준다는 사실이 널리 퍼지면서 
위와 같은 방법은 잘 안사용하는 추세가 되었다.  

## display: inline-block 사용하기 - 공백문자

`display: inline-block` 으로 좌우 정렬을 시키려고 했다.  
`box-sizing: content-box` or `box-sizing: border-box` 경우를 고려해 width 계산도 했다.  
그런제 좌우 정렬이 안된다..
  
왜 이런 경우가 발생할까?

**공백문자** 때문에 그럴 가능성이 크다.

```html
<div style="display: inline-block">

</div>
<div style="display: inline-block">

</div>
```

위와 같이 코드를 이쁘게 보이게 하기 위해서 enter 키로 개행을 시킨다.  
이 **개행**도 **공백문자**가 삽입되는 것이다.  
이 **공백문자**가 영역을 잡고 있어서 밑으로 떨어지는 경우가 발생하는 것이다.  
즉 이 **공백문자**의 영역을 없애줘야 한다.  

그 방법은 부모 요소에 `font-size: 0`을 주는 것이다.  
하지만 이렇게 주면 다른 하위 자식 요소들에도 `font-size: 0`이 상속되니 주의하기 바란다. (하위 요소는 다시 `font-size` 를 재정의해줘야된다.)

`display: inline-block` 으로 레이아웃을 정렬할 시 `vertical-align` 속성으로 위 아래를 맞춰줄 수 있다.  

## float 사용하기

```css
.container:after {
    clear: both;
    display: block;
    content: '';
}
.item {
    float: left;
}
```

클리어픽스 방법은 여러가지가 있으므로 찾아보도록~!