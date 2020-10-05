---
title: transform, translate 값 변경
layout: post
date: '2020-10-05 17:19'
categories:
- js_interactive_web
---

## transform, translate 값 변경

* [예시파일 링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample3.html){:target="_blank"}

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
        let x = 0;
        let y = 0;
        let h1;
        let cursor_item;
        let mx = 0;
        let my = 0;
        let speed = 0.03;
        let refId;

        const mouseFunc = function (e) {
            x = e.clientX;
            y = e.clientY;
        }
        const loop = function () {
            mx += (x - mx) * speed;
            my += (y - my) * speed;
            h1.innerHTML = 'x: ' + x + ', mx: ' + mx;
            cursor_item.style.transform = "translate("+ mx +"px," + my + "px)"
            refId = requestAnimationFrame(loop);
        }

        window.onload = function () {
            h1 = document.getElementsByTagName("h1")[0];
            cursor_item = document.getElementsByClassName("cursor_item")[0];
            window.addEventListener('mousemove', function (e) {
                mouseFunc(e);
            }, false);
            loop();
        }
    </script>
</head>
<body>
<h1>test</h1>
<div class="cursor_item"></div>
</body>
</html>
```

앞서 말씀드린 것처럼 이를 모바일의 자이로센서에도 붙여서 응용이 가능하다.  
