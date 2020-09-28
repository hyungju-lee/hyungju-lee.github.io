---
title: 4. Type Coercion (유형 강제 일치)
layout: post
date: '2020-09-28 16:05:00'
categories:
- js
---

## 4. Type Coercion (유형 강제 일치)

이 개념은 주로 암시적 유형과 명시적 유형 강제의 차이점을 설명합니다.  
이것은 사람들이 일을 잘못 이해하고있는 JavaScript의 몇 안되는 영역 중 하나입니다.  
이것은 다른 데이터 유형에 대해 다른 방식으로 작동하기 때문에 암시적 유형 강제의 개념에서 특히 그렇습니다.

이것은 인터뷰에서 가장 일반적으로 테스트되는 JavaScript 영역 중 하나입니다.

```javascript
Number('789')   // explicit
+'789'          // implicit
789 != '456'    // implicit
9 > '5'         // implicit
10/null          // implicit
true | 0        // implicit
```

유형 강제를 명확하게 이해하면 JavaScript의 가장 까다로운 개념 중 하나를 잘 이해하고 있다는 사실에 만족할 수 있습니다.