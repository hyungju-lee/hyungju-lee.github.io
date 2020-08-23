---
title: 6. 마우스 위치에 따른 눈알 돌리기 만들기
layout: post
date: '2020-08-23 20:11'
categories:
- js_interaction
---

## 마우스 위치에 따른 눈알 돌리기 만들기

CSS와 JavaScript에선 '한글' 사용이 가능하다.  
권장되는 사항은 아니다.  

* **`Math.atan2(y, x)`**  
  회전된 각도를 재는 메서드,
  `Math` 객체가 `return`하는 값은 **라디안**이다.
  
* **`getBoundingClientRect()`**  
  해당 요소의 영역의 정보를 가져온다.

![](/static/img/interaction/image07.jpg)

```javascript
var 눈알 = function (selector) {
    var 눈 = document.querySelector(selector),
        눈동자 = 눈.querySelector('.눈동자'),
        눈영역 = 눈.getBoundingClientRect();

    var 눈알굴리기 = function (mouseX, mouseY) {
        var 라디안 = Math.atan2( mouseY - (눈영역.y + 눈영역.height * 0.5), mouseX - (눈영역.x + 눈영역.width * 0.5) );
        console.log(180 * 라디안 / Math.PI - 90)
        눈동자.style.transform = 'rotate(' + (180 * 라디안 / Math.PI - 90) + 'deg)';
    };

    return {
        눈알굴리기: 눈알굴리기
    };
};

var 왼눈 = 눈알('.눈-1');
var 오른눈 = 눈알('.눈-2');

window.addEventListener('mousemove', function (e) {
    왼눈.눈알굴리기(e.pageX, e.pageY);
    오른눈.눈알굴리기(e.pageX, e.pageY);
});
```

위의 **눈알** 함수 안에 **눈알굴리기** 함수는 **눈알** 함수 바깥에서 사용할 수 없다.  
때문에 바깥에서 **눈알굴리기** 함수를 사용하려면 **눈알** 함수를 실행시키면 **눈알굴리기**를 **리턴**해야된다.

**객체**를 리턴해서 사용할 수있게 하는 방식이다.  
위 **눈알** 함수는 return 값으로 객체를 리턴하고 해당 객체 안엔 **눈알굴리기 : 눈알굴리기**가 담겨져있다.  
이를 `왼눈.눈알굴리기()`로 사용할 수 있는 것이다. 

## 예시 샘플 코드

* [다운로드](/static/img/interaction/doraemong.zip){:target="_blank"}
* <button data-toggle="collapse" data-target="#index">index.html</button>

    {:.collapse #index}
    ```html  
    <!DOCTYPE html>
    <html>
    <head>
        <title>도라에몽 눈알 굴리기</title>
        <meta charset="UTF-8">
        <style>
            body {
                margin: 0;
            }
    
            .도라에몽 {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 600px;
                height: 800px;
                background: url('doraemon.gif') no-repeat 50% 50%;
                background-size: contain;
                transform: translate(-50%,-50%);
            }
    
            .눈들 {
                display: flex;
                position: absolute;
                top: 27px;
                left: 162px;
            }
    
            .눈 {
                position: relative;
                width: 120px;
                height: 120px;
                border: 4px solid black;
                border-radius: 50%;
                background-color: white;
                transform: scaleX(0.9);
            }
    
            .눈-1 {
                left: 7px;
            }
    
            .눈-2 {
                left: -7px;
            }
    
            .눈동자 {
                position: absolute;
                left: 45px;
                bottom: 0;
                width: 30px;
                height: inherit;
            }
    
            .눈동자:before {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                bottom: 0;
                width: inherit;
                height: 30px;
                border-radius: 50%;
                background-color: black;
            }
    
            .눈동자:after {
                content: '';
                display: block;
                position: absolute;
                left: 12px;
                bottom: 12px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background-color: white;
            }
        </style>
    </head>
    <body>
    <div class="도라에몽">
        <div class="눈들">
            <div class="눈 눈-1">
                <div class="눈동자"></div>
            </div>
            <div class="눈 눈-2">
                <div class="눈동자"></div>
            </div>
        </div>
    </div>
    
    <script>
        var 눈알 = function (selector) {
            var 눈 = document.querySelector(selector),
                눈동자 = 눈.querySelector('.눈동자'),
                눈영역 = 눈.getBoundingClientRect();
    
            var 눈알굴리기 = function (mouseX, mouseY) {
                var 라디안 = Math.atan2( mouseY - (눈영역.y + 눈영역.height * 0.5), mouseX - (눈영역.x + 눈영역.width * 0.5) );
                눈동자.style.transform = 'rotate(' + (180 * 라디안 / Math.PI - 90) + 'deg)';
            };
    
            return {
                눈알굴리기: 눈알굴리기
            };
        };
    
        var 왼눈 = 눈알('.눈-1');
        var 오른눈 = 눈알('.눈-2');
    
        window.addEventListener('mousemove', function (e) {
            왼눈.눈알굴리기(e.pageX, e.pageY);
            오른눈.눈알굴리기(e.pageX, e.pageY);
        });
    </script>
    </body>
    </html>
    ```