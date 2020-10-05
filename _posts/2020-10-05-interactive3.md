---
title: requestAnimationFrame (loop, 자연스러운 움직임)
layout: post
date: '2020-10-05 17:08'
categories:
- js_interactive_web
---

## requestAnimationFrame (loop, 자연스러운 움직임)

* [예시파일 링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample2.html){:target="_blank"}

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
                cursor_item.style.transform = "translate("+ e.clientX +"px," + e.clientY + "px)";
            }
            loop();
        }
        let i = 0;
        function loop() {
            console.log(i += 1);
            window.requestAnimationFrame(loop);
        }
    </script>
</head>
<body>
  <h1>test</h1>
  <div class="cursor_item"></div>
</body>
</html>
```