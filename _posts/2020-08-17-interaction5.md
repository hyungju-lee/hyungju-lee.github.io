---
title: 3. 애플 웹사이트 따라하기 2 - 2. canvas 도형 그리기
layout: post
date: '2020-08-17 21:35'
categories:
- js_interaction
---

* [canvas 도형 그리기](https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes){:target="_blank"}

## canvas 도형 그리기

사각형, 삼각형, 선, 아치, 곡선 등 기본적인 도형을 그려보자.  
`canvas` 위에 물체를 그릴 때는 `path`를 사용하는 것이 필수적이므로 우리는 이것이 어떻게 사용되는지를 볼 것이다.

## 그리드

드로잉을 시작하기에 앞서, 캔버스 그리드 혹은 좌표공간(**coordinate space**)에 대하여 이야기 해보겠다.  

```html
<canvas id="canvas" width="150" height="150"></canvas>
```

위 `canvas`는 가로 세로 각각 150px의 `canvas` 요소를 가지고 있다.  


![](/static/img/interaction/image00.jpg)

위 그림을 보시면 `canvas`와 기본 그리드가 놓인 것을 볼 수 있다.  
기본적으로 그리드의 1단위는 `canvas`의 1px과 같다.  
이 그리드의 원점은 좌측상단의 (0, 0)이다.  
모든 요소들은 이 원점을 기준으로 위치된다.  
그렇기 때문에, 파란 사각형의 좌측상단은 왼쪽에서 x픽셀, 위에서 y픽셀 떨어진 것이라 볼 수 있고, 
이 사각형의 좌표는 (x, y)가 된다.  
**<span style="color:red">이 튜토리얼 후반부에서 어떻게 원점을 이동하며, 그리드를 회전하고 
같은 비율로 확대 / 축소할 수 있는지 살펴볼 것이지만, 지금은 기본에 충실하자.</span>**

## 직사각형 그리기

**SVG**와는 다르게 `canvas`는 **오직 하나의 원시적인 도형만을 제공**한다.  
바로 **직사각형**이다.  
다른 모든 도형들은 무조건 하나 혹은 하나 이상의 path 와 여러 점으로 이어진 선으로 만들어진다.  
다행히도 우리는 여러 **path drawing** 함수(function)들을 통해 **아주 어려운 도형들도 그릴 수 있다.**

* **직사각형**  
   캔버스 위에 직사각형을 그리는데는 세가지 함수(function)가 있다.
   
   1. `fillRect(x, y, width, height)` : 색칠된 직사각형을 그린다.
   2. `strokeRect(x, y, width, height)` : 직사각형 윤곽선을 그린다.
   3. `clearRect(x, y, width, height)` : 특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해진다.
   
   <br>
   각각의 세 함수는 모두 같은 인자를 가진다.  
   `x`. `y`는 `canvas`의 좌측상단에서 사각형의 (원점으로부터 상대적인) 위치를 뜻하며, `width`, `height`는 
   사각형의 크기를 뜻한다.
   
   아래와 같이 적용할 수 있다.
   
   ```html
    <!DOCTYPE html>
    <html>
     <head>
      <meta charset="utf-8"/>
     </head>
     <body onload="draw();">
       <canvas id="canvas" width="150" height="150"></canvas>
        <script type="application/javascript">
        function draw() {
          var canvas = document.getElementById('canvas');
          if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
        
            ctx.fillRect(25, 25, 100, 100);
            ctx.clearRect(45, 45, 60, 60);
            ctx.strokeRect(50, 50, 50, 50);
          }
        }
        </script>
     </body>
    </html>
   ```
   
   [위 예시](/static/img/interaction/canvas.html){:target="_blank"}
   
   다음 페이지에서, 우리는 `clearRect()`를 대신하는 두개의 함수에 대해 살펴보고, 만들어진 도형의 색이나 
   윤곽선의 스타일을 바꾸는 방법들에 대하여 알아보도록 하겠다.
   
   우리가 다음 섹션에서 보게될 `path` 함수와 다르게 세 개의 직사각형 함수는 `canvas`에 바로 그릴 수 있다.

## 경로 그리기

경로(**path**)는 직사각형 이외의 유일한 **원시적인(primitive) 도형**이다.  
경로는 점들의 집합이며, 선의 한 부분으로 연결되어 여러가지 도형, 곡선을 이루고 두께와 색을 나타내게 됩니다.  
경로나 하위 경로(sub-path)는 닫힐 수 있습니다.  
경로를 이용하여 도형을 만들 때에는 몇가지 추가적인 단계를 거쳐야 합니다.

1. 경로를 생성한다.
2. **그리기 명령어**를 사용하여 경로상에 그린다.
3. 경로가 한번 만들어졌다면, 경로를 랜더링하기 위해 윤곽선을 그리거나 도형 내부를 채울 수 있다.

다음은 위의 단계들을 실행하기 위해 사용되는 함수이다.

---

**`beginPath()`**  

새로운 경로를 만든다.  
경로가 생성됐다면, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용된다.

**Path** 메서드  

물체를 구성할 때 필요한 여러 경로를 설정하는데 사용하는 함수이다.  
[Path 메서드 링크](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths){:target="_blank"}

**`closePath()`**  

현재 하위 경로의 시작 부분과 연결된 직선을 추가한다.

**`stroke()`**  
윤곽선을 이용하여 도형을 그린다.

**`fill()`**  
경로로 만들어진 도형의 내부를 채운다.

---

**`beginPath()`**

경로를 만들기 위한 첫번째 단계는 `beginPath()` 메서드를 사용하는 것이다.  
**내부적으로 경로는 도형을 이루는 하위경로(선, 아치 등)들의 집합**으로 이루어져있다.  
이 메서드가 호출될 때마다 하위 경로의 모음은 초기화되며, 우리는 새로운 도형을 그릴 수 있게된다.

**<mark>참고</mark>**  
<mark>현재 열린 path가 비어있는 경우(<span style="color:red">beginPath()</span> 메서드 사용 직후, 
혹은 <span style="color:red">canvas</span> 새로 생성한 직후), 첫 경로 
생성 명령은 실제 동작에 상관 없이 <span style="color:red">moveTo()</span>로 여겨지게 된다.</mark>  
<mark>그렇기 때문에 경로를 초기화한 직후에는 항상 명확하게 시작 위치를 설정해두는 것이 좋다.</mark>

<mark><span style="color:red">mpveTo()</span> 메서드는 하위경로(sub-path)의 시작 좌표값을 정한다.</mark>


**`lineTo()`**  

두번째 단계는 실제로 경로가 그려지는 위치를 설정하는 메서드를 호출하는 것이다.  
이 내용에 대해선 곧 보실 수 있다.

**`closePath()` : 선택사항**

세번째 단계는 선택사항으로 `closePath()` 메서드를 호출하는 것이다.  
이 메서드는 현재 점위치와 시작점 위치를 직선으로 이어 **도형을 닫는다.**  
**이미 도형이 닫혔거나 한 점만 존재한다면, 이 메서드는 아무것도 하지 않는다.**


**<mark>참고</mark>**  
<mark><span style="color:red">fill()</span> 메서드 호출 시, 열린 도형은 자동으로 닫히게 되므로 
<span style="color:red">closePath()</span> 메서드를 호출하지 않아도 된다.</mark>  
<mark>하지만 이는 <span style="color:red">stroke()</span> 메서드에는 적용되지 않는다.</mark>

## 삼각형 그리기

삼각형을 그리기 위한 코드는 다음과 같다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fill();
  }
}
```

[위 예제](/static/img/interaction/canvas01.html){:target="_blank"}

## 펜(pen) 이동하기

가장 유용한 함수 중에 실제로 어떤 것도 그리지 않지만 위에서 언급한 경로의 일부가 되는 `moveTo()` 함수가 있다.  
이는 펜이나 연필을 종이 위에서 들어 옆으로 옮기는 것이라고 보면된다.

**`moveTo(x, y)`**  

펜을 x와 y로 지정된 좌표로 옮긴다.

`canvas`가 초기화 되었거나 `beginPath()` 메서드가 호출되었을 때, **특정 시작점 설정을 위해** `moveTo()` 함수를
사용하는 것이 좋다.  
또한 `moveTo()` 함수는 연결되지 않은 경로를 그리는데도 사용할 수 있다.  
아래의 스마일 아이콘을 보자.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
     var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
    ctx.stroke();
  }
}
```

[위 예제](/static/img/interaction/canvas02.html){:target="_blank"}

`moveTo()` 를 사용한 코드라인을 지우면 연결된 선들을 확인할 수 있다.

```javascript
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }
}
```

[위 예제](/static/img/interaction/canvas03.html){:target="_blank"}

## 선

직선을 그리기 위해서는 `lineTo()` 메서드를 사용할 수 있다.  

**`lintTo(x, y)`**  

현재의 드로잉 위치에서 x와 y로 지정된 위치까지 선을 그린다.

이 메서드는 선의 끝점의 좌표가되는 x와 y의 두 개의 인자가 필요하다.  
시작점은 이전에 그려진 경로에 의해 결정되며, 이전 경로의 끝점이 다음 그려지는 경로의 시작점이 된다.  
또한 시작점은 `moveTo()` 메서드를 통해 변경될 수 있다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  }
}
```

[위 예제](/static/img/interaction/canvas04.html){:target="_blank"}

새로운 경로를 지정하기 위해 `beginPath()` 메서드를 먼저 실행한다.  
그 다음 `moveTo()` 메서드를 가지고 시작점을 원하는 위치로 새롭게 지정해준다.  
다음은, 두 선을 그어 삼각형의 두 면을 그려준다.

여러분은 채워진 삼각형과 윤곽선 삼각형의 차이를 확인했을 거다.  
위에 언급했던 것처럼, **경로가 채워지게되면 그 도형은 자동으로 닫히게 되지만** 윤곽선 삼각형에서는 
그렇지 않기 때문이다.  
**만약에 `closePath()` 메서드를 윤곽선 삼각형 코드에서 지운다면, 오직 두 선만 그려지게 되며 
완벽한 삼각형으로 만들어지지 않는다.**  

## 호 (arc)

호나 원을 그리기 위해서는 `arc()` 혹은 `arcTo()` 메서드를 사용한다.

**`arc(x, y, radius, startAngle, endAngle, anticlockwise)`**  

(x,y) 위치에 원점을 두면서, 반지름 r을 가지고 startAngle 에서 시작하여 endAngle 에서 끝나며 
주어진 anticlockwise 방향으로 향하는 (기본값은 시계방향 회전) 호를 그리게 된다.

**`arcTo(x1, y1, x2, y2, radius)`**  

주어진 제어점들과 반지름으로 호를 그리고, 이전 점과 직선으로 연결한다.

**`arc()` 메서드의 여섯개의 매개변수에 대해 좀 더 자세히 알아보자.**  
`x`와 `y`는 호를 그릴 때 필요한 원점 좌표이다.  
반지름(`radius`)은 말 그대로 호의 반지름을 뜻한다.  
`startAngle` 및 `endAngle` 매개변수는 원의 커브를 따라 호의 시작점과 끝점을 라디안 단위로 정의한다.  
이 변수들은 `x` 축을 기준으로 계산된다.  
**Boolean** 값을 가지는 `anticlockwise` 변수는 `true`일 때 호를 반시계 방향으로 그리게 되며, 
그렇지 않은 경우에는 시계 방향으로 그린다.

**<mark>참고</mark>**  
<mark><span style="color:red">arc</span> 함수에서 각도는 각이 아닌 라디안 값을 사용한다.</mark>  
<mark>각도를 라디안으로 바꾸려면 다음의 자바스크립트 코드를 사용해야된다.</mark>

```javascript
radians = (Math.PI/180) * degrees
```

다음의 예제는 우리가 이제껏 봐왔던 예제들보다 약간 더 복잡하다.  
이 예제는 12가지의 다양한 각도로 채워진 각기 다른 호를 그린다.  

두개의 `for loops`은 루프를 통해 호(arc)들의 행과 열을 읽기위해 사용되었다.  
`beginPath()`를 사용해 각 호의 새로운 경로를 만든다.  
코드 내에서 각각의 매개변수들을 명확하게 보여주기 위해 변수로 정의하였지만, 실제로 사용할 때 꼭 필요한 것은 아니다.

`x`와 `y` 좌표는 충분히 명확하게 표기되어야 한다.  
`radius`와 `startAngle`은 고정되어 있다.  
`endAngle` 은 처음에 180도(반원)에서 시작하고 이후 매번 90도씩 증가하다가 마지막 열에서 완벽한 원을 그린다.  

`clockwise` 매개 변수를 지정한 결과로 첫번째와 세번째 줄은 시계방향으로 원호들이 그려졌고 
두번째와 네번째 줄은 반시계방향의 원호들이 그려졌다.  
마지막으로 `if` 문은 위 반쪽이 윤곽선으로, 아래 반쪽이 색으로 채워진 호들을 만들어낸다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.beginPath();
        var x = 25 + j * 50; // x coordinate
        var y = 25 + i * 50; // y coordinate
        var radius = 20; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}
```

[위 예시](/static/img/interaction/canvas05.html){:target="_blank"}

## 배지어(Bezier) 곡선과 이차(Quadratic) 곡선

다음 경로 타입은 베지어 곡선(Bezier Curves)으로, 삼차(Cubic)와 이치(quadric) 변수가 모두 가능하다.  
이 타입은 대게 복잡한 유기체적 형태(organic shape)를 그리는데 사용된다.

**`quadraticCurveTo(cp1x, cp1y, x, y)`**  

`cp1x` 및 `cp1y`로 지정된 제어점을 사용하여 현재 펜의 위치에서 `x`와 `y`로 지정된 끝점까지 
이차 베지어 곡선을 그린다.

**`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`**

`(cp1x, cp1y)` 및 `(cp2x, cp2y)`로 지정된 제어점을 사용하여 현재 펜 위치에서 
`x` 및 `y`로 지정된 끝점까지 삼차 베지어 곡선을 그립니다.

![](/static/img/interaction/image01.jpg)

위 사진은 두 곡선의 차이를 가장 잘 설명해주고 있다.  
2차 bezier-curve는 시작과 끝점(파란색 점) 그리고 하나의 **제어점(control point, 빨간점으로 표시)**을 가지고 있지만, 
3차 bezier-curve는 두개의 **제어점**을 사용하고 있다.

두 메서드에 모두 사용되는 `x`와 `y` 변수는 모두 끝점의 좌표를 나타낸다.  
첫번째 제어점은 `cp1x` 와 `cp1y` 좌표로, 두번째 제어점은 `cp2x`, `cp2y` 좌표로 표시되었다.  

2차 및 3차 bezier-curve를 사용하는 것은 매우 어려울 수 있다.  
**Adobe Illustrator**와 같은 벡터 드로잉 소프트웨어와는 달리, 우리는 현재 수행중인 작업에 대해 직접적인 시각적 피드백을 받을 수 없기 때문이다.  
이런 점은 복잡한 모양을 그리기 어렵도록 만든다.  
**다음 예제에서 우리는 간단한 유기체적 형태만 그리도록 하겠지만, 여러분이 연습과 시간을 투자한다면 이후에 더욱 복잡한 도형도 그릴 수 있게 될 것이다.**

아래 예제는 아주 어려운 점은 없다.  
두 경우 모두 연속된 곡선이 그려지면서 최종 모양이 완성된다.

### 2차 베지에 곡선(Quadratic Bezier Curves)

이 예제는 여러 개의 2차 베지에 곡선을 이용해 말풍선을 만들어낸다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();
  }
}
```

[위 예제](/static/img/interaction/canvas06.html){:target="_blank"}

![](/static/img/interaction/image02.jpg)

### 3차 베지어 곡선 (Cubic Bezier Curves)

이 예제는 3차 곡선을 이용하요 하트를 그린다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    // Cubic curves example
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fill();
  }
}
```

[위 예제](/static/img/interaction/canvas07.html){:target="_blank"}

## 직사각형

직사각형을 캔버스에 직접 그리는 **직사각형 그리기**에서 본 세가지 메서드 외에 `rect()` 메서드도 있다.  
이 메서드는 현재 열린 패스에 직사각형 경로를 추가한다.

**`rect(x, y, width, height)`**  

좌측 상단이 (x, y)이고 폭과 높이가 `width`, `height`인 직사각형을 그린다.

이 메서드가 실행되기 전에 (x, y) 매개변수를 가진 `moveTo()` 메서드가 자동으로 호출된다.  
**즉, 현재의 펜 위치가 자동으로 기본좌표로 초기화된다.**

## 조합하기

이제까지 이 페이지의 예제들은 각각의 도형마다 하나의 path 함수를 가지고 있었다.  
하지만 도형을 만드는데 사용되는 경로의 종류와 개수는 제한이 없다.  
그렇기 때문에 이 마지막 예제에서는 모든 경로 함수를 합쳐 여러 게임 캐릭터들을 그려보도록 하겠다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    roundedRect(ctx, 12, 12, 150, 150, 15);
    roundedRect(ctx, 19, 19, 150, 150, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    for (var i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for (i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for (i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
```

[위 예제](/static/img/interaction/canvas08.html){:target="_blank"}

이 예제는 보기보다 아주 간단하기 때문에 자세한 설명은 생략하겠다.  
알아 두어야할 가장 중요한 부분은 `fillStyle` 코드와 사용된 유틸리티 함수(`roundedRect()` 부분)이다.  
**유틸리티 함수를 사용하게 되면, 사용해야 할 코드의 양과 복잡함을 줄여주는데 도움이된다.**

이 튜토리얼에서 나중에 `fillStyle`에 대하여 조금 더 자세하게 알아보도록 하겠지만, 
지금은 경로의 채우는 색을 기본값(흑백)에서 바꾸었다가 다시 기본값으로 바꾸는 정도로만 사용했다.

## Path2D 오브젝트 (Path 2D objects)

마지막 예제에서 보았듯이, `canvas`에 객체를 그리는 일련의 경로와 그리기 명령이 있을 수 있다.  
**<span style="color:red">코드를 단순화하고 성능을 향상시키기 위해</span>** 최근 버전의 브라우저에서 사용할 수 있는 `Path2D` 객체를 사용하여 
이러한 드로잉 명령을 캐시하거나 기록할 수 있다.  
이로써 여러분은 경로를 빠르게 다시 실행 시킬 수 있다.

**`Path2D()`**  
**Path2D()** 생성자는 새로운 `Path2D` 객체를 반환한다.  
선택적으로 다른 경로를 인수로 받거나(복사본을 생성), SVG 경로 데이터로 구성된 문자열을 받아서 객체로 반환한다.

```javascript
new Path2D();     // empty path object
new Path2D(path); // copy from another Path2D object
new Path2D(d);    // path from SVG path data
```

`moveTo`, `rect`, `arc` 혹은 `quadraticCurveTo` 등과 같은 모든 경로 메서드([path methods](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#Paths){:target="_blank"})들은 
`Path2D` 객체에서 사용 가능하다.

`Path2D` API는 또한 `addPath` 메서드를 사용하여 경로를 결합하는 방법을 추가한다.  
예를 들자면, 여러 요소를 사용하는 오브젝트를 만들 때 유용하게 사용될 수 있다.

**`Path2D.addPath(path [, transform])`**  
옵션으로 변환행렬(transformation matrix)을 사용하여 현재 경로에 경로를 추가한다.

### Path2D 예제

이 예제에서는 직사각형과 원을 만들을 것이다.  
나중에 사용할 것을 고려하여, 두 도형 모두 `Path2D` object로 저장될 것이다.  
새로운 버전의 `Path2D` API에서는 여러 메서드들이 지금 사용하고 있는 path가 아닌 `Path2D` object를 옵션으로 선택하여 
사용할 수 있도록 업데이트 되었다.  
아래의 예제에서 보시면 `stroke`와 `fill` 메서드가 오브젝트를 `canvas` 위에 그리도록 path 변수와 함께 사용되었다.

```javascript
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    var rectangle = new Path2D();
    rectangle.rect(10, 10, 50, 50);

    var circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);

    ctx.stroke(rectangle);
    ctx.fill(circle);
  }
}
```

[위 예제](/static/img/interaction/canvas09.html){:target="_blank"}

## SVG paths 사용하기

새로운 `canvas`, `path2D API` **또 다른 강력한 특징 중 하나는** `canvas`의 path를 초기화하기 위해 `SVG path data`를 사용한다는 것이다.  
이는 path 데이터를 이동시키며, SVG와 canvas 에서 재사용할 수 있도록 해준다.

path는 (M10 10) 점으로 이동한 다음, 수평하게 오른쪽으로 80 포인트(h 80) 만큼 이동한다.  
이후 수직으로 80 포인트 (v 80) 내려간 다음, 80 포인트 왼쪽으로 (h -80) 수평하게 이동하고 다시 시작점 (z)으로 돌아간다.  
예시는 [이곳](https://developer.mozilla.org/en-US/docs/Web/API/Path2D/Path2D#Using_SVG_paths){:target="_blank"}(Path2D constructor)에서 확인할 수 있다.

```javascript
var p = new Path2D('M10 10 h 80 v 80 h -80 Z');
```















