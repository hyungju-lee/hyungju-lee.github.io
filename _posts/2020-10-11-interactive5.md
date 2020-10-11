---
title: 스크롤 높이 값 구하기 (scrollTop)
layout: post
date: '2020-10-11 22:05'
categories:
- js_interactive_web
---

## 스크롤 높이 값 구하기 (scrollTop)

* [스크롤 높이 값 구하기 (scrollTop)](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample8.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#scrollTop">document.documentElement.scrollTop</button>

{:.collapse #scrollTop}
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
    </style>
    <script>
        let scrollTop = 0;

        addEventListener("scroll", function (e) {
            scrollTop = document.documentElement.scrollTop;
            console.log("스크롤값 " + scrollTop);
        }, false)
    </script>
</head>
<body>
    <h1>스크롤</h1>
</body>
</html>
```

* <button data-toggle="collapse" data-target="#pageYOffset">pageYOffset</button>

{:.collapse #pageYOffset}
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
    </style>
    <script>
        addEventListener("scroll", function (e) {
            console.log("스크롤값 " + pageYOffset);
        }, false)
    </script>
</head>
<body>
    <h1>스크롤</h1>
</body>
</html>
```