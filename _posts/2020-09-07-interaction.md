---
title: 5. study 공유 3
layout: post
date: '2020-09-07 12:22'
categories:
- js_interaction
---

## study 공유 3

### 애플페이지 분석결과

스크롤 인터렉션은 화려해보이지만 **대단한 기술이 사용된 것이 아니다.**  
다만 **수치 계산만 엄청 많이 들어갈 뿐이다.**

수치 계산이란 스크롤 위치마다 `canvas` 어디 위치에 그림을 그릴까?를 뜻한다.  
이 계산만 좀 능숙하게 할 줄 알게된다면 스크롤에 따른 인터렉션은 정말 쉽다.

* [직접 만든 예시 페이지](https://hyungju-lee.github.io/hyungju-lee-interactions/scroll-interaction-2/index-javascript.html){:target="_blank"}

일단 분석결과 내용이다.

1. canvas  
   
   `canvas` 태그는 '도화지' 역할을 하는 태그이다.
   `canvas` 태그를 활용해 애니메이션 효과를 구현하는 방법은 `canvas` 태그에 연속적으로 반복해서 그림을 그려넣는 것이다.  
   모니터 화면과 똑같다고 보면 된다.  
   모니터 화면도 144hz, 60hz 같은 것이 있다.  
   1초에 이미지를 몇번 뿌려주느냐에 따라 모니터에 출력되는 화면의 동적 움직임이 훨씬 자연스럽게 보이거나 덜 자연스럽게 보이거나로 나뉜다.
   
   `canvas` 태그도 마찬가지 원리이다.  
   `canvas` 태그에 반복적으로 수많은 그림들을 연속적으로 그려 사람 눈에 애니메이션처럼 보이도록 하는 것이다.
   이를 '스크롤 위치'와 연동시키면 스크롤 인터렉션이 완성된다.
   
2. requestAnimationFrame  
   
   해당 메서드는 1초에 60번 실행하는 것을 목표로 하고 있습니다.  
   그리고 애니메이션 구현에 가장 많이 쓰입니다.
   즉, `canvas` 태그에 1초에 60번 이 메서드를 활용해 그림을 그릴 수 있다는 뜻입니다.
   컴퓨터 성능에 따라 60번이 안될 수도 있지만 애니메이션을 구현하는 데 있어서 최적의 메서드입니다.
   
   해당 메서드를 사용하면 정말 부드럽게 움직이는 애니메이션을 구현할 수 있습니다.  
   Mac에서 키보드 / 윈도우 마우스휠로 해도 부드럽게 움직입니다.
   
   비교URL
   * [requestAnimationFrame 활용](https://hyungju-lee.github.io/static/img/interaction/ex02/apple-clone-v6/videotest/smoothscroll.html){:target="_blank"}
   * [requestAnimationFrame 활용X](https://hyungju-lee.github.io/static/img/interaction/ex02/apple-clone-v6/videotest/smoothscroll-2.html){:target="_blank"}
   
3. keyframe
   
   우리가 CSS에서 사용하는 keyframe을 떠올리면 된다.  
   CSS keyframe을 사용할 때 구간별(0%, 50%, 70%, ...)로 나눠서 각 구간에 어떤 속성값에 도달해야되는지 정의해준다.  
   스크롤 인터렉션도 마찬가지다.  
   keyframe 이란 키워드를 사용하는 것은 아니지만 스크롤 인터렉션도 해당 개념으로 구간별로 끊어서 애니메이션을 적용시켜준다.

### canvas로 구현하면 성능이 좋은 이유

canvas에 그려지는 그림은 '객체'가 아니기 때문이다.