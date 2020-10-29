---
title: 10. svg와 영상을 활용한 인터렉션
layout: post
date: '2020-10-29 23:13'
categories:
- js_interactive_web2
---

## 10. svg와 영상을 활용한 인터렉션

* [svg와 영상을 활용한 인터렉션](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section11/step1/index.html){:target="_blank"}

```html
<div class="wrap">
    <h2 class="fix_tit">
        <span>SVG :D</span>
        <strong>PARALLAX</strong>
    </h2>
    <div class="svg_wrap">
        <svg id="interactive_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
            <path class="cls-1" d="M733.5,420.5s56-4,69,10,94,53,95,57,14,0,14,0l12-16s11-25,22-28,48-35,48-35,23-14,52-9l11,6-50,16s-22,7-42,54c0,0-17,17-24,18,0,0,4,16-3,26,0,0,18,33,14,37s35-17,60,14c0,0,21,26-1,58,0,0-9,21-23,25v17s4,33,8,35c0,0,28,62,25,83l18,49-45,4,10-8s3-35-16-55c0,0-33-80-32-96,0,0-15-5-18-19,0,0-19-22-18-26,0,0-95-36-119-75,0,0-17,69-31,81,0,0-8,36-17,46,0,0-3,7-32,20l-35,17s-59,56-60,57-9,1-9,1,0,30-3,31l8,12s27,3,23,14c0,0-1,7-14,6h-36s-56-37-55-44,15-38,25-36l91-79s35-25,43-25l12-15,16-109s4-34-57-72-92-23-103-59c0,0,3-28,7-30l-5-90,1-15s-36-43-39-42-30-33,21-21c0,0,95,31,89,52,0,0,4,14-18,24l1,93-4,11Z"/>
        </svg>
    </div>
    <figure class="video_wrap">
        <video src="../video/dance.mp4" muted loop></video>
    </figure>
</div>
```

svg 코드를 가져오려면 svg 파일을 열고

![](/static/img/interaction/image46.jpg)

해당 코드를 그대로 가져오면 된다.  
`video` 태그로 비디오도 불러온 것을 확인할 수 있다.

```css
.svg_wrap { position: fixed; left:50%; top:50%; z-index: 30; width:1920px; height:1080px; transform:translate(-50%,-50%); }
```

css를 보면 조금 특이하다고 느낄 것이다.  
위와 같이 `svg_wrap`에 고정 너비와 높이값을 준 것을 볼 수 있다.  
이유는 **IE11**에서 svg 크기를 제대로 가져오지 못하는 경우가 있어 고정된 값을 추가해준 것이다.  

```css
.svg_wrap #interactive_svg {width:100%; fill:none; stroke:#555; stroke-width:4}
```

그리고 `svg` 태그에 `fill: none` 속성을 적용해준 것을 알 수 있다.  
이 속성은 svg의 배경색을 보이지 않도록 하는 속성이다.  
`stroke: #555` 속성은 svg 선의 색상을 설정하는 속성이다.  
`stroke-width` 속성은 svg 선의 굵기를 설정하는 속성이다.