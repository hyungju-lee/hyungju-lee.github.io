---
title: 예제 사이트 2 분석 - 뉴욕타임스 allbirds / 핵심 기능 구현
layout: post
date: '2020-10-11 20:43'
categories:
- js_interactive_web
---

## 예제 사이트 2 분석 - 뉴욕타임스 allbirds / 핵심 기능 구현

* [뉴욕 타임스 allbirds](https://www.nytimes.com/paidpost/allbirds/the-view-from-above.html){:target="_blank"}
* [예시 파일](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_sample6.html){:target="_blank"}

1. 마우스 위치에 따라 이미지 반응 
2. 구간마다 소리달라짐 + on/off 기능까지  
3. 특정구간 도달하면 배경색도 변함

좀 신기한 것은 새들 날개짓하는 것이 분명 '영상'인데 영상조차도 마우스 포인터 위치에 따라 왔다갔다하는 느낌이 든다.  

![](/static/img/interaction/image17.jpg)
![](/static/img/interaction/image18.jpg)

4. canvas 태그를 사용한건가 싶었는데, 아님. video 태그 사용.  
   위에 보시는 바와같이 `alpha` 값이 있는 비디오 영상을 사용했다.
5. transform: translate3d() 속성으로 이미지 움직임 구현.

---

```html
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="utf-8"/>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style>
        img {
            position: absolute;
        }
        .vod {
            position: absolute;
        }
    </style>
    <script>
        let x = 0;
        let y = 0;
        let mx = 0;
        let my = 0;
        let speed = 0.01;
        let _imgArr;
        let _bird;

        onload = function () {
            _imgArr = document.getElementsByTagName('img');
            _bird = document.getElementsByClassName("vod")[0];
            // alert(_imgArr.length);
            addEventListener("mousemove", mouseFunc, false);

            function mouseFunc (e) {
                x = (e.clientX - innerWidth / 2);
                y = (e.clientY - innerHeight / 2);
            }
            loop();
        }

        function loop() {
            mx += (x - mx) * speed;
            my += (y - my) * speed;
            _imgArr[0].style.transform = "translate(" + -(mx/6) + "px, " + -(my/6) + "px)";
            _imgArr[1].style.transform = "translate(" + -(mx/5) + "px, " + -(my/5) + "px)";
            _imgArr[2].style.transform = "translate(" + -(mx/3) + "px, " + -(my/3) + "px)";
            _imgArr[3].style.transform = "translate(" + -(mx/2) + "px, " + -(my/2) + "px)";
            _bird.style.transform = "translate(" + -(mx/7) + "px, " + -(my/7) + "px)";
            requestAnimationFrame(loop);
        }
    </script>
</head>
<body>
<section>
    <img src="https://paidpost-assets.nyt.com/paidpost/allbirds/birds-eye-view/images/1-b90e91a4.png">
    <img src="https://paidpost-assets.nyt.com/paidpost/allbirds/birds-eye-view/images/2-f3fd6cf5.png">
    <div class="vod">
        <video autoplay="" playsinline="" loop="" src="https://paidpost-assets.nyt.com/paidpost/allbirds/birds-eye-view/videos/3-27c8c3ea.webm"></video>
    </div>
    <img src="https://paidpost-assets.nyt.com/paidpost/allbirds/birds-eye-view/images/4-105dd65b.png">
    <img src="https://paidpost-assets.nyt.com/paidpost/allbirds/birds-eye-view/images/5-ac49bfdc.png">
</section>
</body>
</html>
```