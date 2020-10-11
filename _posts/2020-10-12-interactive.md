---
title: 입체감이 느껴지는 페럴렉스 페이지 구현
layout: post
date: '2020-10-12 00:21'
categories:
- js_interactive_web
---

## 입체감이 느껴지는 페럴렉스 페이지 구현

* [입체감이 느껴지는 페럴렉스 페이지 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/lastSample/index.html){:target="_blank"}

모바일에선 마우스 이벤트 말고 **자이로 센서**로 인터렉션을 구현한다.

* <button data-toggle="collapse" data-target="#html">html</button>

{:.collapse #html}
```html
<!DOCTYPE html>
<html>

<head>
    <title>인터랙티브</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <link rel="stylesheet" type="text/css" href="./css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./css/interactive.css" />
    <script type="text/javascript" src="./js/script.js"></script>
</head>
<body>
    <main>
        <div class="progress"><span class="progressBar"></span></div>
        
        <section class="mainPage">
            <div class="imageWrap">
                <div class="parallax_image" id="parallax_0"></div>
                <div class="parallax_image" id="parallax_1"></div>
                <div class="parallax_image" id="parallax_2"></div>
                <div class="parallax_image" id="parallax_3"></div>
                <div class="parallax_image" id="parallax_4"></div>
                <div class="parallax_image" id="parallax_5"></div>
            </div>
        </section>

        <section class="subPage">
            <div id="parallax_6"></div>
            <div class="innerWrap">
                <div class="contWrap">
                </div>
            </div>
        </section>
        
    </main>
</body>

</html>
```

* <button data-toggle="collapse" data-target="#css">css</button>

{:.collapse #css}
```css
html, body, div, span, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
abbr, address, cite, code,
del, dfn, em, img, ins, kbd, q, samp,
small, strong, sub, sup, var,
b, i,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, summary,
time, mark, audio, video {
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

body {
    line-height:1;
}

article,aside,details,figcaption,figure,
footer,header,hgroup,menu,nav,section {
    display:block;
}

nav ul {
    list-style:none;
}

blockquote, q {
    quotes:none;
}

blockquote:before, blockquote:after,
q:before, q:after {
    content:'';
    content:none;
}

a {
    margin:0;
    padding:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
}

/* change colours to suit your needs */
ins {
    background-color:#ff9;
    color:#000;
    text-decoration:none;
}

/* change colours to suit your needs */
mark {
    background-color:#ff9;
    color:#000;
    font-style:italic;
    font-weight:bold;
}

del {
    text-decoration: line-through;
}

abbr[title], dfn[title] {
    border-bottom:1px dotted;
    cursor:help;
}

table {
    border-collapse:collapse;
    border-spacing:0;
}

/* change border colour to suit your needs */
hr {
    display:block;
    height:1px;
    border:0;  
    border-top:1px solid #cccccc;
    margin:1em 0;
    padding:0;
}

input, select {
    vertical-align:middle;
}

* {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  overflow-x: hidden;
}

main {
  position: relative;
}

main .progress {
  position: fixed;
  width: 100%;
  height: 2px;
  background-color: black;
  z-index: 10000;
}

main .progress .progressBar {
  position: fixed;
  width: 0%;
  background: #ffa600;
  height: 2px;
  z-index: 10001;
  -webkit-transition: width .1s ease;
  -o-transition: width .1s ease;
  transition: width .1s ease;
}

section {
  position: relative;
  width: 100%;
}

section.mainPage {
  background: -webkit-gradient(linear, left top, left bottom, from(#4b0220), to(#691c46));
  background: -o-linear-gradient(#4b0220, #691c46);
  background: linear-gradient(#4b0220, #691c46);
  padding-bottom: 50px;
}

section.mainPage h1.title {
  position: fixed;
  text-align: center;
  color: #fff;
  font-size: 2.7rem;
  padding-top: 20vh;
  width: 400px;
  left: calc(50% - 200px);
}

section.mainPage .imageWrap {
  height: 1100px;
  overflow-y: hidden;
}

section.mainPage .imageWrap .parallax_image {
  position: fixed;
  width: 100%;
  height: inherit;
  background-position: top center;
  background-size: auto 100%;
  background-repeat: no-repeat;
}

section.mainPage .imageWrap .parallax_image:nth-child(1) {
  background-image: url(../image/main_0.png);
}

section.mainPage .imageWrap .parallax_image:nth-child(2) {
  background-image: url(../image/main_1.png);
}

section.mainPage .imageWrap .parallax_image:nth-child(3) {
  background-image: url(../image/main_2.png);
}

section.mainPage .imageWrap .parallax_image:nth-child(4) {
  background-image: url(../image/main_3.png);
}

section.mainPage .imageWrap .parallax_image:nth-child(5) {
  background-image: url(../image/main_4.png);
}

section.mainPage .imageWrap .parallax_image:nth-child(6) {
  background-image: url(../image/main_5.png);
  background-size: cover;
}

section.subPage {
  background: -webkit-gradient(linear, left top, left bottom, from(#000), to(#691c46));
  background: -o-linear-gradient(#000, #691c46);
  background: linear-gradient(#000, #691c46);
}

section.subPage #parallax_6 {
  position: relative;
  background: url(../image/main_6.png) bottom center no-repeat;
  background-size: auto 1100px;
  height: 400px;
  width: 100%;
  top: -400px;
}

section.subPage .innerWrap {
  position: relative;
  margin: 0 auto;
  padding: 500px 0;
  width: 900px;
  height: 4500px;
}

@media only screen and (max-width: 768px) {
  section.subPage .innerWrap {
    width: 100%;
  }
}
```

* <button data-toggle="collapse" data-target="#script">script</button>

{:.collapse #script}
```javascript
let x = 0;
let y = 0;
let mx = 0;
let my = 0;
let speed = 0.03;
let scrollTop = 0;
let parallax_0, parallax_1, parallax_2, parallax_3, parallax_4, parallax_5, parallax_6;
let progressBar;
let _document, _windowHNum;

window.onload = function() {
    progressBar = document.getElementsByClassName("progressBar")[0];

    parallax_0 = document.getElementById("parallax_0");
    parallax_1 = document.getElementById("parallax_1");
    parallax_2 = document.getElementById("parallax_2");
    parallax_3 = document.getElementById("parallax_3");
    parallax_4 = document.getElementById("parallax_4");
    parallax_5 = document.getElementById("parallax_5");
    parallax_6 = document.getElementById("parallax_6");

    window.addEventListener('resize', stageResize, false);
    window.addEventListener('mousemove', mouseMove, false);
    window.addEventListener('scroll', scrollFunc, false);

    stageResize();
    loop();
}

function scrollFunc(e) {
    var scrollTop = document.documentElement.scrollTop;

   let per = Math.ceil(scrollTop / (_document - _windowHNum) * 100)
    progressBar.style.width = per + "%";

   parallax_0.style.transform = "translate3d(0px, " + scrollTop * .03 + "px, 0px)";
   parallax_1.style.transform = "translate3d(0px, " + scrollTop * .03 + "px, 0px)";
   parallax_2.style.transform = "translate3d(0px, " + scrollTop * .12 + "px, 0px)";
   parallax_3.style.transform = "translate3d(0px, " + scrollTop * .16 + "px, 0px)";
   parallax_4.style.transform = "translate3d(0px, " + scrollTop * .22 + "px, 0px)";
   parallax_5.style.transform = "translate3d(0px, " + scrollTop * .25 + "px, 0px)";
}

function stageResize() {
    _document = document.body.offsetHeight;
    _windowHNum = window.outerHeight;
}

function loop() {
    mx += (x - mx) * speed;
    my += (y - my) * speed;

    parallax_4.style.transform = "translate3d(" + mx / 140 + "px, 0px, 0px)";
    parallax_5.style.transform = "scale(1.1) translate3d(" + mx / 50 + "px, 0px, 0px)";
    parallax_6.style.transform = "scale(1.2) translate3d(" + -mx / 20 + "px, " + -my/20 + "px, 0px)";
    window.requestAnimationFrame(loop);
}


function mouseMove (e) {
    x = (e.clientX - window.innerWidth / 2);
    y = (e.clientY - window.innerHeight / 2);
}
```