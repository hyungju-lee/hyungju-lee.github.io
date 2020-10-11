---
title: blend-mode, multiply, 스크립트 설명
layout: post
date: '2020-10-11 21:35'
categories:
- js_interactive_web
---

## blend-mode, multiply, 스크립트 설명

* [예시 파일](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample7.html){:target="_blank"}

1. 마우스커서 따라다니는 요소와 동그라미를 그린 요소를 분리하였다.  
   translate / scale 처리를 같이해야하기에 각각 담당 요소를 나눈 것이다.
   
2. mix-blend-mode : multiply; 속성을 활용하였다.  
   셀로판지 느낌을 줄 수 있다.

* <button data-toggle="collapse" data-target="#index">index.html</button>

{:.collapse #index}
```html
<!DOCTYPE html>
<html>
<head>
    <title>mouseOver</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" type="text/css" href="./css/reset.css" />
    <link rel="stylesheet" type="text/css" href="./css/cursor.css" />
    <script type="text/javascript" src="./js/cursor.js"></script>
</head>
<body>
    <div class="cursorItem">
        <span class="circle"></span>
    </div>

    <div class="gate-box">
      <div class="top">
        <p>마스크를 쓰고 있나요?</p>		
      </div>
      <div class="bottom">
        <div class="inner">
          <a href="/#yes" id="yes">네</a> 
          <a href="/#no" id="no">아니요</a>
        </div>
      </div>
    </div>

</body>
</html>
```

* <button data-toggle="collapse" data-target="#style">style.css</button>

{:.collapse #style}
```css
/*! normalize.css v3.0.2 | MIT License | git.io/normalize */

/**
 * 1. Set default font family to sans-serif.
 * 2. Prevent iOS text size adjust after orientation change, without disabling
 *    user zoom.
 */

 html {
    font-family: sans-serif; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }
  
  /**
   * Remove default margin.
   */
  
  body {
    margin: 0;
  }
  
  /* HTML5 display definitions
     ========================================================================== */
  
  /**
   * Correct `block` display not defined for any HTML5 element in IE 8/9.
   * Correct `block` display not defined for `details` or `summary` in IE 10/11
   * and Firefox.
   * Correct `block` display not defined for `main` in IE 11.
   */
  
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }
  
  /**
   * 1. Correct `inline-block` display not defined in IE 8/9.
   * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.
   */
  
  audio,
  canvas,
  progress,
  video {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
  }
  
  /**
   * Prevent modern browsers from displaying `audio` without controls.
   * Remove excess height in iOS 5 devices.
   */
  
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  
  /**
   * Address `[hidden]` styling not present in IE 8/9/10.
   * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.
   */
  
  [hidden],
  template {
    display: none;
  }
  
  /* Links
     ========================================================================== */
  
  /**
   * Remove the gray background color from active links in IE 10.
   */
  
  a {
    background-color: transparent;
  }
  
  /**
   * Improve readability when focused and also mouse hovered in all browsers.
   */
  
  a:active,
  a:hover {
    outline: 0;
  }
  
  /* Text-level semantics
     ========================================================================== */
  
  /**
   * Address styling not present in IE 8/9/10/11, Safari, and Chrome.
   */
  
  abbr[title] {
    border-bottom: 1px dotted;
  }
  
  /**
   * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.
   */
  
  b,
  strong {
    font-weight: bold;
  }
  
  /**
   * Address styling not present in Safari and Chrome.
   */
  
  dfn {
    font-style: italic;
  }
  
  /**
   * Address variable `h1` font-size and margin within `section` and `article`
   * contexts in Firefox 4+, Safari, and Chrome.
   */
  
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  
  /**
   * Address styling not present in IE 8/9.
   */
  
  mark {
    background: #ff0;
    color: #000;
  }
  
  /**
   * Address inconsistent and variable font size in all browsers.
   */
  
  small {
    font-size: 80%;
  }
  
  /**
   * Prevent `sub` and `sup` affecting `line-height` in all browsers.
   */
  
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  
  sup {
    top: -0.5em;
  }
  
  sub {
    bottom: -0.25em;
  }
  
  /* Embedded content
     ========================================================================== */
  
  /**
   * Remove border when inside `a` element in IE 8/9/10.
   */
  
  img {
    border: 0;
  }
  
  /**
   * Correct overflow not hidden in IE 9/10/11.
   */
  
  svg:not(:root) {
    overflow: hidden;
  }
  
  /* Grouping content
     ========================================================================== */
  
  /**
   * Address margin not present in IE 8/9 and Safari.
   */
  
  figure {
    margin: 1em 40px;
  }
  
  /**
   * Address differences between Firefox and other browsers.
   */
  
  hr {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    height: 0;
  }
  
  /**
   * Contain overflow in all browsers.
   */
  
  pre {
    overflow: auto;
  }
  
  /**
   * Address odd `em`-unit font size rendering in all browsers.
   */
  
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  
  /* Forms
     ========================================================================== */
  
  /**
   * Known limitation: by default, Chrome and Safari on OS X allow very limited
   * styling of `select`, unless a `border` property is set.
   */
  
  /**
   * 1. Correct color not being inherited.
   *    Known issue: affects color of disabled elements.
   * 2. Correct font properties not being inherited.
   * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.
   */
  
  button,
  input,
  optgroup,
  select,
  textarea {
    color: inherit; /* 1 */
    font: inherit; /* 2 */
    margin: 0; /* 3 */
  }
  
  /**
   * Address `overflow` set to `hidden` in IE 8/9/10/11.
   */
  
  button {
    overflow: visible;
  }
  
  /**
   * Address inconsistent `text-transform` inheritance for `button` and `select`.
   * All other form control elements do not inherit `text-transform` values.
   * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.
   * Correct `select` style inheritance in Firefox.
   */
  
  button,
  select {
    text-transform: none;
  }
  
  /**
   * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
   *    and `video` controls.
   * 2. Correct inability to style clickable `input` types in iOS.
   * 3. Improve usability and consistency of cursor style between image-type
   *    `input` and others.
   */
  
  button,
  html input[type="button"], /* 1 */
  input[type="reset"],
  input[type="submit"] {
    -webkit-appearance: button; /* 2 */
    cursor: pointer; /* 3 */
  }
  
  /**
   * Re-set default cursor for disabled elements.
   */
  
  button[disabled],
  html input[disabled] {
    cursor: default;
  }
  
  /**
   * Remove inner padding and border in Firefox 4+.
   */
  
  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
  
  /**
   * Address Firefox 4+ setting `line-height` on `input` using `!important` in
   * the UA stylesheet.
   */
  
  input {
    line-height: normal;
  }
  
  /**
   * It's recommended that you don't attempt to style these elements.
   * Firefox's implementation doesn't respect box-sizing, padding, or width.
   *
   * 1. Address box sizing set to `content-box` in IE 8/9/10.
   * 2. Remove excess padding in IE 8/9/10.
   */
  
  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }
  
  /**
   * Fix the cursor style for Chrome's increment/decrement buttons. For certain
   * `font-size` values of the `input`, it causes the cursor style of the
   * decrement button to change from `default` to `text`.
   */
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  
  /**
   * 1. Address `appearance` set to `searchfield` in Safari and Chrome.
   * 2. Address `box-sizing` set to `border-box` in Safari and Chrome
   *    (include `-moz` to future-proof).
   */
  
  input[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box; /* 2 */
    box-sizing: content-box;
  }
  
  /**
   * Remove inner padding and search cancel button in Safari and Chrome on OS X.
   * Safari (but not Chrome) clips the cancel button when the search input has
   * padding (and `textfield` appearance).
   */
  
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  
  /**
   * Define consistent border, margin, and padding.
   */
  
  fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }
  
  /**
   * 1. Correct `color` not being inherited in IE 8/9/10/11.
   * 2. Remove padding so people aren't caught out if they zero out fieldsets.
   */
  
  legend {
    border: 0; /* 1 */
    padding: 0; /* 2 */
  }
  
  /**
   * Remove default vertical scrollbar in IE 8/9/10/11.
   */
  
  textarea {
    overflow: auto;
  }
  
  /**
   * Don't inherit the `font-weight` (applied by a rule above).
   * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
   */
  
  optgroup {
    font-weight: bold;
  }
  
  /* Tables
     ========================================================================== */
  
  /**
   * Remove most spacing between table cells.
   */
  
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  td,
  th {
    padding: 0;
  }

body {
  background: #4197c9;
  overflow: hidden;
}

.cursorItem {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  pointer-events: none;
  mix-blend-mode: multiply;
  opacity: .5;
}

.cursorItem .circle {
  position: fixed;
  display: block;
  width: 120px;
  height: 120px;
  margin: -60px 0 0 -60px;
  background: #a300a8;
  border-radius: 50%;
  transition: all .2s ease-in-out;
}

.gate-box {
  position: absolute;
  top: 40%;
  left: calc(50% - 200px);
  width: 400px;
}

.gate-box .top {
  border: 2px solid #fff;
  border-bottom: none;
  padding: 5px;
}

.gate-box .top p {
  text-align: center;
  color: #fff;
  font-size: 20px;
}

.gate-box p {
  font-size: 20px;
  color: #fff;
}

.gate-box .bottom {
  border: 2px solid #fff;
}

.gate-box .bottom .inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
}

.gate-box .bottom a {
  font-size: 20px;
  color: #fff;
  width: 100%;
  text-align: center;
  display: inline-block;
  text-decoration: none;
  padding: 20px 0;
  transition: all .3s ease;
  box-sizing: inherit;
}

.gate-box .bottom a:hover {
  background: #fff;
  color: #4197c9;
}

.gate-box .bottom #yes {
  border-right: 2px solid #fff;
}
```

* <button data-toggle="collapse" data-target="#script">script.js</button>

{:.collapse #script}
```javascript
let btn_yes;
let btn_no;
let cursorItem;
let circle;
let x=0, y = 0;
let mx=0, my = 0;

window.onload = function(){
    btn_yes = document.querySelector("#yes");
    btn_no = document.querySelector("#no");

    cursorItem = document.querySelector(".cursorItem");
    circle = cursorItem.querySelector(".circle");

    //네 버튼 이벤트
    btn_yes.addEventListener("mouseover", function(e){
        circle.style.transform = "scale(.3)";
    })
    btn_yes.addEventListener("mouseout", function(e){
        circle.style.transform = "scale(1)";
    })

    //아니오 버튼 이벤트
    btn_no.addEventListener("mouseover", function(e){
        circle.style.transform = "scale(.3)";
    })
    btn_no.addEventListener("mouseout", function(e){
        circle.style.transform = "scale(1)";
    })

    window.addEventListener("mousemove", function(e){
        x = e.clientX;
        y = e.clientY;
        // cursorItem.style.transform = "translate("+ x +"px, "+ y + "px )";
    });
    
    loop();
}

function loop(){
    mx += (x - mx ) * .09;
    my += (y - my ) * .09; 
    cursorItem.style.transform = "translate("+ mx +"px, "+ my + "px )";

    requestAnimationFrame(loop);
}
```