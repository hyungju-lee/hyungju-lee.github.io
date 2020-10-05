---
title: mousemove 값 활용
layout: post
date: '2020-10-05 16:43'
categories:
- js_interactive_web
---

## mousemove 값 활용

마우스 위치에 따라서 오브젝트가 움직일 수도 있고 따라올 수도 있다.  
3D를 활용하면 깊이감도 마우스로 제어할 수 있다.  
그리고 이게 PC에선 마우스인데 모바일로가면 **자이로센서**를 이용해서 그 값을 가지고 오브젝트를 움직일 수도 있다.  
그치만 지금은 처음이기 때문에 마우스로 해보도록 하겠다.  

다음은 예시 코드이다.

* [예시파일 링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample.html){:target="_blank"}

```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
      body {
        background-color: black;
        cursor: none;
      }
      h1 {
        color: #fff;
      }
      .cursor_item {
        position: absolute;
        width : 100px;
        height : 100px;
        background-color: red;
        top:0;
        left:0;
      }
    </style>
    <script>
        window.onload = function () {
            let h1 = document.getElementsByTagName("h1")[0];
            let cursor_item = document.getElementsByClassName("cursor_item")[0];
            window.addEventListener('mousemove', mouseFunc, false);
            function mouseFunc(e) {
                h1.innerHTML = 'x: ' + e.clientX + ', y: ' + e.clientY;
                cursor_item.style.transform = "translate("+ e.clientX +"px," + e.clientY + "px)"
            }
        }
    </script>
</head>
<body>
  <h1>test</h1>
  <div class="cursor_item"></div>
</body>
</html>
```

`clientX`, `clientY`는 현재 열려있는 브라우저 창을 기준으로한 x, y 좌표값을 뜻한다.  
`window.onload`를 한 이유는 **화면이 다 로드가된 이후에** 실행하라는 뜻이다.  

## 포인트

```css
body {
    cursor: none;
}
.cursor_item {
    position: absolute;
    width : 100px;
    height : 100px;
    background-color: red;
    top:0;
    left:0;
}
```

```javascript
window.onload = function () {
    let h1 = document.getElementsByTagName("h1")[0];
    let cursor_item = document.getElementsByClassName("cursor_item")[0];
    window.addEventListener('mousemove', mouseFunc, false);
    function mouseFunc(e) {
        h1.innerHTML = 'x: ' + e.clientX + ', y: ' + e.clientY;
        cursor_item.style.transform = "translate("+ e.clientX +"px," + e.clientY + "px)"
    }
}
```