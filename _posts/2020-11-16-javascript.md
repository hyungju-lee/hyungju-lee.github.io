---
title: debugger 방법
layout: post
date: '2020-11-16 14:37:00'
categories:
- js
---

## debugger 방법

debugger 를 원하는 지점에 `debugger` 코드를 입력한다.

```javascript
// script.js
(function () {
    // 코드 내용
    // ...
    debugger
    // ...
})()
```

그러면 해당 `debugger`에서 스크립트는 멈추고 아래와 같은 화면에서 실행을 제어할 수 있다.

![](/static/img/script/image179.jpg)

오른 쪽 위의 아이콘을 클릭하면 한줄 한줄 차례차례 실행되게된다.  
한줄한줄 차례대로 실행되게하면서 **Threads**와 **Call Stack**, **Scope**를 보면서 에러난 지점을 찾으면 된다.

