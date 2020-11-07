---
title: 전문가를위한 조건부 JavaScript
layout: post
date: '2020-11-07 02:27:00'
categories:
- js
---

## 전문가를위한 조건부 JavaScript

### 짧은 코드를위한 조건식 숙달

조건문은 모든 프로그래밍 언어의 구문에서 매우 중요한 측면입니다.  
인기있는 언어로 프로그래밍을 해본 적이 있다면 이미 `if..elif..else` 또는 `switch` 조건문에 익숙 할 것입니다.  
프로그램에서 결정을 내리는 데 매우 유용합니다.

예를 들어, Glad (즉, 나) 만 열 수 있도록 보물 상자를 설계했다고 가정 해 보겠습니다.  
이 논리는 다음과 같이 프로그래밍 방식으로 (Python에서) 표현할 수 있습니다.

```python
if person == 'Glad':
  # Open the treasure chest for Glad
  TreasureChest.open()

else:
  # Don't open the chest for any other person
  TreasureChest.ignore()
```

이전 코드 조각은 Python 구문으로 작성되었지만이 문서는 JavaScript에만 적용됩니다.  
그러나 여기에 표시된 대부분의 기술은 몇 가지 다른 프로그래밍 언어에 적용될 수 있습니다.

지금부터이 기사에서는 JavaScript 외에 다른 프로그래밍 언어의 구문으로 작성된 다른 코드 줄을 찾을 수 없음을 약속합니다.

이 기사에서는 JavaScript의 조건식 (논리 연산자 사용)과 이를 사용하여 조건문보다 코드를 더 짧게 만드는 방법에 대해 더 강조합니다.

## Expressions (식) vs Statements (문)

계속하기 전에 JavaScript에서 표현식과 명령문을 구별 할 수 있어야합니다.  
다음은 매우 간단한 비유입니다.

>표현식은 자바스크립트에 어떤 구문이 문법에 해당하는지, 문은 자바스크립트에 어떤 문장이 문법에 해당하는지입니다.

**표현식은 JavaScript 엔진이 값을 생성하기 위해 평가할 수있는 모든 구문입니다.**

>예 : 리터럴, 할당, 함수 표현식, 논리, 비트 또는 산술 연산, 객체 속성 액세스, 함수 호출, 평가 등.

다음 코드 스니펫은 몇 가지 JavaScript 표현식을 보여줍니다.

```javascript
// number literal
0xFF

// array literal
[]

// object literal
{}

// regexp literal
/^\d+$/

// logical AND operation
(x && y)

// bitwise XOR operation
(x ^ y)

// ternary operation
(x ? y : z)

// arithmetic operation
(x + y) / z

// assignment
x = 'string'

// function expression
(function x(y) {})

// function invocation
x(100)

// object property access
obj.students[0].name
```

**문은 자바 스크립트 엔진이 어떤 일을 발생 시키거나 부작용을 일으키기 위해 실행할 수있는 문장이나 명령입니다.**

>예 : 조건, 변수 또는 함수 선언, 루프, throw, return, try / catch / finally 등

할당 및 함수 호출과 같은 일부 JavaScript 표현식에는 부작용이있을 수 있으며 결과적으로 일반적으로 명령문 (표현식 명령문)으로 사용될 수 있습니다.

## Conditions and Booleans (조건 및 부울)

모든 조건부의 중요한 요구 사항은 조건입니다.  
조건은 프로그램에서 내릴 결정을 결정합니다.

JavaScript에서이 **조건**은 유효한 표현식 일 수 있습니다.  
일반적으로이 **조건**식은 복잡하지만 부울이라는 두 값 중 하나 인 true 또는 false로 평가됩니다.

정확하고 예측 가능한 조건부 논리를 작성하려면 JavaScript 엔진이 이러한 조건식을 부울로 변환하는 방법을 올바르게 이해해야합니다.

변환을 이해할 수있는 두 가지 기본 개념은 다음과 같습니다.

* 진실과 거짓 가치 식별
* 논리 연산의 단락 이해

### Truthy vs Falsy

JavaScript의 모든 값은 진실 또는 거짓으로 분류 될 수 있습니다.  
JavaScript의 거짓 값은 다음과 같습니다.

1. `''` or `""` or `` (an empty string)
2. `0` or `-0` (the number 0)
3. `null`
4. `undefined`
5. `NaN`
6. `false`

이 목록의 값을 제외한 다른 모든 값은 진실한 값입니다.  
JavaScript가 부울 값을 기대할 때마다 진실 값은 암시 적으로 true로 강제 변환되고 거짓 값은 암시 적으로 false로 강제 변환됩니다.

그러나 형식 강제 변환에 대해 고의적이거나 명시 적으로하려면 기본 부울 함수를 사용하여 해당 부울 값을 변환 할 수 있습니다.

```javascript
function toBoolean(value) {
  return Boolean(value);
}
```

논리 NOT (!) 연산자를 사용하여 값을 부울로 변환 할 수도 있습니다.  
`!` 연산자는 피연산자를 역 부울 값으로 변환하므로 항상 부울 값으로 평가됩니다.  

`!` 연산자는 진실 값에서 거짓으로 평가되고 거짓 값에서 참으로 평가됩니다.  
값을 해당하는 부울로 변환하려면 `!` 연산자 두 번.

```javascript
function toBoolean(value) {
  return !!value;
}
```

### Short-Circuiting (단락)

AND (`&&`) 및 OR (`||`) 논리 연산자는 모두 두 개의 피연산자가 필요하며 해당 피연산자에 대해 부울 연산을 수행하는 데 사용됩니다.

두 피연산자가 부울 (true 또는 false) 인 경우

* `&&` 연산은 두 피연산자가 모두 참일 때만 참을 반환하고 그렇지 않으면 거짓을 반환합니다.
* `||` 두 피연산자가 모두 거짓 인 경우에만 연산이 거짓을 반환하고 그렇지 않으면 참을 반환합니다.

`&&` 연산자는 `||` 연산자보다 일반적으로 먼저 평가됩니다.  
따라서 표현식에서 함께 사용되는 경우 평가 순서를 변경하기 위해 그룹화에 괄호 (())를 사용할 수 있습니다.  
다음 코드 스니펫을 고려하십시오.

```javascript
false && true || true; // true
false && (true || true); // false
```

>이러한 연산자를 사용할 때 첫 번째 피연산자는 항상 평가됩니다.  
>그러나 두 번째 피연산자는 첫 번째 피연산자를 평가 한 결과에 따라 평가되지 않을 수 있습니다.  
>이 동작을 단락이라고합니다.

`&&` 및 `||` 연산이 항상 부울 값을 생성하는 것은 아닙니다.  
일반적으로 모든 값을 생성 할 수 있습니다.  
다음은 단락을 기반으로 한 동작에 대한 보다 간결한 설명입니다.

* `&&` 연산자는 먼저 첫 번째 피연산자를 평가합니다.  
  결과 값이 사실이면 두 번째 피연산자를 평가하고 해당 값을 반환합니다.  
  그러나 첫 번째 피연산자의 값이 거짓이면 두 번째 피연산자는 평가되지 않고 첫 번째 피연산자의 거짓 값만 반환합니다.
  
    ```javascript
    (a && b) === a; // `a` is falsy
    (a && b) === b; // `a` is truthy
    ```
  
* `||` 연산자는 먼저 첫 번째 피연산자를 평가합니다.  
  결과 값이 진실이면 두 번째 피연산자는 평가되지 않고 첫 번째 피연산자의 진실 값만 반환합니다.  
  그러나 첫 번째 피연산자의 값이 거짓이면 두 번째 피연산자를 평가하고 해당 값을 반환합니다.
  
    ```javascript
    (a || b) === a; // `a` is truthy
    (a || b) === b; // `a` is falsy
    ```
  
## Replacing Statements with Expressions (문을 식으로 바꾸기)

이제 단락 개념과 조건식이 부울로 변환되는 방법을 명확하게 이해했습니다.

다음으로 몇 가지 조건문을 간단한 표현식으로 변환하는 방법을 살펴 봅니다.  
또한 이러한 변환이 코드를 더 간결하고 짧게 만드는 방법도 확인할 수 있습니다.

### 1. 간단한 If 문

단락 개념을 활용하여 매우 간단한 `if` 문을 조건식으로 쉽게 바꿀 수 있습니다.  
다음 코드 스니펫을 고려하십시오.

```javascript
if (user && user.canDeletePost) {
  deletePost();
}
```

이 코드 조각에서 `if` 문은 조건이 `true`로 평가 될 때만 `deletePost()` 함수가 호출되도록합니다.

이 간단한 if 문은 다음 코드 스니펫과 같이 매우 간단한 조건식으로 대체 할 수 있습니다.

```javascript
user && user.canDeletePost && deletePost();
```

이 조건식은 이전 `if` 문과 비슷한 방식으로 작동하지만 실제로는 다릅니다.

조건식은 값을 생성합니다.  
즉, 변수에 할당하거나 값이 필요한 다른 위치에 사용할 수 있습니다.

이와 같은 조건식을 사용하면 단락 경고에 대해 매우주의해야합니다.  
단락에 대한 이전 섹션에서 본 것처럼 피연산자가 평가되지 않을 수 있습니다.

### 2. If… Else 문

암호의 강도를 결정하기 위해 다음 더미 코드 조각을 고려하십시오.

```javascript
let strength = null;

if (password.length > 7) {
  strength = 'Strong';
} else {
  strength = 'Weak';
}
```

이 코드 조각의 의도는 매우 간단합니다.  
암호가 7 자 이상인지 확인하십시오.  
그렇다면 강도 변수를 "Strong"으로 설정하고 그렇지 않으면 "Weak"으로 설정합니다.

이전 코드 조각은 다음과 같이 줄일 수 있습니다.

```javascript
const strength = (password.length > 7) && 'Strong' || 'Weak';
```

이 코드 스니펫은 이전 코드가하는 일을 정확히 한 줄로 수행합니다.  
이것은 이미 꽤 좋아 보인다.  
다음 코드 조각은 조건식의 평가를 검토하려고합니다.

```javascript
let password = 'long_password';

console.log(password.length > 7); // true
console.log(password.length > 7 && 'Strong'); // "Strong"
console.log(password.length > 7 && 'Strong' || 'Weak'); // "Strong"

password = 'short';

console.log(password.length > 7); // false
console.log(password.length > 7 && 'Strong'); // false
console.log(password.length > 7 && 'Strong' || 'Weak'); // "Weak"
```

이러한 종류의 `if ... else` 조건식을 작성하는 더 좋은 방법이 있습니다.  
**삼항 연산자**라고도하는 조건 연산자를 사용합니다.  
구문은 다음과 같습니다.

```javascript
// If condition is truthy, evaluate and return A,
// otherwise evaluate and return B

condition ? A : B
```

따라서 이전 코드 조각은 다음과 같이 삼항 연산자를 사용하여 다시 작성할 수 있습니다.

```javascript
const strength = (password.length > 7) ? 'Strong' : 'Weak';
```

논리 연산자를 사용하는 코드 스니펫은 삼항 연산자를 사용하는 스 니펫 (이 예의 경우)과 유사한 방식으로 작동하지만 대체가 아님을 아는 것이 중요합니다.

당신이하고있는 일을 정말로 알고있는 것을 제외하고는 이와 같은 경우에 삼항 연산자를 사용하는 것이 훨씬 안전합니다.

다음과 같은 경우에 논리 연산자를 사용하는 위험을 이해하려면 다음 코드 스니펫을 고려하십시오.

**<span style="color:red">주의</span>**

```javascript
// LOGICAL OPERATORS
// If condition is truthy and A is truthy, return A,
// otherwise evaluate and return B

// Danger: A will never be returned if it is falsy

condition && A || B


// TERNARY OPERATOR
// If condition is truthy, evaluate and return A,
// otherwise evaluate and return B

condition ? A : B
```

다음은 브라우저 간 AJAX 라이브러리에서 일반적으로 발견되는 매우 친숙한 조건문입니다.

```javascript
let xmlhttp = null;

if (window.XMLHttpRequest) {
  
  // Modern browsers
  xmlhttp = new XMLHttpRequest();
  
} else if (window.ActiveXObject) {
  
  // Older versions of Internet Explorer (IE <= 6)
  xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  
}
```

논리 연산자를 사용하여 이전 코드 조각을 다음과 같이 다시 작성할 수 있습니다 (가독성을 위해 들여 쓰기가 사용됨).

```javascript
const xmlhttp = window.XMLHttpRequest && new XMLHttpRequest()
  || window.ActiveXObject && new ActiveXObject('Microsoft.XMLHTTP')
  || null;
```

그러나 삼항 연산자를 사용하면 다음과 같이 작성할 수 있습니다.

```javascript
const xmlhttp = window.XMLHttpRequest
  ? new XMLHttpRequest()
  : window.ActiveXObject
    ? new ActiveXObject('Microsoft.XMLHTTP')
    : null;
```

이 코드 스 니펫에서 삼항 연산자가 중첩되어 있다는 점에 유의하십시오.  
이는 더 관련된 `if ... else` 조건을 처리하는 데 유용합니다.

## Tips and Shortcuts

이 섹션에서는 조건 및 논리 연산자로 작업 할 때 유용 할 수있는 몇 가지 유용한 팁과 바로 가기를 볼 수 있습니다.

### 부울로 정규화

기본 부울 함수를 사용하거나 이중 NOT (`!!`) 연산자를 사용하여 JavaScript 값을 해당 부울 값으로 명시 적으로 변환하는 방법을 이미 살펴 보았습니다.

다음과 같이 항상 부울을 얻도록 값을 정규화한다고 가정 해 보겠습니다.

값이 부울이면 값을 그대로 반환합니다.  
값이 부울이 아닌 경우 선택한 부울 값 (true 또는 false)이 기본값입니다.

다음 코드 스니펫은 이를 수행하는 방법을 보여줍니다 (여기에서 함수가 사용됨).

```javascript
// boolOrFalse()
// Return value if it is a boolean,
// otherwise return false

const boolOrFalse = value => {
  return (typeof value === 'boolean') && value;
}

console.log(boolOrFalse()); // false
console.log(boolOrFalse(0)); // false
console.log(boolOrFalse('')); // false
console.log(boolOrFalse(false)); // false
console.log(boolOrFalse(true)); // true


// boolOrTrue()
// Return value if it is a boolean,
// otherwise return true

const boolOrTrue = value => {
  return (typeof value !== 'boolean') || value;
}

console.log(boolOrTrue()); // true
console.log(boolOrTrue(0)); // true
console.log(boolOrTrue('')); // true
console.log(boolOrTrue(false)); // false
console.log(boolOrTrue(true)); // true
```

### 드 모건의 법칙

Boolean Algebra에 익숙하다면 De Morgan의 법칙에 대해 이미 알고 있어야합니다.  
이 법칙은 JavaScript 논리 연산자에도 적용됩니다.

다음 코드 스니펫은 이 법칙을 보여줍니다.

```javascript
// These two are equivalent
!A && !B == !(A || B)

// Also these two
!A || !B == !(A && B)
```

### 부울 ID

부울을 다룰 때 항상 참인 몇 가지 알려진 신원이 있습니다.  
A, B 및 C가 부울 값이라는 점을 감안할 때 다음 코드 스 니펫은 이러한 ID 중 일부를 보여줍니다.

```javascript
// NOT Conversion (변환)
!!A == A
!!B == B
!!C == C

// AND to OR Conversion
A && B == !(!A || !B)

// OR to AND Conversion
A || B == !(!A && !B)

// Removing nested AND
A || (B && C) == A || B && C

// Removing nested OR
A && (B || C) == !(!A || !B && !C)
```

### 다중 삼항 연산자

이전 코드 스 니펫에서 삼항 연산자를 중첩하여 더 관련이있는 `if ... else` 조건부 논리를 처리 할 수 있음을 확인했습니다.

그러나 복잡한 표현식에서 효과적으로 사용할 수 있도록 삼항 연산자의 우선 순위와 연관성에 대해 알아야 할 몇 가지 사항이 있습니다.

* 삼항 연산자는 논리 연산자 및 대부분의 다른 연산자보다 우선 순위가 낮습니다.  
  따라서 우선 순위가 더 높은 연산자와 함께 사용할 때 마지막으로 평가됩니다.
  
    ```javascript
    // this expression
    A ? B + C && D : E || F && G
    
    // will be evaluated as
    A ? ((B + C) && D) : (E || (F && G))
    ```
  
* **삼항 연산자는 오른쪽에서 왼쪽으로의 연관성**을 갖습니다.  
  따라서 동일한 표현식에 여러 삼항 연산자가 사용되면 **오른쪽에서 왼쪽으로 구문 분석**됩니다.
  
    ```javascript
    // this expression
    A ? B : C ? D : E ? F : G
    
    // will be evaluated as
    (A ? B : (C ? D : (E ? F : G)))
    ```
  
표현식에서 여러 삼항 연산자를 사용하는 경우 평가 순서를 변경하려면 괄호 (`()`)를 사용해야 할 수 있습니다.  
다음은 그 예입니다.

```javascript
// this expression
A ? B : (C ? D : E) ? F : G

// will be evaluated as
(A ? B : ((C ? D : E) ? F : G))
```

## 결론

이 기사의 끝에 도달 했으므로 이제 전문가처럼 코드를 개선하기 위해 이러한 팁과 기술을 적용 할 수있는 코드 영역을 식별 할 수있을 것입니다.