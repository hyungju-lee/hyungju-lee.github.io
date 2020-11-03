---
title: Object.prototype
layout: post
date: '2020-11-03 15:13:00'
categories:
- js
---

## Object.prototype

`Object.prototype` 속성은 `Object` 프로토타입(원형) 객체를 나타냅니다.

## 설명

JavaScript에서 거의 모든 객체는 `Object`의 인스턴스입니다.  
**일반적인 객체는 `Object.prototype` 에서 속성과 메서드를 상속받으며, 그 중 일부는 (오버라이드 등으로 인해) 숨겨질 수 있습니다.**  
그러나, 의도적으로 `Object`를 생성할 때 (`Object.create(null)` 처럼) 이를 피할 수도 있고, `Object.setPrototypeOf` 등을 통해 나중에 무효화할 수도 있습니다.

`Object` 프로토타입에 가하는 변경은 프로토타입 체인을 통해, 더 아래쪽 체인에서 덮어 쓴 경우가 아니라면 **모든** 객체에서 관측할 수 있습니다.  
이는 객체를 확장하거나 행동을 바꿀 수 있는 매우 강력하면서도 위험한 방법을 제공합니다.

## 속성

* Object.prototype.constructor : 객체의 프로토타입을 생성하는 함수를 지정합니다.
* Object.prototype.__proto__ : 객체가 초기화될 때 프로토타입으로 사용된 객체를 가리킵니다.

## 메서드

* [mdn 참고](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype){:target="_blank"}

## 예제

`Object.prototype`의 기본 메서드를 변경할 때, 기존 조직의 앞 또는 후에 확장(extension) 을 포장하여 코드를 주입시키는 것을 고려하자.  
예를 들어서, 이 (시험받지 않은) 코드는 내장된 로직 또는 어떤 다른 확장이 실행되기 전에 커스텀 로직을 전제조건적으로 실행시킬 것이다.

함수가 호출되었을 때, 불러온 매개변수들은 배열과 같은 형태로 '변수' `arguments`에 보관된다.  
예를 들어 myFn(a, b, c) 라는 함수를 부를 때, 이 함수 내부에 배열형태로 매개변수 (a, b, c) 를 담게 된다.  
prototype을 훅을 이용해 수정할 때, 함수에서 apply()를 호출하여 단순하게 this와 arguments(호출 상태)에 현재 동작을 전달하면 된다.  
이 패턴은 Node.prototype, Function.prototype등 prototype에도 사용할 수 있다.

```javascript
var current = Object.prototype.valueOf;

// 현재 설정한 "-prop-value" 속성은 cross-cutting 이고 
// 항상 같은 prototype chain이 아니기 때문에, 이 Object.prototype을 바꾸고 싶다.
Object.prototype.valueOf = function() {
  if (this.hasOwnProperty('-prop-value')) {
    return this['-prop-value'];
  } else {
    // 이 객체 내 속성(property)이 하나가 아니라면, 현재 동작을 재구성한 것으로부터
    // 기본 동작으로 되돌리자(복구). 
    // apply 동작은 다른 언어에서의 "super"와 유사하다.
    // 비록 valueOf()가 매개변수를 받지못하더라도, 다른 훅에서 있을 것이다.
    return current.apply(this, arguments);
  }
}
```

JavaScript는 엄밀히 말해서 하위클래스(sub-class) 객체가 없기에, prototype은 객체 역할을 하는 특정 함수의 "기반 클래스" 객체를 만드는 유용한 차선책입니다.  

예를 들어:

```javascript
var Person = function() {
  this.canTalk = true;
};

Person.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name);
  }
};

var Employee = function(name, title) {
  Person.call(this);
  this.name = name;
  this.title = title;
};

Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.greet = function() {
  if (this.canTalk) {
    console.log('Hi, I am ' + this.name + ', the ' + this.title);
  }
};

var Customer = function(name) {
  Person.call(this);
  this.name = name;
};

Customer.prototype = Object.create(Person.prototype);
Customer.prototype.constructor = Customer;

var Mime = function(name) {
  Person.call(this);
  this.name = name;
  this.canTalk = false;
};

Mime.prototype = Object.create(Person.prototype);
Mime.prototype.constructor = Mime;

var bob = new Employee('Bob', 'Builder');
var joe = new Customer('Joe');
var rg = new Employee('Red Green', 'Handyman');
var mike = new Customer('Mike');
var mime = new Mime('Mime');

bob.greet();
// Hi, I am Bob, the Builder

joe.greet();
// Hi, I am Joe

rg.greet();
// Hi, I am Red Green, the Handyman

mike.greet();
// Hi, I am Mike

mime.greet();
```