---
title: 3. 애플 웹사이트 따라하기 2
layout: post
date: '2020-08-17 13:56'
categories:
- js_interaction
---

## 애플 웹사이트 따라하기 2

스크립트 작성은 전통적인 방식으로 작성했다.  
`canvas`는 다시 말하지만 예전 API로 구성되어있다.  
예전 API란 **추상화가 되어있지 않다**는 뜻이다.  

CSS 에서 어떤 요소를 가운데 정렬하는 방법은 무수히 많고 쉽다.  
하지만 `canvas`는 그렇지 않기에 일일이 어렵게 작업을 해줘야된다. (막 어렵지는 않다)

```javascript
'use strict';
    
(function () {

    // element 를 선택하는 변수들은 앞에 구분을 하기 위해 elem을 붙였다.
    var elemCanvas, // Canvas 엘리먼트 선택
        elemVideo, // Video 엘리먼트 선택
        elemPhone, // Phone 이미지 들어갈 이미지 엘리먼트 선택 
                    // canvas에서 이미지를 사용하기 위해선 img 태그를 생성한 후에 걔를 canvas에 그려줘야된다. 
                    // 이때 이 변수를 사용할 것이다.
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
        // canvas 요소에서 geContext 메서드를 활용
        // canvas 요소는 모든 작업을 할 때 context 객체를 활용한다.
        // context 를 통해서 화면에 우리가 원하는 정보를 그린다.

        // canvas는 사실 굉장히 저수준 API라 코드량도 굉장히 많고 귀찮은 점이 많다.
        context = elemCanvas.getContext('2d');
        elemVideo = document.getElementById('video-studiomeal');

    init = function () {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        // resize 할 때 실행되어야 하는 함수, 처음 실행할 때도 실행되어야 한다.
        resizeHandler();
        // 그림을 실제로 그려주는 용도의 함수이다.
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
        // 고해상도 모니터(레티나) 2배수 이미지 처리하듯 canvas 태그도 똑같다.
        // 2배 크기로 설정 후
        elemCanvas.width = canvasWidth = windowWidth * 2;
        elemCanvas.height = canvasHeight = windowHeight * 2;
        // 실제 크기는 그의 반으로 설정한다.
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
            // videoScale 은 비디오의 크기를 나타내는 변수
            videoScale = calcAnimationValue(keyframes[currentKeyframe].animationValues.videoScale);
            // 아래 triangleMove 와 rectangleMove 는 X에 관련된 것이라고 보면된다.
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
        // 긴 직사각형으로 위 아래 막음
        context.fillRect(0, canvasHeight * 0.5 - 2600 - rectangleMove, canvasWidth, 2000);
        context.fillRect(0, canvasHeight * 0.5 + 600 + rectangleMove, canvasWidth, 2000);
    };

    init();

})();
```