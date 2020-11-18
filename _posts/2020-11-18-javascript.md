---
title: JavaScript IE 구분방법
layout: post
date: '2020-11-18 14:21:00'
categories:
- js
---

## JavaScript IE 구분방법

IE는 버전별로 출력되는 `navigator.userAgent`값이 다르다.  
때문에 IE인지 아닌지 구분하려면 아래와 같이 모든 경우를 고려해야된다.

```javascript
var agent = navigator.userAgent.toLowerCase();

if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
    // 인터넷 익스플로러 브라우저 입니다.
} else {
    // 인터넷 익스플로러 브라우저가 아닙니다.
}
```