---
title: JavaScript 의 클로저 이해
layout: post
date: '2020-10-26 14:56:00'
categories:
- js
---

## JavaScript 의 클로저 이해

### JavaScript 에서 클로저가 작동하는 방식 알아보기 : 실습 가이드

클로저는 모든 JavaScript 개발자가 알고 이해해야하는 JavaScript의 기본 개념입니다.  
하지만 이는 많은 새로운 자바 스크립트 개발자를 혼란스럽게하는 개념입니다.

클로저에 대한 적절한 이해는 더 효율적이고 깨끗한 코드를 작성하는 데 도움이됩니다.  
그러면 더 나은 JavaScript 개발자가되는 데 도움이 될 것입니다.

따라서이 기사에서는 클로저의 내부와 JavaScript에서 실제로 작동하는 방식을 설명하려고합니다.

더 이상 고민하지 않고 시작하겠습니다. :)

>팁 : 앱간에 구성 요소를 재사용하려면 Bit 를 사용하십시오.  
>팀이 JS 구성 요소를 구성하고 공유하는 데 도움이되므로 새 앱을 더 빠르게 빌드 할 수 있습니다.  
>시도 해봐.

* [bit url](https://bit.dev/){:target="_blank"}

## What is Closure?

클로저는 외부 함수가 반환 된 후에도 외부 함수 범위에 액세스 할 수있는 함수입니다.  
이것은 클로저가 함수가 완료된 후에도 외부 함수의 변수와 인수를 기억하고 액세스 할 수 있음을 의미합니다.  
클로저로 들어가기 전에 먼저 **어휘 범위(Lexical scope)**를 이해하겠습니다.

## What is a Lexical Scope(어휘 범위)?

JavaScript의 어휘 범위 또는 정적 범위는 소스 코드의 물리적 위치를 기반으로하는 변수, 함수 및 개체의 접근성을 나타냅니다.  
예를 들면 :

```javascript
let a = 'global';
function outer() {
    let b = 'outer';
    function inner() {
        let c = 'inner'
        console.log(c);   // prints 'inner'
        console.log(b);   // prints 'outer'
        console.log(a);   // prints 'global'
    }
    console.log(a);     // prints 'global'
    console.log(b);     // prints 'outer'
    inner();
}
outer();
console.log(a);         // prints 'global'
```

여기서 inner 함수는 자체 범위, outer 함수의 범위 및 전역(global) 범위에 정의 된 변수에 액세스 할 수 있습니다.  
그리고 outer 함수는 자체 범위 및 전역(global) 범위에 정의 된 변수에 액세스 할 수 있습니다.  

따라서 위 코드의 범위 체인(Scope chain)은 다음과 같습니다.

```text
Global {
  outer {
    inner
  }
}
```

inner 함수는 outer 함수의 어휘 범위(lexical scope)로 둘러싸여 있으며 차례로 전역 범위(global scope)로 둘러싸여 있습니다.  
이것이 inner 함수가 outer 함수와 전역(global) 범위에 정의 된 변수에 액세스 할 수있는 이유입니다.

## Practical Examples of Closure (클로져의 실제 예시)

클로저의 작동 방식을 살펴보기 전에 클로저의 몇 가지 실용적인 예를 살펴 보겠습니다.

### Example 1#

```javascript
function person() {
    let name = 'Peter';
    
    return function displayName() {
        console.log(name);
    };
}
let peter = person();
peter(); // prints 'Peter'
```

