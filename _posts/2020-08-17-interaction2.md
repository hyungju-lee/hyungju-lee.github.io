---
title: 2. 애플 웹사이트 따라하기 1
layout: post
date: '2020-08-17 12:16'
categories:
- js_interaction
---

## 애플 웹사이트 따라하기 1

애플은 왜 `canvas` 태그를 사용했을까?  
**성능** 때문에 사용했다.  
애플 사이트를 보면 스크롤 위치에 따라 발생하는 애니메이션이 있는데, 이는 브라우저에 과부하를 많이 줄 수밖에 없다.  
즉 이런 애니메이션을 일반 DOM 요소나 SVG를 사용하게 되면 버벅일 수 있다.  
사이즈가 큰 이미지에 애니메이션 효과를 주면 성능이 저하된다.

하지만 `canvas` 같은 경우는 .. 물론 `canvas` 같은 경우도 비트맵이기 때문에 면적이 커지면 커질수록 퍼포먼스가 
떨어지는 것은 맞는데 일반적으로 **DOM**을 애니메이션 처리하는 것보단 성능이 좋다.  
`canvas` 드로잉 **API** 자체가 굉장히 저수준 **API**이기 때문에 굉장히 속도가 빠르다.  

![](/static/img/interaction/image02.png)

## 예시 샘플 코드

* <button data-toggle="collapse" data-target="#index">index.html</button>

    {:.collapse #index}
    ```html
    <!DOCTYPE html>
    <html>
    <head>
    <title>iPhone X</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <style>
    html { height: 100%; font-family: sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
    body { height: 100%; -webkit-font-smoothing: antialiased; font-smoothing: antialiased; -webkit-overflow-scrolling: touch; overflow-scrolling: touch; }
    html, body, div, span, applet, object, iframe, figure, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code,
    del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td { margin: 0; padding: 0; border: 0; }
    article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary { display: block; }
    div, article, section, p, ul, li, span, label { box-sizing: border-box; }
    
    body {
        background: black;
    }
    
    #cover-canvas {
        position: fixed;
        top: 0;
        left: 0;
    }
    
    .video-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    
    #video-studiomeal {
        transform: scale(1);
    }
    </style>
    
    </head>
    <body>
    <div class="video-wrapper">
        <video muted="" playsinline="" autoplay="" loop="" id="video-studiomeal" src="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/large_2x.mp4"></video>
    </div>
    <canvas id="cover-canvas"></canvas>
    
    <script>
    'use strict';
    
    (function () {
    
        var elemCanvas,
            elemVideo,
            elemPhone,
            context,
            windowWidth = 0, // 브라우저 폭
            windowHeight = 0, // 브라우저 높이
            canvasWidth = 0, // 캔버스 폭(브라우저 폭에 맞춤)
            canvasHeight = 0, // 캔버스 높이(브라우저 높이에 맞춤)
            scrollY = 0, // 현재 스크롤 위치
            relativeScrollY = 0, // 각 키프레임에서 사용하는 상대적인 스크롤 위치
            prevDurations = 0, // 이전 키프레임까지의 duration
            totalScrollHeight = 0, // 스크롤을 할 수 있는 전체 높이(body의 높이로 세팅)
            currentKeyframe = 0, // 현재 키프레임(0, 1)
            phoneWidth = 1380, // 아이폰 이미지 기본 크기
            phoneHeight = 3000, // 아이폰 이미지 기본 크기
    
            resizeHandler,
            scrollHandler,
            render,
            drawCanvas,
            calcAnimationValue,
            calcFinalValue,
            init,
            pixelDuration = 0, // 키프레임 당 차지하는 스크롤 높이
            keyframes = [
                {
                    animationValues: {
                        videoScale: [1, 2],
                        triangleMove: [0, 200],
                        rectangleMove: [0, 500]
                    }
                },
                {
                    animationValues: {
                        videoScale: [2, 0.5],
                        triangleMove: [200, 1000],
                        rectangleMove: [500, 500]
                    }
                }
            ],
        
            elemBody = document.body,
            elemCanvas = document.getElementById('cover-canvas'),
            context = elemCanvas.getContext('2d');
            elemVideo = document.getElementById('video-studiomeal');
    
        init = function () {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
    
            resizeHandler();
            render();
    
            window.addEventListener('resize', function () {
                requestAnimationFrame(resizeHandler);
            });
            window.addEventListener('scroll', function () {
                requestAnimationFrame(scrollHandler);
            });
    
            elemPhone = document.createElement('img');
            elemPhone.src = 'phone.png';
            elemPhone.addEventListener('load', function () {
                drawCanvas();
            });
        };
    
        resizeHandler = function () {
            var i;
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            totalScrollHeight = 0;
            pixelDuration = 0.5 * windowHeight;
    
            for (i = 0; i < keyframes.length; i++) {
                totalScrollHeight += pixelDuration;
            }
            totalScrollHeight += windowHeight;
    
            elemBody.style.height = totalScrollHeight + 'px';
            elemCanvas.width = canvasWidth = windowWidth * 2;
            elemCanvas.height = canvasHeight = windowHeight * 2;
            elemCanvas.style.width = windowWidth + 'px';
            elemCanvas.style.height = windowHeight + 'px';
        };
    
        scrollHandler = function () {
            scrollY = window.pageYOffset;
    
            if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight)) {
                return;
            }
    
            if (scrollY > pixelDuration + prevDurations) {
                prevDurations += pixelDuration;
                currentKeyframe++;
            } else if (scrollY < prevDurations) {
                currentKeyframe--;
                prevDurations -= pixelDuration;
            }
    
            relativeScrollY = scrollY - prevDurations;
    
            render();
        };
    
        render = function () {
            var videoScale, triangleMove, rectangleMove;
    
            if (keyframes[currentKeyframe]) {
                videoScale = calcAnimationValue(keyframes[currentKeyframe].animationValues.videoScale);
                triangleMove = calcAnimationValue(keyframes[currentKeyframe].animationValues.triangleMove);
                rectangleMove = calcAnimationValue(keyframes[currentKeyframe].animationValues.rectangleMove);
            } else {
                return;
            }
    
            elemVideo.style.transform = 'scale(' + videoScale + ')';
    
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            if (elemPhone) {
                drawCanvas(videoScale, triangleMove, rectangleMove);
            }
        };
    
        calcAnimationValue = function (values) {
            return (relativeScrollY / pixelDuration) * (values[1] - values[0]) + values[0];
        };
    
        drawCanvas = function (videoScale, triangleMove, rectangleMove) {
            var videoScale = videoScale || 1,
                triangleMove = triangleMove || 0,
                rectangleMove = rectangleMove || 0;
    
            context.save();
            context.translate( (canvasWidth - phoneWidth * videoScale) * 0.5, (canvasHeight - phoneHeight * videoScale) * 0.5 );
            context.drawImage(elemPhone, 0, 0, phoneWidth * videoScale, phoneHeight * videoScale);
            context.restore();
    
            context.fillStyle = 'black';
    
            // 위 삼각형
            context.beginPath();
            context.moveTo(canvasWidth * 0.5 - 1500, -triangleMove - 1700);
            context.lineTo(canvasWidth * 0.5, canvasHeight * 0.5 - 150 - triangleMove);
            context.lineTo(canvasWidth * 0.5 + 1500, -triangleMove - 1700);
            context.lineTo(canvasWidth * 0.5 - 1500, -triangleMove - 1700);
            context.fill();
            context.closePath();
    
            // 아래 삼각형
            context.beginPath();
            context.moveTo(canvasWidth * 0.5 - 1500, canvasHeight + triangleMove + 1700);
            context.lineTo(canvasWidth * 0.5, canvasHeight * 0.5 + 150 + triangleMove);
            context.lineTo(canvasWidth * 0.5 + 1500, canvasHeight + triangleMove + 1700);
            context.lineTo(canvasWidth * 0.5 - 1500, canvasHeight + triangleMove + 1700);
            context.fill();
            context.closePath();
    
            // 왼쪽 삼각형
            context.beginPath();
            context.moveTo(canvasWidth * 0.5 - 1700 - triangleMove, -1700);
            context.lineTo(canvasWidth * 0.5 - 130 - triangleMove, canvasHeight * 0.5);
            context.lineTo(canvasWidth * 0.5 - 1700 - triangleMove, canvasHeight + 1700);
            context.lineTo(canvasWidth * 0.5 - 1700 - triangleMove, -1700);
            context.fill();
            context.closePath();
    
            // 오른쪽 삼각형
            context.beginPath();
            context.moveTo(canvasWidth * 0.5 + 1700 + triangleMove, -1700);
            context.lineTo(canvasWidth * 0.5 + 130 + triangleMove, canvasHeight * 0.5);
            context.lineTo(canvasWidth * 0.5 + 1700 + triangleMove, canvasHeight + 1700);
            context.lineTo(canvasWidth * 0.5 + 1700 + triangleMove, -1700);
            context.fill();
            context.closePath();
    
            // 박스 상, 하
            context.fillRect(0, canvasHeight * 0.5 - 2600 - rectangleMove, canvasWidth, 2000);
            context.fillRect(0, canvasHeight * 0.5 + 600 + rectangleMove, canvasWidth, 2000);
        };
    
        init();
    
    })();
    </script>
    </body>
    </html>
    ```
  
* <button data-toggle="collapse" data-target="#image">사용된 이미지</button>

    {:.collapse #image}
    ![](/static/img/interaction/phone.png)

## keyframe

위 샘플 코드를 받아서 실행해보면 X의 크기가 커지는 속도가 중간에 확 빨라진다.  
이는 `keyframe` 이 있다는 증거다.  
처음화면에 초기값 설정되어있는 `keyframe`이 있을 것이고 중간에 속도가 변할 때 `keyframe`이 있을 것이다.  
`keyframe`이 있다는 것이 이 예제의 특징이다. 

사실 `canvas`를 사용한 것은 퍼포먼스를 위해서 사용한 도구일뿐이고 이 예제를 구현하는 중요한 **키워드**는 `keyframe`이다.  
그래서 까다로운 부분이 있다.  
스크롤 관련 애니메이션이 사실 **등속도**로 커지거나 작아지기만하면 어렵지 않다.  
스크롤된 값을 자바스크립트로 읽어와 그 값 비율에 따라서 값만 조절해주면 되기 때문이다.  

하지만 위와 같이 중간에 속도가 변하는 `keyframe` 개념이 들어가면 조금 까다로운 점이 생긴다.  

## 소스분석

```css
html { height: 100%; font-family: sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }
    body { height: 100%; -webkit-font-smoothing: antialiased; font-smoothing: antialiased; -webkit-overflow-scrolling: touch; overflow-scrolling: touch; }
    html, body, div, span, applet, object, iframe, figure, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code,
    del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt, dd, ol, ul, li, fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td { margin: 0; padding: 0; border: 0; }
    article, aside, details, figcaption, figure, footer, header, hgroup, main, nav, section, summary { display: block; }
    div, article, section, p, ul, li, span, label { box-sizing: border-box; }
```

위 부분은 **CSS RESET** 부분이다.  
큰 신경 안써도 된다.

```html
<div class="video-wrapper">
    <video muted="" playsinline="" autoplay="" loop="" id="video-studiomeal" src="https://images.apple.com/media/us/iphone-x/2017/01df5b43-28e4-4848-bf20-490c34a926a7/overview/primary/hero/large_2x.mp4"></video>
</div>
<canvas id="cover-canvas"></canvas>
```

애플 사이트는 다른 요소들이 많았지만 위 예제에선 필요한 핵심 요소만 넣어놨다.  
위의 `canvas` 태그와 `video` 태그를 움직이는 것이 이번 예제의 핵심이다.

```css
#cover-canvas {
    position: fixed;
    top: 0;
    left: 0;
}
```

위의 `canvas` 태그엔 위와 같은 속성이 적용되어있다.  
`position: fixed` 는 화면에 고정되는 속성이다.  
스크롤을 해도 해당 위치에 그대로 있다.

그리고 `width`나 `height`는 자바스크립트로 제어하기 때문에 따로 안주었다.  

```css
.video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
```

비디오를 감싸고 있는 **video-wrapper**에게 `display: flex;`, `justify-content: center;`, 
`align-items: center` 를 주었다.  
이 세가지가 안에 있는 `video` 태그를 세로 가로 가운데정렬하게 만들어준다.  
그리고 마찬가지로 `position: fixed;`를 넣었다.  
스크롤은 되지만 우리가 바라보는 오브젝트들은 그 자리에 가만히 있어야되기 때문이다.  
`overflow: hidden`은 iOS에서 바운싱 현상으로 삐져나오는 부분들이 보일까봐 넣어준 것이다.  
바운싱 특징이 없는 OS라면 `overflow: hidden`을 안 줘도 안 보일 것이다.