---
title: 1.1.1 필립 로버츠의 이벤트 루프 강의
layout: post
date: '2020-09-27 20:48:00'
categories:
- js
---

## 1.1.1 필립 로버츠의 이벤트 루프 강의

자바스크립트의 이벤트 루프가 도대체 무엇일까요.  
자바스크립트라는 것은 실제로 어떻게 작동할까요? 정확히 이해하고 있는 사람 있을까요?  
V8 이라는 단어는 들어봤지만, 크롬의 런타임에 대해서는 정확히 무엇을 의미하는지 몰랐습니다.  

**싱글 스레드라고 했는데, 분명 난 콜백을 사용하고 있다...? 뭘까?**  
콜백은 실제로 어떻게 작동하는 걸까?  
그래서 난 열심히 읽고, 조사하고, 실제 브라우저에서 실험하는 일련의 여정을 시작했습니다.  

이렇게요.  
"자바스크립트 넌 도대체 뭐니?"  
대답은 이랬죠.  
"저는 싱글스레드 논 블로킹 비동기 동적 언어입니다."  

음.. 좋아. "저는 콜스택과 이벤트 루프, 콜백 큐 그리고 API나 뭐 그런 것들을 가지고 있어요"  
... 음.. 좋아. 저는 컴퓨터 전공자가 아닙니다.  
그러다보니 이런 것들은 그냥 단어에 지나지 않았어요.  
V8이나 런타임, 다양한 브라우저를 들어보긴 했었죠.  
그래서 V8에게 너도 콜스택, 이벤트루프, 콜백 큐, 뭐 그런것들을 가지고 있냐고 물어봤더니, 이렇게 대답하더군요.  

"제가 콜스태과 힙을 가지고 있긴한데.. 다른건 도대체 뭡니까?"  

좋아. 재밌군.. 뭐 그렇게 18개월을 보냈고, 이제 꽤 이해했다는 생각이 들었습니다.  
이것이 제가 오늘 발표할 내용입니다.

---

처음 접하는 분들에게 자바스크립트는 다른 언어와 비교하여 왜 이렇게 이상하고 콜백이라는 것이 종종 지옥을 만들면서도 왜 중요하고 꼭 필요한지 
이해하시는데 도움이 되었으면 합니다.  
한편으로 자바스크립트에 익숙한 분들에게는 자바스크립트 런타임에 대해 다시한번 생각하는 기회가 되었으면 좋겠네요.  
크롬의 V8 같은 실제 자바스크립트 런타임을 들여다 보겠습니다.

![](/static/img/script/image02.jpg)

이건 자바스크립트 런타임을 단순화해본 것인데요, 메모리 할당이 일어나는 힙과 콜스택이 보입니다.  
그런데 V8 프로젝트를 클론해서 코드 베이스를 들여다 보면 `setTimeout`이나 `DOM`, `HTTP 요청`을 관리하는 코드들은 찾아볼 수 없습니다.  
놀라웠어요.  
비동기 코딩에서 가장 먼저 생각하는 것들이잖아요?  
그런데 V8 소스에 그런 내용은 없죠.  
재밌네요.  

![](/static/img/script/image03.jpg)

18개월 동안의 조사 끝에 만들어낸 이 그림이 사실 제가 오늘 전달하고 이해를 도우려 하는 것들입니다.  
그림을 보시면 V8 런타임과 브라우저가 제공하는 웹 API가 있습니다.  
브라우저는 DOM, AJAX, setTimeout 등과 함께 그 유명한 event loop와 콜백 큐를 가지고 있습니다.  
아마 단어들은 많이 들어보셨을 거에요. 

하지만, 이것들이 어떤식으로 연결되어 움직이는지는 정확하게 이해하시는 분들이 많지 않을 겁니다.  

![](/static/img/script/image04.jpg)

그래서 저는 어떤 분들에게는 새롭고 어떤 분들에게는 그렇지 않겠지만, 최대한 빠르게 기본적인 것부터 짚어가겠습니다.  
잘 아시는 분들은 잠시만 참아주세요.  

---

**자바스크립트는 싱글 스레드 프로그래밍 언어입니다.**  
**싱글 스레드 런타임**을 가지고 있다는 말인데 이것은 결국 한번에 하나의 싱글 콜스택만을 가지고 있다는 말입니다.  
그게 싱글 스레드의 의미겠죠.  
하나의 프로그램은 동시에 하나의 코드만 실행할 수 있다는 것입니다.  

![](/static/img/script/image05.jpg)

그럼 이걸 시각화해서 무엇을 의미하는지 살펴보겠습니다.  
왼쪽 코드를 보시면, 함수가 몇 개 보입니다.  
두 수를 곱해주는 multiply 라는 함수, multiply 함수를 호출하여 같은 수를 곱하는 square(제곱) 함수, 
한 숫자를 받아서 square 함수를 호출한 뒤 결과를 console.log 로 보여주는 함수도 있습니다.  
그리고 맨 마지막에는 제곱을 보여주는 printSquare 를 호출하고 있네요.  
다들 이해하실 겁니다.  

쉽죠?  
좋습니다.  
이제 이 함수를 실행시켜보죠.  
죄송합니다.  
설명을 빠트린 것이 있네요. 

**콜 스텍은 데이터 스트럭처로 실행되는 순서를 기억하고 있습니다.**  
함수를 실행하려면 스택에 해당하는 함수를 집어넣게 되는데 함수에서 리턴이 일어나면 스택의 가장 위쪽에서 해당 함수를 꺼내게 됩니다.  
이게 콜 스택이 하는 일의 전부죠.  

1. 이 코드를 실행하면 실행되는 코드 자체를 말하는 메인 함수를 스택에 집어넣게 됩니다.  
   
   ![](/static/img/script/image06.jpg)

2. 그러면 이제 함수들을 정의하게 됩니다. 현재 우리가 가지고 있는 것들을 정의한다고 볼 수 있겠네요.    
   
   ![](/static/img/script/image07.jpg)

3. 그리고 마지막에 가서 printSquare를 만나게 됩니다. printSquare(4)는 함수 호출이니, 스택에 함수를 추가합니다.  
   
   ![](/static/img/script/image08.jpg)

4. 그러면 바로 printSquare를 호출하게 되겠네요. 스택에 printSquare가 추가되고,  
   
   ![](/static/img/script/image09.jpg)

5. 그러면 바로 square를 호출하게 되겠네요. 스택에 square가 추가되고,  
   
   ![](/static/img/script/image10.jpg)
   
6. 이제 square는 multiply를 호출합니다. 이제 리턴절을 만나서 a와 b를 곱한 결과를 반환합니다.  
   
   ![](/static/img/script/image11.jpg)

7. 무엇인가를 리턴할 때마다 우리는 스택 맨 위에 있는 것을 꺼내게 됩니다. multiply에서 square로 리턴되고,  
   
   ![](/static/img/script/image12.jpg)
   
8. 다시 printSquare 까지 돌아옵니다. console.log를 실행하겠네요. 여기에 리턴은 보이지않지만, 암묵적으로 리턴합니다.  
   함수의 마지막 줄에 도달했기 때문이죠. 자 이제 다 끝났습니다.
   
   ![](/static/img/script/image13.jpg)
   ![](/static/img/script/image14.jpg)
   ![](/static/img/script/image15.jpg)
   
이것이 바로 콜스택입니다.  
이해가 되셨나요?  
콜 스택을 그림으로 그려보시지 않았다고 하더라도 브라우저에서 개발을 하시다보면 어느정도 이해하셨을거라고 생각합니다.

![](/static/img/script/image16.jpg)
![](/static/img/script/image17.jpg)

baz가 호출하는 함수 bar, 그리고 bar가 호출하는 foo 함수가 위와같이 에러를 만들게 된다면, 크롬 개발자 도구에서는 이런식으로 스택의 꼬리를 물면서 Oops! 를 표시하게 될겁니다.  
에러가 발생한 스택의 상태를 보여주는 것이죠.  
**uncaught error**는 foo 에서 생겼는데 bar가 호출했고 bar는 또 baz에게서.. 이런식으로 익명함수 즉 **main 함수**까지 올라가게 됩니다.  

![](/static/img/script/image18.jpg)

---

**스택을 날려먹었다는 용어를 들어보셨나요?**  
좋은 예시 하나를 보여드리려고 합니다.  
foo 함수를 호출하는 foo 함수가 있다면 어떻게 될까요?  

1. main 함수가 foo를 호출합니다.  
2. foo 함수는 foo 함수를 호출하는 foo 함수를 호출하는 foo 함수를 호출하게 되죠...  
   
   ![](/static/img/script/image19.jpg)

3. 그리고 크롬이 이렇게 말하죠. "스스로를 호출하는 foo 함수를 16,000번이나 계속하신건 아니겠죠?"   
   "이 녀석들을 중지 시킬게요. 버그를 고쳐주세요." 그렇겠죠?
   
   ![](/static/img/script/image20.jpg)
   
콜 스택이라는 측면을 설명하고 있긴 하지만, 이 역시 개발하시다보면 이미 겪어 보셨을 겁니다.  

---

**그럼 이제 중요한 질문이 생깁니다. 느려진다는 것은 어떤 것인가?**

![](/static/img/script/image21.jpg)

블로킹 혹은 블로킹 현상에 대해서 이야기하긴 하지만, **블로킹이라는 것에 대한 정확한 정의는 존재하지 않습니다. 그저 느리게 동작하는 코드일 뿐입니다.**  
`console.log` 자체는 느리지 않습니다.  
하지만 `while 루프` 안에서 수십억번 실행된다면 느리겠죠.  
네트워크 요청이나 이미지 프로세싱은 느립니다.  

**<span style="color:red">느린 동작이 스택에 남아있는 것을 보통 블로킹이라고 말하게 됩니다.</span>**  

예를 하나 들어보겠습니다.  
이런 코드가 있다고 가정해보죠.  

![](/static/img/script/image22.jpg)

동기적으로 AJAX 요청을 보내는 jQuery 함수 getSync가 있다고 한다면, 어떤식으로 동작하게 될까요?  
일단 비동기 콜백은 잊어버리세요.  
동기적으로 작동한다고 생각해봅시다.  

1. 이 코드를 한줄한줄 실행해보죠. getSync를 호출하면 응답을 기다리게 됩니다.  
   
   ![](/static/img/script/image23.jpg)
   ![](/static/img/script/image24.jpg)
   
   네트워크 요청은 컴퓨터 입장에서는 꽤 느립니다.  
   성공했다고 간주하겠습니다.
   
2. 그러면 다음 줄로 넘어가고 다시 기다립니다. 넘어가고 기다리고. 넘어가고 기다리고.  
   안 끝날 수도 있죠. 하지만 끝났다고 가정해보죠. 이 세가지 행동이 드디어 다 끝났습니다.
   
   ![](/static/img/script/image25.jpg)
   ![](/static/img/script/image26.jpg)
   
3. 이제 스택을 지울 수 있겠네요.  
   
   ![](/static/img/script/image27.jpg)
   ![](/static/img/script/image28.jpg)
   ![](/static/img/script/image29.jpg)
   
프로그래밍 언어에서 싱글 스레드라고 하는 것은 **루비 같은 언어와는 달리 여러 개의 스레드를 사용하지 않는다는 의미입니다.**  
네트워크 요청을 하고는 마냥 끝날때까지 기다립니다.  
그거 말고는 방법도 없어요.  

![](/static/img/script/image30.jpg)

문제가 뭐냐고요?  
웹 브라우저에서 코드가 실행되고 있기 때문입니다.  
자 이제 그럼... 잠시만요, 크롬 브라우저를 실행시켰습니다.  

```javascript
var foo = $.getSync('//foo.com');
var bar = $.getSync('//bar.com');
var qux = $.getSync('//qux.com');

console.log(foo);
console.log(bar);
console.log(qux);
```

이 코드를 실행시켜볼건데요, 브라우저는 실제로 ajax 요청을 동기적으로 실행시키지 않습니다.  
그래서 저는 이걸 동기적으로 실행하는 `while 루프` 안에 넣고 5초 동안 가상으로 동작하는 코드를 만들었습니다.  
콘솔을 열면 실제로 무엇이 일어나는지 볼 수 있겠네요.  

![](/static/img/script/image31.jpg)

foo.com에 요청을 하고 있는 동안 아무것도 클릭할 수 없습니다.  
왜 그런걸까요?  
좀 전에 클릭한 Run 버튼조차 리-렌더링을 끝내지 못했네요.  
브라우저가 멈췄어요.  
브라우저는 모든 리퀘스트가 완료될 때까지 멈춰있을 겁니다.  

![](/static/img/script/image32.jpg)

그리고 나서는 이런 심각한 문제들이 나타납니다.  
멈춰있는 동안 행동을 기억하고 있었지만 그릴 수, 렌더링할 수 없었습니다.  
아무것도 할 수 없었죠.  
왜냐하면 콜스택에 어떤 것들이 남아 있으면... 오, 아직도 뭔가 실행하네요.  
**동기적으로 실행되는 네트워크 요청이 콜 스택을 블로킹하여 브라우저는 다른 일들을 할 수 없었습니다.**  
렌더링이나 다른 코드를 실행하지 못하고 그냥 멈춰버렸죠.  

**<span style="color:red">별로네요, 유려한 UI를 만들려고 한다면, 콜스택을 멈추게 해서는 안되겠죠.</span>**

---

![](/static/img/script/image33.jpg)

그러면 어떻게 해결해야 할까요?  
제일 쉽게 접할 수 있는 건 **비동기 콜백**입니다.  
**<span style="color:red">브라우저 혹은 노드에는 블로킹 함수가 거의 없습니다.</span>**  
대부분 비동기로 만들어졌죠.  
**이는 어떤 코드를 실행하면 결국 콜백을 받고 이걸 나중에 실행한다는 말입니다.**  
자바스크립트를 해보셨다면 비동기 콜백들은 다들 경험해보실겁니다.  

그러면 이것들은 실제로 어떤식으로 실행될까요?  
예를 들어보겠습니다.  
이런 코드가 있습니다.

```javascript
console.log('Hi');

setTimeout(function () {
    console.log('There');
}, 5000);

console.log('JSConfEU');
```

setTimeout을 사용하여 console.log로 There를 출력하도록하면 console.log는 큐에 등록되고 JSConf를 먼저 출력합니다.  
5초 뒤에 There를 찍게 됩니다.  
그렇죠?  

이렇게 setTimeout이 뭔가를 실행하고 있습니다.  
그러면서 지금까지 다뤄왔던 스택상에서는 어떻게 실행되는 것일까요?  
console.log hi를 출력하고 setTimeout을 실행합니다.

![](/static/img/script/image34.jpg)
![](/static/img/script/image35.jpg)
![](/static/img/script/image34.jpg)

아시다시피 바로 실행되지 않습니다.  
5초 안에 실행되겠죠.  
**스택에 추가되지 않고, 어떻게인지는 모르겠지만 그냥 사라져버립니다.**  
**아직 설명할 방법이 없네요.**  
곧 알게 될겁니다.  

![](/static/img/script/image36.jpg)

다음 JSConfEU를 출력합니다.  
그리고 5초 후, 마법처럼 console.log('There')가 스택에 나타납니다.  
이떻게 된걸까요?

![](/static/img/script/image37.jpg)
![](/static/img/script/image38.jpg)
![](/static/img/script/image39.jpg)

여기에서 이벤트 루프와 동시성이 역할을 하게 됩니다.  
**저는 자바스크립트는 한번에 하나의 일만 할 수 있다고 이야기했습니다. 거짓말일까요?**  
**물론 사실입니다. 자바스크립트는 한번에 하나밖에 할 수 없습니다.**  
자바스크립트는 다른 코드를 실행시키는 동안 Ajax 요청을 실행할 수 없습니다.  
setTimeout 역시 마찬가지죠.  

하지만 우리가 이걸 동시에 할 수 있는 이유는 브라우저는 단순 런타임 이상을 의미하기 때문입니다.  

![](/static/img/script/image03.jpg)

이 그림이 기억나시나요?  
자바스크립트 런타임은 한번에 하나만 할 수 있습니다.  
하지만 브라우저가 Web API와 같은 것들을 제공하죠.  
**이들은 자바스크립트에서 호출할 수 있는 스레드를 효과적으로 지원합니다.**  
여기서 **<span style="color:red">동시성</span>**이 들어오는 것이죠.  

백엔드 개발자시라면, Web API 대신 C++ API를 사용할 뿐이지, Node 또한 다르지 않습니다.  
C++가 숨기고 있죠.  
이제 좀 더 브라우저란 무엇인가를 보여주는 그림을 보면서 알아보겠습니다.

![](/static/img/script/image40.jpg)

이전과 같습니다.  
코드를 실행하면 console 창에 Hi를 출력합니다.  

![](/static/img/script/image41.jpg)

hi를 로깅하죠. 단순합니다. 이제 setTimeout을 호출해서 어떤일이 일어나는지 확인해 보겠습니다.

![](/static/img/script/image42.jpg)
![](/static/img/script/image43.jpg)

이제 콜백 함수와 지연시간을 setTimeout 콜에 넘겨보겠습니다.

![](/static/img/script/image44.jpg)

setTimeout은 브라우저에서 제공하는 API입니다.  
V8 소스코드에 존재하지 않다는걸 기억하시나요?
자바스크립트가 실행되는 런타임 환경에 존재하는 별도의 API입니다.

![](/static/img/script/image45.jpg)
![](/static/img/script/image46.jpg)

브라우저가 타이머를 실행시키고 카운트 다운을 시작합니다.  
이건 setTimeout 호출 자체는 완료되었다는 의미고 우리는 스택에서 함수를 지울 수 있습니다.

![](/static/img/script/image47.jpg)
![](/static/img/script/image48.jpg)

JSConfEU를 출력하고 다시 지워집니다.  
이제 Web API에서 실행하고 있는 타이머가 남았습니다.  

![](/static/img/script/image49.jpg)
![](/static/img/script/image50.jpg)

5초 뒤에 타이머가 종료되겠죠. Web API는 갑자기 작성된 코드에 끼여들 순 없습니다.  
어느 순간 갑자기 스택에 함수를 집어넣던가 하는 것 말이죠.  
**이제 테스크 큐와 콜백 큐가 활약할 차례입니다.**

![](/static/img/script/image51.jpg)

모든 Web API는 작동이 완료되면 콜백을 테스크 큐에 밀어넣습니다.  

![](/static/img/script/image52.jpg)

드디어 이 발표의 제목이기도 한 **<span style="color:red">이벤트 루프</span>**에 다달았습니다.  
**<span style="color:red">이벤트 루프</span>**란 무엇일까요?  
이벤트 루프는 이 전체 시스템에서 아주 단순한 일을 하는 작은 파트입니다.  
이벤트 루프의 역할은 콜스택과 테스크 큐를 주시하는 것입니다.  
스택이 비어있으면, 큐의 첫번째 콜백을 스택에 쌓아 효과적으로 실행할 수 있게 해줍니다.  
보시는 바와 같이 스택이 비어있고, 테스크 큐에는 콜백이 하나 있네요.  
이벤트 루프는 "어, 내가 할 일이 있네, 자 이거 받아"하며 콜백을 스택에 넣어줍니다.  

![](/static/img/script/image53.jpg)

스택은 자바스크립트 영지라는 걸 기억하세요.  
이제 V8 엔진으로 돌아가서 console.log('there')를 실행합니다.  
이해가 되시나요?  

![](/static/img/script/image54.jpg)
![](/static/img/script/image55.jpg)

좋습니다.  
이제 여러분들은 자바스크립트 비동기 함수가 어떤식으로 동작하는지 아시게 되었을 겁니다.  
특히 무엇인가 알수없는 문제가 생겼을 때 setTimeout 0을 사용하면 해결될거야 라고 말하는 상황 말이죠.  
음.. 함수를 0초 후에 실행하라고?  
그럼 setTimeout 자체를 왜 하라는건데?  
저와 비슷한 분들은 그러셨을 겁니다.  
되긴 되는 것 같은데, 왜 그런지 모르겠다.  

**일반적으로 이것은 스택이 비어있을 때까지 기다리게 하기 위해서입니다.**  
자바스크립트를 직접 작성해서 실행해보시면 동일한 결과를 얻으실 수 있을 겁니다.  
"hi", "JSConfEU" 그리고 마지막에 "there"가 개발자 콘솔에 나타날겁니다.  
이 코드를 실행해보면서, 작동원리를 알아보죠.  

```javascript
console.log('hi');

setTimeout(function () {
    console.log('there');
}, 0);

console.log('JSConfEU');
```

"hi"를 프린트하고, setTimeout 0이 실행되면 Web API는 바로 종료하고 큐에 콜백을 집어넣습니다.  
이벤트 루프에 대한 것을 기억하시죠?  
이벤트 루프는 스택이 비워질때까지 기다린 후에 큐에 있는 콜백을 스택에 쌓을 수 있습니다.  
스택은 계속해서 실행을 합니다.  
console.log('JSConfEU')를 실행하고 스택이 정리됩니다.  
이제 **이벤트 루프가 개입하여, 콜백을 호출합니다.**  

이것이 setTimeout 0이 코드 실행을 어떤 이유에선가 스택에 마지막까지 지연시키는 이유입니다.  
정확히는 스택이 비워질때까지겠죠.  

---

**모든 이런 종류의 Web API는 동일한 방식으로 동작합니다.**  
**Ajax Request는 URL로 호출할 때 콜백을 함께 실행하게 됩니다.**  
역시 동일하게 작동하게 되죠.

![](/static/img/script/image56.jpg)

console.log('hi')

![](/static/img/script/image57.jpg)

다음 AJAX 요청을 하고 AJAX 요청은 자바스크립트 런타임이 아니라, 브라우저 Web API에서 실행됩니다.  
이제 XHR Web API가 실행되는 동안 다른 코드는 정상적으로 실행할 수 있습니다.

![](/static/img/script/image58.jpg)
![](/static/img/script/image59.jpg)
![](/static/img/script/image60.jpg)

XHR 요청이 끝날때까지, 끝나지 않을 수도 있습니다.  
그래도 상관없습니다.

![](/static/img/script/image61.jpg)

스택은 계속해서 코드를 실행할 수 있습니다.  
XHR 실행이 완료되었다면 콜백은 큐에 쌓이게 되고, 

![](/static/img/script/image62.jpg)

이벤트 루프에 의해서 실행됩니다.  
이 과정이 비동기 함수가 호출되는 방식입니다.

![](/static/img/script/image63.jpg)
![](/static/img/script/image64.jpg)

---

자, 그럼 진짜 복잡한 예제를 실행해보죠.  
잘 실행되면 좋겠네요.

![](/static/img/script/image65.jpg)

여러분이 눈치 채셨는지 모르겠지만, 이 모든건 키노트로 작성되었습니다.  
그래서 여기에 500개의 애니메이션을..

(대충 슬라이드 반을 날렸는데, 다시 만들기 빡세서 다른 예제로 대체한다는 내용)

![](/static/img/script/image66.jpg)

```javascript
console.log('Started');

$.on('button', 'click', function onClick() {
    console.log('Clicked');
})

setTimeout(function onTimeout() {
    console.log('Timeout Finished');
}, 5000);

console.log('Done');
```

addEventListener, setTimeout 등을 기준으로 shim을 해서 콘솔에 보여주는 겁니다.  

1. console.log('Started')가 콜스텍에 쌓인다.
2. 콘솔창에 Started를 찍고 콜스텍에서 console.log('Started')는 없어진다. (동기적)
3. $.on('button', 'click', ...)이 콜스텍에 쌓인다.
4. 그리고 Web APIs로 보내진다.
5. 그 다음엔 setTimeout이 콜스텍에 쌓인다.
6. setTimeout의 콜백펑션인 timeout이 Web APIs로 보내지고 시간을 체크한다.
7. console.log('Done')이 콜 스텍에 쌓인 후 Done을 콘솔창에 찍은 후 콜스텍에서 제거된다. 
8. Web APIs의 시칸체크가 끝나면 setTimeout의 콜백함수가 테스크 큐에 들어간다.
9. 이벤트 루프가 콜스텍에 쌓인 스텍이 아무것도 없으면 테스크 큐에 쌓여있는 콜백함수를 콜스택으로 넘긴다.  
10. setTimeout의 콜백함수 안의 console.log('Timeout Finished')가 콜스텍에 더 쌓인다.
11. 그리고 콘솔창에 Timeout Finished를 찍고 제거된다.
12. setTimeout의 콜백함수도 콜스텍에서 제거된다.
13. 버튼을 클릭하면 Web APIs에 있던 버튼 클릭시 실행되는 콜백함수가 테스크 큐로 넘어가고,
14. 이벤트 루프가 이를 콜스택으로 넘깁니다.  
15. 그 후에 클릭시 실행되어야하는 콜백함수가 호출하는 console.log('Clicked')도 콜스텍에 쌓입니다.
16. Clicked를 콘솔창에 찍은 후 console.log('Clicked')는 제거되고, 이를 불러왔던 콜백함수(onClick)도 콜스텍에서 사라진다.
17. 만약 클릭을 100번연속한다면, 클릭으로 인해 실행되어야 하는 콜백함수는 테스크큐에 쌓이고, 콜백함수 하나씩 하나씩 이벤트 루프를 통해 
    콜스텍으로 넘어간 후 실행된다.  
    콜스텍에서 실행되고 스텍이 다 없어져야 다시 콜백함수가 이벤트루프를 통해 넘어간다.  
    클릭하면 그 함수는 곧바로 실행되는게 아니고, 큐에 쌓인 후, 그 후에 차례대로 처리됩니다.
    
**[이벤트 루프 예시사이트](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D){:target="_blank"}**

또 다른 예시들도 보여드릴게요.  
실제로 맞닥뜨리실만한 상황들이지만, **<span style="color:red">여러분이 Async API와 관련해서 생각하시지 못했을 부분들에 대해 말씀드릴게요.</span>**

```javascript
setTimeout(function timeout () {
    console.log('hi');
}, 1000)

setTimeout(function timeout () {
    console.log('hi');
}, 1000)

setTimeout(function timeout () {
    console.log('hi');
}, 1000)

setTimeout(function timeout () {
    console.log('hi');
}, 1000)
```

만약 1분 딜레이가 설정된 setTimeout을 4번 호출하고, hi를 콘솔에 찍는다면 콜백이 큐에 쌓인 후 네번째 콜백이 1초후에 실행되어야 함에도 불구, 그러지 않고 여전히 실행되지 않고 있다는 것을 알 수 있다.  
**이걸 보면 timeout(콜백펑션)이 실제로 정해진 시간과는 달리 제대로 작동하지 않을 수도 있고 다만 딜레이되는 최소의 시간만을 지정할 수 있다는 것을 알 수 있습니다.**  
**마치 0초로 설정된 코드가 바로 실행되지 않는 것 처럼요.**  
대신 차례를 기다린 후 실행되죠.  
그렇죠?  

```javascript
// synchronous
[1,2,3,4].forEach(function (i) { 
    console.log(i);
});

// asynchronous
function asyncForEach(array, cb) {
    array.forEach(function (value) {
        setTimeout(cb(value), 0);
    })
}

asyncForEach([1,2,3,4], function (i) {
    console.log(i);
})
```

이 예시에서는 콜백에 대해서 더 이야기하려고 합니다.  
누구에게 물어보느냐에 따라 다르지만, 콜백은 둘 중에 하나로 묘사됩니다.  

1. 하나는 콜백은 다른 함수가 부르는 함수이다.  
2. 혹은 앞으로 큐에 쌓일 비동기식 콜백이다.

이라고 묘사할 수 있죠.  
여기 이 코드가 그러한 차이의 예시인데, **`forEach` 함수의 경우, 함수를 실행시키기는 합니다.**  
**콜백이라고 할 수는 있지만, 비동기적으로 실행하지는 않죠.**  
**자신의 자체적 스택에서 실행시킵니다.**  

한편 asyncForEach를 하나 선언해서 배열과 콜백을 받아 각 요소에서 setTimeout을 0으로 실행하는 것도 가능합니다.  
값을 하나 넘겨야할 것 같지만... 어쨌든, 실행을 한번 해보고 다른점이 무엇인지 보죠.  

![](/static/img/script/image67.jpg)

첫번째 블록의 경우, 스택을 차지합니다.  
그렇죠?  
실행이 다 끝날 때까지요.  

![](/static/img/script/image68.jpg)

반대로 비동기 버전은 여러개의 콜백을 큐에 쌓을거고, 스택이 비워지면 실제로 쌓이 콜백들이 실행되게 되죠.  
**<span style="color:red">이 예시에서는 콘솔 함수가 금방 실행되서 async의 이점이 잘 드러나지 않지만, 여러분이 각 배열 요소에 대해 
오래 걸리는 처리를 해야한다고 치면,</span>**

```javascript
// synchronous
[1,2,3,4].forEach(function (i) { 
    console.log('processing sync');
    delay();
});

// asynchronous
function asyncForEach(array, cb) {
    array.forEach(function (value) {
        setTimeout(cb(value), 0);
    })
}

asyncForEach([1,2,3,4], function (i) {
    console.log('processing async', i);
    delay();
})
```

식을 위와 같이 바꾸고, 아래처럼 따라 해보세요.  

![](/static/img/script/image69.jpg)

실제 브라우저 repaint 혹은 렌더링 상황을 재연하는 기능인데,(체크하세요.)  
제가 아직 이러한 것들이 렌더링과는 어떤 관계가 있는지 충분히 설명하지 않았는데,  
**브라우저는 여러분이 자바스크립트로 하는 무언가로 인해 제약을 받습니다.**  

**<span style="color:red">브라우저는 기본적으로 화면을 매 16.6 밀리세컨드, 즉 1초에 60 프레임을 repaint하는 게 이상적입니다.</span>**  
그게 제일 빠른 거죠.  
하지만 브라우저는 **여러분이 자바스크립트로 하는 것들로 인해 여러가지 이유로 제약을 받습니다.**  
그래서 **<span style="color:red">스택에 코드가 있으면, 렌더링을 못합니다.</span>**  
**<span style="color:red">렌더도 하나의 콜백처럼 행동하니까요.</span>**  

스택이 비워질 때까지 기다려야 하는 겁니다.  
다른 점이라면, 렌더는 **여러분의 콜백에 비해 더 높은 우선순위를 갖죠**  
매 16ms 마다 큐에 렌더가 들어가고, 스택이 깨끗해진 후에야 렌더링을 합니다.  

그래서 위 렌더 큐가 그 렌더링을 재연한거에요.  
그래서 매 초마다 '렌더해도 될까?' '그래' 하는 식으로, 지금 아무 것도 없기 때문에 진행이 되죠.  

**<span style="color:red">하지만 제가 코드를 실행하면, 우리가 이 느린 동기식 루프를 진행하는동안 렌더는 막히게 됩니다.(블락킹)</span>**  
**렌더가 막히면, 화면의 텍스트를 선택하거나 선택해서 반응을 보거나 하는 게 불가능하죠.**  
이전에 보여드린 예시처럼, 이 예시에서는.. 지금 우리가 async timeout을 큐에 쌓는 동안 스택이 쌓이지만, 상대적으로 빨리 사라지고는 있죠.  
**이때 우리는 렌더에게 각 요소 중간중간에, 렌더가 끼어들 수 있는 기회를 줄 수 있습니다.**  
큐가 async를 통해 쌓였으니까요.  

모두 이해되시나요?  

즉, 이게 렌더링을 재연한 것입니다.  
**<span style="color:red">사람들이 event loop를 막지 말라고 할 때, 바로 이런 현상을 뜻하는 것이죠.</span>**  

**스택에 필요없는 느린 코드를 쌓아서 브라우저가 할 일을 못하게 만들지 말아라, 유동적인 UI를 만들어라.**  
이것이 이미지 처리나 애니메이션이 너무 잦아졌을 때 큐 관리에 주의를 기울이지 않으면 이런 일이 일어나니까요.  
예를 들어서, **<span style="color:red">스크롤 핸들러</span>**를 이용해서,.. 스크롤 이벤트는 DOM에서 매우 자주 일어나죠.

```javascript
function animateSomething() {
    delay();
}

$.on('document', 'scroll', animateSomething);
```

스크롤이 매 프레임에서 매 15ms마다 작동한다고 짐작했을 때, 위 코드를 작성해봤습니다.  
`document.scroll`이 일어날 때 애니메이션을 넣거나 무언가를 하죠.  
이 코드상으론 제가 스크롤을 할 때마다, **큐에 엄청나게 많은 콜백을 쌓습니다.**  
그리고 매번 이걸 처리하면서 각각의 느린 프로세싱이 일어날 때마다, 스택을 채우지는 않지만 **큐를 이벤트로 범람시키죠.**  
그래서 이것을 통해, 제 생각엔, 여러분이 실제로 이 많은 콜백을 작동시킬 때 어떤 일이 일어나는지 눈으로 보고 어떤식으로 대처할지,  
**예를 들어 큐에 이벤트가 쌓이는 것은 어쩔 수 없지만, 매 몇초마다 혹은 유저가 스크롤을 멈출 때까지 작업량을 줄인다든지 하는 결정을 내릴 수 있겠죠.**  

---

제가 준비한 것은 여기까지입니다.  
이것에 관련된 다른 토론들도 아주 많아요.  
코드를 실행할 때, 예를 들어 이 코드는 런타임에서 실행되는데,  
제가 Esprima(자바스크립트 parser)로 이걸 실행하고 매 코드 앞뒤로 while 루프를 실행해서 0.5초씩 걸리게 한다면, 
모든 코드를 슬로우 모션으로 실행해요.  

이걸 웹 워커로 옮기고 이런저런걸 해서 시각화 시키면, 런타임에서 어떤 일이 일어나는지 알 수 있습니다.  
또 다른 많은 이야기를 할 수 있죠.  