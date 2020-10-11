---
title: 가로 진행 바 제작 (스크롤 백분율 구하기)
layout: post
date: '2020-10-11 23:23'
categories:
- js_interactive_web
---

## 가로 진행 바 제작 (스크롤 백분율 구하기)

* [가로진행바 제작 (스크롤 백분율 구하기)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample9.html){:target="_blank"}

```html
<!DOCTYPE html>
<html>
<head>
    <title>mouseOver</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        body {
            height: 10000px;
            background: linear-gradient(150deg, red, orange, yellow, green, indigo, purple, black);
        }
        h1 {
            color: #fff;
        }
        .progress {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 5px;
            background-color: black;
        }
        .bar {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
            width: 100%;
            height: 5px;
            background-color: yellow;
        }
    </style>
    <script>
        let scrollTop = 0;
        let bar;

        onload = function () {
            bar = document.getElementsByClassName("bar")[0];
        }

        addEventListener("scroll", function (e) {
            scrollTop = document.documentElement.scrollTop;
            // console.log("스크롤값 " + scrollTop);
            let per = Math.ceil(scrollTop / (document.body.scrollHeight - outerHeight) * 100);
            console.log(per);

            bar.style.width = per + "%";

        }, false)
    </script>
</head>
<body>
    <h1>스크롤</h1>
    <div class="progress">
        <span class="bar"></span>
    </div>
</body>
</html>
```