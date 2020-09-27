---
title: 1.1.2 Jake Archibald 이벤트 루프 강의
layout: post
date: '2020-09-27 20:50:00'
categories:
- js
---

## 1.1.2 Jake Archibald 이벤트 루프 강의

```javascript
document.body.appendChild(el);
el.style.display = 'none';
```

코딩을 하면서 가장 스트레스 받을 때는 DOM에 무언가를 추가하고 나중에 클릭했을 때 표시되도록 하는 거에요.  
그 요소가 숨겨지기 전에 사용자가 보진 않을까 싶어요.  
문제를 재현할 순 없었지만 혹시 경쟁 상태가 될지 누가 알겠어요.  
그래서 전 항상 위 코드 두줄의 위치를 바꿔놔요.

```javascript
el.style.display = 'none';
document.body.appendChild(el);
```

이렇게 말이죠.  
하지만 사실상 경쟁 상태가 아니죠.  
코드 실행 타이밍이나 렌더링은 정밀하게 정의되어 있고 대개 명확하니까요.  
**<span style="color:red">이벤트 루프</span>** 덕분이에요.  
지금부터 설명해볼게요.

## The Event Loop

`promise` 없이 어떻게 실행 순사가 지켜지는지 설명해볼게요.  
웹 페이지에는 **메인 스레드**라는 게 있어요.  
자바스크립트, 렌더링이 실행되고 DOM이 있는 곳이죠.  
웹의 상당 부분엔 명확한 순서가 있어요.  
**여러 코드가 실행되며 같은 DOM을 편집하려고 하는 등 경쟁상태가 만들어지지 않죠.**  

하지만 메인 스레드 작동에 시간이 오래 걸린다면, 예를 들어 200ms, 사용자 상호작용에선 긴 시간이죠.  
렌더링이나 상호작용(인터렉션)이 느려져서 눈에 띄어요.  
인간으로서는 이해하기 어려워요.  

**왜냐하면 우리는 멀티 스레드거든요.**  
이렇게 서서 한 손을 흔들거나 다리를 들고 다리도 흔들면서 말하고 숨쉬고 듣고 볼 수 있어요.  
인간에겐 메인 스레드나 관련 없는 동작을 막는 장치가 없어요.  
예외가 하나 있는데 재채기죠.  
재채기를 할 때는 다른 걸 못하죠.  
말을 할 수도 없고 표정이 이상해져요.  
운전 중이었다면 누가 안 죽길 바래야죠.  
재채기를 할 때는 인간도 싱글 스레드가 돼요.  
듣지도, 생각하지도 움직이거나 말하지도 못하죠.  
재채기를 하는 동안엔 전혀 제어하지 못해요.  
**재채기가 끝난 후 팔다리가 온전히 붙어있고 아무도 안 치었다면 천만다행이라며 재채기 같은 코드는 피하고 싶겠죠.**  

물론 메인 스레드 외에 다른 스레드로 네트워킹이나 인코딩, 디코딩, 암호화 감시 인풋 장치도 있지만 그런 스레드도 페이지 관련 작업이 끝나면 
메인 스레드에 돌아와 정보를 줘야해요.  

이 모든 걸 **이벤트 루프**가 주관하죠.  

```javascript
setTimeout(callback, ms);
```

setTimeout, 이름이 이상하죠?  
인수 순서도 잘못됐나요?  
제 생각은 그런데 그 원리를 생각해보셨어요?  

웹 표준을 써볼게요.  
요즘 제 일이에요.

>setTimeout(callback, ms)는 실행될 때, 다음과 같은 단계를 밟는다.  
>1. ms 밀리초만큼 기다린다. 
>2. 그리고나서 콜백이 실행된다.
  
위의 설명대로 ms 밀리초를 기다렸다 콜백을 호출하고 싶어요.  
근데 잘 안돼요.  
위와 같은 스펙 텍스트는 호출자와 같은 스레드에 실행되거든요.  
**이 경우 호출자는 메인 스레드의 자바스크립트이죠.**  

만약 5000ms를 기다린다면 5초를 기다리는 동안 많은 작업이 밀립니다.(블로킹)  
재채기 같은 상황이죠.  

--- 

그러니 실행 방식을 **<span style="color:red">병렬</span>**로 바꿀게요.  
**메인 스레드나 다른 스레드에서 다른 것과 동시 실행되도록 말이죠.**  
하지만 메인 스레드 외에서 콜백을 호출하게 되니, 이것도 작동하지 않아요.  
**같은 DOM을 편집하는 자바스크립트가 여럿 동시에 실행되고 말죠.**  
**경쟁 상태가 되어버리고 말아요.**  

---

**<span style="color:red">그래서 작업을 큐로 메인스레드에 돌아가게 해 자바스크립트가 있는 스레드에서 콜백을 호출하게 해요.</span>**  
이게 브라우저 작동의 핵심입니다.  

마우스 클릭이 운영 체제에서 자바스크립트로 어떻게 전달될까요?  
뭔가를 `fetch`하면 자바스크립트의 `response`는요?  
작업이 큐되고 페이지에서 워커로 작업이 다시 큐돼요.  

이벤트 루프의 가장 오래된 부분인 테스크 큐(작업 큐)를 먼저 볼게요.  

## Task Queues

![](/static/img/script/image70.jpg)

위 이벤트 이미지가 돌아가는 속도는 실제 작동 속도보다 훨씬 느린데도 자세히 보기 어려우니까 더 느리게 해볼게요.  

![](/static/img/script/image71.jpg)

작업(테스크)을 큐하면 이벤트 루프가 새 경로를 만들어요.  
브라우저가 이벤트 루프에 작업을 지시하면 이벤트 루프가 목록에 추가했다가 시간이 나면 하게 돼요.  

![](/static/img/script/image72.jpg)

이걸 setTimeout으로 하려면, 콜백을 두 개 큐해서 1,000 밀리초 후 실행하게 해요.  

![](/static/img/script/image73.jpg)

두 알고리즘은 정해진 대로 병행 실행되고 각자 천 밀리초 대기해요.  
그러다 메인 스레드로 돌아오죠.  
작업 큐를 써서요.  

![](/static/img/script/image74.jpg)
![](/static/img/script/image75.jpg)
![](/static/img/script/image76.jpg)

브라우저가 이벤트 루프에 메인 스레드 작업을 시키면 두 작업이 작업 큐에 추가되고 첫 콜백이 이벤트 루프를 지나고 두번째 콜백도 지나게 됩니다.  
그게 테스크(작업)입니다.  

이게 다라면 쉽겠지만, 브라우저가 화면에 업데이트할 렌더링 단계까지 넣으면 더 복잡해져요.  

## The Render Steps

![](/static/img/script/image77.jpg)

렌더링은 또 다른 경로에요.  
스타일 계산이 필요하죠.  
CSS를 보고 각 요소에 적용될 걸 확인해요.  

![](/static/img/script/image78.jpg)

레이아웃은 렌더링 트리로 페이지의 모든 것을 어디 배열할지 정해요.  

![](/static/img/script/image79.jpg)

실제 픽셀 데이터 생성인 페인팅도 있죠.  
브라우저가 이벤트 루프에 업데이트를 기다리라고 하면 이벤트 루프는 기다렸다 작업을 하게 되요.  

여러분은 어떤지 몰라도 저는 코딩 실력이 형편없어요.  
하지만 자바스크립트로 무한 루프를 만드는 건 간단해요.  
그렇게 하면 어떤지 보죠.  

웹 페이지에 무한루프를 실행하는 버튼이 있어요.  

```javascript
button.addEventListener('click', event => {
    while (true);
})
```

코드는 위와 같습니다.  
해당 버튼을 누르면 텍스트도 선택이 안되고 잘 돌아가던 gif 이미지마저 멈춰버립니다.  
사용자가 버튼을 클릭하면 브라우저가 이벤트 루프에 작업 명령을 내려요.  

![](/static/img/script/image80.jpg)

하지만 이 작업은 자바스크립트를 끝없이 실행하는 거죠. 영원히요.  
몇 밀리초 후 브라우저가 이벤트 루프에 gif를 업데이트해야 하니까 렌더링을 하라고 해요.  

![](/static/img/script/image81.jpg)

이벤트 루프는 끄덕이죠.  
'지금 무한루프로 바쁜데 끝내고 할게'  
그 다음 사용자가 텍스트를 선택하려고 하면 텍스트가 뭔지 DOM에서 확인해야 하니까 브라우저가 작업을 더 추가해요.  

![](/static/img/script/image82.jpg)

이벤트 루프는 무한 루프로 바쁜데 무슨 소리냐고 하죠.  
그도 그럴게 무한루프잖아요.  
**<span style="color:red">루프는 이렇게 렌더링과 다른 상호작용을 막아요.</span>**

![](/static/img/script/image83.jpg)

코드를 보고 컨텐츠가 번쩍일까 걱정되지만, 그렇지 않아요.  
**이 스크립트는 작업의 일부로 실행되고 렌더링 단계로 넘어가기 전 완료해야하기 때문이에요.**  
이벤트 루프가 작업을 반드시 완료하게 하죠.  
**그래도 신경 쓰여서 저는 줄을 바꿔놔요...**

루프가 렌더링을 막으면 이건 어떨까요?

```javascript
function loop () {
    setTimeout(loop, 0);
}

loop();
```

루프를 한번 돌 때마다 setTimeout으로 다음 호출을 큐해요.  
이걸 테스트해볼게요.  
버튼을 클릭하면 

![](/static/img/script/image84.jpg)

여전히 작동하고 있어요.  
뒤에선 어떤지 확인해볼까요?  

![](/static/img/script/image85.jpg)

작업(테스크)을 큐해서 이벤트 루프를 돌게해요.  
작업을 받으면 또 다른 작업이 큐돼요.  
하지만 아까 봤듯이 한번에 하나의 작업만 처리할 수 있어서 다시 루프 시작으로 돌아가 다음 작업을 받게 돼요.  
브라우저가 gif를 업데이트할 수 있게 되죠.  

![](/static/img/script/image86.jpg)

setTimeout이 렌더링을 방해하지 않아요.  
**<span style="color:red">하지만 렌더링과 관련된 코드를 실행하려면 테스크(작업)를 써선 안돼요, 렌더링과는 정 반대니깐요.</span>**  
**렌더링 관련된 코드를 실행하려면 이벤트 루프에서는 렌더링 단계에서 코드를 실행해야 해요.**  
**<span style="color:red">requestAnimationFrame</span>**으로 그게 가능해요.  

## requestAnimationFrame

이 함수도 이름은 별로지만 목적에는 부합해요.  
`rAF` 콜백은 렌더링 단계의 일부에요.  
박스를 움직이게 해서 왜 유용한지 보여드릴게요.  

![](/static/img/script/image87.jpg)

```javascript
function callback() {
    moveBoxForwardOnePixel();
    requestAnimationFrame(callback);
}

callback();
```

이 코드로 박스를 한 픽셀 옮기고 **requestAnimationFrame**으로 루프를 만들게요.  
이런식이에요.  
이걸 setTimeout 자리에 두면, 어떨까요?

```javascript
function callback() {
    moveBoxForwardOnePixel();
    setTimeout(callback, 0);
}

callback();
```

이렇게되요. 

![](/static/img/script/image88.jpg)

뭔가 속도도 더 빠르면서, 자연스럽지 못한..? 뚝뚝 끊어지면서 움직이는 느낌이 듭니다.  
3.5배 정도 빨라요.  
이는 콜백이 더 잦다는 건데, **절대 좋은 게 아니죠.**  

![](/static/img/script/image89.jpg)

아까 렌더링이 작업 중 가능한걸 봤어요.  
하지만 꼭 그래야 하진 않아요.  
'지금 렌더링할까요?'  
'아뇨, 작업을 하나 더 하죠.'  
'지금 렌더링할까요?'  
'더 있다 해요'  
이런 식으로요.  

브라우저가 디스플레이를 업데이트하기로 하면 

![](/static/img/script/image90.jpg)

그때 렌더링을 하게 돼요.  
**효율성**을 추구하죠.  
**업데이트할 게 있어야만 렌더링에 들어가요.**  

예를 들면, 브라우저 탭이 백그라운드 상태면 절대 렌더링을 안해요.  
대부분의 스크린은 업데이트 빈도가 설정돼 있어서 **1초에 60번 정도**예요.  
더 빠르거나 느리기도 하지만, 60Hz가 가장 흔해요.  
**페이지 스타일을 초당 천번 바꿔도 렌더링을 초당 천번하지는 않죠.**  
**디스플레이가 가능한 빈도에 동기화돼요.**  
**그것보다 빨라봤자 사용자 눈엔 안보이니까요.**  

![](/static/img/script/image91.jpg)

그런데 현재 setTimeout이 그 상태에요.  
**디스플레이 가능한 속도보다 박스를 더 빠르게 움직이고 있죠.**  

```javascript
setTimeout(callback, 0);
setTimeout(callback, 4.7);
```

**그리고 setTimeout으로 작업을 큐하면 안좋아요.**  
콜백을 0밀리초로 설정해도 사실 **4.7ms** 정도거든요.  
브라우저의 기본값이죠.  
스펙에선 아무 숫자나 된대도 실제 테스트해보면 4.7밀리초에요.  

작업을 큐하는 법은 한 가지만이 아니에요.  
메시지 채널을 쓸 수도 있죠.  

![](/static/img/script/image00.gif)

**<span style="color:red">queueTask</span>**  
작업이 너무 많아서 박스가 막 이동하는 것 같죠.  
1/200ms 마다 작업이 들어와요.  
렌더링 사이에는 수십, 수천 작업이 있을 수 있어요.  

![](/static/img/script/image92.jpg)

이게 사용자에게 보여질 각 프레임일 때 

![](/static/img/script/image93.jpg)

각각 처음에 스타일 계산, 레이아웃 같은 렌더링이 실행되요.  
실제 업데이트에 따라 모두 동일하진 않지만, 그래도 이렇게 두니 깔끔하고 보기 좋네요.  

![](/static/img/script/image94.jpg)

반면에 작업(테스크)은 제멋대로 나타나요.  
이벤트 루프가 있어서 큐된 순서대로 실행되죠.  
**하지만 프레임 내의 타이밍은 안 맞아요.**  

![](/static/img/script/image95.jpg)

setTimeout에선 이랬죠.  
프레임마다 작업(테스크)이 3, 4개 있습니다.  

![](/static/img/script/image96.jpg)

콜백의 4분의 3은 렌더링으로 낭비됐어요.

```javascript
setTimeout(animFrame, 1000/60);
```

대략 1초에 60번 콜백이 일어나도록 설정했어요.  
스크린을 추측한거죠.  
**60Hz짜리로 추측해서 조금은 중복을 줄였지만 setTimeout은 애니메이션용이 아니라 결과가 저질이에요.**  
부정확해서 드리프트가 발생해요.  

![](/static/img/script/image97.jpg)

한 프레임에서는 아무 작업도 안하다가 다음 프레임에선 두 배로 해서 사용자 보기에 좋지 않아요.  

![](/static/img/script/image98.jpg)
![](/static/img/script/image99.jpg)

그리고 작업이 길어지면 같은 스레드인 렌더링도 늦어집니다.  
깔끔한 루틴이 깨져버리죠.  

![](/static/img/script/image100.jpg)

setTimeout 대신에 requestAnimationFrame을 쓰면 이렇게 됩니다.  
깔끔하고 모든 게 프레임 타이밍 내에 있어요.  
긴 작업도요.  
**이런 모양은 사용자 경험이 뛰어나다는 증거라 기쁩니다.**  

![](/static/img/script/image101.jpg)

작업(테스크)을 아예 안 할순 없어요.  
클릭 이벤트는 작업(테스크)이고 보통 빨리 응답해야 하죠.  
**timer나 네트워크 관련된 게 있으면 꼭 <span style="color">requestAnimationFrame</span>을 써서 작업을 배치화하세요.**  
**중복 작업이 많이 사라져요.**  

---

개발자들이 자주 놓치는 점을 짚고 넘어갈게요.  

![](/static/img/script/image102.jpg)

rAF는 CSS와 페인팅을 처리하기 전 단계입니다.

```javascript
button.addEventListener('click', () => {
    box.style.display = 'none';
    box.style.display = 'block';
    box.style.display = 'none';
    box.style.display = 'block';
    box.style.display = 'none';
    box.style.display = 'block';
    box.style.display = 'none';
    box.style.display = 'block';
    box.style.display = 'none';
})
```

이런 코드는 복잡해 보이지만 사실은 단순합니다.  
**자바스크립트는 항상 렌더링 전에 작업을 완료하죠.**  
열심히 값을 바꾸는 동안 브라우저는 뒤에서 대기해요.  
CSS에는 아무 영향도 없고 렌더링 단계에 가야 효과가 나타나요.  
**결국 의미 있는 건 마지막 줄뿐이죠.**  

**<span style="color:red">CSS에서 간과되는 것 중 하나에요.</span>**  

![](/static/img/script/image103.jpg)
![](/static/img/script/image104.jpg)
![](/static/img/script/image105.jpg)

저기 있는걸, 1000이라는 X 위치에서 500으로 옮길래요.  
쉬울 것 같죠?  

```javascript
button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)';
    box.style.transition = 'transform 1s ease-in-out';
    box.style.transform = 'translateX(500px)';
})
```

X위치를 1,000으로 두고 transition으로 값을 500으로 바꿔요.  
**근데 위와 같이 코드를 작성하면 박스는 0에서 500으로만 이동해요.**  
원하는 결과가 아니죠.  
1,000에서 500으로 가야해요.  
한번에 너무 많은 정보를 줬는지도 몰라요.  
아까 그것처럼 브라우저가 내용을 무시했어요.  
첫 번째 transform 값을 무시했죠.  

```javascript
button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)';
    box.style.transition = 'transform 1s ease-in-out';

    requestAnimationFrame(() => {
        box.style.transform = 'translateX(500px)';    
    })
})
```

그래서 requestAnimationFrame을 추가했어요.  
여전히 0에서 500으로 가요.  
어떻게 된 걸까요?  

![](/static/img/script/image106.jpg)

설명할게요, 사용자가 버튼을 클릭하면 

![](/static/img/script/image107.jpg)

여기서 작업이 들어오고 첫 transform과 transition이 설정돼요.  

![](/static/img/script/image108.jpg)

requestAnimationFrame이 큐되고 여기서 최종 transform 값을 정해요.  
하지만 브라우저는 여기까지 CSS를 처리하지 않았죠.  
여기서 CSS 계산이 시작돼서 CSS 단계를 못거친 첫 번째 값이 완전히 무시됐습니다.  

```javascript
button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)';
    box.style.transition = 'transform 1s ease-in-out';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            box.style.transform = 'translateX(500px)';    
        })
    })
})
```

그래서 제대로 작동하려면 rAF가 두 개 필요하죠.  
이제 1,000에서 500으로 가네요.

**<span style="color:red">사실 getComputedStyle의 속성 중 하나를 써도 됩니다.</span>**  

```javascript
button.addEventListener('click', () => {
    box.style.transform = 'translateX(1000px)';
    box.style.transition = 'transform 1s ease-in-out';
    getComputedStyle(box).transform;
    box.style.transform = 'translateX(500px)';
})
```

**CSS 스타일 계산을 원래보다 빨리하도록 강제하죠.**  
**그 전까지 설정된 모든 값을 인식하면서요.**  
transform이 X를 1,000으로 설정해요.  

**하지만 조심해야할 점은 프레임 하나에 한 번 할 스타일 작업이 늘 수 있다는 겁니다.**  

**<span style="color:red">사실 제일 좋은 방법은 Web animation API입니다.</span>**  
한 번에 다 설정할 수 있거든요.  
<span style="text-decoration: line-through;">하지만 Chrome에서만 먹혀서 썩 유용하진 않아요.</span>

![](/static/img/script/image109.jpg)

렌더링 단계 내 rAF의 위치를 모르고 놀라셨다면, **여러분 잘못이 아닙니다.**

![](/static/img/script/image110.jpg)
  
Edge랑 Safari는 이상하게도 rAF를 여기에 넣거든요.  
아주 특이하게 페인트 뒤에 넣어요.  

![](/static/img/script/image111.jpg)

사용자가 어딘가를 클릭하거나 변화가 생기면 rAF가 작동해야 하는데,  

![](/static/img/script/image112.jpg)

Edge랑 Safari는 rAF 콜백 전에 렌더링되니까 **<span style="color:red">다음 프레임 전까지 변경 사항이 표시되지 않고</span>** 업데이트가 상당히 지연됩니다.  
배치 작업이 아주 어려워지죠.  
얼른 수정됐으면 좋겠어요.  

![](/static/img/script/image113.jpg)

웹표준에선 위치는 여기에요.  
FireFox와 Chrome에선 rAF 콜백의 위치가 여기에 있죠.  

rAF 설명은 여기서 끝내고 이제 이벤트 루프의 마이크로 테스크에 대해 이야기해봅시다.

## MicroTasks

가장 안 알려진 microtask를 설명해볼게요.  
microtask는 promise와 연관이 있는데 처음엔 아니었어요.  
1990년대 DOM 변경을 모니터링할 방법이 필요했고 W3C가 mutation 이벤트를 만들었죠.  

```javascript
document.body.addEventListener('DOMNodeInserted', () => {
    console.log('Stuff added to <body>!');
})
```

여기서 언제 body 요소에 노드가 삽입되는지 궁금했어요.  
다른 이벤트도 많이 생겼지만, 실용하기는 어려웠어요.  
이 예시에서 body 요소에 

```javascript
for (let i = 0; i < 100; i++) {
    const span = document.createElement('span');
    document.body.appendChild(span);
    span.textContent = 'Hello ';
}
```

span 100개를 추가하는데 이벤트가 몇 개 생성될까요?  
하나면 될까요?  
아뇨.  
span 하나당 하나씩 총 100개에요.  
거기에 100개 더 있어요.  

```javascript
    span.textContent = 'Hello ';
```
위 줄 때문이죠.  
콘텐츠와 텍스트 노드가 합쳐지며 **이벤트 버블링**이 발생해서 <span style="color:red">이벤트가 총 200개</span>가 됩니다.

```javascript
for (let i = 0; i < 100; i++) {
    const span = document.createElement('span');
    document.body.appendChild(span);
    span.textContent = 'Hello ';
}
```

이렇게 비교적 간단한 DOM 수정도 수천개의 이벤트가 발생하게 되니까 **단순 작업도 성능이 끔찍할 정도였어요.**  
배치 형태로 작업할 방법이 필요했어요.  
아까 스타일과 비슷하게 작업을 하는 동안 브라우저는 대기 상태로 두고 필요할 때 변경 사항 전체를 대표할 이벤트가 있어야 했죠.  

`MutationObserver`가 답이었어요.  
`microtask`라는 새 큐도 탄생했죠.  

![](/static/img/script/image114.jpg)

Microtask 자료를 보면 이벤트 루프 한 번마다, 작업 한번마다 실행된다고 되어 있어요.  
**이벤트 루프 어딘가 의외의 곳에서 실행되죠.**  
자바스크립트가 실행을 마쳤을 때 실행되요.  
자바스크립트 스택이 찾다가 비는 순간 말이죠.  
그때 `microtask`가 실행되요.  

따라서 `microtask`는 작업 도중이나 rAF의 일부로 렌더링 단계 등 자바스크립트가 실행되는 곳 어디서나 실행됩니다.  

**자바스크립트가 span 100개와 콘텐츠의 실행을 완료하면 `MutationObserver` 콜백이 오죠.**  

```javascript
Promise.resolve().then(() => console.log('Hey!')); // <- microtask
console.log('Yo!');
```

`Promise`도 그걸 활용합니다.  
`microtask`를 큐에 넣고 'yo'를 기록해요.  

![](/static/img/script/image115.jpg)

자바스크립트가 완료되고 `microtask`에서 'hey'를 기록해요.
Promise 콜백 사이에 다른 자바스크립트는 안 껴요.  
**Promise 콜백은 스택 밑이죠. 그래서 microtask를 써요.**  

```javascript
function loop () {
    Promise.resolve().then(loop);
}
loop();
```

setTimeout을 썼을 때처럼 루프를 만들면 어떨까요?  

![](/static/img/script/image116.jpg)

똑같은 예제에요.  
버튼을 눌러보겠습니다.  
어? **while 루프처럼 렌더링을 막았어요.**  
setTimeout과 전혀 다릅니다.  

```javascript
Promise.resolve().then(() => console.log('Hey!')); // <- microtask
console.log('Yo!');
```

그래요, Promise 콜백은 async입니다.  
그런데 async가 무슨 뜻이냐고요?  

>**async**  
>코드 동시 실행 후 실행이에요.  
>그래서 hey 전에 yo가 나오죠.  

그렇다고 이벤트 루프의 한 부분에 묶일 필요는 없어요.  

![](/static/img/script/image117.jpg)

세가지 큐를 살펴봤어요.  
테스크큐(작업큐), rAF 콜백이 발생하는 애니메이션 콜백큐, 개발자를 편하게 해주는 microtask 큐도요.  

셋은 미묘한 차이가 있어요.  

![](/static/img/script/image118.jpg)
![](/static/img/script/image119.jpg)

작업 큐에선 한 항목을 빼면 그것만 빠지고, 더하면 큐 끝에 추가가 됩니다.  

![](/static/img/script/image120.jpg)

애니메이션 콜백은 완료될 때까지 실행되는데 처리도중 추가된 건 다음 프레임으로 넘어가요.

![](/static/img/script/image121.jpg)
![](/static/img/script/image122.jpg)

microtask는 완료될 때까지 실행돼요.  
새 항목이 큐에 추가되면 되는대로 계속해서 실행되죠.  
**이벤트 루프는 큐가 비워질 때까지 진행되지 않아서 렌더링이 막혀요.**  

저는 이게 너무 재밌어요.  
여러분도 즐거우셨으면 해요.  

```javascript
button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
})
```

여기 버튼을 클릭하면 Promise가 resolve되고 뭔가가 기록되요.  
하지만 같은 요소에 eventListener가 2개 있어요.

```javascript
button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
})

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'));
    console.log('Listener 2');
})
```

![](/static/img/script/image123.jpg)

이때 이 버튼을 클릭하면 어떻게 될까요?  
어떤 순서로 기록될까요?  

![](/static/img/script/image124.jpg)

첫 번째 listener는 잘 실행됐어요.  
자바스크립트 스택에 올라갔죠.  

![](/static/img/script/image125.jpg)

microtask를 큐하고 다음 줄에서 Listener 1이 기록됏어요.  
그 다음은요?  
지난 주에 트위터에서 설문조사를 했어요.  
몇몇 분은 보셨을 거에요.  

![](/static/img/script/image126.jpg)

63%가 다음은 Listener 2랬고 5%가 NaN 후 무한이 될거라고 했어요.  
그건 정답이 아니에요, 안됐지만 63%가 고른 Listener 2도 오답이고요.  
이게 스크립트의 허점이에요.  
틀렸더라도 괜찮아요.  

![](/static/img/script/image127.jpg)

Listener가 종료되고 자바스크립트 스택이 비면서 microtask가 실행되겠죠.  

![](/static/img/script/image128.jpg)
![](/static/img/script/image129.jpg)
![](/static/img/script/image130.jpg)

Promise가 실행되면서 Microtask 1이 기록되고 두번째 Listener가 실행된 후 Microtask 2가 기록되요.  

사용자가 버튼을 클릭한 경우에요.  
자바스크립트로 클릭했다면요?  

```javascript
button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
})

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'));
    console.log('Listener 2');
})

button.click();
```

![](/static/img/script/image131.jpg)

스크립트가 스택에 있어요.  
클릭을 호출하면 동시에 이벤트가 디스패치되요.  

![](/static/img/script/image132.jpg)

첫 Listener는 잘 진행되요.  

![](/static/img/script/image133.jpg)

Microtask를 큐하고 Listener 1을 기록하죠.  

![](/static/img/script/image134.jpg)

**<span style="color:red">그런데 그 다음은 microtask가 아니에요.</span>**  
**button.click이 반환되지 않아 자바스크립트 스택이 아직 차 있거든요.**  

![](/static/img/script/image135.jpg)
![](/static/img/script/image136.jpg)

그래서 두 번째 Listener로 넘어가 다른 microtask를 큐하고 Listener 2를 기록해요.  

![](/static/img/script/image137.jpg)
![](/static/img/script/image138.jpg)

모든 Listener가 완료되면서 button.click이 반환되고 스택이 비면서 microtask가 순서대로 실행됩니다.  
**실제로 Promise를 자동화 테스트에 쓴다면 주의하세요.**  
페이지 클릭을 **<span style="color:red">이렇게 자동화하면 보통 자바스크립트를 쓴 걸 텐데 코드 작동이 달라질 수 있거든요.</span>**  

이 문제는 DOM에 Observable을 추가하고 Promise와 통합하는 방법과도 관련이 있어요.  

```javascript
const nextClick = new Promise(resolve => {
    link.addEventListener('click', resolve, { once: true });
})
```

링크의 nextClick을 뜻하는 Promise가 있다고 할 때 

```javascript
const nextClick = new Promise(resolve => {
    link.addEventListener('click', resolve, { once: true });
})

nextClick.then(event => {
    event.preventDefault();
    // Handle event
})
```

이 Promise를 써도 event.prevendDefault를 호출할 수 있을까요?

![](/static/img/script/image139.jpg)

**Promise는 async 입니다.**  
Default를 중단하지 못할까요?  
아뇨, 상관없습니다.  
사용자가 링크를 클릭하거나 자바스크립트로 링크를 클릭하게 하지 않는 한요.  
(자바스크립트로 클릭하게하면 안된다는 말)

```javascript
const nextClick = new Promise(resolve => {
    link.addEventListener('click', resolve, { once: true });
})

nextClick.then(event => {
    event.preventDefault();
    // Handle event
})

link.click();
```

이게 마지막 문제입니다.  
시간을 조금 넘겼네요.  
문제를 풀려면 스펙을 봐야합니다.  
링크 클릭 스펙에 관한 아주 단순한 설명이에요.  

![](/static/img/script/image140.jpg)

1. 우선 이벤트 객체를 만들고
2. 모든 Listener를 객체로 호출해요.
3. 이벤트 객체의 canceled 플래그가 설정되었는지 확인한 후, 아니면 하이퍼링크를 따라요.  
   event.preventDefault를 호출하면 이벤트 객체에 플래그가 설정돼요.
4. 따라서 사용자가 링크를 클릭하면 microtask는 여기서 실행돼요.

![](/static/img/script/image141.jpg)

하지만 자바스크립트로 클릭하면 링크 클릭 알고리즘이 실행되고 그 알고리즘이 완료돼야 자바스크립트 스택이 비워지니까 알고리즘 도중엔 microtask가 실행이 안되요.  
나중에 이벤트 객체를 확인하고 Promise가 산더미처럼 많아서 preventDefault를 호출하려 해도 **이미 하이퍼링크를 따르죠.**  
나중에 Promise 콜백이 실행되도 **이벤트를 취소할 시점은 놓쳤어요.**  

**<span style="color:red">Microtask는 스택에 따라 다르게 작동한다는 점 명심하세요.</span>**

---

이벤트 루프, 여러 단계와 큐, 이런 내용을 알면 문제를 방지할 수 있어요.  
원하는대로 작동하지 않을 때 가끔 되길 바라면 setTimeout에 기대하지 않고요.  
이벤트 루프의 정확한 부분에서 실행하는 법을 배우셨습니다.  

여러분에게 도움이 됐길 바랍니다.  