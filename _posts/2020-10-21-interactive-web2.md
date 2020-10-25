---
title: 5. 오늘 날짜 카운트 스크립트 만들기
layout: post
date: '2020-10-21 21:33'
categories:
- js_interactive_web2
---

## 5. 오늘 날짜 카운트 스크립트 만들기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step2/index.html){:target="_blank"}

## 텍스트 외곽선 효과 적용하기

이 속성들은 **웹킷 기반 엔진**에서만 작동한다.  
이점 주의하자.

* <button data-toggle="collapse" data-target="#css">css</button>

{:.collapse #css}
```css
.text {
    -webkit-text-fill-color:transparent;
    -webkit-text-stroke:2px #fff;
}
```

* <button data-toggle="collapse" data-target="#javascript">javascript</button>

{:.collapse #javascript}
```javascript
(function () {
    var el = document.querySelector(".date_count");
    var date = new Date();
    var todayDate = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate());
    var rolling = 24;
    var resultArray = [];

    resultArray = todayDate.split("");

    resultArray.forEach(function (val, idx) {
        var countBox = document.createElement("div");
        var numberArray = [];
        var number = Number(val);

        countBox.className = "count_box";

        for (var i = 0; i <= rolling; i++) {
            var sum = number + i >= 10 ? String(number + i)[1] : number + i;
            numberArray[i] = sum;
        }

        numberArray.reverse();

        numberArray.forEach(function (val2, idx2) {
            var countValue = document.createElement("span");
            countValue.innerText = val2;
            countBox.appendChild(countValue);
        })

        el.appendChild(countBox);
        countBox.style.transform = "translate3d(0, 0, 0)";
        setTimeout(function () {
            requestAnimationFrame(function () {
                countBox.style.transform = "translate3d(0," + (-countBox.getBoundingClientRect().height / rolling * (rolling - 1)) + "px, 0)";
                countBox.style.transition = "transform 3s";
            })
        }, (idx + 3) * 300)
    })

    addEventListener("load", function () {
        document.querySelector(".section_today").classList.add("active")
    })

})()
```