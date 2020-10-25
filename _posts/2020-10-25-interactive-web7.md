---
title: 7. 최종 브라우저 테스트 - 인터넷 익스플로러 대응
layout: post
date: '2020-10-25 12:25'
categories:
- js_interactive_web2
---

## 7. 최종 브라우저 테스트 - 인터넷 익스플로러 대응

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section8/step4/index.html){:target="_blank"}

이 예제도 마찬가지로 **모더나이즈js**를 통해 IE에서 고정된 컨텐츠가 오작동을 하지 않도록 처리하였다.  

```css
.no-csspositionsticky .fix_motion .fix_wrap .device_fix {position: relative; top:600px;}
```

```javascript
function imageChange(moveX){ //시계안 이미지 변경을 처리하는 함수
    if(Modernizr.csspositionsticky){
        var img = $('.fix_motion .slide_wrap .sldie');
        img.css({
            'transform':'translateX('+ -moveX +'px)'
        });
    }
}
```