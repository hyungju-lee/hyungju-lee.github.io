---
title: 2. CSS 시크릿 - 브라우저 지원과 대체 내용 (CSS 및 자바스크립트 기법)
layout: post
date: '2020-08-25 00:22'
categories:
- js_interaction
---

## 브라우저 지원과 대체 내용 (CSS 및 자바스크립트 기법)

### CSS 기법

모던 브라우저는 업데이트 주기도 빠르고 표준화도 빠르다.  
그리고 전처리기 덕분에 브라우저 지원을 고려하여 CSS를 작성하는 데 크게 신경쓸 필요는 없다.  
하지만 그 내용은 알아둬야 할 것이다.

브라우저 호환성을 맞추기위해 우리는 종종 **밴더 프리픽스(접두사)** 또는 **아주 약간씩 다른 구문**을 사용한다.  
다음은 **벤더 프리픽스(접두사)**를 사용하지 않은 표준 구문이다.

```css
div {
    background: linear-gradient(90deg, yellow, red);
}
```

그러나 아주 오래된 브라우저도 지원하기를 원한다면 다음과 같이 사용해야 할 것이다.

```css
div {
    background: -moz-linear-gradient(90deg, yellow, red);
    background: -o-linear-gradient(90deg, yellow, red);
    background: -webkit-linear-gradient(90deg, yellow, red);
    background: linear-gradient(90deg, yellow, red);
}
```

이와 비슷하게 오래된 브라우저에서 웹 사이트가 이쁘게까지는 아니더라도 깨져 보이지 않게 하도록 대체할 내용을 
제공하는 것이 좋은 습관이다.  
케스케이드가 어떻게 작동하는지 알고 있다는 가정 하에 차이가 너무 명확할 때는 따로 언급하지 않았다.  
예를 들어 위에서 본 그라디언트를 지정할 때 먼저 대체할 내용으로 솔리드 색을 추가하는데, 이때 솔리드 색은 
두 색상의 평균색이 좋다.

```css
div {
    background: rgba(255, 128, 0);
    background: -moz-linear-gradient(90deg, yellow, red);
    background: -o-linear-gradient(90deg, yellow, red);
    background: -webkit-linear-gradient(90deg, yellow, red);
    background: linear-gradient(90deg, yellow, red);
}
```

**그러나 때로는 캐스케이드를 통해 적절한 대체가 가능하지 않을 수 있다.**  
이럴 때는 마지막 수단으로 **[Modernizr](https://modernizr.com/){:target="_blank"}**와 같이 
**루트 요소(&lt;html&gt;)에 textshadow 또는 no-textshadow 와 같은 클래스를 추가하여** 
<span style="color:red">특정 기능이 지원되지 않을 때 다음과 같이 대상 요소</span>에 
이것을 사용할 수 있다.

```css
h1 { color:gray; }
.textshadow h1 {
    color: transparent;
    text-shadow: 0 0 .3em gray;
}
```

만약, 대체할 내용으로 준비하고자 하는 기능이 너무 새로운 것이라면 Modernizr 고유의 `@supports` 규칙을 사용할 수 있다.  
예를 들어 위에 보았떤 코드는 다음과 같이 된다.

```css
h1 { color:gray; }
@supports (text-shadow: 0 0 .3em gray) {
    h1 {
        color: transparent;
        text-shadow: 0 0 .3em gray;
    }
}
```

그러나 당분간은 <span style="color:red">@supports를 조심해서 사용해야 한다.</span>  
이것을 사용하면 텍스트 그림자를 제공하는 브라우저에서 이 효과를 제한할 뿐 아니라 브라우저가 
@supports 규칙을 지원하게 하여 제한되는 내용이 더 많아진다.

### 자바스크립트 기법

자바스크립트를 이용하여 기능을 탐지하고 루트 요소(&lt;html&gt;)에 Modernizr와 같은 방식으로 클래스를 추가하는 
옵션을 언제든 사용할 수 있다.  
속성 지원 여부를 확인하는 주요 방법은 어떤 요소에 `element.style` 객체가 있는지를 확인하는 것이다.

```javascript
var root = document.documentElement; // <html>
if ('textShadow' in root.style) {
    root.classList.add('textshadow');
} else {
    root.classList.add('no-textshadow');
}
```

다중 속성을 테스트하고자 한다면 함수로 전환할 수 있다.

```javascript
function testProperty (property) {
    var root = document.documentElement; // <html>
    if (property in root.style) {
        root.classList.add(property.toLowerCase());
        return true;
    }
    root.classList.add('no-' + property.toLowerCase());
    return false;
}

// toLowerCase
// 호출 문자열을 소문자로 변환하는 메서드
```

값을 테스트하고자 한다면 속성에 값을 지정하고 확인하면 된다.  
구현하려고 하는 것이 아니라 스타일을 수정하는 것이기 때문에 **더미 요소**를 사용하는 것도 요령이다.

```javascript
var root = document.documentElement; // <html>
var dummy = document.createElement('p');
dummy.style.backgroundImage = 'linear-gradient(red, tan)';

if (dummy.style.backgroundImage) {
    root.classList.add('lineargradients');
} else {
    root.classList.add('no-lineargradients');
}
```

이 또한 함수로 쉽게 바꿀 수 있다.

```javascript
function testValue(id, value, property) {
    var dummy = document.createElement('p');
    dummy.style[property] = value;

    if (dummy.style[property]) {
        root.classList.add(id);
        return true;
    }
    root.classList.add('no-' + id);
    return false;
}
```

선택자와 @ 규칙을 테스트하는 것이 복잡하지만, CSS에서 브라우저가 빠뜨리는 것이 있는지 확인하기만 하면 된다.  
물론, **브라우저가 CSS 기능을 잘 분석하고 있는지 브라우저가 제대로 구현이 되었는지 또는 그렇지 않은지** 잘 확인해야 한다.













