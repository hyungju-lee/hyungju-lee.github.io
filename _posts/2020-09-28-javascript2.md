---
title: 2. Primitive Data Types (원시 데이터 유형)
layout: post
date: '2020-09-28 15:49:00'
categories:
- js
---

## 2. Primitive Data Types (원시 데이터 유형)

```javascript
const foo = "bar";
foo.length; // 3
foo === "bar"; // true
```

값 "bar"를 상수 foo에 할당하면 기본 데이터 유형은 문자열입니다.  
이 상수는 전역에서 접근 가능합니다.  
원시 `string`의 `length`는 어떻게 접근할까요?  

이 기능을 `autoboxing`이라고 합니다.  
위의 예에서 자바스크립트는 상수를 임시 래퍼 객체로 래핑한 다음 해당 객체의 길이 속성에 엑세스합니다.  
**이 단계가 완료되면 개체는 안전하게 폐기됩니다.**  

원시 데이터 유형에 대한 깊은 지식을 가지고 있으면 2진 표현 시점까지 메모리에 저장되는 방법을 알 수 있습니다.  
또한 이러한 '이상한' 상황이 어떻게 발생하는지와 그 뒤에있는 논리적 이유를 알 수 있습니다.

