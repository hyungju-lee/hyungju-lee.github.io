---
title: 7. 아이폰 X 인터렉션 코드 분석
layout: post
date: '2020-08-24 01:38'
categories:
- js_interaction
---

## 아이폰 X 인터렉션 코드 분석

## init 함수

1. 각 변수에 해당 값 할당.  
   ```javascript
    windowWidth = window.innerWidth;windowHeight = window.innerHeight;
   ```
   
2. 함수 실행  
   ```javascript
    resizeHandler()render() 
   ```
   
3. 이벤트 등록  
   * resize 이벤트 발생 -> requestAnimationFrame(resizeHandler) 실행    
   * scroll 이벤트 발생 -> requestAnimationFrame(scrollHandler) 실행
   
4. canvas 관련 변수 및 함수실행  
   * elemPhone = document.createElement('img'); : 이미지 태그 생성
   * elemPhone.src = 'phone.png' : elemPhone 객체의 src 속성에 phone.png 부여
   * elemPhone 객체가 load 되면, drawCanvas() 함수 실행

## resizeHandler 함수

1. 재할당  
   변수 i 정의
    ```javascript
    windowWidth = window.innerWidth;  
    windowHeight = window.innerHeight;  
    totalScrollHeight = 0;pixelDuration = 0.5 * windowHeight;
    ```  
   : 애니메이션이 발생할 구간을 정의 / windowHeight의 반만큼의 구간만큼 애니메이션이 발생
   
2. totalScrollHeight  
   현재 애니메이션 구간, 키프레임이 변하는 구간은 2구간이다.  
   for 문으로 이 두 구간만큼의 구간을 totalScrollHeight에 더해준다.  
   그리고 totalScrollHeight에 마지막으로 windowHeight 를 더해준다.  
   그러면 총 document의 height가 될 것이다.
   
3. 속성설정  
    이를
    ```javascript
    elemBody.style.height = totalScrollHeight + 'px';
    ```
    이렇게 body에 부여하였다.
    canvas 태그의 width 속성에 windowWidth * 2 값을 부여,canvas 태그의 height 속성에 windowHeight * 2 값을 부여.  
    그리고   
    canvas style width 에 windowWidth 부여canvas style height 에 windowHeight 부여  
    -> 레티나 2배수 이미지처럼

    scrollHandler 함수 scrollHandler 안의 scrollY 변수엔 window.pageYOffset; 이란 값이 담겼다.  
    window.pageYOffset;은 jQuery의 scrollTop과 똑같다.

```javascript
if ( scrollY < 0 || scrollY > (totalScrollHeight - windowHeight) ) {	
    return
}
```

scrollY가 0보다 작다면 = 페이지 스크롤 위치가 맨 위라면,  
|| = 또는  
scrollY가 (totalScrollHeight - windowHeight) 보다 크다면 = 페이지 스크롤 위치가 맨 끝이라면,  
return해라 = 함수를 종료시켜라.  

```javascript
if ( scrollY > pixelDuration + prevDurations ) {	
    prevDurations += pixelDuration;	currentKeyframe++;
} else if ( scrollY < prevDurations ) {	
    currentKeyframe--;	prevDurations -= pixelDuration;
}
```

scrollY 가 pixelDuration + prevDurations 보다 크다면 = 해당 예제의 keyframes는 두 구간으로 나뉘어있다.  
처음 X가 확대되는 구간과 확대된 후에 사라지는 구간으로 나뉘어있다.  
그 구간을 구분하는 식이다.  
첫번째 구간이라면 currentKeyframe 값을 0으로 하고 두번째 구간이라면 1로한다.  

```javascript
relativeScrollY = scrollY - prevDurations;
```

현재 스크롤의 위치와 각 구간별 시작점의 차를 구해 현재 스크롤탑 위치를 상대적으로 구한다.  
그리고 마지막으로 render() 함수 실행  

## render 함수

var videoScale, triangleMove, rectangleMove 변수 선언

```javascript
if ( keyframes[currentKeyframe] ) {

}
```
  
keyframes 분수에 위에서 선언된 currentKeyframe 번째 요소 - truthy 값이라면, 
videoScale 변수엔 calcAnimationValue(keyframes[currentKeyframe].animationValues.videoScale) 
함수실행 값 할당  
나머지 triangleMove, rectangleMove 변수에도 마찬가지 원리로 할당  
elemVideo.style.transform = 'scale(' + videoScale + ')'; : video 태그 스캐일 변형  
context.clearRect(0, 0, canvasWidth, canvasHeight); windowWidth / windowHeight 각각 두배크기로 선언된 canvas 태그 안에 그림들 다 지우는 식  
elemPhone이 truthy 값이라면 drawCanvas(videoScale, triangleMove, rectangleMove); 함수 실행

## calcAnimationValue 함수
(각 keyframe 구간 상대적인 스크롤 위치 / 각 구간 스크롤길이) 를 하면 진행 %가 나올 것이다.  
이를 (values[1] - values[0]) 에 곱하자.그리고 처음 values[0] 을 더해준다.

## drawCanvas 함수
videoScale 인자값이 전달오면 해당 인자값 할당 아니면 1.triangleMove 인자값이 전달오면 해당 인자값 할당 
아니면 0.rectangleMove 인자값이 전달오면 해당 인자값 할당 아니면 0.  

```javascript
context.save();
context.translate( (canvasWidth - phoneWidth * videoScale) * 0.5, (canvasHeight - phoneHeight * videoScale) * 0.5);
context.restore();
```

이미지를 가운데 그리기 위함.  
이미지와 canvas 모두 레티나대응을 위한 2배수로 되었다는 것을 감안....이거 주의..   
테스트할 때 MDN 설명과 다르게 움직여서..MDN 설명된대로라면 10, 10이면 10px, 10px, 움직여야되는데 
5px, 5px로 움직임..이는 2배수 레티나 대응으로 canvas를 설정해서 그런 것!!  

여튼 위는 아이폰 이미지가 가운데 그려지도록 하기 위한 식임이렇게 canvas는 API가 저사양이다.

삼각형 그리는 것도 2배수를 '기준'으로 삼고 그려야된다.    
**1배수를 생각하고 이해하려고하면 이해 안된다!!!! 중요!!**