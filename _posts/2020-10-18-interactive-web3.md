---
title: 3. 스크롤위치에 따라 아침, 오후, 저녁, 밤 그리고 달 구현
layout: post
date: '2020-10-18 09:07'
categories:
- js_interactive_web2
---

## 3. 스크롤위치에 따라 아침, 오후, 저녁, 밤 그리고 달 구현

* [스크롤위치에 따라 아침, 오후, 저녁, 밤 그리고 달 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section4/step2/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#html">html</button>

{:.collapse #html}
```html
<div class="wrap">
    <div class="motion_area">
        <div class="bg one active"></div>
        <div class="bg two"></div>
        <div class="bg three"></div>
        <div class="bg four"></div>
        <div class="motion_rope"></div>
        <div class="motion_moon active"></div>
    </div>
</div>
```

* <button data-toggle="collapse" data-target="#css">css</button>

{:.collapse #css}
```css
.motion_area {position:relative; width:100%; height:6000px; background-color:#000;}
.motion_area .bg {position: absolute; left:0; top:0; width: 100%; height: 100%; opacity:0; transition:opacity .5s;}
.motion_area .bg.one {background-color: #50bdf3} /* 아침 */
.motion_area .bg.two {background-color: #358ccb} /* 점심 */
.motion_area .bg.three {background-color: #3535ff} /* 이른저녁 */
.motion_area .bg.four {background-color: #222222} /* 밤 */
.motion_area .bg.active {opacity: 1;}
.motion_area .motion_rope {position: fixed; left:10%; top:0; z-index:20; width:20px; height: 100%; background-color: rosybrown}
.motion_area .motion_moon {visibility:hidden; position:fixed; right:100px; top:100px; z-index:20; width:200px; height: 200px; border-radius: 50%; background-color: yellow; opacity: 0; transform:translateY(-100px); -webkit-transform:translateY(-100px); -moz-transform:translateY(-100px); -o-transform:translateY(-100px); -ms-transform:translateY(-100px); transition:1s;}
.motion_area .motion_moon.active {visibility:visible; opacity:1; transform:translateY(0px); -webkit-transform:translateY(0px); -moz-transform:translateY(0px); -o-transform:translateY(0px); -ms-transform:translateY(0px);}
```

굳이 이렇게 Element를 4개 만들어서 구현한 이유가 뭘까?  
스크립트를 통해서 해당 위치마다 `background-image`를 달리해주면 안될까?  
(background-color 부분이 background-image라면)

스크립트로 처리할 경우 이미지가 늦게 로드되면서 배경전환이 부드럽게 보이지 않을 수도 있다.  
스크립트로 처리할 거라면 이 부분도 신경써야 될 것이다.  

여튼 그래서 4개의 요소를 미리 만들어놓고 문서가 로드될때 모든 이미지가 로드되도록 한 것이다. 