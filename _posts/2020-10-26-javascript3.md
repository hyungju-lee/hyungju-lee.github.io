---
title: What is "this" in JavaScript?
layout: post
date: '2020-10-26 23:23:00'
categories:
- js
---

## What is "this" in JavaScript?

JavaScript 라이브러리를 사용하여 무언가를 만들고 있다면 `this`라는 특정 키워드를 발견했을 것입니다.  
`this`는 자바스크립트에서 매우 흔한 일이지만, 이 키워드가 정확히 무엇을하고 코드에서 어디에 사용해야하는지 완전히 이해하는 데 상당한 시간을 투자 한 개발자가 꽤 있습니다.  
이 포스트에서 나는 당신이 이`this`와 그 메커니즘을 깊이 이해하도록 도울 것입니다.  
들어가기 전에 시스템에 Node가 설치되어 있는지 확인하십시오.  
그런 다음 명령 터미널을 열고 node 명령을 실행하십시오.

## "this" in Global Environment (전역 환경에서 this)

`this`의 작동 메커니즘이 항상 이해하기 쉬운 것은 아닙니다.  
`this`가 어떻게 작동하는지 이해하기 위해 우리는 다른 환경에서 이것을 살펴볼 것입니다.  
먼저 global 환경부터 살펴 보겠습니다.  
전역 수준에서 `this`은 global 이라는 전역 개체와 동일합니다.

```node
> this === global
true
```

그러나 이것은 노드 내부에서만 사실입니다.  
JavaScript 파일 내에서 동일한 코드를 실행하려고하면 출력이 false로 표시됩니다.

이를 테스트하려면 다음 코드가 포함 된 index.js라는 파일을 만듭니다.

```javascript
console.log(this === global);
```

그런 다음 node 명령을 사용하여이 파일을 실행합니다.

```node
$ node index.js
false
```

그 이유는 JavaScript 파일 내에서 `this`는 전역이 아닌 module.exports와 동일하기 때문입니다.

![](/static/img/script/image147.jpg)

## "this" inside Functions (함수 안에서 this)

함수 내부의 `this` 값은 일반적으로 함수 호출에 의해 정의됩니다.  
따라서 `this`는 함수를 실행할 때마다 다른 값을 가질 수 있습니다.

index.js 파일에서 `this`가 전역 객체와 같은지 확인하는 매우 간단한 함수를 작성하십시오.

```javascript
function rajat() {
  console.log(this === global)
}
rajat()
```

![](/static/img/script/image148.jpg)

노드를 사용하여이 코드를 실행하면 `this` 값의 출력이 true 로 표시됩니다.  
그러나 파일 맨 위에 "use strict"를 추가하고 다시 실행하면이 `this` 값이 정의되지 않았기 때문에 잘못된 출력을 얻게됩니다.

![](/static/img/script/image149.jpg)

더 자세히 설명하기 위해 슈퍼 히어로의 실명과 영웅 이름을 정의하는 간단한 함수를 만들어 보겠습니다.

```javascript
function Hero(heroName, realName) {
  this.realName = realName;
  this.heroName = heroName;
}
const superman = Hero("Superman", "Clark Kent");
console.log(superman);
```

이 함수는 **엄격 모드**로 작성되지 않았습니다.  
노드에서이 코드를 실행하면 예상대로 "Superman"과 "Clark Kent"의 값을 얻지 못하지만 대신 정의되지 않은 값만 제공합니다.  

![](/static/img/script/image150.jpg)

**그 이유는 함수가 엄격 모드로 작성되지 않았기 때문에 `this`가 전역 객체를 참조하기 때문입니다.**

**엄격 모드에서이 코드를 실행하면 JavaScript가 속성 realName 및 heroName을 undefined에 할당하는 것을 허용하지 않기 때문에 오류가 발생합니다.**  
**이것은 우리가 전역 변수를 생성하는 것을 막기 때문에 실제로 좋은 것입니다.**

![](/static/img/script/image151.jpg)

마지막으로 함수 이름을 대문자로 작성한다는 것은 **new** 연산자를 사용하여 생성자로 호출해야 함을 의미합니다.  
위 코드 조각의 마지막 두 줄을 다음으로 바꿉니다.

```javascript
function Hero(heroName, realName) {
  this.realName = realName;
  this.heroName = heroName;
}
const superman = new Hero("Superman", "Clark Kent");
console.log(superman);
```

node index.js 명령을 다시 실행하면 이제 예상 출력이 표시됩니다.

![](/static/img/script/image152.jpg)
![](/static/img/script/image153.jpg)

## "this" inside constructors (생성자 내부의 this)

JavaScript에는 특별한 생성자 함수가 없습니다.  
우리가 할 수있는 일은 위의 섹션에 표시된대로 **new** 연산자를 사용하여 함수 호출을 생성자 호출로 변환하는 것입니다.

생성자가 호출되면 새 객체가 생성되고 함수의 `this` 인수로 설정됩니다.  
객체는 명시 적으로 반환되는 다른 객체가없는 한 함수에서 암시 적으로 반환됩니다.

hero 함수 내부에 다음 return 문을 작성합니다.

```javascript
function Hero(heroName, realName) {
  return {
    heroName: "Batman",
    realName: "Bruce Wayne",
  };
}
const superman = new Hero("Superman", "Clark Kent");
console.log(superman);
```

**지금 node 명령을 실행하면 위의 return 문이 생성자 호출을 덮어 쓰는 것을 볼 수 있습니다.**

![](/static/img/script/image154.jpg)
![](/static/img/script/image155.jpg)

return 문이 생성자 호출을 덮어 쓰지 않는 유일한 시나리오는 return 문이 객체가 아닌 항목을 반환하려고하는 경우입니다.  
이 경우 개체에는 원래 값이 포함됩니다.

## "this" in Methods (메소드에서의 this)

객체의 메서드로 함수를 호출 할 때 `this`는 객체를 참조하며 이를 함수 호출의 수신자라고합니다.  

여기에 hero 라는 개체 내부에 메서드 dialogue 가 있습니다.  
dialogue 의 `this` 값은 hero 자체를 나타냅니다.  
따라서 여기의 hero 는 dialogue 메서드 호출의 수신자로 알고 있습니다.

```javascript
const hero = {
  heroName: "Batman",
  dialogue() {
    console.log(`I am ${this.heroName}!`);
  }
};
hero.dialogue();
```

이것은 매우 단순한 예입니다.  
그러나 실제 사례에서는 우리의 방법이 수신기를 추적하는 것이 매우 어려울 수 있습니다.  
index.js 끝에 다음 스니펫을 작성하십시오.

```javascript
const hero = {
  heroName: "Batman",
  dialogue() {
    console.log(`I am ${this.heroName}!`);
  }
};
hero.dialogue();

const saying = hero.dialogue;
saying();
```

![](/static/img/script/image156.jpg)

여기서는 다른 변수 안에 Dialogue에 대한 참조를 저장하고 변수를 함수로 호출합니다.  
노드로 이것을 실행하면 메서드가 수신자를 추적하지 않았기 때문에 undefined 값을 반환하는 것을 볼 수 있습니다.  
이것은 이제 hero 대신 global 을 나타냅니다.

**수신자 손실**은 일반적으로 메서드를 콜백으로 다른 메서드에 전달할 때 발생합니다.  
래퍼 함수를 추가하거나 **bind 메서드**를 사용하여 `this`를 특정 개체에 연결하여이 문제를 해결할 수 있습니다.

## call() and apply()

함수의 `this` 값은 암시적으로 설정되지만 명시적으로 `this` 인수 **call()** 및 **apply()**를 사용하여 함수를 호출 할 수도 있습니다.

**이전 섹션 코드 스니펫을 다음과 같이 재구성 해 보겠습니다.**

```javascript
function dialogue () {
  console.log (`I am ${this.heroName}`);
}
const hero = {
  heroName: 'Batman',
};
```

Dialogue 함수를 리시버 역할을하는 hero 객체와 연결해야합니다.  
이를 위해 다음과 같이 call () 또는 apply ()를 사용할 수 있습니다.

```javascript
dialogue.call(hero)
// or
dialogue.apply(hero)
```

![](/static/img/script/image157.jpg)
![](/static/img/script/image158.jpg)

그러나 엄격 모드를 사용 안한채 call() 을 사용하거나 apply() 사용해 **null** 또는 **undefined**를 보내는 경우 JavaScript 엔진에의해 무시됩니다.  
이것이 일반적으로 엄격 모드에서 항상 코드를 작성하는 것이 권장되는 이유 중 하나입니다.

```javascript
function dialogue () {
    console.log (`I am ${this.heroName}`);
}
const hero = {
    heroName: 'Batman',
};

dialogue.call(undefined)
// I am undefined : node로 실행했을 때
```

```javascript
function dialogue () {
    console.log (`I am ${this.heroName}`);
}
const hero = {
    heroName: 'Batman',
};

dialogue.call(null)
// I am undefined : node로 실행했을 때
```

```javascript
function dialogue () {
    console.log (`I am ${this.heroName}`);
}
const hero = {
    heroName: 'Batman',
};

dialogue.apply(undefined)
// I am undefined : node로 실행했을 때
```

```javascript
function dialogue () {
    console.log (`I am ${this.heroName}`);
}
const hero = {
    heroName: 'Batman',
};

dialogue.apply(null)
// I am undefined : node로 실행했을 때
```

![](/static/img/script/image159.jpg)

위는 엄격모드를 권장하는 이유이다.

## bind()

메서드를 콜백으로 다른 함수에 전달할 때 항상 메서드의 의도된 수신자를 잃을 위험이 있습니다.  
대신 `this` 인수를 전역 개체로 설정합니다.

**bind()** 메서드를 사용하면 `this` 인수를 값에 영구적으로 연결할 수 있습니다.  
따라서 아래 코드 스니펫에서 bind는 새 Dialogue 함수를 만들고 `this` 값을 hero로 설정합니다.

```javascript
const hero = {
  heroName: "Batman",
  dialogue() {
    console.log(`I am ${this.heroName}`);
  }
};
setTimeOut(hero.dialogue.bind(hero), 1000);
```

![](/static/img/script/image160.jpg)
![](/static/img/script/image161.jpg)

이렇게하면 **call** 또는 **apply** 메소드로도 `this`를 변경할 수 없습니다.

## Catching "this" inside an Arrow Function (Arrow 함수 내에서 "this"잡기)


https://blog.bitsrc.io/what-is-this-in-javascript-3b03480514a7


https://blog.bitsrc.io/npm-tips-and-tricks-24c5e9defea6  
https://blog.bitsrc.io/11-javascript-and-typescript-shorthands-you-should-know-690a002674e0  
https://blog.bitsrc.io/a-better-way-to-share-code-between-your-node-js-projects-af6fbadc3102  
https://blog.bitsrc.io/10-super-useful-tricks-for-javascript-developers-f1b76691199b  
https://blog.bitsrc.io/14-javascript-code-optimization-tips-for-front-end-developers-a44763d3a0da  
https://blog.bitsrc.io/understanding-weakmaps-in-javascript-6e323d9eec81  
https://medium.com/the-front-journal/javascript-advanced-oop-306ac82f9f29  