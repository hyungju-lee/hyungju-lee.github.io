---
title: 자바스크립트 물음표, 물음표 두개 연산자의 정체
layout: post
date: '2020-10-11 10:51:00'
categories:
- js
---

## 자바스크립트 물음표, 물음표 두개 연산자의 정체

```javascript
const objects = {
    apple: {
        number: 3
    }
};

const numberOfBanana = objects.banana?.number ?? 0;
const numberOfapple = objects.apple?.number ?? 0;
console.log(numberOfBanana); // 0
console.log(numberOfapple); // 3
```

## Optional chaning operator, ?. 연산자

objects.banana와 number 사이에 있는 구문의 이름은 **optional chaning 연산자**다.  
이 연산자는 null이나 undefined와 같은 빈 값에 대한 예외처리를 자동화해준다.  
정확히는, 객체가 **undefined 또는 null일 때** 연산의 결과 대신 **undefined를 반환**한다.  
위 코드를 보면 objects.banana는 존재하지 않는데도 이 연산자를 이용해서 number라는 속성에 아무 문제 없이 접근하는 것 처럼 보인다.  
하지만 실제로는 objects.banana?.number는 이 연산자에 의해서 undefined라는 값을 가질 뿐이다. 즉, 다음과 같이 작동한다.

```javascript
const objects = {
    apple: {
        number: 3
    }
};

const numberOfBanana = (
    (objects.banana === undefined || objects.banana === null)
    ?
        undefined
    :
        objects.banana.number
) ?? 0;
console.log(numberOfBanana);
```

위와 같은 방법 외에도 다음과 같은 방법들로 위 연산자를 사용할 수 있다. 함수 호출에서도 사용할 수 있다.

* obj?.prop
* obj?.[expr]
* arr?.[index]
* func?.(args)

## Nullish coalescing operator, ?? 연산자

물음표 두개, 그것이 nullish coalescing 연산자다.  
numberOfBanana의 값이 0인 것을 보고 이미 이 연산자의 정체를 알았을 수도 있겠다.  
맞다. 기본값을 정해주는 연산자다.  
값이 null 또는 undefined인 경우에 기본값을 정해준다.  
이 부분에서 주목해야 할 점은 이 연산자는 OR(||) 연산자와 다르게 null이나 undefined가 아닌 falsy 값(0, ""와 같은 것들)들을 기본값으로 바꾸어 버리지 않는다는 것이다.  
그렇기에 정확하게 "값이 존재하지 않을 때"에 대해 처리할 수 있다. 결과적으로, 위 코드는 다음과 같이 작동한다.

```javascript
const objects = {
    apple: {
        number: 3
    }
};

const numberOfBanana = (() => {
    const temp = (
        (objects.banana === undefined || objects.banana === null)
        ?
            undefined
        :
            objects.banana.number
    );
    return (temp === undefined || temp === null) ? 0 : temp;
})();
console.log(numberOfBanana);
```

코드를 하나하나 풀어보니 상당히 길이가 길어졌다.  
이것으로 이 두 물음표 연산자를 쓸 이유는 충분한 것 같다.  
성능을 위해서든, 예쁜 코드를 위해서든 말이다.  
다만 하나 주의할 점이 있다면, 아직 구현되어가는 중인 기능이라는 것. 그거면 됐다.