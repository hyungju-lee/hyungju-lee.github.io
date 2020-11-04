---
title: 코드구조파악
layout: post
date: '2020-11-03 15:39:00'
categories:
- js
---

```javascript
// 각페이지별로 적용되는 js코드
(function (container) {
    window.PROJECTNAME.common = window.PROJECTNAME.common || {};

    window.PROJECTNAME.pageName = (function () {
        var variable = document.querySelector(container);
        var childVariable = variable.querySelector("셀렉터")
        return {
            init: function () {
            
            },
            setElement: function () {
            
            },
        }
    })()
})(".page-selector")
```

아, 이제알거같다.  
위는 특정 셀렉터로 제한한다.  
페이지 방식에 적합하다.

```javascript
// common 모든 페이지에서 같이 쓰는 js코드
(function () {
    window.PROJECTNAME = window.PROJECTNAME || {};

    window.PROJECTNAME.pluginName = function (arg1, arg2) {
        var variable = "변수정의";
        this.init();
    }

    window.PROJECTNAME.pluginName.prototype = {
        init: function () {
        
        },
        setElements: function () {
        
        },
    }

    HTMLElement.prototype.pluginName = function () {
        new window.HYFRESH.pluginName(_this, args);
    }

    document.querySelector(".class").myMethod();
})()
```

위는 위와같이 범용적으로 사용할 수 있게하는 방식이다.

세터

```javascript
window.PROJECTNAME.setter = {

}
```