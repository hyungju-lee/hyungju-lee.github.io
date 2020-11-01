---
title: 프런트 엔드 개발자를위한 14 가지 JavaScript 코드 최적화 팁
layout: post
date: '2020-11-01 20:29:00'
categories:
- js
---

## 프런트 엔드 개발자를위한 14 가지 JavaScript 코드 최적화 팁

성능 및 웹 사이트 로드 시간을 늘리기위한 팁과 요령

JavaScript는 가장 인기있는 프로그래밍 언어 중 하나가되었습니다.  
W3Tech에 따르면 전 세계 거의 96 %의 웹 사이트에서 사용됩니다.  
웹에 대해 알아야 할 한 가지 중요한 사실은 **사용자가 웹 사이트에 액세스하는 장치의 하드웨어 사양을 제어 할 수 없다는 것**입니다.  
최종 사용자는 인터넷 연결이 좋지 않거나 좋지 않은 고급 또는 저사양 장치에서 웹 사이트에 액세스 할 수 있습니다.  
즉, 모든 사용자의 요구 사항을 충족 할 수 있도록 웹 사이트를 최대한 최적화해야합니다.

다음은 더 나은 성능을 제공하는 최적화 된 JavaScript 코드를 만들기위한 몇 가지 팁입니다.

## 1. 사용하지 않는 코드 및 기능 제거

애플리케이션에 포함 된 코드가 많을수록 더 많은 데이터를 클라이언트로 전송해야합니다.  
또한 브라우저가 코드를 분석하고 해석하는 데 더 많은 시간이 필요합니다.

때로는 전혀 사용되지 않는 기능을 포함 할 수 있습니다.  
이 추가 코드는 개발 환경에서만 유지하고 사용하지 않는 코드로 인해 클라이언트 브라우저에 부담을주지 않도록 프로덕션에 푸시하지 않는 것이 좋습니다.

그 기능, 기능 또는 코드가 필요한지 항상 스스로에게 물어보십시오.

사용하지 않는 코드는 수동으로 제거하거나 [Uglify](https://github.com/mishoo/UglifyJS#compressor-options){:target="_blank"} 
또는 [Google의 Closure Compiler](https://developers.google.com/closure/compiler/docs/api-tutorial3){:target="_blank"}와 같은 도구를 사용하여 제거 할 수 있습니다.  
응용 프로그램에서 사용하지 않는 코드를 제거하는 트리 쉐이킹이라는 기술을 사용할 수도 있습니다.  
Webpack과 같은 번 들러는이 기술을 제공합니다.  
[여기](https://medium.com/@bluepnume/javascript-tree-shaking-like-a-pro-7bf96e139eb7){:target="_blank"}에서 나무 흔들기(트리셰이킹)에 대한 자세한 내용을 읽을 수 있습니다.  
사용하지 않는 npm 패키지를 제거하려면 `npm prune` 명령을 사용할 수 있습니다.  
더 많은 정보는 [NPM 문서](https://docs.npmjs.com/cli/v6/commands/npm-prune){:target="_blank"}에서 읽을 수 있습니다.

## 2. 가능할 때마다 캐시

캐싱은 대기 시간과 네트워크 트래픽을 줄여서 리소스 표현을 표시하는 데 필요한 시간을 줄여 웹 사이트의 속도와 성능을 향상시킵니다.  
이는 [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache){:target="_blank"} 또는 [HTTP 캐싱](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching){:target="_blank"}의 도움으로 달성 할 수 있습니다.  
콘텐츠가 변경되면 어떻게 될지 궁금 할 것입니다.  
위의 캐싱 메커니즘은 새 콘텐츠 게시와 같은 특정 조건이 충족 될 때 캐시를 처리하고 다시 생성 할 수 있습니다.

## 3. 메모리 누수 방지

고수준 언어이기 때문에 JS는 메모리 관리와 같은 여러 저수준 관리를 돌봅니다.  
가비지 수집은 대부분의 프로그래밍 언어에서 일반적인 프로세스입니다.  
일반 용어의 가비지 수집은 단순히 개체에 할당되었지만 현재 프로그램의 어떤 부분에서도 사용되지 않는 메모리를 수집하고 해제하는 것입니다.  
C와 같은 프로그래밍 언어에서 개발자는 `malloc()` 및 `dealloc()` 함수를 사용하여 메모리 할당 및 할당 해제를 처리해야합니다.

가비지 콜렉션은 JavaScript에서 자동으로 수행되지만 완벽하지 않은 특정 인스턴스가있을 수 있습니다.  
JavaScript ES6에서 `Map`과 `Set`는 "약한"형제와 함께 도입되었습니다.  
`WeakMap` 및 `WeakSet`으로 알려진이 "약한"대응 물은 객체에 대한 "약한"참조를 보유합니다.  
참조되지 않은 값이 가비지 수집되도록하여 메모리 누수를 방지합니다.  
`WeakMaps`에 대한 자세한 내용은 [여기](https://blog.bitsrc.io/understanding-weakmaps-in-javascript-6e323d9eec81){:target="_blank"}에서 읽을 수 있습니다.

## 4. 루프를 조기에 끊으십시오.

큰주기를위한 루핑은 확실히 많은 귀중한 시간을 소비 할 수 있습니다.  
그렇기 때문에 항상 루프를 일찍 벗어나려고 노력해야합니다.  
`break` 키워드 및 `continue` 키워드를 사용하여 이를 수행 할 수 있습니다.  
가장 효율적인 코드를 작성하는 것은 귀하의 책임입니다.

아래 예제에서 루프를 중단하지 않은 경우 코드는 분명히 오버로드 상태 인 루프를 1000000000 번 실행합니다.

```javascript
let arr = new Array(1000000000).fill('----');
arr[970] = 'found';
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 'found') {
        console.log("Found");
        break;
    }
}
```

아래 예에서 루프가 조건과 일치하지 않을 때 `continue`하지 않은 경우에도 함수를 1000000000 번 실행하게됩니다.  
배열 요소가 짝수 위치에있는 경우에만 처리합니다.  
이것은 루프 실행을 거의 절반으로 줄입니다.

```javascript
let arr = new Array(1000000000).fill('----');
arr[970] = 'found';
for (let i = 0; i < arr.length; i++) {
  if(i%2!=0){
        continue;
    };
    process(arr[i]);
}
```

[여기](https://www.oreilly.com/library/view/high-performance-javascript/9781449382308/ch04.html){:target="_blank"}에서 루프 및 성능에 대해 자세히 알아볼 수 있습니다.

## 5. 변수가 계산되는 횟수 최소화

변수가 계산되는 횟수를 줄이기 위해 클로저를 사용할 수 있습니다.  
평범한 용어로 JavaScript의 클로저는 내부 함수에서 외부 함수 범위에 대한 액세스를 제공합니다.  
함수가 호출되지 않고 생성 될 때마다 클로저가 생성됩니다.  
내부 함수는 외부 함수가 반환 된 후에도 외부 범위의 변수에 액세스 할 수 있습니다.

이 작업을 확인하기 위해 두 가지 예를 살펴 보겠습니다.  
이러한 예는 Bret의 블로그에서 영감을 받았습니다.

```javascript
function findCustomerCity(name) {
  const texasCustomers = ['John', 'Ludwig', 'Kate']; 
  const californiaCustomers = ['Wade', 'Lucie','Kylie'];
  
  return texasCustomers.includes(name) ? 'Texas' : 
    californiaCustomers.includes(name) ? 'California' : 'Unknown';
};
```

위의 함수를 여러 번 호출하면 새 객체가 생성 될 때마다 모든 호출에 대해 메모리는 `texasCustometrs` 및 `californiaCustomers` 변수에 불필요하게 재 할당됩니다.

클로저가있는 솔루션을 사용하면 변수를 한 번만 인스턴스화 할 수 있습니다.  
아래 예를 살펴 보겠습니다.

```javascript
function findCustomerCity() {
  const texasCustomers = ['John', 'Ludwig', 'Kate']; 
  const californiaCustomers = ['Wade', 'Lucie','Kylie'];
  
  return name => texasCustomers.includes(name) ? 'Texas' : 
    californiaCustomers.includes(name) ? 'California' : 'Unknown';
};
let cityOfCustomer = findCustomerCity();
cityOfCustomer('John');//Texas
cityOfCustomer('Wade');//California
cityOfCustomer('Max');//Unknown
```

위의 예에서 클로저의 도움으로 `cityOfCustomer` 변수로 반환되는 내부 함수는 외부 함수 `findCustomerCity()`의 상수에 액세스 할 수 있습니다.  
그리고 내부 함수가 매개 변수로 전달 된 이름으로 호출 될 때마다 상수를 다시 인스턴스화 할 필요가 없습니다.  
클로져에 대해 자세히 알아 보려면 [Prashant의이 블로그 게시물](https://medium.com/@prashantramnyc/javascript-closures-simplified-d0d23fa06ba4){:target="_blank"}을 살펴 보시기 바랍니다.

## 6. DOM 액세스 최소화

DOM에 액세스하는 것은 다른 JavaScript 문에 비해 느립니다.  
레이아웃 다시 그리기를 트리거하는 DOM을 변경하면 상황이 상당히 느려질 수 있습니다.

DOM 요소에 액세스하는 횟수를 줄이려면 한 번 액세스하고 로컬 변수로 사용하십시오.  
필요가 완료되면 변수 값을 `null`로 설정하여 제거해야합니다.  
이렇게하면 가비지 수집 프로세스가 수행 될 수 있으므로 메모리 누수가 방지됩니다.

## 7. 파일 압축

Gzip과 같은 압축 방법을 사용하여 JavaScript 파일의 파일 크기를 줄일 수 있습니다.  
이러한 작은 파일은 브라우저가 더 작은 자산을 다운로드해야하므로 웹 사이트 성능이 향상됩니다.

이러한 압축은 파일 크기를 최대 80 %까지 줄일 수 있습니다.  
[여기](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip){:target="_blank"}에서 압축에 대해 자세히 알아보십시오.

## 8. 최종 코드 축소

어떤 사람들은 축소와 압축이 동일하다고 생각합니다.  
그러나 반대로 그들은 다릅니다.  
압축에서 특수 알고리즘은 파일의 출력 크기를 변경하는 데 사용됩니다.  
축소시 JavaScript 파일의 주석 및 추가 공백을 제거해야합니다.  
이 프로세스는 온라인에서 찾을 수있는 많은 도구와 패키지를 사용하여 수행 할 수 있습니다.  
축소는 페이지 최적화를위한 표준 관행이되었으며 프런트 엔드 최적화의 주요 구성 요소가되었습니다.

축소는 파일 크기를 최대 60 %까지 줄일 수 있습니다.  
[여기](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations){:target="_blank"}에서 축소에 대해 자세히 알아볼 수 있습니다.

## 9. throttle 및 debounce 사용

이 두 가지 기술을 사용하면 코드에서 이벤트를 처리해야하는 횟수를 엄격하게 적용 할 수 있습니다.

제한은 함수가 초과 근무를 호출 할 수있는 최대 횟수를 지정하는 곳입니다.  
예를 들어, "1000 밀리 초마다 한 번만 onkeyup 이벤트 기능을 실행하십시오".  
즉, 초당 20 개의 키를 입력하면 이벤트가 1 초에 한 번만 발생합니다.  
이렇게하면 코드에 대한 부하가 줄어 듭니다.

반면에, 디바운싱은 동일한 함수를 이전에 실행 한 이후로 함수가 다시 실행되는 최소 기간을 지정하는 곳입니다.  
즉, "호출되지 않고 600 밀리 초가 지나야 만이 함수를 실행하라".  
이는 동일한 함수의 마지막 실행 이후 600 밀리 초가 경과 할 때까지 함수가 호출되지 않음을 의미합니다.  
스로틀 링 및 디 바운싱에 대한 자세한 내용은 [다음](https://css-tricks.com/the-difference-between-throttling-and-debouncing/){:target="_blank"}을 참조하십시오.

자체 디바운스 및 스로틀 기능을 구현하거나 [Lodash](https://lodash.com/){:target="_blank"} 및 [Underscore](http://underscorejs.org/){:target="_blank"}와 같은 라이브러리에서 가져올 수 있습니다.

## 10. Delete 키워드 사용 금지

delete 키워드는 개체에서 속성을 제거하는 데 사용됩니다.  
이 삭제 키워드의 성능과 관련하여 몇 가지 불만이있었습니다.  
[여기](https://github.com/googleapis/google-api-nodejs-client/issues/375){:target="_blank"}와 [여기](https://stackoverflow.com/questions/43594092/slow-delete-of-object-properties-in-js-in-v8/44008788){:target="_blank"}에서 볼 수 있습니다.  
향후 업데이트에서 수정 될 예정입니다.

또는 원하지 않는 속성을 `undefined`으로 설정하기 만하면됩니다.

```javascript
const object = {name:"Jane Doe", age:43};
object.age = undefined;
```

Bret에 따르면 삭제 방법이 더 빠른 것으로 알려져 있으므로 Map 객체를 사용할 수도 있습니다.

## 11. 비동기 코드를 사용하여 스레드 차단 방지

JavaScript는 기본적으로 동기식이며 단일 스레드이기도합니다.  
그러나 코드를 계산하는 데 많은 시간이 필요한 경우가있을 수 있습니다.  
본질적으로 동기 적이라는 것은이 코드 조각이 실행이 완료 될 때까지 다른 코드 명령문이 실행되는 것을 차단한다는 것을 의미합니다.  
이렇게하면 전반적인 성능이 저하됩니다.

그러나 우리는 비동기 코드를 구현함으로써 이러한 상황을 피할 수 있습니다.  
비동기 코드는 이전에 콜백 형식으로 작성되었지만 ES6에서 새로운 스타일의 비동기 코드 처리가 도입되었습니다.  
이 새로운 스타일을 `Promise`이라고 불렀습니다.  
[MDN의 공식 문서](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing){:target="_blank"}에서 콜백 및 `Promise`에 대해 자세히 알아볼 수 있습니다.

하지만 기다려...

>JavaScript는 기본적으로 동기식이며 단일 스레드입니다.

단일 스레드에서 실행하면서 비동기 코드를 실행하려면 어떻게해야합니까?  
이것은 많은 사람들이 혼란스러워하는 곳입니다.  
이것은 브라우저 후드에서 실행되는 JavaScript 엔진 덕분에 가능합니다.  
JavaScript 엔진은 JavaScript 코드를 실행하는 컴퓨터 프로그램 또는 인터프리터입니다.  
JavaScript 엔진은 다양한 언어로 작성할 수 있습니다.  
예를 들어, Chrome 브라우저를 구동하는 V8 엔진은 C++로 작성되었으며, Firefox 브라우저를 구동하는 SpiderMonkey 엔진은 C 및 C++로 작성되었습니다.

이러한 JavaScript 엔진은 백그라운드에서 작업을 처리 할 수 있습니다.  
[Brian에 따르면](https://dev.to/steelvoltage/if-javascript-is-single-threaded-how-is-it-asynchronous-56gd){:target="_blank"} 호출 스택은 Web API의 기능을 인식하고 브라우저에서 처리하도록 넘겨줍니다.  
이러한 작업이 브라우저에 의해 완료되면 반환되어 콜백으로 스택에 푸시됩니다.

실행하는 브라우저의 도움이 없기 때문에 Node.js에서 어떤 일이 일어나는지 궁금 할 때가 있습니다.  
실제로 Chrome을 구동하는 동일한 V8 엔진이 Node.js도 구동합니다.  
다음은 노드 생태계에서이 프로세스를 설명하는 [Salil의 멋진 블로그 게시물](https://medium.com/better-programming/is-node-js-really-single-threaded-7ea59bcc8d64){:target="_blank"}입니다.

## 12. 코드 분할 사용

Google Light House에 대한 경험이 있다면 '첫 번째 콘텐츠가있는 페인트(first contentful paint)'라는 측정 항목에 익숙할 것입니다.  
Lighthouse 보고서의 성능 섹션에서 추적되는 6 가지 메트릭 중 하나입니다.

FCP (First Contentful Paint)는 사용자가 페이지를 탐색 한 후 브라우저가 DOM 콘텐츠의 첫 번째 부분을 렌더링하는 데 걸리는 시간을 측정합니다.  
페이지의 이미지, 흰색이 아닌 `<canvas>` 요소 및 SVG는 DOM 콘텐츠로 간주됩니다.  
iframe 내부의 내용은 포함되지 않습니다.

더 높은 FCP 점수를 얻는 가장 좋은 방법 중 하나는 코드 분할을 사용하는 것입니다.  
코드 분할은 처음에 필요한 모듈 만 사용자에게 보내는 기술입니다.  
이것은 처음에 전송 된 페이로드의 크기를 줄임으로써 FCP 점수에 큰 영향을 미칩니다.

웹팩과 같은 인기있는 모듈 번 들러는 코드 분할 기능을 제공합니다.  
네이티브 ES 모듈의 도움을 받아 개별 모듈을로드 할 수도 있습니다.  
[여기](https://blog.bitsrc.io/understanding-es-modules-in-javascript-a28fec420f73){:target="_blank"}에서 네이티브 ES 모듈에 대해 자세히 읽을 수 있습니다.

## 13. async(비동기) 및 defer(지연)을 사용하라.

현대 웹 사이트에서 스크립트는 크기가 더 크고 처리 시간이 더 많이 소요되는 HTML보다 더 집약적입니다.  
기본적으로 브라우저는 스크립트가 다운로드 될 때까지 기다렸다가 실행 한 다음 나머지 페이지를 처리해야합니다.

이로 인해 부피가 큰 스크립트가 웹 페이지로드를 차단할 수 있습니다.  
이를 피하기 위해 JavaScript는 비동기 및 지연이라는 두 가지 기술을 제공합니다.  
이러한 속성을 `<script>` 태그에 추가하기만하면 됩니다.

비동기는 렌더링에 영향을주지 않고 스크립트를로드하도록 브라우저에 지시하는 곳입니다.  
즉, 페이지는 비동기 스크립트를 기다리지 않고 내용이 처리되고 표시됩니다.

지연은 렌더링이 완료된 후 브라우저에 스크립트를로드하도록 지시하는 곳입니다.  
두 가지를 모두 지정하면 최신 브라우저에서 비동기가 우선하는 반면, 비동기는 지원하지 않고 지연을 지원하는 이전 브라우저는 지연으로 대체됩니다.

이 두 속성은 페이지로드 시간을 줄이는 데 크게 도움이됩니다.  
[Flavio의이 블로그 게시물](https://flaviocopes.com/javascript-async-defer/){:target="_blank"}을 읽어 보시기 바랍니다.

## 14. 웹 작업자를 사용하여 백그라운드에서 CPU 집약적 인 작업 실행

웹 워커를 사용하면 백그라운드 스레드에서 스크립트를 실행할 수 있습니다.  
매우 집약적 인 작업이있는 경우 사용자 인터페이스를 방해하지 않고 작업을 실행할 웹 작업자에게 할당 할 수 있습니다.  
생성 후 웹 워커는 해당 코드에서 지정한 이벤트 핸들러에 메시지를 게시하여 JavaScript 코드와 통신 할 수 있습니다.  
그 반대의 경우도 마찬가지입니다.

웹 워커에 대해 더 알고 싶다면 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers){:target="_blank"}를 살펴 보는 것이 좋습니다.