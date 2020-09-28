---
title: 5. Equality Comparison and ‘typeof’ Operator (동등 비교 및 typeof 연산자)
layout: post
date: '2020-09-28 16:10:00'
categories:
- js
---

## 5. Equality Comparison and ‘typeof’ Operator (동등 비교 및 typeof 연산자)

이 개념은 기본적으로 double equals 및 triple equals의 사용과 이를 사용해야하는 시기와 이유를 설명합니다.  
표면적으로는 동일하게 보이고 대부분의 경우 동일한 결과를 제공하지만, 무의식적으로 사용하면 예상치 못한 버그가 발생할 수 있습니다.  

```javascript
1 == '1' // true
1 === '1' // false
```

또한 typeof 연산자를 사용할 수 있고 출력 가능성을 알 수 있어야합니다.  
objects 가 작동 할 때 혼란 스러울 수 있습니다.

```javascript
typeof 3 // "number"
typeof "abc" // "string"
typeof {} // "object"
typeof true // "boolean"
typeof undefined // "undefined"
typeof function(){} // "function"
typeof [] // "object"
typeof null // "object"
```

