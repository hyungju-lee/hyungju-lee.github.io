---
title: 8. 최종 브라우저 테스트 - 인터넷 익스플로러 대응
layout: post
date: '2020-10-25 13:41'
categories:
- js_interactive_web2
---

## 8. 최종 브라우저 테스트 - 인터넷 익스플로러 대응

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step3/index.html){:target="_blank"}

modernizr.js 활용

```css
.no-csspositionsticky .fix_motion {height: auto;}
.no-csspositionsticky .fix_wrap {position: relative;}
.no-csspositionsticky .fix_motion .fix_wrap .cont_box .canvas_wrap canvas {display: none;}
.no-csspositionsticky .fix_motion .fix_wrap .cont_box .canvas_wrap .no_canvas {display:block;}
.no-csspositionsticky .fix_motion .fix_wrap .cont_box .txt {color:#000;}
.no-csspositionsticky .fix_motion .fix_wrap .cont_box .txt:after {width:80%;}
```

```javascript
if(Modernizr.csspositionsticky){ //브라우저가 sticky를 지원할 경우 실행
    init(); //start
}
```