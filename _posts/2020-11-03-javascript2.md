---
title: Object.prototype.hasOwnProperty()
layout: post
date: '2020-11-03 14:47:00'
categories:
- js
---

## Object.prototype.hasOwnProperty()

`hasOwnProperty()` 메소드는 객체가 특정 프로퍼티를 가지고 있는지를  나타내는 불리언 값을 반환한다.

```javascript
const object1 = {};
object1.property1 = 42;

console.log(object1.hasOwnProperty('property1'));
// expected output: true

console.log(object1.hasOwnProperty('toString'));
// expected output: false

console.log(object1.hasOwnProperty('hasOwnProperty'));
// expected output: false
```

## 구문

```text
obj.hasOwnProperty(prop)
```

## 매개변수

* prop : 테스트하려는 프로퍼티의 명칭

## 설명

모든 객체는 `hasOwnProperty` 를 상속하는 `Object`의 자식이다.  
이 메소드는 객체가 특정 프로퍼티를 자기만의 직접적인 프로퍼티로서 소유하고 있는지를 판단하는데 사용된다.   
`in` 연산과는 다르게, 이 메소드는 객체의 프로토타입 체인을 확인하지는 않는다.

## 예제

### 프로퍼티의 존재 여부를 테스트하기 위한 hasOwnProperty의 사용

다음은 o 객체가 prop라는 명칭을 지닌 프로퍼티를 포함하는지를 판단하는 예제이다.

```javascript
o = new Object();
o.prop = 'exists';

function changeO() {
  o.newprop = o.prop;
  delete o.prop;
}

o.hasOwnProperty('prop');   // returns true
changeO();
o.hasOwnProperty('prop');   // returns false
```

### 직접 프로퍼티와 상속된 프로퍼티의 비교

다음은 직접 프로퍼티와 프로토타입 체인에서 상속된 프로퍼티 간의 차이점을 비교하는 예제이다.

```javascript
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // returns true
o.hasOwnProperty('toString');         // returns false
o.hasOwnProperty('hasOwnProperty');   // returns false
```

### 객체의 프로퍼티들을 순환하기

다음 예제는 상속 속성을 실행하지 않고 객체의 속성을 반복하는 방법을 보여줍니다.  
`for ... in` 루프는 이미 열거 가능한 항목만 반복하고 있으므로 `hasOwnProperty` 자체가 열거 가능한 항목에 엄격하게 제한되어 있다고 
루프에 표시된 열거 할 수없는 속성이 부족하다고 가정해서는 안됩니다  
(Object.getOwnPropertyNames (와 마찬가지로).

```javascript
var buz = {
  fog: 'stack'
};

for (var name in buz) {
  if (buz.hasOwnProperty(name)) {
    console.log('this is fog (' + name + ') for sure. Value: ' + buz[name]);
  }
  else {
    console.log(name); // toString or something else
  }
}
```

### 프로퍼티의 명칭으로서 hasOwnProperty 를 사용하기

```javascript
var foo = {
  hasOwnProperty: function() {
    return false;
  },
  bar: 'Here be dragons'
};

foo.hasOwnProperty('bar'); // always returns false

// Use another Object's hasOwnProperty and call it with 'this' set to foo
({}).hasOwnProperty.call(foo, 'bar'); // true

// It's also possible to use the hasOwnProperty property from the Object prototype for this purpose
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
```