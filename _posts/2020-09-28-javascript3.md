---
title: 3. Value Types and Reference Types (값 유형 및 참조 유형)
layout: post
date: '2020-09-28 15:59:00'
categories:
- js
---

## 3. Value Types and Reference Types (값 유형 및 참조 유형)

최근에 JavaScript 에서 **"참조에 의한 전달(pass by reference)" 개념**이 작동하는 방식에 대해 약간의 혼란이있었습니다.  
C 및 Java와 같은 언어에서 "참조로 전달(pass by reference)"및 "값으로 전달(pass by value)"이라는 개념을 알고 있었지만 JavaScript에서 어떻게 작동하는지 확신 할 수 없었습니다.

JavaScript 에서 원시값이 아닌 값(non-primitive values)에 할당 된 변수에 해당 값에 대한 참조가 제공된다는 사실을 알고 계셨습니까?  
참조는 값이 저장되는 메모리 위치를 가리킵니다.

```javascript
var arr1 = [1,2,3];

var arr2 = arr1;

arr2.push(10);

console.log(arr2);
//[1, 2, 3, 10]

console.log(arr1);
//[1, 2, 3, 10]
```

위의 예에서 볼 수 있듯이 arr2에 대한 모든 수정 사항은 arr1에도 반영됩니다.  
이는 실제 값 자체가 아니라 값에 대한 참조만 보유하기 때문입니다.  

이 값 유형 및 참조 유형 개념을 이해하면 변수가 값 및 메모리 참조와 함께 할당되는 방법을 더 잘 이해할 수 있습니다.