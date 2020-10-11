---
title: 크로미움 엔진과 오프스크린 캔버스 기술
layout: post
date: '2020-10-11 11:08:00'
categories:
- canvas
---

## 크로미움 엔진과 오프스크린 캔버스 기술

**네이버 데뷰 2018 영상 중 발췌**

책에서는 찾을 수 없는 최신기술 기반으로 이야기하는 HTML5 기반 Canvas 기술 이야기 : Off Screen Canvas

* [영상링크](https://tv.naver.com/v/4578450){:target="_blank"}

## Canvas Rendering은 JavaScript로..

```javascript
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

context.drawRect();
context.drawText();
```

결국 캔버스 개념도 자바스크립트 기반으로 그림을 그리게 된다.

![](/static/img/script/image10.png)

자바스크립트 엔진에서 렌더링 엔진으로 데이터를 주고받게되니, 결국 자바스크립트로 캔버스를 활용하기 위해서는 자바스크립트를 어느정도 이해할 필요가 있다.  

![](/static/img/script/image11.png)

다만 기존 canvas 기능 문제는 16.7ms 안에 그림을 그려내기가 너무 힘들었다.  
할일도 많고, 트래픽 자체도 문제였으니까.

![](/static/img/script/image12.png)

그래서 대안이 나온게 GPU 가속을 사용해서 그림을 빨리 그려내는 방식.  
말 그대로 웹브라우저가 해야할 일을 그래픽 카드에게 넘기는 방식이다.

![](/static/img/script/image13.png)

**두번째는 WEB GL을 사용해서 여러 캔버스를 만들고, 기존에 그려놓은 그림을 다시 사용하는 형태.**  
(코드양이 줄어서, 자바스크립트 동작에 대한 부하가 적어졌다.)

![](/static/img/script/image14.png)

지금까지의 방식은 이런 '꼼수'들밖에 없었고, 그마저도 완벽하게 해결이 안되는 상태였다.

---

![](/static/img/script/image15.png)

2018년 8월에 등장한 내용.  
크롬 69 Stable 버전에 이미 내장된 기능.

## 오프스크린 캔버스에 대한 구글의 개발 자료

* [구글 자료](https://developers.google.com/web/updates/2018/08/offscreen-canvas){:target="_blank"}

더 이상 메인 쓰레드가 바쁘게 일하지 않아도, 워커 쓰레드에게 대신 일하게 할 수 있다.  
말 그대로 웹의 canvas를 통해 더 무거운 시각효과나 애니메이션도 표현할 수 있게 되었다는 이야기.

**이건 단순히 2D뿐만 아니라 3D에도 해당되는 이야기다.**

## 오프스크린 캔버스에 대한 모질라재단 개발 사이트의 내용

* [모질라 자료](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas){:target="_blank"}

## 브라우저별 지원 범위

크로미움 엔진 69 버전이면 다 지원이 된다는 건 위에서도 얘기했고, 동일 엔진을 쓰는 오페라 같은 경우는 당연히 되는 거고.  
엣지는 미정, 구버전인 IE랑, 사파리 브라우저는 아예 서포트가 안된다.  
아직 나온지 얼마되지 않은 내용이기도 하고,,  
웹 브라우저 엔진들도 각자 경쟁을 하고있는 부분이라 좀 더 지켜봐야한다.

![](/static/img/script/image16.png)

모든 브라우저가 이 기능을 지원하지 않으면 이 기술을 기반으로 디자인을 마음껏 하기가 어려워지니까, 추후 해외 뉴스들을 보면서 
브라우저별 기능지원에 대한 소식을 계속 추적해봐야할 것 같다.

---

## 사파리의 웹킷 엔진에 대한 업데이트 내용

* [사파리 2018.04.12](https://webkit.org/blog/8216/new-webkit-features-in-safari-11-1/){:target="_blank"}

사실상 Offscreen Canvas를 지원하기 위한 시험과정을 거치고 있다.  
공식 지원은 아니고 실험적 기능지원 속에 넣어둔 상태.  
그러니 사실상 지원이 될거라고 봐야할 것 가탇.  

그럼 이제 남은건 IE랑 엣지 브라우저인데, 사실상 아직도 edge보다 IE 최신버전을 쓰는 사용자가 더 많아서 마이크로소프트가 어떤 선택을 하게될지 궁금하다.  
IE를 단종시키고 엣지로 연결을 하려고했는데 계속 실패했떤 역사가 있거든.  
기존에 하던 형태를 봐서는 최신버전 IE에만 지원해주고 점차 구버전 IE를 단종시키는 방향으로 갈 것 같은데.. 정확한건 더 지켜봐야 안다. 

현재까지 Edge 브라우저와 IE쪽에 Offscreen canvas 기능이 지원될지에 대한 여부는 확실치가 않다.  
공식적인 답변이 나와보려면 좀 더 기다려봐야겠지만, 내년 상반기(2019 상반기)쯤이면 확실해질듯 하다.  
**현재 2020년 10월인데 IE11, 오프스크린 캔버스 지원안하는 것 같다. 안하기로 했나봄**  

---

