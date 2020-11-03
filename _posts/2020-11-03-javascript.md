---
title: 자바스크립트 call, apply
layout: post
date: '2020-11-03 14:33:00'
categories:
- js
---

## 자바스크립트 call, apply

`call()` 메서드는 주어진 `this` 값 및 각각 전달된 인수와 함께 함수를 호출합니다.

>주의: 이 함수 구문은 `apply()`와 거의 동일하지만, `call()`은 **인수 목록**을, 반면에 `apply()`는 **인수 배열 하나**를 받는다는 점이 중요한 차이점입니다.

```javascript
function Product (name, price) {
    this.name = name;
    this.price = price;
}

function Food (name, price) {
    Product.call(this, name, price);
    this.category = "food";
}

console.log(new Food("cheese", 5).name);
// cheese
```

## 구문

```text
func.call(thisArg[, arg1[, arg2[, ...]]])
```

## 매개변수

### thisArg

func 호출에 제공되는 `this`의 값.

>`this`는 메서드에 의해 보이는 실제값이 아닐 수 있음을 주의하세요.  
>메서드가 **비엄격모드** 코드 내 함수인 경우, `null` 및 `undefined`는 전역 객체로 대체되고 원시값은 객체로 변환됩니다.

### arg1, arg2, ...

객체를 위한 인수

## 반환값 (Return Value)

`this`와 arguments를 매개로 호출된 함수의 반환값

---

## 예시

### 객체의 생성자 연결에 call 사용

Java와 비슷하게, 객체의 생성자 연결(chain)에 `call`을 사용할 수 있습니다.  
다음 예에서, `Product` 객체의 생성자는 `name` 및 `price`를 매개변수로 정의됩니다.  
다른 두 함수 `Food` 및 `Toy`는 `this` 및 `name`과 `price`를 전달하는 `Product`를 호출합니다.

`Product`는 `name` 및 `price` 속성을 초기화하고, 특수한 두 함수(Food 및 Toy)는 `category`를 정의합니다.

```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

### 익명 함수 호출에 call 사용

이 예제에서는 익명 함수를 만들고 배열 내 모든 객체에서 이를 호출하기 위해 `call`을 사용합니다.  
여기서 익명 함수의 주목적은 배열 내 객체의 정확한 인덱스를 출력할 수 있는 모든 객체에 print 함수를 추가하는 것 입니다.

>this 값으로 객체 전달이 반드시 필요하지는 않지만, 해당 예제에서는 설명의 목적으로 사용했습니다. 

```javascript
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}

// #0 Lion: King
// #1 Whale: Fail
```

### 함수 호출 및 'this'를 위한 문맥 지정에 call 사용

아래 예제에서, `greet`을 호출하면 `this` 값은 객체 `obj`에 바인딩됩니다.

```javascript
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};

greet.call(obj);  // cats typically sleep between 12 and 16 hours
```

## 첫번째 인수 지정 없이 함수 호출에 call 사용

아래 예제에서, `display` 함수에 첫번째 인수를 전달하지 않고 호출합니다.  
첫번째 인수를 전달하지 않으면, `this`의 값은 전역 객체에 바인딩됩니다.

```javascript
var sData = 'Wisen';            
function display(){
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen
```

>주의: 엄격 모드(strict mode)에서, this 는 undefined값을 가집니다. See below.

```javascript
'use strict';

var sData = 'Wisen';

function display() {
  console.log('sData value is %s ', this.sData);
}

display.call(); // Cannot read the property of 'sData' of undefined
```

