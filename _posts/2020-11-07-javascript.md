---
title: 전문가를위한 조건부 JavaScript
layout: post
date: '2020-11-07 02:27:00'
categories:
- js
---

## 전문가를위한 조건부 JavaScript

### 짧은 코드를위한 조건식 숙달

조건문은 모든 프로그래밍 언어의 구문에서 매우 중요한 측면입니다.  
인기있는 언어로 프로그래밍을 해본 적이 있다면 이미 `if..elif..else` 또는 `switch` 조건문에 익숙 할 것입니다.  
프로그램에서 결정을 내리는 데 매우 유용합니다.

예를 들어, Glad (즉, 나) 만 열 수 있도록 보물 상자를 설계했다고 가정 해 보겠습니다.  
이 논리는 다음과 같이 프로그래밍 방식으로 (Python에서) 표현할 수 있습니다.

```python
if person == 'Glad':
  # Open the treasure chest for Glad
  TreasureChest.open()

else:
  # Don't open the chest for any other person
  TreasureChest.ignore()
```

이전 코드 조각은 Python 구문으로 작성되었지만이 문서는 JavaScript에만 적용됩니다.  
그러나 여기에 표시된 대부분의 기술은 몇 가지 다른 프로그래밍 언어에 적용될 수 있습니다.

지금부터이 기사에서는 JavaScript 외에 다른 프로그래밍 언어의 구문으로 작성된 다른 코드 줄을 찾을 수 없음을 약속합니다.

이 기사에서는 JavaScript의 조건식 (논리 연산자 사용)과 이를 사용하여 조건문보다 코드를 더 짧게 만드는 방법에 대해 더 강조합니다.

## Expressions (식) vs Statements (문)

계속하기 전에 JavaScript에서 표현식과 명령문을 구별 할 수 있어야합니다.  
다음은 매우 간단한 비유입니다.

>표현식은 자바 스크립트에 어떤 구문이 문법에 해당하는지, 문은 자바 스크립트에 어떤 문장이 문법에 해당하는지입니다.

**표현식은 JavaScript 엔진이 값을 생성하기 위해 평가할 수있는 모든 phrase 입니다.**

>예 : 리터럴, 할당, 함수 표현식, 논리, 비트 또는 산술 연산, 객체 속성 액세스, 함수 호출, 평가 등.

다음 코드 스니펫은 몇 가지 JavaScript 표현식을 보여줍니다.

```javascript
// number literal
0xFF

// array literal
[]

// object literal
{}

// regexp literal
/^\d+$/

// logical AND operation
(x && y)

// bitwise XOR operation
(x ^ y)

// ternary operation
(x ? y : z)

// arithmetic operation
(x + y) / z

// assignment
x = 'string'

// function expression
(function x(y) {})

// function invocation
x(100)

// object property access
obj.students[0].name
```

**문은 자바 스크립트 엔진이 어떤 일을 발생 시키거나 부작용을 일으키기 위해 실행할 수있는 문장이나 명령입니다.**

>예 : 조건, 변수 또는 함수 선언, 루프, throw, return, try / catch / finally 등

할당 및 함수 호출과 같은 일부 JavaScript 표현식에는 부작용이있을 수 있으며 결과적으로 일반적으로 명령문 (표현식 명령문)으로 사용될 수 있습니다.

## Conditions and Booleans

https://medium.com/hackernoon/conditional-javascript-for-experts-d2aa456ef67c

https://medium.com/javascript-in-plain-english/a-javascript-cheatsheet-you-need-in-2020-d81b3dd89e09