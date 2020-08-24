---
title: 1. CSS 시크릿 - querySelectAll
layout: post
date: '2020-08-24 22:41'
categories:
- js_interaction
---

## querySelectAll

```html
<!DOCTYPE html>
<html>
<head>

</head>
<body>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>

<script>
function $$ (selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}

console.log($$('.item'));
</script>
</body>
</html>
```

![](/static/img/interaction/image14.jpg)

```html
<!DOCTYPE html>
<html>
<head>

</head>
<body>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>
<div class="item"></div>

<script>
console.log(document.querySelectorAll('.item'));
</script>
</body>
</html>
```

![](/static/img/interaction/image15.jpg)

`querySelectorAll`을 사용하면 **NodeList** 로 선택자가 선택된다.  
데이터 타입이 **Array**가 아니다.  

**NodeList**도 **Array**처럼 `length`, `Array[0]`.. 이런 것들은 사용할 수 있다.  
하지만 **배열**의 다른 메서드들은 **사용 불가능**하다.  
**때문에 위와 같이 NodeList를 Array로 바꿔주는 작업이 필요하다.**

```javascript
function $$ (selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
    // 위 코드의 뜻은
    // elements는 Array가 아니라 NodeList이기 때문에, Array 객체에 있는 slice 메서드가 없다.
    // 그렇기 때문에 call 메서드로 Array 객체와 연결 시켜서
    // Arrayl 객체에 있는 slice 메서드를 활용해 배열화 시키겠다 라는 뜻이다.
}
```

## ECMA 2015+ 새 자바스크립트 문법, 펼침연산자

```javascript
function $$ (selector, context) {
    context = context || document;
    var elements = context.querySelectorAll(selector);
    return [...elements];
   
}
```

위와 같이 작성해도 된다.










