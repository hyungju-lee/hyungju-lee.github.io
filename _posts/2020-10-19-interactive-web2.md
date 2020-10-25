---
title: 4. 섹션이동 스크롤 인터렉션 스크립트 작성
layout: post
date: '2020-10-19 23:25'
categories:
- js_interactive_web2
---

## 4. 섹션이동 스크롤 인터렉션 스크립트 작성

1. 스크롤을 할 때 **클래스**로 스크롤의 방향을 체크하는 것 - 이는 좋은 아이디어인 것 같다.
2. 하지만 이 예제도 스크롤을 마구 막 발생시켰을 때 스크롤이벤트가 많이 발생하면서 발생하는 콜백함수에의해 버벅거리는건 해결하지 못한듯 하다.  
   버벅거림 정도가 너무 심하다.  
   이는 치명적인 이슈가 될 수 있다.
3. **jQuery**의 `animate` 메서드를 통해 **scrollTop**을 이동시킨다.  
   이때 IE 버그발생 방지를 위해 `+1`하는 방법은 좋은 방법인 것 같다.
4. `animate`의 **콜백 펑션** 활용도 좋은 것 같다.

```javascript
function moveStartRender(){ //섹션 이동을 처리해주는 함수
    if(!header.hasClass('active')){ //해더 클래스가 없을경우에는 아래로 내려오는 상황

        header.addClass('active');
        sectionMainVisual.addClass('active');
        sectionOverlap.addClass('active');

        $('html').stop(true).animate({
            scrollTop: sectionMainBottom+1 //IE버그 반복 버그 처리를 위해 1을 추가합니다.
        },500,function(){
            sectionIsMoving = false; //섹션이 이동중인지 체크하는 변수
        });

    }else{ //해더 클래스가 있을경우 위로 올라가는 상황

        header.removeClass('active');
        sectionMainVisual.removeClass('active');
        sectionOverlap.removeClass('active');

         $('html').stop(true).animate({
            scrollTop: sectionMainTop
        },500,function(){
            sectionIsMoving = false; //섹션이 이동중인지 체크하는 변수
        });

    }
}
```
