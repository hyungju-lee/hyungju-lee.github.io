---
title: 2020년 하이퀄리티 자바스크립트 스니펫 22+
layout: post
date: '2020-10-11 10:10:00'
categories:
- js
---

## 2020년 하이퀄리티 자바스크립트 스니펫 22+

JavaScript는 다른 프로그래밍 언어를 전혀 채택하지 않고도 전체 소프트웨어를 작성할 수 있기 때문에 강력한 언어입니다.  
JS로 짧은 손을 쓰면 언젠가 더 깨끗하고 읽기 쉬운 코드를 작성하는 데 도움이됩니다.  
이 글에서 필자는 여러분이 필요로 할 수있는 가장 많이 사용하고 알아야 할 JavaScript 코드 스니펫을 나열했습니다.

## 1. The Ternary Operator (삼항연산자)

```javascript
let someThingTrue = true
if(someThingTrue){
    handleTrue()
}else{
    handleFalse()
}

// Short Hand version below
let someThingTrue = true
someThingTrue ?  handleTrue() : handleFalse()
```

## 2. Short-Circuit Evaluation (단락 평가)

```javascript
const defaultValue = "SomeDefaultValue";
var someValueNotSureOfItsExistance = null;
var expectingSomeValue = someValueNotSureOfItsExistance || defaultValue;

console.log(expectingSomeValue);    
// SomeDefaultValue
```

## 3. IF Presence

```javascript
var someValue = true
if(someValue){
   console.log("Its exist");
}
```

## 4. For Loops

```javascript
for(let i=0; i<1e2; i++){ // instead of i<100, Cool, right?
    console.log(i);
}
// 0
// 1
// 2
// 3
// ...
// 99
```

```javascript
var someValues = [1,2,4]
for (let val in someValues){
  console.log(val)
}
// 0
// 1
// 2

var obj = {
  "key1":"value1",
  "key2":"value2",
  "key3":"value3"
}
for(let key in obj){
   console.log(key)
}
// key1
// key2
// key3
```

## 5. Value-to-Object Map

```javascript
var x="x",y="y";
var obj = {x,y};
console.log(obj);
// {x: "x", y: "y"}
```

## 6. Object.entries()

```javascript
const credits = { producer: "HBO", name: "Game Of thrones", rating: 9 };
const arr = Object.entries(credits);
console.log(arr); // Note Introduced in ES8

// result
[
 [ 'producer', 'HBO' ],
 [ 'name', 'Game Of thrones' ],
 [ 'rating', 9 ] 
]
```

![](/static/img/script/image144.jpg)

## 7. Object.values()

```javascript
const credits = { producer: "HBO", name: "Game Of thrones", rating: 9 };
const arr = Object.values(credits);
console.log(arr); // Note Introduced in ES8

// result
[ 'HBO', 'Game Of thrones', 9 ]
```

![](/static/img/script/image145.jpg)

## 8. Template Literals

```javascript
var name = "John",age = 20
var someStringConcatenateSomeVariable = `My Name is ${name} and my age is ${age}`
console.log(someStringConcatenateSomeVariable)
```

## 9. Destructuring Assignments

```javascript
import { observable, action, runInAction } from 'mobx';
```

## 10. Multiline Strings (여러줄 문자열)

```javascript
var multiLineString = `some string\n
with multi-line of\n
characters\n`
console.log(multiLineString)
```

## 11. The Spread Operator

```javascript
const odd = [1, 3, 5 ];
const nums = [2 ,4 , 6, ...odd];
console.log(nums); // [ 2, 4, 6, 1, 3, 5 ]
```

## 12. Array.find Shorthand

```javascript
const pets = [
  { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
]
pet = pets.find(pet => pet.type ==='Dog' && pet.name === 'Tommy');
console.log(pet); // { type: 'Dog', name: 'Tommy' }
```

## 13. Default Parameter Values

아래는 일반적인 방법입니다.

```javascript
function area(h,w){
   if(!h){
     h=1;
   }
  if(!w){
    w=1;
  }
  return h*w;
}
```

그러나 아래처럼 작성 할 수 있습니다.

```javascript
function area(h=1,w=1){
  return h*w;
}
```

## 14. Arrow Function Short Hand

```javascript
var sayHello = (name)=>{
   return "Hello " + name
}
console.log(sayHello("XOR"))
```

대신에

```javascript
var sayHello = name=>"Hello " + name
console.log(sayHello("XOR"))

// OR Similar
["A","B","C"].forEach(item=>console.log(item)) // A B C
```

## 15. Implicit Return (암시적 반환)

```javascript
var someFuncThatReturnSomeValue = (value)=>{
  return value + value
}
console.log(someFuncThatReturnSomeValue("John"))
```

대신에

```javascript
var someFuncThatReturnSomeValue = (value)=>(
  value + value
)
console.log(someFuncThatReturnSomeValue("John"))
```

## 16. Must Have Parameter Values

```javascript
function mustHavePatamMethod(param) {
  if(param === undefined) {
   throw new Error("Hey You must Put some param!");
  }
  return param;
}
```

대신 다음과 같이 다시 작성할 수 있습니다.  
(파라미터 '기본값'을 활용)

```javascript
mustHaveCheck = () => {
  throw new Error("Missing parameter!");
}
methodShoudHaveParam = (param = mustHaveCheck()) => {
  return param;
}
```

## 17. charAt() Shorthand

```javascript
"SampleString".charAt(0); // Returns S
// OR in Short
"SampleString"[0] // Returns S
```

## 18. Conditional Function Calling (조건부 함수 호출)

```javascript
function fn1(){
  console.log("I am Function 1");
}
function fn2(){
  console.log("I am Function 2");
}
/*
Long Version
*/
var checkValue = 3;
if (checkValue === 3) {
  fn1();
} else {
  fn2();
}
```

이제 짧은 버전

```javascript
function fn1(){
  console.log("I am Function 1");
}
function fn2(){
  console.log("I am Function 2");
}
(checkValue === 3 ? fn1:fn2)(); // Short Version
```

## 19. Math.Floor Short Hand

```javascript
var val = "123.7";
console.log(Math.floor(val)) // Long version Returns 123
console.log(~~val) // Short Version Returns 123
```

## 20. Math.pow Short Hand

```javascript
Math.pow(2,3); // 8
// Or in short
2**3 // 8
```

## 21. Converting String To Number (문자열을 숫자로 변환)

```javascript
const num1 = parseInt("100");

// In Short
console.log(+"100")
console.log(+"100.2")
```

## 22. 조건부로서의 && 연산자

```javascript
var value = 1;
if(value ===1) console.log("Value is one") 

//OR In short 
value && console.log("Value is one")
```

## 23. toString Short Hand

```javascript
var someNumber = 123
console.log(someNumber.toString()) //return "123"

// Or in SHORT CUT
console.log(`${someNumber}`) //return "123"
```

## 24. Replacing Switch with Dynamic Key Value Pair

```javascript
const UserRole = {
    ADMIN: "Admin",
    GENERAL_USER: "GeneralUser",
    SUPER_ADMIN: "SuperAdmin",
};

const getRoute = (userRole) => {
    const appRoute = {
        [UserRole.ADMIN]: "/admin",
        [UserRole.GENERAL_USER]: "/user", 
        [UserRole.SUPER_ADMIN]: "/superadmin" 
    };
    return appRoute[userRole] ?? "";
}
getRoute("Admin") // return "/admin"
getRoute("Anything") // return "" or default case
// No more switch/if-else here.
```

## 25. Optional Chaining Operator (Its coming) 선택적 연결 연산자 (출시 예정)

ECMAScript에 대한 새로운 제안과 알아두면 좋은 점이 있습니다.

```javascript
var someUser = { name: 'Jack' }
var zip = someUser?.address?.zip // Optional Chaining like Swift !
console.log(zip); // undefined
```

위 구문은 오류가 발생하지 않는다.  
그리고 위 구문은 함수 및 생성자 호출도 지원한다.

```javascript
var address = getAddressByZip.?(12345);
```

`getAddressByZip`이 함수이면 호출되고, 그렇지 않으면 식이 `undefined`인 것으로 평가됩니다.

## 26. Switch를 Object Literal 조회로 교체

```javascript
var fruit = 'banana';
var drink;
switch(fruit) {
case 'banana':
  drink = 'banana juice';
  break;
case 'papaya':
  drink = 'papaya juice';
  break;
default:
  drink = 'Unknown juice!';
}

console.log(drink); // 'banana juice'
```

아래 코드작성식이 훨씬 더 좋고 읽기 쉽습니다.

```javascript
function getDrink (type) {
    var drinks = {
        'banana': 'banana juice',
        'papaya': 'papaya juice',
        'default': 'Just water !!'
    };
    return 'The drink I chose was ' + (drinks[type] || drinks['default']);
}

var drink = getDrink('papaya');
console.log(drink); // The drink I chose was papaya juice
```