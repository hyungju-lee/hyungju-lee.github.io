---
title: JavaScript 정규식 (RegEx)에 대한 실용적인 가이드
layout: post
date: '2020-10-26 22:20:00'
categories:
- js
---

## JavaScript 정규식 (RegEx)에 대한 실용적인 가이드

**실습 예제와 함께 정규식을 효과적으로 활용하기위한 빠른 가이드입니다.**  

정규식을 처음 만나면 무작위로 횡설수설 한 문자열처럼 보일 수 있습니다.  
어색해 보일 수 있지만 (약간 혼란스러운 구문으로) 매우 유용합니다.

진실은 정규 표현식을 제대로 이해하면 훨씬 더 효과적인 프로그래머가 될 것입니다.  
정규식 세계를 완전히 이해하려면 먼저 기본 개념을 배워야합니다.

그래서 더 이상 고민하지 않고 시작합시다 :)

>팁 : 구성 요소로 Bit 빌드 앱을 더 빠르게 사용하십시오.  
>구성 요소를 팀과 공유 및 재사용하고 새 앱을 빌드하는 데 사용하는 데 도움이됩니다!  
>시도 해봐.

* [bit url](https://bit.dev/){:target="_blank"}

## 정규식이란 무엇입니까?

**정규식은 문자열 데이터의 패턴을 설명하는 방법입니다.**  
그들은 Javascript, Perl, Python, Php 및 Java와 같은 많은 프로그래밍 언어의 일부인 자체 작은 언어를 형성합니다.

정규식을 사용하면 패턴에 대한 이메일 주소 또는 비밀번호와 같은 문자열을 확인하여 해당 정규식으로 정의 된 패턴과 일치하는지 확인하고 실행 가능한 정보를 생성 할 수 있습니다.

## 정규식 만들기

자바 스크립트에서 정규식을 만드는 방법에는 두 가지가 있습니다.  
RegExp 생성자로 만들거나 슬래시 (/)를 사용하여 패턴을 묶을 수 있습니다.

### Regular Expression Constructor (정규식 생성자) :

Syntax: `new RegExp(pattern[, flags])`  

Example:

```javascript
var regexConst = new RegExp('abc');
```

### Regular Expression Literal (정규식 리터럴) :

Syntax: `/pattern/flags`

Example:

```javascript
var regexLiteral = /abc/;
```

* 여기서 플래그(flag)는 선택 사항(option)이며이 기사의 뒷부분에서 설명하겠습니다.

**정규 표현식을 동적으로 생성하려는 경우도있을 수 있습니다.**  
**이 경우 정규 표현식 리터럴이 작동하지 않으므로 정규 표현식 생성자를 사용해야합니다.**

어떤 방법을 선택하든 결과는 정규식 객체가 될 것입니다.  
두 regex 객체 모두에 동일한 메서드와 속성이 연결됩니다.

**위의 예에서 패턴을 묶는 데 슬래시가 사용되었으므로 정규식의 일부로 사용하려면 슬래시 (/)를 백 슬래시 (\)로 이스케이프해야합니다.**

## Regular Expressions Methods

주로 정규식을 테스트하는 두 가지 방법이 있습니다.

### RegExp.prototype.test()

이 메서드는 일치 항목이 있는지 여부를 테스트하는 데 사용됩니다.  
정규 표현식에 대해 테스트해야하는 문자열을 받아들이고 일치 항목이 있는지 여부에 따라 true 또는 false를 반환합니다.

예를 들면 :

```javascript
var regex = /hello/;
var str = 'hello world';
var result = regex.test(str);
console.log(result);
// returns true
```

### RegExp.prototype.exec()

이 메서드는 일치하는 모든 그룹을 포함하는 배열을 반환합니다.  
정규식에 대해 테스트해야하는 문자열을받습니다.  

예를 들면 :

```javascript
var regex = /hello/;
var str = 'hello world';
var result = regex.exec(str);
console.log(result);
// returns [ 'hello', index: 0, input: 'hello world', groups: undefined ]
// 'hello' -> is the matched pattern.
// index: -> Is where the regular expression starts.
// input: -> Is the actual string passed.
```

이 블로그에서는 test () 메서드를 사용할 것입니다.

## Simple Regex Patterns

리터럴 텍스트를 테스트 문자열과 일치시키는 가장 기본적인 패턴입니다.  

예를 들면 :

```javascript
var regex = /hello/;
console.log(regex.test('hello world'));
// true
```

## Special Characters (특수 문자)

지금까지 간단한 정규 표현식 패턴을 만들었습니다.  
이제 더 복잡한 경우를 처리 할 때 정규 표현식의 모든 기능을 활용 해 보겠습니다.  

예를 들어 특정 이메일 주소를 일치시키는 대신 여러 이메일 주소를 일치시키고 싶다고 가정 해 보겠습니다.  
여기에서 특수 캐릭터가 등장합니다.  
정규식을 완전히 이해하기 위해 외워야하는 특수 기호와 문자가 있습니다.

### Flags:

정규식에는 5 개의 선택적 플래그 또는 수정자가 있습니다.  
가장 중요한 두 가지 플래그에 대해 살펴 보겠습니다.

1. g — 전역 검색, 첫 번째 일치 후 반환하지 않음
2. i — 대소 문자를 구분하지 않는 검색

단일 정규식에서 플래그를 결합 할 수도 있습니다.  
순서는 결과에 영향을주지 않습니다.

몇 가지 코드 예제를 살펴 보겠습니다.

### Regular Expression Literal — Syntax /pattern/flags

```javascript
var regexGlobal = /abc/g;
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return 
// after first match.
var regexInsensitive = /abc/i;
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter 
// in case-insensitive search.
```

### Regular Expression Constructor — Syntax new RegExp('pattern', 'flags')

```javascript
var regexGlobal = new RegExp('abc','g')
console.log(regexGlobal.test('abc abc'));
// it will match all the occurence of 'abc', so it won't return // after first match.
var regexInsensitive = new RegExp('abc','i')
console.log(regexInsensitive.test('Abc'));
// returns true, because the case of string characters don't matter // in case-insensitive search.
```

### Character groups:

문자 집합 [xyz] — 문자 집합은 단일 위치에서 다른 문자를 일치시키는 방법으로, 괄호 안에있는 문자의 문자열에있는 단일 문자와 일치합니다. 

예를 들면 :

```javascript
var regex = /[bt]ear/;
console.log(regex.test('tear'));
// returns true
console.log(regex.test('bear'));
// return true
console.log(regex.test('fear'));
// return false
```

>**Note**  
>캐럿 (^) (문자 세트 내에서 완전히 다른 의미를 가짐)을 제외한 모든 특수 문자는 문자 세트 내에서 특수한 의미를 잃습니다.

부정 문자 집합 [^ xyz] — 대괄호로 묶이지 않은 모든 항목과 일치합니다. 

예를 들면 :

```javascript
var regex = /[^bt]ear/;
console.log(regex.test('tear'));
// returns false
console.log(regex.test('bear'));
// return false
console.log(regex.test('fear'));
// return true
```

범위 [a-z] — 알파벳의 모든 문자를 단일 위치에 일치시키고 싶다고 가정하고 모든 문자를 괄호 안에 쓸 수 있지만 더 쉬운 방법이 있습니다.  
바로 범위입니다. 

예 : [a-h]는 a에서 h까지의 모든 문자와 일치합니다.  
범위는 [0-9]와 같은 숫자 또는 [A-Z]와 같은 대문자 일 수도 있습니다.

```javascript
var regex = /[a-z]ear/;
console.log(regex.test('fear'));
// returns true
console.log(regex.test('tear'));
// returns true
```

메타 문자 — 메타 문자는 특별한 의미를 가진 문자입니다.  
메타 캐릭터가 많지만 여기서 가장 중요한 캐릭터를 다룰 예정입니다.

* `\d` — 모든 숫자와 일치합니다 ([0-9]와 동일).
* `\w` — 모든 단어 문자와 일치합니다.  
  단어 문자는 문자, 숫자 및 밑줄입니다.  
  ([a-zA-Z0–9_]와 동일) 즉, 영숫자 문자입니다.
* `\s` — 공백 문자 (공백, 탭 등)와 일치합니다.
* `\t` — 탭 문자 만 일치합니다.
* `\b` — 단어의 시작 또는 끝에서 일치하는 항목을 찾습니다. 단어 경계라고도합니다.
* `.` — (마침표) 줄 바꿈을 제외한 모든 문자와 일치합니다.
* `\D` — 숫자가 아닌 문자와 일치합니다 ([^0–9]와 동일).
* `\W` — 단어가 아닌 문자와 일치합니다 ([^a-zA-Z0–9_]와 동일).
* `\S` — 공백이 아닌 문자와 일치합니다.

수량 자 : — 수량자는 정규식에서 특별한 의미를 갖는 기호입니다.

* `+` — 앞의 표현식과 1 회 이상 일치합니다.

```javascript
var regex = /\d+/;
console.log(regex.test('8'));
// true
console.log(regex.test('88899'));
// true
console.log(regex.test('8888845'));
// true
```

* `*` - 앞의 표현식과 0 번 이상 일치합니다.

```javascript
var regex = /go*d/;
console.log(regex.test('gd'));
// true
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
```

* `?` — 앞의 표현식과 0 또는 1 번 일치합니다. 즉, 이전 패턴은 선택 사항입니다.

```javascript
var regex = /goo?d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```

* `^` — 문자열의 시작 부분과 일치합니다.  
  그 뒤에 오는 정규식은 테스트 문자열의 시작 부분에 있어야합니다.  
  즉, 캐럿 (^)은 문자열의 시작과 일치합니다.
  
```javascript
var regex = /^g/;
console.log(regex.test('good'));
// true
console.log(regex.test('bad'));
// false
console.log(regex.test('tag'));
// false
```

* `$` — 문자열의 끝과 일치합니다.  
  즉, 앞에 오는 정규식은 테스트 문자열의 끝에 있어야합니다.  
  달러 ($) 기호는 문자열의 끝과 일치합니다.
  
```javascript
var regex = /.com$/;
console.log(regex.test('test@testmail.com'));
// true
console.log(regex.test('test@testmail'));
// false
```

* `{N}` — 이전 정규식의 정확히 N 개 항목과 일치합니다.

```javascript
var regex = /go{2}d/;
console.log(regex.test('good'));
// true
console.log(regex.test('god'));
// false
```

* `{N,}` — 이전 정규식이 N 개 이상 일치합니다.

```javascript
var regex = /go{2,}d/;
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// true
console.log(regex.test('gooood'));
// true
```

* `{N, M}` — N 개 이상의 이전 정규식 (여기서 M> N)의 최대 M 개 항목과 일치합니다.

```javascript
var regex = /go{1,2}d/;
console.log(regex.test('god'));
// true
console.log(regex.test('good'));
// true
console.log(regex.test('goood'));
// false
```

### Alternation X|Y — Matches either X or Y. For example:

```javascript
var regex = /(green|red) apple/;
console.log(regex.test('green apple'));
// true
console.log(regex.test('red apple'));
// true
console.log(regex.test('blue apple'));
// false
```

>**참고**  
>특수 문자를 표현식의 일부로 사용하려면 (예 : 리터럴 + 또는.와 일치시키려는 경우) 백 슬래시 (\)로 이스케이프해야합니다.

예를 들면 :

```javascript
var regex = /a+b/;  // This won't work
var regex = /a\+b/; // This will work
console.log(regex.test('a+b')); // true
```

### Advanced

* (x) — x와 일치하고 일치를 기억합니다.  
  이를 캡처 그룹이라고합니다.  
  정규식 내에서 하위 식을 만드는데도 사용됩니다. 

예를 들면 :-

```javascript
var regex = /(foo)bar\1/;
console.log(regex.test('foobarfoo'));
// true
console.log(regex.test('foobar'));
// false
```

`\1`은 괄호 안의 첫 번째 하위 표현식에서 일치하는 것을 기억하고 사용합니다.

* (?:x) — x와 일치하고 일치를 기억하지 않습니다.  
  이를 비 캡처 그룹이라고합니다.  
  여기서 `\1`은 작동하지 않으며 리터럴 `\1`과 일치합니다.
  
```javascript
var regex = /(?:foo)bar\1/;
console.log(regex.test('foobarfoo'));
// false
console.log(regex.test('foobar'));
// false
console.log(regex.test('foobar\1'));
// true
```

* x(?=y) — x 다음에 y가 오는 경우에만 x와 일치합니다.  
  긍정적 인 미리보기라고도합니다. 
  
예를 들면 :

```javascript
var regex = /Red(?=Apple)/;
console.log(regex.test('RedApple'));
// true
```

위의 예에서 일치는 Red 다음에 Apple이 오는 경우에만 발생합니다.

## 정규식 연습 :

위에서 배운 몇 가지 개념을 연습해보겠습니다.

* 10 자리 숫자와 일치 :

```javascript
var regex = /^\d{10}$/;
console.log(regex.test('9995484545'));
// true
```

위 코드를 분해하고 거기에서 무슨 일이 일어나고 있는지 봅시다.

1. 일치 항목이 전체 문자열에 걸쳐 있도록 강제하려면 `^` 및 `$` 한정자를 추가 할 수 있습니다.  
  캐럿 `^`은 입력 문자열의 시작과 일치하는 반면 달러 기호 `$`는 끝과 일치합니다.  
  따라서 문자열에 10 자리 이상이 포함되어 있으면 일치하지 않습니다.
  
2. `\d`는 모든 숫자와 일치합니다.

3. `{10}`은 이전 표현식과 일치합니다.  
   이 경우 `\d`는 정확히 10번입니다.  
   따라서 테스트 문자열에 10 자리 이하의 숫자가 포함되어 있으면 결과는 거짓이됩니다.
   
### DD-MM-YYYY 또는 DD-MM-YY 형식의 날짜와 일치

```javascript
var regex = /^(\d{1,2}-){2}\d{2}(\d{2})?$/;
console.log(regex.test('01-01-1990'));
// true
console.log(regex.test('01-01-90'));
// true
console.log(regex.test('1-1-1990'));
// true
console.log(regex.test('01-01-190'));
// false
```

위 코드를 분해하고 거기에서 무슨 일이 일어나고 있는지 봅시다.

1. 다시 말하지만, 전체 정규식을 `^` 및 `$` 안에 래핑하여 일치 항목이 전체 문자열에 걸쳐 있도록합니다.
2. `(` 첫 번째 하위 표현식의 시작.
3. `\d{1,2}`는 최소 1 자리, 최대 2 자리와 일치합니다.
4. `-` 리터럴 하이픈 문자와 일치합니다.
5. `)` 첫 번째 하위 표현식의 끝.
6. `{2}`는 첫 번째 하위 표현식과 정확히 두 번 일치합니다.
7. `\d{2}`는 정확히 두 자리 숫자와 일치합니다.
8. `(\d{2})?` 정확히 두 자리와 일치합니다.  
   그러나 선택 사항이므로 연도에는 2 자리 또는 4 자리가 포함됩니다.
   
* **개행 이외의 항목 일치**

표현식은 abc.def.ghi.jkl과 같은 형식의 모든 문자열과 일치해야합니다.  
여기서 각 변수 a, b, c, d, e, f, g, h, i, j, k, l은 줄 바꾸기를 제외한 모든 문자가 될 수 있습니다.

```javascript
var regex = /^(.{3}\.){3}.{3}$/;
console.log(regex.test('123.456.abc.def'));
// true
console.log(regex.test('1243.446.abc.def'));
// false
console.log(regex.test('abc.def.ghi.jkl'));
// true
```

위 코드를 분해하고 거기에서 무슨 일이 일어나고 있는지 봅시다.

1. `^` 및 `$` 안에 전체 정규식을 래핑하여 일치 항목이 전체 문자열에 걸쳐 있도록합니다.
2. `(` 첫 번째 하위 표현식의 시작
3. `.{3}`는 새 줄(개행)을 제외한 모든 문자와 정확히 3 번 일치합니다.
4. `\.` 리터럴과 일치합니다 `.` 기간
5. `)` 첫 번째 하위 표현식의 끝
6. `{3}`은 첫 번째 하위 표현식과 정확히 3 번 일치합니다.
7. `.{3}`는 새 줄을 제외한 모든 문자와 정확히 3 번 일치합니다.

## 결론

정규식은 때때로 상당히 복잡 할 수 있지만 위의 개념을 적절히 이해하면 더 복잡한 정규식 패턴을 쉽게 이해하는 데 도움이됩니다.  
여기서 정규식에 대해 자세히 알아보고 여기서 연습 할 수 있습니다.

* [정규식 자세히 공부할 수 있는 링크](https://www.hackerrank.com/domains/regex){:target="_blank"}