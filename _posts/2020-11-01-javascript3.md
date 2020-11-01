---
title: ES6 스프레드 연산자의 5 가지 사용 (…)
layout: post
date: '2020-11-01 18:58:00'
categories:
- js
---

## ES6 스프레드 연산자의 5 가지 사용 (…)

JavaScript 스프레드 연산자에 대한 간략한 개요입니다.

스프레드 연산자는 ES6 (ECMAScript 6)에서 도입되었습니다.  
기본적으로 세 개의 점 (...)입니다.  
그것은 무언가를 개별 요소로 확장하므로 용어가 퍼집니다.

확산 구문을 사용하면 0 개 이상의 인수 (함수 호출 용) 또는 요소(배열 리터럴 용)가 예상되는 위치에서 배열 표현식 또는 문자열과 같은 반복 가능 항목을 
확장하거나 0 개 이상의 위치에서 객체 표현식을 확장 할 수 있습니다.  
키-값 쌍 (객체 리터럴 용)이 필요합니다.

React를 배우면서 스프레드 연산자에 대해 처음 알게되었습니다.  
그 이후로 저는 스프레드 오퍼레이터의 열렬한 팬이되었습니다.  
JavaScript 내에서 작업을 완료하는 방법을 변경할 수있는이 세 가지 점입니다.

다음은 JavaScript 내에서 내가 가장 좋아하는 스프레드 연산자의 사용 목록입니다!

## 스프레드 연산자의 사용

### 1. Copying an array (배열 복사)

전통적인 방법은 `Array.prototype.slice()` 메서드를 사용하는 것입니다.  
하지만 스프레드 연산자를 사용하면 점 세 개만 있으면됩니다.

```javascript
let names = ['John','James','Ben'];

let newNamesArray = [...names];

console.log(newNamesArray); // ['John','James','Ben']
```

### 2. Concatenating arrays (배열 연결)

이 목표는 이전에 `Array.prototype.concat()` 메서드를 사용하여 달성되었습니다.  
이제 스프레드 연산자를 사용하여 쉽게 달성 할 수 있습니다.

```javascript
let arr1 = ['A', 'B', 'C'];
  
let arr2 = ['H', 'I', 'J'];
    
let result = [...arr1, ...arr2];
      
console.log(result); // ['A', 'B', 'C', 'H', 'I', 'J']
```

### 3. Spreading elements together with an individual element (개별 요소와 함께 요소 확산)

이것은 이와 같은 구현에서 다소 번거로운 일이었습니다.

```javascript
// normally used expand method
let arr = ['a','b'];
let arr2 = [arr,'c','d'];
console.log(arr2); // [ [ 'a', 'b' ], 'c', 'd' ]
```

보시다시피 배열은 상위 배열 내에 중첩되었습니다.  
이것은 이전 구현의 문제였습니다.  
그러나 스프레드 연산자를 사용하면 의도 한 결과를 쉽게 얻을 수 있습니다.

```javascript
let fruits = ['Apple','Pineapple','Banana'];

let newFruits = ['Mango', ...fruits];

console.log(newFruits); // ['Mango', 'Apple','Pineapple','Banana']
```

### 4. Spreading elements on function calls (함수 호출시 요소 확산)

아래 예에서 볼 수 있듯이 세 개의 점으로 인해이 작업이 매우 간단 해 보입니다.  
그러나 수동으로 수행하려는 경우 모든 요소에 개별적으로 액세스하여 전달해야합니다.

```javascript
let names = ['John','James','Ben'];

var getNames = (f1, f2, f3) => {
  
	console.log(`Names: ${f1}, ${f2} and ${f3}`); 

};

getNames(...names); // Names: John, James and Ben
```

### 5. 객체 리터럴에 대한 확산 구문

이를 달성하는 전통적인 방법은 `Object.assign()` 메서드를 사용하는 것입니다.

`Object.assign()` 메서드는 하나 이상의 소스 객체에서 대상 객체로 모든 열거 가능 속성의 값을 복사하는 데 사용할 수 있으며 대상 객체를 반환합니다.

그러나 스프레드 연산자를 사용하면 세 개의 점이 작업을 완료합니다.

```javascript
var obj1 = {
    id: 101,
    name: 'John Doe'
}

var obj2 = {
    age: 25,
    country: 'USA'
}

const employee = { ...obj1, ...obj2 };

console.log(employee);
// { id: 101, name: 'John Doe', age: 25, country: "USA" }
```

>Note: The spread operator does not **deep-copy**. Please keep that in mind.
>참고 : 스프레드 연산자는 전체 복사를 수행하지 않습니다. 그것을 명심하십시오.

스프레드 연산자를 사용하여 새 개체를 만드는 것이 좋을 수 있지만 의도하지 않은 부작용이 발생할 수 있습니다.  
조심하세요!

## 결론

ES6는 JavaScript를 더 효율적으로 만들었을뿐만 아니라 더 재미있게 만들었습니다.  
최신 브라우저는 모두 새로운 ES6 구문을 지원하므로 시간을 할애하지 않았다면 지금이라도 해야합니다.

어쨌든 스프레드 연산자는 JavaScript의 유용한 기능입니다.