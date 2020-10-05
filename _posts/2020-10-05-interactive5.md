---
title: transition, easing (가속도)
layout: post
date: '2020-10-05 18:18'
categories:
- js_interactive_web
---

## transition, easing (가속도)

* [예시파일 링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample4.html){:target="_blank"}
* [css3 easing](https://matthewlein.com/tools/ceaser){:target="_blank"}

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
            margin: -50px 0 0 -50px;
            transition: all .5s cubic-bezier(0.815, -0.355, 0.330, 1.295);
        }
        button {
            font-size: 40px;
            font-weight: bold;
            background-color: #ffffff;
            color: red;
            padding: 30px 80px;
            margin: 50px;
            cursor: pointer;
            transition: all .5s cubic-bezier(0.815, -0.355, 0.330, 1.295);
        }
        button:hover {
            background-color: red;
            color: #fff;
            font-size: 90px;
            padding: 100px 120px;
        }
    </style>
    <script>
        let x = 0;
        let y = 0;
        let h1;
        let cursor_item;

        const mouseFunc = function (e) {
            x = e.clientX;
            y = e.clientY;
            cursor_item.style.transform = "translate("+ x +"px," + y + "px)"
        }

        window.onload = function () {
            h1 = document.getElementsByTagName("h1")[0];
            cursor_item = document.getElementsByClassName("cursor_item")[0];
            window.addEventListener('click', function (e) {
                mouseFunc(e);
            }, false);
        }
    </script>
</head>
<body>
<h1>test</h1>
<div class="cursor_item"></div>
<button type="button">START</button>
</body>
</html>
```