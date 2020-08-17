---
title: 3. 애플 웹사이트 따라하기 2 - 1. canvas 기본 사용법
layout: post
date: '2020-08-17 21:22'
categories:
- js_interaction
---

* [canvas 기본 사용법](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Basic_usage){:target="_blank"}

## canvas 기본 사용법

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

* **canvas 속성**  
  `canvas` 태그에는 `width`와 `height` 두 속성만 있다.  
  이것들은 모두 선택사항이며 DOM 프로퍼티를 사용하여 설정할 수도 있다.  
  `width`, `height` 속성을 지정하지 않으면 `canvas`의 처음 너비는 **300px**이고 높이는 **150px**이다.  

* **canvas 랜더링**  
  `canvas` 요소는 CSS에 의해 임의로 크기를 정할 수 있지만, **랜더링**하는 동안 이미지는 
  **레이아웃 크기에 맞게 크기가 조정**된다.  
  CSS 크기 지정이 초기 캔버스의 비율을 고려하지 않으면 왜곡되어 나타난다.

* **canvas 스타일링 및 그림**
  `canvas` 요소는 일반적인 이미지(`margin`, `border`, `background`...) 처럼 스타일을 적용시킬 수 있다.  
  하지만 이 방법은 실제 `canvas` 위에 그리는 것에는 영향을 끼치지 않는다.  
  이 방법이 어떻게 사용되는지는 아래에서 확인할 수 있다.  
  `canvas`에 스타일링이 따로 지정되어있지 않았다면, `canvas` 스타일은 투명으로 설정된다.
  
* **canvas 대체 콘텐츠**  
  `canvas` 요소는 `video`, `audio` 혹은 `picture` 처럼 `img`와는 달리, IE 9 이하의 버전이나 텍스트기반 브라우저 
  등과 같은 `canvas`를 지원하지 않는 오래된 브라우저들을 위한 **대체 컨텐츠를 정의하기 쉽다.**  
  
  ```html
    <canvas id="stockGraph" width="150" height="150">
      current stock price: $3.15 +0.15
    </canvas>
    
    <canvas id="clock" width="150" height="150">
      <img src="images/clock.png" width="150" height="150" alt=""/>
    </canvas>
  ```
  
* **&lt;/canvas&gt; 태그 필수**  
  대체 컨텐츠가 제공되는 방식 때문에, `img` 요소와 달리, `canvas` 요소는 닫는 태그가 필요하다.  
  닫는 태그가 없다면 문서의 나머지 부분이 **대체 컨텐츠로 간주되고 보이지 않을 것이다.**
  
## 랜더링 컨텍스트

`canvas` 엘리먼트는 **고정 크기의 드로잉 영역**을 생성하고 하나 이상의 **랜더링 컨텍스트(rendering contexts)**를 
노출하여, 출력할 컨텐츠를 생성하고 다루게 된다.  

본 튜토리얼에선 2D 랜더링 컨텍스트를 집중적으로 다룬다.  

다른 컨텍스트는 다른 랜더링 타입을 제공한다.  
예를 들어, WebGL은 OpenGL ES을 기반으로 하는 3D 컨텍스트를 사용한다.

캔버스는 처음에 비어있다.  
무언가를 표시하기 위해, 어떤 스크립트가 랜더링 컨텍스트에 접근하여 그리도록 할 필요가 있다.  
`canvas` 요소는 `getContext()` 메서드를 이용해서 랜더링 컨텍스트와(랜더링 컨텍스트의) 그리기 함수들을 사용할 수 있다.  
**`getContext()` 메서드는 랜더링 컨텍스트 타입을 지정하는 하나의 파라미터를 가진다.**  
본 튜토리얼에서 다루고 있는 2D 그래픽의 경우, `CanvasRenderingContext2D`을 얻기 위해 **"2d"**로 지정한다.

```javascript
var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');
```

## 지원여부 검사

대체 컨텐츠는 `canvas` 를 지원하지 않는 브라우저에 표시된다.  
스크립트 역시 간단하게 `getContext()` 메서드의 존재 여부를 테스트함으로써 프로그래밍 방식으로 지원하는지를 
확인할 수 있다.  
위의 코드 예제는 다음과 같이 될 수 있다.

```javascript
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## 템플릿 뼈대

다음은 이후의 예제들에서 시작점으로 사용될 수 있는 가장 최소한의 템플릿이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw(){
        var canvas = document.getElementById('tutorial');
        if (canvas.getContext){
          var ctx = canvas.getContext('2d');
        }
      }
    </script>
    <style type="text/css">
      canvas { border: 1px solid black; }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="150" height="150"></canvas>
  </body>
</html>
```

위 스크립트에서 `draw()` 함수가 호출되었는데, 호출될 때 **body**가 `load` 이벤트를 수신하여 
페이지 로딩이 완료되었을 때 한번 호출되었다.  
이 함수 혹은 이와 유사한 함수는, `window.setTimeout()`, `window.setInterval()` 등이 있다.

## 기본 예제

먼저 두 개의 직사각형을 그린 간단한 예제를 보도록 하겠다.  
그 중 하나는 **투명도(alpha transparency)**를 가진다.  
나중에 이 예제가 어떻게 작동하는지 자세히 살펴보도록 하겠다.

```html
<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8"/>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
    <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
    
        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 50, 50);
    
        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 50, 50);
      }
    }
    </script>
 </body>
</html>
```

[위 예시](/static/img/interaction/canvas00.html){:target="_blank"}