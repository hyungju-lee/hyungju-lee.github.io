---
title: 트랜지션과 트랜스포에 대한 이해 및 벤더프리픽스
layout: post
date: '2020-10-17 15:04'
categories:
- js_interactive_web2
---

## 트랜지션과 트랜스포에 대한 이해 및 벤더프리픽스

* [트랜지션과 트랜스포에 대한 이해 및 벤더프리픽스](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section3/step1/index.html){:target="_blank"}

## 트랜스폼

트랜스폼은 요소의 전환을 나타낸다.  
그리고 이 전환에는 크게 4가지 속성이 있다.

>rotate, scale, skew, translate

1. rotate : 회전
2. scale : 줌인, 줌아웃
3. skew : 기울기
4. translate : x, y좌표 이동

## 트랜지션

전환될 때 애니메이션처럼 자연스러운 전환이 되도록 해주는 속성이다.

## 벤더프리픽스

![](/static/img/interaction/image20.jpg)

IE9에서 transform을 사용하기 위해선, `-ms-`라는 접두사를 붙여야된다는 뜻이다.  
이런식으로 확인하면서 벤더프리픽스를 사용하면된다.

## auto prefix

위와 같이 일일이 확인하면서 붙이기 귀찮다.  
그럴땐 **auto prefix**란걸 사용한다.  
웹 테스크 매니저든 에디터든 어디서든 사용할 수 있다.  

![](/static/img/interaction/image21.jpg)

위와같이 **config** 파일에 벤더프리픽스를 적용할 브라우저들을 설정해줄 수 있다.  
