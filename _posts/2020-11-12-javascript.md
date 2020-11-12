---
title: 자바스크립트 초보로서 배운 10가지
layout: post
date: '2020-11-12 17:54:00'
categories:
- js
---

## 자바스크립트 초보로서 배운 10가지

### 1
자바스크립트에는 숫자에 대한 다른 데이터 유형이 없습니다.  
기본적으로 모든 숫자는 이중으로 간주됩니다.  
정수가 없습니다.  
예를 들어, 변수 두 개를 선언했다고 가정합니다.  
`a = 7` 및 `b = 2`는 기본적으로 `float`입니다.  
c와 같은 다른 프로그래밍 언어에서는 `c++`가 `a / b = 3`을 제공하지만 JavaScript에서는 `3.5`를 얻습니다.  
기본적으로 JavaScript는 모든 숫자에 대해 **부동 소수점 나누기**를 수행합니다.

```javascript
var a = 7;
var b = 2;
var result = a/ b;
console.log(result);
3.5
```

### 2

`=== vs ==` 비교 연산자.  
다른 프로그래밍 언어에 익숙하고 JavaScript를 처음 사용하는 경우 `===`에 눈살을 찌푸 릴 수 있습니다.    
double equal 연산자는 다소 잊고 있습니다.    
데이터 유형이 `==` 양쪽에서 동일하지 않으면 변수를 강제 변환하려고합니다.

두 개의 변수 `num1 = 5` 및 `num2 = "5"`가 있으면 `==` 같음을 사용하면 결과가 참이됩니다.  
숫자 5와 문자열 5가 같지 않다는 것을 알고 있지만 `==`는 비교를 위해 데이터유형을 강제 변환합니다.

```javascript
var num1 = 5;
var num2 = "5";
console.log(num1 == num2)
true // output
```

반면에 `===`는 양쪽 변수 / 값의 데이터 유형이 동일하지 않으면 작동하지 않습니다.

두 개의 변수 `num1 = 5` 및 `num2 = "5"`가있는 경우 `===` 같음을 사용하면 결과가 false가됩니다.  
우리는 숫자 5와 문자열 5가 같지 않다는 것을 알고 있습니다.  
`===` 는 값과 데이터 유형을 모두 확인합니다.

```javascript
var num1 = 5;
var num2 = "5";
console.log(num1 === num2)
false // output
```

`!=` 및 `!==` 연산자에도 비슷한 것이 적용됩니다.

### 3

JavaScript의 대문자 소문자 문자열 구분.  
두 개의 문자열 `Bangladesh`와 `bangladesh`가 있다고 가정하면 자바스크립트는 이를 어떻게 비교할까요.  
이 비교를 위해 `>`, `<` 및 `==` 연산자가 있습니다.  
지금은 `==` 연산자에 초점을 맞출 것입니다.  
`==`는 대소 문자를 구분하는 방식으로 두 문자열을 비교합니다.  
대소 문자를 구분하는 방식은 조건 결과가 참이 되려면 두 문자열의 동일한 위치에있는 각 문자가 동일한 대소 문자 여야 함을 의미합니다.

```javascript
var country1 = "Bangladesh";
var country2 = "bangladesh";
console.log(country1 == country2)
false // results false
```

`country1` 및 `country2` 변수를 동일하게 고려하려면 둘 다 동일한 대소 문자 (소문자 또는 대문자)로 만들어야합니다.  
JavaScript에는 문자열 대소 문자 변환을위한 `toLowerCase()` 및 `toUpperCase()` 두 가지 메서드가 있습니다.  
다음 예에서는 `country1.toLowerCase()`를 사용하여 `country1` 변수를 소문자로 변환했습니다.

```javascript
var country1 = "Bangladesh";
var country2 = "bangladesh";
country1 = country1.toLowerCase();
console.log(country1 == country2)
true // result
```

### 4

JavaScript에서 배열을 만드는 양방향.  
다른 프로그래밍 언어에서 볼 수있는 전통적인 `[]` 사용 및 `Array` 클래스 사용.  
`[]`를 사용하여,로 구분 된 값으로 배열을 선언합니다.  
`Array()`를 사용할 때 빈 배열을 선언하고 인덱스와 값을 사용하여 배열의 값을 할당합니다.

```javascript
// first way
var numbers = [1, 3, 4, 5];
console.log(numbers)
// [1, 3, 4, 5] // output
// using Array Class()
var fruits = new Array();
fruits[0] = "apple";
fruits[1] = "banana";
fruits[2] = "orange";
console.log(fruits)
// ["apple", "banana", "orange"] // output
```

### 5

배열을 스택 및 대기열로 사용.  
JavaScript 배열을 Stack 및 Queue로 사용할 수 있습니다.  
이제 스택을 살펴 보겠습니다.

스택은 선입 선출 데이터 구조입니다.  
먼저 스택을 선언 한 다음 배열 푸시 및 팝 메서드를 사용하여 스택 항목을 삽입하고 팝할 수 있습니다.

```javascript
var stack = [];
console.log(stack);
// [] // output
// insert a
stack.push("a"); 
// insert b
stack.push("b");
// insert c
stack.push("c");
// print the stack
console.log(stack)
// (3) ["a", "b", "c"]
// poping gives the top element c
stack.pop()
"c"
// popping gives next the top element b
stack.pop()
"b"
```

### 6

변수 선언 var, let 및 coast를위한 JavaScript의 3 개의 키워드.  
const를 사용하면 값이 변경되지 않는 JavaScript에서 변수를 선언 할 수 있습니다.  
상수 변수를 선언하는 일반적인 규칙은 이름 지정에 모두 대문자를 사용하는 것입니다.  
const PI = 3.14159처럼.  

var는 다시 초기화 할 수있는 변수를 선언하는 데 사용되며 현재 컨텍스트 범위와 그 클로저를 포함합니다.  
let은 선언 된 코드 블록 내에서 범위가있는 변수를 선언하는 데 사용됩니다.

```javascript
const PI = 3.14159;
var num1 = 5;
console.log(num1);
// 5 // output
var num1 = "Hello";
console.log(num1);
// Hello //output
let text = "Hello World!";
console.log(text);
// Hello World! // output
```

### 7

forEach () 배열 반복.

과일 배열을 선언했다고 가정 해 보겠습니다.  
배열 항목을 반복하기 위해 배열 이름을 입력 한 다음 .과 forEach를 입력합니다.  
이렇게하면 forEach 내부에 fruits.forEach () 함수를 제공해야합니다.  
이 함수는 **3 개의 매개 변수**를 사용합니다.  
항목을 얻기 위해 첫 번째 매개 변수를 사용할 수 있습니다.

여기에서 과일이라는 이름을 지정했습니다.  
루프 내에서이 이름을 사용하여 배열 항목을 인쇄했습니다.

항목의 색인을 얻기 위해 두 번째 매개 변수를 사용할 수 있습니다.  
여기서는 아래 13 행의 두 번째 함수 매개 변수에 대한 색인 이름을 사용하고 루프 내부에 색인과 항목을 인쇄했습니다.

```javascript

// declare an array
var fruits = ["apple", "orange", "banana", "pineapple"]
// loop over with items
fruits.forEach(function(fruit){
    console.log(fruit);
})
// output
// apple
// orange
// banana
// pineapple
// loop over with item and index
fruits.forEach(function(fruit,index){
    console.log("index: "+index+ " " + fruit);
})
// output
// index: 0 apple
// index: 1 orange
// index: 2 banana
// index: 3 pineapple
```

# 8

문자열에서 공백 제거.

웹 개발에서 사람들이 입력에 텍스트를 입력 할 때 문자열의 시작 또는 끝에 불필요한 공백이 자주 발생합니다.

이러한 것들을 없애기 위해 JavaScript 문자열에는  

* 문자열 양쪽에서 공백을 제거하는 `trim()`,  
* 처음에 제거하는 `trimStart()` 및 
* 끝에서 제거하는 `trimEnd()`와 같은 메서드가 있습니다.

```javascript
var name = "  JavaScript";
var language = "  JavaScript   ";
console.log(language);
//   JavaScript   
var languageBoth = language.trim();
console.log(languageBoth)
// JavaScript
var languageStart = language.trimStart();
console.log(languageStart)
// JavaScript   
var languageEnd = language.trimEnd();
console.log(languageEnd);
//   JavaScript
```

### 9

삼항 연산자.  
**JavaScript의 `if-else` 조건에 익숙하다면 삼항 연산자를 사용하는 동일한 논리를 사용하여 더 읽기 쉽고 간결한 코드를 작성할 수 있습니다.**

```javascript
const year = 2020
var result;
if (year>2019){
   result = "Yes";
} else{
    result = "No";
}
console.log(result)
//Yes
var result = year > 2019 ? "Yes" : "No";
console.log(result)
//Yes
```

### 10

수학 함수 및 상수를 위한 수학 함수.

프로그래밍에서 우리는 종종 수학 함수와 상수를 사용해야 할 때를 접합니다.  
JavaScript에는 수학 마법사가 되는 데 사용할 수있는 편리한 클래스 수학이 있습니다.  

`Math.PI`는 상수 값 파이를 제공하고 `Math.LN2`는 2의 자연 로그를 제공합니다.  
sqrt를 계산하려면 `Math.sqrt(value)`를 사용할 수 있으며, 값의 거듭 제곱을 계산하려면 `Math.pow(value, exponent)`를 사용할 수 있습니다.  
`Math.abs()`를 사용하여 절대 값을 계산할 수 있습니다.  
`Math.ceil(value)`를 값의 상한으로 사용할 수 있습니다.  
마지막으로 바닥 계산 `Math.floor(value)`

```javascript
// constants
console.log(Math.PI)
// 3.141592653589793
console.log(Math.LN2)
// 0.6931471805599453
Math.sqrt(9)
// 3
Math.pow(3, 2)
// 9
Math.abs(-9)
// 9
Math.ceil(9.22)
// 10
Math.floor(9.22)
// 9
```