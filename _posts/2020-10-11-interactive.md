---
title: 예제 사이트 1 분석 - 픽스낫띵(FIX NOTHING) / 핵심기능 구현
layout: post
date: '2020-10-11 20:07'
categories:
- js_interactive_web
---

## 예제 사이트 1 분석 - 픽스낫띵(FIX NOTHING) / 핵심기능 구현

* [픽스 낫띵](https://www.fixnothing.com/){:target="_blank"}
* [예시 파일](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web/index_3_1.html){:target="_blank"}

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
        position: relative;
        background-color: black;
        overflow: hidden;
      }

      h1 {
        color: #fff;
      }
      .human {
        position: absolute;
        width:300px;
        top: 4%;
        left: calc(50% - 150px);
        z-index: 100;
      }

      /* 3D text 영역 */
      .textWrap {
        position : absolute;
        left: 50%;
        top: 10%;
        transform: translate(-50%, 0);
        width: 60%;
        z-index : 1;
        transform-style: preserve-3d; 
        perspective: 300px;
      }
      .bg {
        width: 120%;
      }
      .pipe {
        position: absolute;
        z-index : 100;
        width: 700px;
        top:10%;
        left:-200px;
      }

    </style>
    <script>
        let human;
        let bg;
        let h1;
        let text3d;
        let pipe;

        let x = 0;
        let y = 0;
        let mx = 0;
        let my = 0;
        let speed = 0.009;

        window.onload = function(){
          h1 = document.getElementsByTagName("h1")[0];
          human = document.getElementsByClassName("human")[0];
          text3d = document.getElementsByClassName("text3d")[0];
          bg = document.getElementsByClassName("bg")[0];
          pipe = document.getElementsByClassName("pipe")[0];

          window.addEventListener("mousemove", mouseFunc, false);

          function mouseFunc(e){
            x = (e.clientX - window.innerWidth / 2);
            y = (e.clientY - window.innerHeight / 2);
          }
          loop();
        }

        function loop(){
          mx += (x - mx) * speed;
          my += (y - my) * speed;

          h1.innerHTML = "x: " + x + " mx: " + mx;
          human.style.transform = "translate("+ (mx/9) +"px," + (my/9) +"px)";
          bg.style.transform = "translate("+ -(mx/8) +"px," + -(my/8) +"px)";

          //3d 텍스트 모션
          //rotate3d 속성
          text3d.style.transform = "translate3d("+ -(mx/2) +"px," + -(my/2) +"px,0) rotate3d(0,1,0,"+ -mx / 50 +"deg)";

          //파이프
          pipe.style.transform = "translate("+ (mx/4) +"px," + (my/3) +"px)";

          window.requestAnimationFrame(loop);
        }
        

    </script>

</head>
<body>
  <h1>test</h1>
  <img src="./img/layer-7.png" class="human" alt="사람">
  <div class="textWrap">
    <img src="./img/masthead-logo.svg" class="text3d" alt="fix nothing">
  </div>
  <img src="./img/layer-1.jpg" class="bg" alt="벽">
  <img src="./img/layer-9.png" class="pipe" alt="파이프">
</body>
</html>
```

브라우저 내에서 마우스 위치값을 브라우저 왼쪽 상단이 아닌 브라우저 가운데가 중심이 되게 바꿔주는 게 핵심입니다.  
예를들어 브라우저 width가 900일 경우 마우스 위치값이 0부터 900 까지 찍힐텐데,  
거기서 브라우저 width / 2 를 해서 빼주는 것.

x = e.clientX (마우스x) - window.innerWidth / 2 (화면 사이즈 /2)

이렇게 되면 0~900 이 아닌 -450 ~ 450 까지 찍히게 됩니다.  
translate() 외에도 scale(), rotate() 등 다양하게 테스트 해보세요.  

transform = "rotate(" + 변하는 값 + "deg)"

---

글씨는 3d 효과까지 적용되어있습니다.  
`translate3d`와 `rotate3d`를 통해 3d 효과를 구현했습니다.  
