---
title: 알아야 할 JavaScript 및 TypeScript 속기 11 가지
layout: post
date: '2020-10-28 15:57:00'
categories:
- js
---

## 알아야 할 JavaScript 및 TypeScript 속기 11 가지

다른 사람의 코드를 읽을 때 사용하거나 적어도 이해할 수있는 매우 유용한 (때로는 모호한) JS / TS 속기입니다.

깔끔하고 효율적인 코드를 작성하는 것과 오직 당신 만이 읽을 수있는 코드를 작성하는 것 사이에는 아주 미세한 경계가 있습니다.  
그리고 최악의 부분은 그 선이 보편적이지 않다는 것입니다.  
어떤 사람들은 다른 사람들보다 코드를 훨씬 더 많이 그릴 것이므로 코드 조각이 모든 사람에게 충분히 읽을 수 있는지 결정할 때 
삼항 연산자, 온라인 화살표 함수 및 기타 등등 과 같은 많은 속기 사용을 멀리하는 경향이 있습니다.  

그러나 추악한 진실은 때때로 이러한 약어가 매우 편리하고 쉽게 코드를 읽는 데 관심이있는 사람은 누구나 이해할 수 있고 이해할 수 있다는 것입니다.

따라서이 기사에서는 JavaScript와 TypeScript 모두에서 찾을 수있는 매우 유용한 (때로는 모호한) 속기 몇 가지를 다루고자합니다.  
따라서 코드를 작성하는 사람이라면 이를 알고 있어야합니다.  

## 1. The Nullish Coalescing Operator (Nullish 통합 연산자)

통합 연산자라는 이름을 가지고도 아직 인기있는 연산자가 아니라는 것이 놀라울 뿐입니다.  
그렇지 않나요?

이 연산자의 요점은 평가 된 표현식이 null 이거나 undefined 경우 값을 반환 할 수 있도록하는 것입니다.  
사용 방법은 다음과 같습니다.

```javascript
function myFn(variable1, variable2) {
  let var2 = variable2 ?? "default value"
  return variable1 + var2
}

myFn("this has", " no default value") //returns "this has no default value"
myFn("this has no") //returns "this has no default value"
myFn("this has no", 0) //returns "this has no 0"
```

`||`연산자와 매우 유사하게 그 뒤에있는 논리는 동일합니다.  
표현식의 왼쪽이`null` 또는 `undefined`로 평가되면 오른쪽을 반환하고 그렇지 않으면 다음을 반환합니다.  

왼쪽.  

따라서 모든 유형의 값을 할당 할 수 있고 `undefined` 또는`null`을 처리 할 필요가 없는지 확인하려는 일반적인 기본값의 경우 이것이 갈 길입니다.

## 2. Logical nullish assignment (논리적 null 할당)

이것은 이전 것의 확장입니다.  
`??=` 연산자를 사용하여 동시에 둘 다 수행 할 수 있습니다.  
nullish 병합 값을 확인하고 값이 있으면 할당합니다.

동일한 코드 샘플에서 또 다른 균열을 살펴 보겠습니다.

```javascript
function myFn(variable1, variable2) {
  variable2 ??= "default value"
  return variable1 + variable2
}

myFn("this has", " no default value") //returns "this has no default value"
myFn("this has no") //returns "this has no default value"
myFn("this has no", 0) //returns "this has no 0"
```

할당 연산자를 사용하면 variable2의 값을 확인할 수 있으며 null 또는 undefined로 평가되면 할당이 진행되고 그렇지 않으면 절대 발생하지 않습니다.

>경고 :이 구문은이 연산자에 익숙하지 않은 다른 사용자에게 혼동을 줄 수 있으므로 이를 사용하는 경우 상황을 설명하는 한 줄 주석을 남겨 두는 것이 좋습니다.

## 3. TypeScript’s constructor shorthand (TypeScript 의 생성자 속기)

이것은 TypeScript에만 해당되며, JavaScript 순수 주의자라면 OS를 놓치고 있습니다!  
(농담이지만 일반 JS로는 이 작업을 수행 할 수 없습니다.)

클래스를 정의 할 때 일반적으로 모든 속성을 해당 가시성과 함께 나열한 다음 생성자 내부에서 해당 값을 할당하는 방법을 알고 있습니까?  
생성자가 매우 간단하고 수신 된 값을 매개 변수로 할당하는 경우에는 속기가 있습니다.

보여 드리겠습니다.

```typescript
//Old way...
class Person {
  
  private first_name: string;
  private last_name: string;
  private age: number;
  private is_married: boolean;
  
  constructor(fname:string, lname:string, age:number, married:boolean) {
    this.first_name = fname;
    this.last_name = lname;
    this.age = age;
    this.is_married = married;
  }
}

//New, shorter way...
class Person {

  constructor( private first_name: string,
               private last_name: string,
               private age: number,
               private is_married: boolean){}
}
```

이것은 특히 많은 속성을 가진 클래스가있는 경우 확실히 시간을 절약 해줍니다.

기본적으로 확인하고 싶은 것은 생성자 바로 뒤에 `{}`를 추가하는 것을 잊지 마십시오.  
이것이 함수의 본문이기 때문입니다.  
그게 다입니다.  
나머지는 컴파일러가 수행하고, 우리가 달성하려는 것을 이해하면 두 버전의 코드를 동일한 자바 스크립트 스니펫으로 바꿉니다.

>팁 : Bit (Github)를 사용하여 프로젝트간에 재사용 가능한 모듈 / 구성 요소를 공유하십시오.  
>Bit를 사용하면 모든 프로젝트에서 독립적 인 구성 요소를 간단하게 공유, 문서화 및 구성 할 수 있습니다.  
>이를 사용하여 코드 재사용을 극대화하고 독립 구성 요소에서 공동 작업하고 확장 가능한 앱을 빌드하십시오.  
>Bit는 Node, TypeScript, React, Vue, Angular 등을 지원합니다.
>[bit](https://bit.dev/){:target="_blank"}

## 4. The ternary operator (삼항 연산자)

이것은 상대적으로 읽기 쉽고 한 줄의 `IF..ELSE` 문 대신 사용되는 경향이 있습니다.  
불필요한 문자를 많이 제거하고 4 줄을 하나로 바꾸기 때문입니다.

```javascript
// Original IF..ELSE statement
let isEven = ""
if(variable % 2 == 0) {
  isEven = "yes"
} else {
  isEven = "no"
}

//The ternary approach
let isEven = (variable % 2 == 0) ? "yes" : "no"
```

**삼항 연산자**의 구조는 본질적으로 부울 표현식을 먼저 가지고 있고, 
그 표현식이 참일 때 case에 대한 일종의 "return"문과 표현식이 거짓 일 때 
case에 대한 "return"문이 있다는 것을 알 수 있습니다.  
할당의 오른쪽에서 가장 잘 사용되지만 (예제에서와 같이) 부울 표현식의 값에 따라 함수 호출을 실행하는 방법으로 단독으로 사용할 수도 있습니다.

```javascript
let variable = true;

(variable) ? console.log("It's TRUE") : console.log("It's FALSE")
```

형식이 동일하다는 점에 유의하세요.  
여기서 문제는 앞으로 여기 섹션 중 하나를 확장해야하는 경우 (표현식이 참이거나 거짓 일 때) 본격적인 `if..else` 형식으로 변환해야한다는 것입니다. 

## 5. Take advantage of OR’s lazy evaluation (OR의 지연 평가 활용)

JavaScript (및 TypeScript도 마찬가지로)에서 OR 논리 연산자는 지연 평가 모델을 따릅니다.  
즉, true를 반환하는 첫 번째 표현식을 반환하고 나머지를 계속 확인하지 않습니다.  

즉, 다음 IF 문이있는 경우 처음 두 식만 평가됩니다.

```javascript
if( expression1 || expression2 || expression3 || expression4)
```

expression1이 'falsy'(즉, false로 평가 된 값을 반환)이고 expression2가 'truthy'(즉, true로 평가 된 값을 반환)라고 가정하면 평가가 중지됩니다.

이 지연 평가를 이용할 수 있으며 `IF` 문 내에서 사용하는 대신 표현식이 실패하거나 `undefined` 인 경우 기본값을 제공하기 위해 할당의 일부로 사용할 수 있습니다.

```javascript
function myFn(variable1, variable2) {
  let var2 = variable2 || "default value"
  return variable1 + var2
}

myFn("this has", " no default value") //returns "this has no default value"
myFn("this has no") //returns "this has no default value"
```

위의 예는 OR 연산자를 사용하여 함수의 두 번째 매개 변수에 대한 기본값을 설정하는 방법을 보여줍니다.  
이제 자세히 살펴보면 이 접근 방식에서 작은 문제를 발견 할 수 있습니다.  
variable2의 값이 0이거나 빈 문자열 인 경우 둘 다 false 로 평가되므로 var2에 기본값을 설정하게됩니다.

따라서 사용 사례에서 잘못된 값이 유효한 값이되도록 허용하는 경우 "Nullish 병합 연산자"라고하는 덜 알려진 피연산자를 살펴볼 수 있습니다.

## 6. The double bitwise NOT operator (이중 비트 NOT 연산자)

비트 연산자는 우리가 멀리하는 경향이있는 것들입니다.  
왜냐하면 솔직히 오늘날 누가 비트에 대해 생각할 필요가 있기 때문입니까?  
그러나 문제는 숫자 비트에서 직접 작업하는 방식으로 인해 일반 메서드 호출보다 훨씬 빠르게 작업을 수행한다는 것입니다.

이 경우 비트 NOT 연산자 (예 : ~)는 숫자를 가져 와서 32 비트 정수로 변환 한 다음 (추가 비트 삭제)  
모든 비트를 반전하여 본질적으로 값 x의 정수를 `-(x+1)` 이 식에 넣습니다.  

왜 우리는 이 연산자에 관심을 가질까요?  
  
같은 값에 두 번 사용하면 **`Math.floor` 메서드와 동일한 결과**를 얻을 수 있기 때문입니다.

```javascript
let x = 3.8
let y = ~x //this turns x into -(3 + 1), remember, the number gets turned into an integer
let z = ~y //this turns y (which is -4) into -(-4 + 1) which is 3

//So you can do:

let flooredX = ~~x //and this performs both steps from above at the same time
```

마지막 줄에있는 **double ~**는 이상하게 보일 수 있지만 여러 부동 소수점 숫자를 정수로 변환해야하는 경우이 방법이 좋은 속기 일 수 있습니다.

## 7. Object property assignment (개체 속성 할당)

ES6는 속성에 값을 할당 할 때 객체 생성 프로세스를 단순화했습니다.  
객체의 속성과 정확히 같은 이름의 변수에 값이 할당되면 더 이상 이전과 같이 이름을 반복 할 필요가 없습니다.

```typescript
let name:string = "Fernando";
let age:number = 36;
let id:number = 1;

type User = {
  name: string,
  age: number,
  id: number
}

//Old way
let myUser: User = {
  name: name,
  age: age,
  id: id
}

//new way
let myNewUser: User = {
  name,
  age,
  id
}
```

보시다시피, 새로운 방법은 (이 기사에 표시된 다른 속기 팁과 달리) 읽기가 어렵지 않고 동시에 작성하기가 더 짧고 쉽습니다.

## 8. Implicit return from arrow functions (화살표 함수에서 암시적 반환)

한 줄 밖에 안되는 화살표 함수를 알고 계 셨나요?  
또한 해당 코드 줄에서 결과를 반환합니다.

기본적으로이 팁을 사용하면 중복 된 `return`문을 저장할 수 있습니다.  
사용되는 이러한 유형의 속기를 찾는 매우 일반적인 방법은 다음과 같이`filter` 또는`map`과 같은 배열 메서드에 있습니다.

```javascript
let myArr:number[] = [1,2,3,4,5,6,7,8,9,10]

//Long way of doing it:
let oddNumbers:number[] = myArr.filter( (n:number) => {
  return n % 2 == 0
})

let double:number[] = myArr.map( (n:number) => {
  return n * 2;
})


//Shorter way:
let oddNumbers2:number[] = myArr.filter( (n:number) => n % 2 == 0 )

let double2:number[] = myArr.map( (n:number) =>  n * 2 )
```

이 방법은 코드를 복잡하게 만들 필요가 없으며 불필요한 공백과 줄을 약간 제거하여 구문을 정리하는 좋은 방법입니다.  
물론 여기에서 단점은 해당 행에 추가 로직을 추가해야하는 경우 중괄호를 다시 추가해야한다는 것입니다.

여기서 유일한주의 사항은 한 줄 함수에서 실행하려는 모든 것이 표현식 (즉, 반환 할 수있는 것)이어야한다는 것입니다.  
그렇지 않으면 작동하지 않습니다.  
예를 들어 다음과 같은 한 줄짜리는 사용할 수 없습니다.

```javascript
const m = _ => if(2) console.log("true")  else console.log("false")
```

다음 예에서는 한 줄짜리 코드이지만 중괄호가 필요한 또 다른 예를 볼 수 있으므로 계속 진행하겠습니다.

## 9. Default function parameters (기본 기능 매개 변수)

ES6 덕분에 이제 함수 매개 변수에 기본값을 지정할 수 있습니다.  
이전 버전의 자바 스크립트에서는 이것이 불가능했기 때문에 OR의 지연 평가와 같은 것을 사용해야했습니다.

하지만 이제는 글쓰기만큼 쉽습니다.

```javascript
//We can function without the last 2 parameter because a default value
//can be assigned to them
function myFunc(a, b, c = 2, d = "") {
  //your logic goes here...
}
```

충분히 간단하지 않습니까?  
글쎄, 실제로는 좀 더 흥미롭다.  
왜냐하면 값은 자신의 값으로 덮어 쓰지 않으면 실행될 함수 호출을 포함하여 어떤 것이 든 될 수 있기 때문에 필수 함수 매개 변수 패턴을 구현하는 것도 정말 쉽습니다. 

확인 해봐:

```javascript
const mandatory = _ => {
  throw new Error("This parameter is mandatory, don't ignore it!")
}


function myFunc(a, b, c = 2, d = mandatory()) {
  //your logic goes here...
}

//Works great!
myFunc(1,2,3,4)

//Throws an error
myFunc(1,2,3)
```

말씀 드렸듯이 한 줄 `mandatory(필수)`는 표현 대신 **문**인 `throw`를 사용하기 때문에 중괄호가 필요합니다.  
그러나 매우 적은 노력으로 멋진 필수 매개 변수 동작을 얻을 수 있습니다.

## 10. Casting any value to a boolean with !! (!!를 사용하여 모든 값을 부울로 캐스팅합니다.)

이중 비트 NOT 연산자와 유사한 메모에서 이중 논리 NOT 연산자를 사용하여 모든 값을 부울로 캐스팅 할 수 있습니다.

```javascript
!!23 // TRUE
!!"" // FALSE
!!0 // FALSE
!!{} // TRUE
```

하나의 논리적 NOT은 이미 당신을 위해 그것을 할 것이고, 그것을 부울에 적용하기 위해 값을 캐스팅 할 것이고, 그 다음 그것을 부정 할 것입니다.  
부울 유형으로 유지하면서 원래 의미.

이 속기는 실제 부울 (예 : boolean 유형의 TypeScript 변수)을 할당해야하는 경우 또는 true 또는 false (=== 사용)에 대해 엄격한 비교를 수행 할 때 유용합니다.

## 11. Destructuring and spread operators (구조화 및 확산 연산자)

두 가지 주제에 대해 할 말이 많이 있으며, 모두 올바르게 사용하면 매우 흥미로운 결과를 얻을 수 있습니다.  
그러나 이 기사에서는 두 가지를 모두 활용하여 일부 작업을 단순화하는 방법을 빠르게 보여 드리겠습니다.

### 객체를 여러 변수로 분해 (해체할당)

개별 변수에 다양한 개체 속성을 할당해야했던 적이 있습니까?  
예를 들어 원래 개체에 영향을주지 않고 이러한 값을 개별적으로 처리해야하는 경우 (예를 들어 수정하여) 실제로 매우 일반적입니다.

Destructuring은 한 줄의 코드로이를 수행하는 데 도움이 될 수 있습니다.

```javascript
const myObj = {
  name: "Fernando",
  age: 37,
  country: "Spain"
}

//Old way of doing this:
const name = myObj.name;
const age = myObj.age;
const country = myObj.country;

//Using destructuring
const {name, age, country} = myObj;
```

이 구문은 이전에 TypeScript를 사용한 적이있는 경우 `import` 문의 일부로 볼 수도 있습니다.  
이 구문을 사용하면 원하지 않는 많은 함수로 네임 스페이스를 막지 않고도 일부 메서드 라이브러리 내보내기를 개별적으로 가져올 수 있기 때문입니다.

```javascript
const { get } from 'lodash'
```

예를 들어, 위의 행을 사용하면 라이브러리의 나머지 부분을 추가하지 않고 `lodash` 라이브러리의 get 메소드 만 네임 스페이스에 추가 할 수 있습니다.  
여기에는 더 많은 메소드가 있습니다.

### Spreading to merge (병합을 위한 확장)

스프레드 연산자를 사용하면 추가 메서드를 호출하지 않고도 배열과 객체를 한 줄의 코드로 병합하는 작업을 단순화 할 수 있습니다.  

```javascript
const arr1 = [1,2,3,4]
const arr2 = [5,6,7]

const finalArr = [...arr1, ...arr2] // [1,2,3,4,5,6,7]

const partialObj1 = {
  name: "fernando"
}
const partialObj2 = {
  age:37
}

const fullObj = { ...partialObj1, ...partialObj2 } // {name: "fernando", age: 37}
```

이와 같은 객체를 병합하면 같은 이름을 공유하는 속성을 덮어 쓰게됩니다.  

![](/static/img/script/image177.jpg)

그러나 배열에서는 똑같은 일이 일어나지 않고 반복되는 값이 추가됩니다.  
이를 피하려면 `Set`를 사용해야합니다.

### Combining both

비 구조화와 확산 연산자를 결합하여 배열의 첫 번째 요소를 제거하고 나머지는 그대로 두는 등 흥미로운 결과를 얻을 수도 있습니다  
(예 : Python 및 기타 언어에서 찾을 수있는 목록이 포함 된 일반적인 헤드 앤 테일 예제).  
또는 다음과 같이 개체에서 일부 속성을 추출하고 나머지는 그대로 둡니다.

```javascript
const myList = [1,2,3,4,5,6,7]
const myObj = {
  name: "Fernando",
  age: 37,
  country: "Spain",
  gender: "M"
}

const [head, ...tail] = myList

const {name, age, ...others} = myObj

console.log(head) //1
console.log(tail) //[2,3,4,5,6,7]
console.log(name) //Fernando
console.log(age) //37
console.log(others) //{country: "Spain", gender: "M"}
```

할당의 왼쪽에있는 스프레드 연산자를 마지막 항목으로 사용해야합니다.  
먼저 스프레드를 사용한 다음 다음과 같은 개별 변수를 추가 할 수 없습니다.

```javascript
// 에러 발생
const [...values, lastItem] = [1,2,3,4]
```

위의 예는 실패합니다.

![](/static/img/script/image178.jpg)

## Conclusion

더 많은 속기가 있지만 속기 코드가 많을수록 속기에 익숙하지 않은 다른 사람들이 코드를 읽을 수 없게된다는 점을 기억하십시오.  
이것은 코드를 축소하거나 코드 줄이 적을수록 더 성능이 좋은 코드가 될 것이라고 **암시적으로 가정하는 것이 아닙니다.**  
**이것은 읽기 작업을 단순화하기 위해 구문에서 중복되거나 불필요한 구문을 제거하는 것**입니다.

따라서 모든 사람을 행복하게 유지하려면 속기 및 가독성이 좋은 코드의 균형을 유지해야합니다 (코드를 읽는 사람이 당신 만이 아니라는 점을 기억하세요!).