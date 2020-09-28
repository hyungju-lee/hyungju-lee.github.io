---
title: 8. Immediately Invoked Function Expressions and Modules (즉시실행 함수 및 모듈)
layout: post
date: '2020-09-28 16:48:00'
categories:
- js
---

## 8. Immediately Invoked Function Expressions and Modules (즉시실행 함수 및 모듈)

즉시실행함수(IIFE)는 말 그대로 즉시실행되는 함수입니다.  
이들은 주로 **전역 범위를 오염시키는 것을 피하기위해** 사용됩니다.  
**나중에 ES6 모듈이 도입되어 글로벌 범위 오염을 방지하는 표준 방법을 제공합니다.**  
일부 사람들은 이것이 IIFE를 **직접** 대체하지 않는다고 생각합니다.  

IIFE 및 모듈을 이해하면 전역 공간의 잘못된 처리로 인한 버그가 적은 애플리케이션을 구축할 수 있습니다.  
그러나 모듈을 사용하면 많은 일을 할 수 있습니다.