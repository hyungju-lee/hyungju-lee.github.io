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

이 코드에서 우리는 내부 함수 **displayName**을 반환하고 내부 함수를 **peter** 변수에 저장하는 **person** 함수를 호출합니다.  
**peter** 함수 (실제로 displayName 함수를 참조 함)를 호출하면 'Peter'라는 이름이 콘솔에 인쇄됩니다.  

그러나 displayName 함수에는 name 이라는 변수가 없으므로 이 함수는 함수가 반환 된 후에도 외부 함수의 변수에 어떻게든 액세스 할 수 있습니다.  
**따라서 displayName 함수는 실제로 클로저입니다.**

### Example 2#

```javascript
function getCounter() {
    let counter = 0;
    return function() {
        return counter++;
    }
}
let count = getCounter();
console.log(count());  // 0
console.log(count());  // 1
console.log(count());  // 2
```

다시 getCounter 함수에 의해 반환 된 익명 내부 함수를 count 변수에 저장합니다.  
count 함수는 이제 클로저이므로 getCounter ()가 반환 된 후에도 getCounter 함수의 카운터 변수에 액세스 할 수 있습니다.

## 클로저는 어떻게 작동합니까?

지금까지 우리는 클로저가 무엇인지와 그 실제 예에 대해 논의했습니다.  
이제 JavaScript에서 클로저가 실제로 어떻게 작동하는지 이해하겠습니다.

클로저가 JavaScript에서 어떻게 작동하는지 이해하려면 JavaScript에서 가장 중요한 두 가지 개념,  
즉  
1) 실행 컨텍스트(Execution Context)와  
2) 어휘 환경(Lexical Environment)을 이해해야합니다.

### Execution Context (실행 컨텍스트)

실행 컨텍스트는 JavaScript 코드가 평가되고 실행되는 추상 환경입니다.  
전역 코드가 실행되면 전역 실행 컨텍스트 내에서 실행되고 함수 코드는 함수 실행 컨텍스트 내에서 실행됩니다.  

현재 실행중인 실행 컨텍스트는 하나만있을 수 있으며 (JavaScript는 단일 스레드 언어이기 때문에)  
**Execution Stack 또는 Call Stack으로 알려진 스택 데이터 구조로 관리됩니다.**

실행 스택은 LIFO (Last in, First Out) 구조가있는 스택으로, 스택의 맨 위에서 만 항목을 추가하거나 제거 할 수 있습니다.

현재 실행중인 실행 컨텍스트는 항상 스택의 맨 위에 있으며 현재 실행중인 함수가 완료되면 해당 실행 컨텍스트가 스택에서 팝(pop)되고 컨트롤이 스택에서 그 아래의 실행 컨텍스트에 도달합니다.

실행 컨텍스트와 스택을 더 잘 이해하기 위해 코드 스 니펫을 살펴 보겠습니다.

![](/static/img/script/image17.jpg)

(Execution Context Example)

이 코드가 실행되면 JavaScript 엔진은 전역 코드를 실행하기 위해 전역 실행 컨텍스트를 생성하고 first () 함수에 대한 호출이 발생하면 해당 함수에 대한 새 실행 컨텍스트를 생성하고 실행 맨 위로 푸시합니다.  
스택.  
따라서 위 코드의 실행 스택은 다음과 같습니다.

![](/static/img/script/image18.jpg)

first () 함수가 완료되면 해당 실행 스택이 스택에서 제거되고 컨트롤이 그 아래의 실행 컨텍스트, 즉 전역 실행 컨텍스트에 도달합니다.  
따라서 전역 범위의 나머지 코드가 실행됩니다.

### Lexical Environment (어휘 환경)

JavaScript 엔진은 함수 또는 전역 코드를 실행하기 위해 실행 컨텍스트를 생성 할 때마다 해당 함수를 실행하는 동안 해당 함수에 정의 된 변수를 저장할 새로운 어휘 환경(Lexical Environment)을 생성합니다.

어휘 환경은 식별자-변수 매핑을 보유하는 데이터 구조입니다.  
(여기서 식별자는 변수 / 함수 이름을 나타내며 변수는 실제 개체 (함수 유형 개체 포함) 또는 기본 값에 대한 참조입니다).

어휘 환경에는 **(1) 환경 레코드**와 **(2) 외부 환경에 대한 참조**의 두 가지 구성 요소가 있습니다.

1. 환경 레코드는 변수 및 함수 선언이 저장되는 실제 위치입니다.
2. 외부 환경에 대한 참조는 외부 (상위) 어휘 환경에 액세스 할 수 있음을 의미합니다.  
   이 구성 요소는 클로저가 작동하는 방식을 이해하는 데 가장 중요합니다.
   
어휘 환경(Lexical Environment)은 개념적으로 다음과 같습니다.

```text
lexicalEnvironment = {
  environmentRecord: {
    <identifier> : <value>,
    <identifier> : <value>
  }
  outer: < Reference to the parent lexical environment>
}
```

위의 코드 스니펫을 다시 살펴 보겠습니다.

```javascript
let a = 'Hello World!';
function first() {
  let b = 25;  
  console.log('Inside first function');
}
first();
console.log('Inside global execution context');
```

JavaScript 엔진은 전역 코드를 실행하기 위해 전역 실행 컨텍스트를 만들 때 전역 범위에 정의 된 변수와 함수를 저장하는 새로운 어휘 환경도 만듭니다.  
따라서 전역 범위의 어휘 환경은 다음과 같습니다.

```text
globalLexicalEnvironment = {
  environmentRecord: {
      a     : 'Hello World!',
      first : < reference to function object >
  }
  outer: null
}
```

여기서 외부 어휘 환경은 전역 범위에 대한 외부 어휘 환경이 없기 때문에 null로 설정됩니다.  
엔진이 first () 함수에 대한 실행 컨텍스트를 생성 할 때, 함수 실행 중에 해당 함수에 정의 된 변수를 저장하는 어휘 환경도 생성합니다.  
따라서 함수의 어휘 환경은 다음과 같습니다.

```text
functionLexicalEnvironment = {
  environmentRecord: {
      b    : 25,
  }
  outer: <globalLexicalEnvironment>
}
```

함수가 소스 코드에서 전역 범위로 둘러싸여 있기 때문에 함수의 외부 어휘 환경은 전역 어휘 환경으로 설정됩니다.

>**NOTE**  
>함수가 완료되면 해당 실행 컨텍스트가 스택에서 제거되지만 해당 어휘 환경이 외부 어휘 환경 속성의 다른 어휘 환경에서 참조되는지 여부에 따라 해당 어휘 환경이 메모리에서 제거되거나 제거되지 않을 수 있습니다.

## Detailed Closures Examples

실행 컨텍스트와 어휘 환경을 이해 했으므로 이제 클로저로 돌아가 보겠습니다.

### Example 1#

다음 코드 스니펫을 살펴보세요.

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

person 함수가 실행되면 JavaScript 엔진은 함수에 대한 새로운 실행 컨텍스트와 어휘 환경을 만듭니다.  
이 함수가 끝나면 displayName 함수를 반환하고 peter 변수에 할당합니다.  
따라서 어휘 환경은 다음과 같습니다.

```text
personLexicalEnvironment = {
  environmentRecord: {
    name : 'Peter',
    displayName: < displayName function reference>
  }
  outer: <globalLexicalEnvironment>
}
```

person 함수가 완료되면 실행 컨텍스트가 스택에서 제거됩니다.  
그러나 어휘 환경은 내부 displayName 함수의 어휘 환경에 의해 참조되기 때문에 어휘 환경은 여전히 메모리에 있습니다.  
따라서 해당 변수는 여전히 메모리에서 사용할 수 있습니다.

personLexicalEnvironment가 생성되면 JavaScript 엔진이 해당 어휘 환경 내의 모든 함수 정의에 personLexicalEnvironment를 연결합니다.  
나중에 내부 함수가 호출되면 JavaScript 엔진이 외부 어휘 환경을 해당 함수 정의에 연결된 어휘 환경으로 설정할 수 있습니다.  

peter 함수가 실행되면 (실제로 displayName 함수에 대한 참조 임) JavaScript 엔진은 해당 함수에 대한 새로운 실행 컨텍스트와 어휘 환경을 만듭니다.

따라서 어휘 환경은 다음과 같습니다.

```text
displayNameLexicalEnvironment = {
  environmentRecord: {
    
  }
  outer: <personLexicalEnvironment>
}
```

displayName 함수에는 변수가 없으므로 해당 환경 레코드가 비어 있습니다.  
이 함수를 실행하는 동안 JavaScript 엔진은 함수의 어휘 환경에서 변수 이름을 찾으려고합니다.

displayName 함수의 어휘 환경에는 변수가 없기 때문에 외부 어휘 환경, 즉 여전히 메모리에있는 사람 함수의 어휘 환경을 조사합니다.  
JavaScript 엔진이 변수를 찾고 이름이 콘솔에 인쇄됩니다.

### Example 2#

```javascript
function getCounter() {
  let counter = 0;
  return function() {
    return counter++;
  }
}
let count = getCounter();
console.log(count());  // 0
console.log(count());  // 1
console.log(count());  // 2
```

다시 getCounter 함수의 어휘 환경은 다음과 같습니다.

```text
getCounterLexicalEnvironment = {
  environmentRecord: {
    counter: 0,
    <anonymous function> : < reference to function>
  }
  outer: <globalLexicalEnvironment>
}
```

이 함수는 익명 함수를 반환하고 카운트 변수에 할당합니다.  
count 함수가 실행되면 어휘 환경은 다음과 같습니다.

```text
countLexicalEnvironment = {
  environmentRecord: {
  
  }
  outer: <getCountLexicalEnvironment>
}
```

count 함수가 호출되면 JavaScript 엔진은 카운터 변수에 대해이 함수의 어휘 환경을 조사합니다.  
다시 환경 레코드가 비어 있으므로 엔진은 함수의 외부 어휘 환경을 조사합니다.

엔진은 변수를 찾아서 콘솔에 출력하고 getCounter 함수 어휘 환경에서 counter 변수를 증가시킵니다.

따라서 첫 번째 호출 횟수 함수 후 getCounter 함수의 어휘 환경은 다음과 같습니다.

```text
getCounterLexicalEnvironment = {
  environmentRecord: {
    counter: 1,
    <anonymous function> : < reference to function>
  }
  outer: <globalLexicalEnvironment>
}
```

count 함수를 호출 할 때마다 JavaScript 엔진은 count 함수에 대한 새로운 어휘 환경을 만들고 카운터 변수를 증가 시키며 getCounter 함수의 어휘 환경을 업데이트하여 변경 사항을 반영합니다.

## 결론

그래서 우리는 클로저가 무엇이며 실제로 어떻게 작동하는지 배웠습니다.  
클로저는 모든 자바스크립트 개발자가 이해해야하는 자바스크립트의 기본 개념입니다.  
이러한 개념에 대해 잘 알고 있으면 훨씬 더 효과적이고 더 나은 JavaScript 개발자가되는 데 도움이됩니다.  
그게 다입니다.  
