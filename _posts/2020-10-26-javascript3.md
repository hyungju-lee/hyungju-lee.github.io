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

`this`를 화살표 함수와 함께 사용하는 것은 `this`를 다른 종류의 JavaScript 함수와 함께 사용하는 것과는 상당히 다릅니다.  
화살표 함수는 자체 실행 컨텍스트가 있으므로 둘러싸는 실행 컨텍스트에서 `this` 값을 사용합니다.  

화살표 함수는 `this` 값을 영구적으로 캡처하여 나중에 **apply**하거나 **call**하지 못하도록합니다.

`this`가 화살표 함수와 관련하여 어떻게 작동하는지 설명하기 위해 아래 표시된 화살표 함수를 작성해 보겠습니다.

```javascript
const batman = this;
const bruce = () => {
  console.log(this === batman);
};
bruce();
```

![](/static/img/script/image162.jpg)

여기서는 `this`의 값을 변수에 저장하고 그 값을 화살표 함수 안에있는 `this` 값과 비교합니다.  
터미널에서 index.js 노드를 실행하면 true가 출력됩니다.

화살표 함수의 `this` 값은 명시적으로 설정할 수 없습니다.  
또한 화살표 함수는 call, apply 및 bind와 같은 메서드를 사용하여 값을 `this`에 전달하려는 시도를 무시합니다.  
**화살표 함수는 화살표 함수가 생성 될 때 설정된 `this` 값을 참조합니다.**

![](/static/img/script/image163.jpg)

화살표 함수도 생성자로 사용할 수 없습니다.  
따라서 화살표 함수 내에서 `this`에 속성을 할당 할 수 없습니다.

그렇다면 화살 기능은 `this`와 관련하여 무엇을 할 수 있습니까?

화살표 함수는 콜백 내에서 `this`에 액세스하는 데 도움이 될 수 있습니다.  
이것이 어떻게 수행되는지 설명하기 위해.  
아래에 작성한 **counter** 개체를 살펴보십시오.

```javascript
const counter = {
  count: 0,
  increase() {
    setInterval(function() {
      console.log(++this.count);
    }, 1000);
  }
}
counter.increase();
```

![](/static/img/script/image164.jpg)

index.js 노드를 사용하여이 코드를 실행하면 NaN 값만 반환됩니다.  
이것은 this.count가 **counter** 개체를 참조하지 않기 때문입니다.  
실제로 전역(global) 개체를 참조합니다.

이 카운터가 작동하도록하려면 화살표 기능을 사용하여 다시 작성합니다.

```javascript
const counter = {
  count: 0,
  increase () {
    setInterval (() => {
      console.log (++this.count);
    }, 1000);
  },
};
counter.increase ();
```

![](/static/img/script/image165.jpg)

콜백은 이제 증가 메서드에서 `this` 바인딩을 사용하며 counter 는 이제 정상적으로 작동합니다.

>참고 : ++this.count 대신 this.count + 1을 작성하지 마십시오.  
>이 두 가지 중 전자는 count 값을 한 번만 증가시키고 각 반복마다 해당 값을 반환합니다.

![](/static/img/script/image166.jpg)
![](/static/img/script/image167.jpg)
![](/static/img/script/image168.jpg)
![](/static/img/script/image169.jpg)
![](/static/img/script/image170.jpg)

## "this" in Classes

**Classes**는 JavaScript 앱에서 가장 중요한 부분 중 하나입니다.  
`this`가 클래스 내에서 어떻게 작동하는지 봅시다.

일반적으로 클래스에는 생성자(constructor)가 포함됩니다.  
이 생성자로 만들어진 개체를 `this`가 참조합니다.

그러나 메서드의 경우 메서드가 일반 함수로 호출되면 `this`는 다른 값을 참조 할 수도 있습니다.  
메서드와 마찬가지로 클래스도 수신자를 추적하지 못할 수 있습니다.

앞서 클래스로 보았던 Hero 함수를 다시 만들어 보겠습니다.  
이 클래스에는 생성자와 **dialog()** 메서드가 포함됩니다.  
마지막으로이 클래스의 인스턴스(개체)를 만들고 dialog 메서드를 호출합니다.

```javascript
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }
  dialogue() {
    console.log(`I am ${this.heroName}`)
  }
}
const batman = new Hero("Batman");
batman.dialogue();
```

![](/static/img/script/image171.jpg)

**constructor** 내부의 `this`는 해당 class 의 새로 생성된 인스턴스(개체)를 나타냅니다.  
batman.dialogue()를 호출 할 때, 우리는 batman 을 수신자로하는 메소드로 dialog()를 호출합니다.

그러나 dialog() 메서드에 대한 참조를 저장하고 나중에 이를 함수로 호출하면 다시 한 번 메서드의 수신자를 잃고`this` 인수는 이제 'undefined'를 참조합니다.

```javascript
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }
  dialogue() {
    console.log(`I am ${this.heroName}`)
  }
}
const batman = new Hero("Batman");

const say = batman.dialogue;
say();
```

![](/static/img/script/image172.jpg)

오류의 이유는 JavaScript 클래스가 암시 적으로 엄격 모드에 있기 때문입니다.  
자동 바인딩없이 say()를 함수로 호출합니다.  
이 문제를 해결하려면이 dialog () 함수를`batman`에 연결하기 위해 수동으로 bind()해야합니다.

```javascript
const say = batman.dialogue.bind(batman);
say();
```

생성자 메서드 내에서 이 바인딩을 수행 할 수도 있습니다.

## 요약

우리는 영어로 대명사를 사용하는 것처럼 JavaScript 에서 `this`를 사용해야합니다.  
이 두 문장을 봅시다.

* Rajat는 DC Comics를 좋아합니다.
* Rajat는 또한 Marvel 영화를 좋아합니다.

우리는이 두 문장을 결합하기 위해 대명사를 사용합니다.  
이제 이 두 문장은

>Rajat loves DC Comics, and **he** also loves Marvel Comics

이 짧은 문법 수업은 JavaScript 에서 `this`의 중요성을 완벽하게 설명합니다.  
대명사가 두 문장을 연결하는 것과 마찬가지로 `this`는 같은 것을 다시 언급하는 지름길 역할을합니다.

이 게시물이 JavaScript에서 `this` 문제에 대한 혼란을 해결하는 데 도움이 되었기를 바랍니다.  
이제 JavaScript 코드에서이 간단하지만 매우 중요한 키워드를 어디서 어떻게 사용하는지 알아보십시오.

![](/static/img/script/image176.jpg)
