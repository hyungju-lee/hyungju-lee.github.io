---
title: 4. 애플 웹사이트 따라하기 3
layout: post
date: '2020-08-20 13:48'
categories:
- js_interaction
---

* [캔버스 정보](https://studiomeal.com/archives/1097){:target="_blank"}
* [캔버스 최적화](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Optimizing_canvas){:target="_blank"}
* [requestAnimationFrame1](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame){:target="_blank"}
* [requestAnimationFrame2](https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC){:target="_blank"}

## canvas Tip!

`clearRect()` 메서드 : `canvas`는 지우는 작업을 알아서 안해준다.  
즉 어떤 그림을 그리고 그 다음 위치에서 다음 그림을 그릴 때 그냥 덧붙여서 그린다.  
왜냐하면 `canvas`는 **즉시모드**이기 때문이다.  

**즉시모드**, **보류모드**라는 것이 있는데, 예전 웹 개발자들이 사용하던 플래시 같은 것들이 **보류모드**이다.  
플래시는 **추상화**가 굉장히 잘되어있다.  

예를 들어, 도형을 하나 그리면 그 도형이 딱 선택이되고, 정보를 다 가지고 있다.  
HTML 요소들도 마찬가지이다.  
div 태그를 넣으면 div 태그가 position 정보를 가지고 있기 때문에 CSS로 위치 수정이 가능하다.  

그런데 `canvas`에서 그린 그림들은 그냥 단순히 '그림'일 뿐이다.  
도화지에 그린 그림이라고 생각하면 된다.  

**그리고난 후에 그 그림을 이동시키려면 어떻게 해야될까?**  

그림그린 애는 못 이동시킨다.  
지우고나서 다른 위치에 새로 그려줘야된다.  

이러한 이유로 인터렉션 효과 구현할 때 `clearRect()` 메서드를 쓰는 것이다.

## canvas 최적화

1. 캔버스에 표시되지 않는 비슷한 원시 혹은 반복객체를 미리 그려라.  
   ```javascript
    myCanvas.offscreenCanvas = document.createElement('canvas');
    myCanvas.offscreenCanvas.width = myCanvas.width;
    myCanvas.offscreenCanvas.height = myCanvas.height;
    
    myCanvas.getContext('2d').drawImage(myCanvas.offScreenCanvas, 0, 0);
   ```
   
2. 부동 소수점 좌표를 피하고 대신 정수를 사용하라.  
   ```javascript
    ctx.drawImage(myImage, 0.3, 0.5);
   ```
   위와 같이 하지 말자. `Math.floor()`를 활용해 반올림하자.
   
3. `drawImage`에서 이미지 크기를 조정하지 마라.  
   이미지 크기를 오프스크린(offscreen) 캔버스에 캐시하라.
   
4. 복잡한 장면에 여러 개의 레이어 캔버스를 사용하라.  
   ```html
    <div id="stage">
      <canvas id="ui-layer" width="480" height="320"></canvas>
      <canvas id="game-layer" width="480" height="320"></canvas>
      <canvas id="background-layer" width="480" height="320"></canvas>
    </div>
     
    <style>
      #stage {
        width: 480px;
        height: 320px;
        position: relative;
        border: 2px solid black;
      }
    
      canvas { position: absolute; }
      #ui-layer { z-index: 3; }
      #game-layer { z-index: 2; }
      #background-layer { z-index: 1; }
    </style>
   ```
   
5. 큰 배경 이미지는 일반 CSS를 사용하라.

6. CSS 변환(transform)을 사용하여 캔버스 크기를 조정해라.  
   CSS transform은 GPU를 사용하기 때문에 더 빠르다.
   ```javascript
    var scaleX = window.innerWidth / canvas.width;
    var scaleY = window.innerHeight / canvas.height;
    
    var scaleToFit = Math.min(scaleX, scaleY);
    var scaleToCover = Math.max(scaleX, scaleY);
    
    stage.style.transformOrigin = '0 0'; //scale from top left
    stage.style.transform = 'scale(' + scaleToFit + ')';
   ```
   
7. 투명도를 사용하지 마라. (투명배경 필요없을 경우)  
   ```javascript
    var ctx = canvas.getContext('2d', { alpha: false });
   ```

8. 기타 방법들도 위의 MDN 링크에 정리되어있으니 꼭 필독!

## requestAnimationFrame 이란?

브라우저 입장에서 애니메이션을 랜더링할 준비가 되었을 때 실행을 해달라는 의미를 가진 메서드이다.  
한마디로 **최적화**를 시켜준다는 것이다.  
`resize` 든 `scroll` 이든 굉장히 많이 일어나는 **EVent**이다.  

브라우저는 다음 애니메이션을 그려줄 준비도 안되었는데, 막 이벤트가 계속발생해 밀려서 실행돼서 버벅이는 것이 아니라 
준비가 되면 그 시점에 그려준다는 것이다.  
더 부드러운 애니메이션을 위한 **안전 장치**를 걸어놨다고 생각하면 된다.  

**이 방법말고도 일부러 실행횟수를 제한하는 기법들도 있다.(throttle, debounce)**  

## window.requestAnimationFrame()

`window.requestAnimationFrame()`은 브라우저에게 수행하기를 원하는 애니메이션을 알리고 다음 리페인트가 
진행되기 전에 해당 애니메이션을 업데이트하는 함수를 호출하게 한다.
이 메서드는 리페인트 이전에 실행할 콜백을 인자로 받는다.  

---

**노트**  

다음 리페인트에서 그 다음 프레임을 애니메이트하려면 콜백 루틴이 반드시 스스로 
`requestAnimationFrame()`을 호출해야 한다.

---

화면에 새로운 애니메이션을 업데이트할 준비가 될 때마다 이 메서드를 호출하는 것이 좋다.  
이는 브라우저가 다음 리페인트를 수행하기 전에 호출된 애니메이션 함수를 요청한다.  
콜백의 수는 보통 1초에 60회지만, 일반적으로 대부분의 브라우저에서는 **W3C 권장사항**에 따라 그 수가
**디스플레이 주사율과 일치**하게 된다.  
대부분의 최신 브라우저에서는 성능과 배터리 수명 향상을 위해 `requestAnimationFrame()` 호출은 
백그라운드 탭이나 hidden `<iframe>` 에서 실행이 중단된다.

콜백 메서드에는 `requestAnimationFrame()`이 대기된 콜백을 실행하는 시점을 나타내는 단일 인자 
`DOMHighResTimeStamp`가 전달된다.  
따라서, 모든 이전 콜백의 작업 부하를 계산하는 동안 시간이 지나갔음에도 불구하고 단일 프레임에서의 
다중 콜백은 각각 동일한 타임스탬프를 받는다.  
이 타임스탬프는 밀리초 단위의 십진수이지만, 최소 정밀도는 1ms(1000us) 이다.  









