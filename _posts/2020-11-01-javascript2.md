---
title: JavaScript 개발자를위한 10 가지 유용한 트릭
layout: post
date: '2020-11-01 17:30:00'
categories:
- js
---

## JavaScript 개발자를위한 10 가지 유용한 트릭

### 당신이 놓쳤을지도 모르는 유횽한 자바스크립트 트릭

우리 모두 알고 있듯이 자바스크립트는 빠르게 변화하고 있습니다.  
새로운 ES2020에서는 체크아웃하고 싶을 수 있는 많은 멋진 기능이 도입되었습니다.  
솔직히 말해서 특정 기능을 만들 때 다양한 방법으로 코드를 작성할 수 있습니다.  
그렇지만 그런 다양한 방법 중에서 지금 알려드릴 트릭들은 더 짧고 훨씬 더 명확합니다.  
몇 가지 작은 트릭을 사용하여 코드를 더 깨끗하고 명확하게 만들 수 있습니다.  
다음은 언젠가 확실히 도움이될 자바스크립트 개발자를 위한 유용한 트릭목록입니다.

## 1. 메서드 매개 변수 유효성 검사

자바스크립트를 사용하면 매개변수의 **기본값**을 설정할 수 있습니다.  
이를 사용하여 메서드 매개 변수를 검증하는 깔끔한 트릭을 구현할 수 있습니다.

```javascript
const isRequired = () => { throw new Error('param is required'); };
const print = (num = isRequired()) => { console.log(`printing ${num}`) };
print(2);//printing 2
print()// error
print(null)//printing null
```

깔끔하지 않나요?

## 2. JSON 코드 형식

지금 쯤이면 `JSON.stringify`에 익숙 할 것입니다.  
그러나 `stringify`를 사용하여 출력 형식을 지정할 수 있다는 것을 알고 있습니까?  
사실 아주 간단합니다.

`stringify` 메서드는 세 가지 입력을받습니다.  
`value`, `replacer` 및 `space`입니다.  
후자의 두 가지는 선택적 매개 변수입니다.  
그것이 우리가 이전에 사용하지 않은 이유입니다.  
JSON을 들여 쓰려면 space 매개 변수를 사용해야합니다.

```javascript
console.log(JSON.stringify({name:"John",Age:23},null,'\t'));
>>> 
{
 "name": "John",
 "Age": 23
}
```

다음은 제가 Bit에 게시 한 React 컴포넌트입니다.  
[stringify 예제](https://bit.dev/eden/stringify-components/display-results){:target="_blank"}를 자유롭게 사용하십시오.

## 3. 배열에서 고유 한 값 얻기

배열에서 고유 한 값을 가져 오려면 필터 방법을 사용하여 반복되는 값을 필터링해야했습니다.  
그러나 새로운 `Set native` 객체를 사용하면 작업이 정말 매끄럽고 쉽습니다.

```javascript
let uniqueArray = [...new Set([1, 2, 3, 3,3,"school","school",'ball',false,false,true,true])];
>>> [1, 2, 3, "school", "ball", false, true]
```

## 4. 배열에서 거짓 값 제거

배열에서 잘못된 값을 제거하려는 경우가있을 수 있습니다.  
거짓 값은 FALSE로 평가되는 JavaScript의 값입니다.  
JavaScript에는 허위 값이 6 개 밖에 없습니다.

1. undefined
2. null
3. NaN
4. 0
5. "" (empty string)
6. false

이러한 잘못된 값을 필터링하는 가장 쉬운 방법은 아래 함수를 사용하는 것입니다.

```javascript
myArray
    .filter(Boolean);
```

어레이를 일부 수정 한 다음 새 어레이를 필터링하려면 다음과 같이 시도 할 수 있습니다.  
**원래 myArray는 변경되지 않습니다.**

```javascript
myArray
    .map(item => {
        // Do your changes and return the new item
    })
    .filter(Boolean);
```

## 5. 여러 개체를 함께 병합

두 개 이상의 클래스를 병합해야하는 경우가 여러 번 있었는데, 이것이 바로 내 접근 방식이었습니다.

```javascript
const user = { 
    name: 'John Ludwig', 
    gender: 'Male' 
};
const college = { 
    primary: 'Mani Primary School', 
    secondary: 'Lass Secondary School' 
};
const skills = { 
    programming: 'Extreme', 
    swimming: 'Average', 
    sleeping: 'Pro' 
};
const summary = {...user, ...college, ...skills};
```

세 개의 점은 JavaScript에서 스프레드 연산자라고도합니다.  
[여기](https://medium.com/better-programming/5-uses-of-the-es6-spread-operator-ef90bdff4d56){:target="_blank"}에서 더 많은 용도를 읽을 수 있습니다.

## 6. 숫자 배열 정렬

자바스크립트 배열에는 내장 정렬 방법이 있습니다.  
이 정렬 방법은 배열 요소를 문자열로 변환하고 기본적으로 사전 정렬을 수행합니다.  
이로 인해 숫자 배열을 정렬 할 때 문제가 발생할 수 있습니다.  
따라서 여기에이 문제를 극복 할 수있는 간단한 해결책이 있습니다.

```javascript
[0,10,4,9,123,54,1].sort((a,b) => a-b);
>>> [0, 1, 4, 9, 10, 54, 123]
```

숫자 배열의 두 요소를 정렬 방법과 비교하는 함수를 제공하고 있습니다.  
이 기능은 올바른 출력을 수신하는 데 도움이됩니다.

## 7. 오른쪽 클릭 비활성화

사용자가 웹 페이지를 마우스 오른쪽 버튼으로 클릭하지 못하도록 할 수 있습니다.  
매우 드물지만이 기능이 필요한 경우가 여러 개있을 수 있습니다.

```html
<body oncontextmenu="return false">
    <div></div>
</body>
```

이 간단한 스니펫은 사용자의 오른쪽 클릭을 비활성화합니다.

## 8. 별칭으로 구조 해제 (해체 할당)

비 구조화 할당 구문은 배열의 값 또는 객체의 속성을 별개의 변수로 압축 해제 할 수있는 JavaScript 표현식입니다.  
기존 개체 변수를 고수하는 대신 원하는대로 이름을 바꿀 수 있습니다.

```javascript
const object = { number: 10 };
// Grabbing number
const { number } = object;
// Grabbing number and renaming it as otherNumber
const { number: otherNumber } = object;
console.log(otherNumber); //10
```

## 9. 배열의 마지막 항목 가져 오기

배열의 끝에서 요소를 가져 오려면 음의 정수와 함께 `slice` 메서드를 사용할 수 있습니다.

```javascript
let array = [0, 1, 2, 3, 4, 5, 6, 7] 
console.log(array.slice(-1));
>>>[7]
console.log(array.slice(-2));
>>>[6, 7]
console.log(array.slice(-3));
>>>[5, 6, 7]
```

## 10. 약속(Promises)이 완료 될 때까지 기다리십시오

몇 가지 약속이 끝날 때까지 기다려야하는 경우가있을 수 있습니다.  
Promise.all을 사용하여 약속을 병렬로 실행할 수 있습니다.

>참고 : Promise는 단일 코어 CPU에서 동시에 실행되고 다중 코어 CPU에서 병렬로 실행됩니다.  
>주된 임무는 전달 된 모든 약속이 해결 될 때까지 기다리는 것입니다.

```javascript
const PromiseArray = [
    Promise.resolve(100),
    Promise.reject(null),
    Promise.resolve("Data release"),
    Promise.reject(new Error('Something went wrong'))
];
Promise.all(PromiseArray)
  .then(data => console.log('all resolved! here are the resolve values:', data))
  .catch(err => console.log('got rejected! reason:', err))
```

`Promise.all`에 대해 주목해야 할 한 가지 중요한 점은 **Promise 중 하나가 거부 될 때 메서드에서 오류가 발생한다는 것**입니다.  
이것은 모든 Promise가 완료 될 때까지 코드가 기다리지 않음을 의미합니다.

거부 또는 해결 여부에 관계없이 모든 약속이 완료 될 때까지 기다리려면 `Promise.allSettled`를 사용할 수 있습니다.  
**이 방법은 ES2020의 최종 버전에 있습니다.**

```javascript
const PromiseArray = [
    Promise.resolve(100),
    Promise.reject(null),
    Promise.resolve("Data release"),
    Promise.reject(new Error('Something went wrong'))
];
Promise.allSettled(PromiseArray).then(res =>{
console.log(res);
}).catch(err => console.log(err));
//[
//{status: "fulfilled", value: 100},
//{status: "rejected", reason: null},
//{status: "fulfilled", value: "Data release"},
//{status: "rejected", reason: Error: Something went wrong ...}
//]
```

일부 약속이 거부 되었더라도 `Promise.allSettled`는 모든 약속의 결과를 반환합니다.