---
title: 1.1.3 Wes Bos의 async + await 강의 (한 5~60% 이해감.. 나중에 더 실력쌓고..)
layout: post
date: '2020-09-28 10:16:00'
categories:
- js
---

## 1.1.3 Wes Bos의 async + await 강의

async 와 await 에 대해 이야기해보고자 합니다.  
자바스크립트 흐름 제어가 정말 어렵기 때문에..  
혹시 Promise 를 많이 사용하고 계신가요?    
자바스크립트 코드는 모든 것이 동기적으로 실행됩니다.  

동기적이란 무엇일까요?  
이를 실제 생활과 연관시켜 보겠습니다.  

1. 오늘 아침에 커피를 먹고싶어 커피를 만들었다.
2. 아침을 요리하려면 커피를 다 만든 후에 요리할 수 있다. 

요리를 시작하기 전에 커피 만들기를 끝내는 것이 좋습니다.  
아침식사는 커피가 완료되어야 만들 수 있습니다.  

말이 안됩니다.  
우리는 그냥 프로세스를 시작하고 싶습니다.  

* 커피를 만들고 다시 돌아와 그에 다라 결과를 처리하십시오.

우리가 과거에 이것을 어떻게 처리했는지 살펴봅시다.  
**크리스마스 트리 콜백**이라고 하는 것입니다.  

```javascript
makeBreakfast(function () {
    makeCoffee(function () {
        eatBreakfast(function () {
            drinkCoffee(function () {
                cleanUp(function () {
                    // Finally done and it's time for lunch
                })
            })
        })
    })
}) // wtf
```

우리는 아마 끔찍한, 아주 끔찍한 코드를 작성했을 겁니다.  
조금만 더 가면 크리스마스 트리처럼 보입니다.  

```javascript
// kick off both things, one after another
const coffeePromise = makeCoffee();
const breakfastPromise = makeBreakfast();

// then once each are doen, deal with them
coffeePromise.then(coffee => {
    drinkCoffee();
});

breakfastPromise.then(([eggs, bacon]) => {
    eat(eggs, bacon);
});

// you can also wait until both are done
Promise
    .all([coffeePromise, breakfastPromise])
    .then(([coffee, breakfast]) => {
        sitDownWith(coffee, breakfast);
    })
```

Promise 를 활용하면 정말 멋진 코드로 작성할 수 있습니다.  
이렇게 커피를 만들고 아침을 만들고 데이터가 아닌 Promise 를 반환합니다.  
데이터가 어느 시점에 올 것이라는..  
그런 다음 then 을 사용하여 실제로 돌아오는 데이터를 수신할 수 있습니다.  

우리는 그것을 한 단계 더 나아가서 메가 Promise 로 감쌀 수 있습니다.  
모든 것을 약속하면 두 가지 모두가 될 때까지 기다릴 수 있습니다.  

또 다른 예를 들어보겠습니다.

```javascript
moveTo(50, 50, function () {
    moveTo(20, 100, function () {
        moveTo(100, 200, function () {
            moveTo(2, 10, function () {
                // done
            })
        })
    })
})
```

커피와 아침을 먹고 집안 이곳저곳을 돌아다닙니다.  
하지만 위처럼 테이블에서 콜백 지옥을 수행하는 것보다 우리가 할 수 있는 일은

```javascript
// becomes
moveTo(50, 50)
    .then(() => moveTo(20, 100))
    .then(() => moveTo(100, 200))
    .then(() => moveTo(2, 10))
```

약속을 반환할 위치로 이동한 다음 .then 을 연결할 수 있습니다.  
각각 후속 약속을 반환하므로 이것은 정말 흥미롭습니다.  

```javascript
fetch('http://cooldogs.org')
    .then(data => data.json())
    .then(dogs => pet(dogs));
```

많은 새로운 브라우저 API가 Promise 를 기반으로 빌드되고 있으므로 `fetch`로 데이터를 가져올 수 있습니다.  
그러면 다시 JSON으로 변환하고 마지막으로 해당 데이터를 처리하여 라이브러리를 사용할 수 있습니다.  
**<span style="color:red">이는 Axios 라고 부르는데 정말 흥미롭습니다.</span>**

```javascript
axios.get('http://cooldogs.org')
    .then(dogs => pet(dogs));
```

가져오지 않아도 괜찮은 내장 기본값이 있습니다.  
그 두번째가 있고 체인으로 묶여있지만 하나에는 많은 기능이 담겨있죠.  
payment request, get user media, web animation api 에 엑세스하기, 이러한 것들은 표준 약속에 따라 구축되고 있습니다.  

```javascript
function sleep(amount) {
    return new Promise((resolve, reject) => {
        if (amount <= 300) {
            return reject('That is too fast, cool it down!');
        }
        setTimeout(() => resolve(`Slept for ${amount}`), amount)
    });
}

sleep(500)
    .then((result) => {
        console.log(result);
        return sleep(1000);
    })
    .then((result) => {
        console.log(result);
        return sleep(750);
    })
    .then((result) => {
        console.log(result);
        console.log('Done!');
    })
```

위에 sleep 이라는 함수가 있습니다.  
이렇게하면 우리가 할 수 있는 것은 코드를 체인으로 연결하며 작성할 수 있습니다.  
**<span style="color:red">이런 것을 봤을 때 Promise 는 정말 대단합니다.</span>**  

그런데 .then 은 뭘까?

## What's the deal with .then()?

```javascript
moveTo(50, 50, function () {
    moveTo(20, 100, function () {
        moveTo(100, 200, function () {
            moveTo(2, 10, function () {
                // done
            })
        })
    })
})

// becomes
moveTo(50, 50)
    .then(() => moveTo(20, 100))
    .then(() => moveTo(100, 200))
    .then(() => moveTo(2, 10))
```

이 예제에서 우리는 콜백지옥에서 탈출해 Promise 로 갔습니다.  

```javascript
moveTo(50, 50)
    .then(() => moveTo(20, 100))
    .then(() => moveTo(100, 200))
    .then(() => moveTo(2, 10))

// becomes
async function animate() {
    await moveTo(50, 50);
    await moveTo(20, 100);
    await moveTo(100, 200);
    await moveTo(2, 10);
}
```

async 키워드를 함수 앞에 명시하고 그 안에 await 키워드를 각 기능의 전면에 명시하여 함수가 실행되지 않고 계속 진행될 때까지, 약속이 해결될 때까지 기다립니다.  
코드의 다음 줄에 콜백이 필요하지 않으므로 분해해 보겠습니다.  

**자바스크립트는 거의 전적으로 비동기식 / 논블로킹입니다.**  
잠그지 않고도 이러한 경험을 만들 수 있다는 것이 좋습니다.  
브라우저는 우리가 무엇이든 할 때마다 읽기가 어렵습니다.  

```php
// first get some data
$wes = file_get_contents('https://api.github.com/users/wesbos');
$scott = file_get_contents('https://api.github.com/users/stolinski');

// then use it!
echo "<h1>".$wes['name']."</h1>";
echo "<h1>".$scott['name']."</h1>";
```

위와 같이하면 h1 태그 안에 아무런 내용이 안 들어갈 것이다.  
데이터가 반환되기 전에 코드가 실행될 테니까.  
(이런 내용 같음)  
아니면 동기적으로 실행되기 때문에..? 속도면에서 좀 느리다는 뜻인가?  

이를 자바스크립트 Promise 를 활용해 해결해보자.

```javascript
// first get some data
const webPromise = axios.get('https://api.github.com/users/wesbos');
const scottPromise = axios.get('https://api.github.com/users/stolinski');

Promise
    .all([webPromise, scottPromise])
    .then(([wes, scott]) => {
        const html = `
            <h1>${wes.name}</h1>
            <h1>${scott.name}</h1>
        `   
    })
```

약속을 변수에 넣은 다음 둘 다 돌아올 때까지 기다립니다.  
둘다 차례대로 발사하고 둘 다 돌아올 때까지 기다릴 수 있습니다.  
그런 다음 HTML을 만들어 페이지에 표시하여 데이터를 사용할 수 있습니다.  

그래서 PHP는 좀 더 읽기 쉽지만, JavaScript는 더 성능이 좋습니다.  
불필요한 일이 끝날때까지 기다리는 건 아니지만 동기식 처럼 보이는 코드를 작성할 수 있습니다.  
await와 async를 사용하면 더 편합니다.

```javascript
function sleep(amount) {
    return new Promise((resolve, reject) => {
        if (amount <= 300) {
            return reject('That is too fast, cool it down!');
        }
        setTimeout(() => resolve(`Slept for ${amount}`), amount)
    });
}

sleep(500)
    .then((result) => {
        console.log(result);
        return sleep(1000);
    })
    .then((result) => {
        console.log(result);
        return sleep(750);
    })
    .then((result) => {
        console.log(result);
        console.log('Done!');
    })

async function go() {
    // just wait
    await sleep(1000);
    // on capture the returned value
    const response = await sleep(750);
    console.log(response);
}
```

![](/static/img/script/image142.jpg)

다른 예를 살펴보겠습니다.  
async/await를 쓸 수 있는 또 다른 방법입니다.

```javascript
const getDetails = async function () {
    const wes = await axios.get('https://api.github.com/users/wesbos');
    const scott = await axios.get('https://api.github.com/users/stolinski');
    const html = `
        <h1>${wes.name}</h1>
        <h1>${scott.name}</h1>
    `   
}
```

아직 axios를 기다리고있는 PHP 작업이 돌아오면 두번째 axios를 기다립니다.  
우리는 그렇게하고 싶지 않습니다.  

![](/static/img/script/image143.jpg)

```javascript
const getDetails = async function () {
    // fire both off
    const wesPromise = await axios.get('https://api.github.com/users/wesbos');
    const scottPromise = await axios.get('https://api.github.com/users/stolinski');
    // and wait to both to come back
    const [wes, scott] = await Promise.all([wesPromise, scottPromise]);
    const html = `
        <h1>${wes.name}</h1>
        <h1>${scott.name}</h1>
    `   
}
```

그래서 우리가 할 수 있는 것은 단순히 메가프로미스 `Promise.all`로 모든 동작을 기다리는 것이었습니다.  
이제 코드 줄은 훌륭하지만 온라인에서 예제를 본적이 있다면 오류 처리가 추악하기 시작하므로 몇 가지 옵션을 살펴보겠습니다.  

## 오류처리

오류 처리를 위한 첫 번째 옵션으로 실제로 오류 처리 작업에 사용할 수 있습니다.  

1. try / catch  
   
```javascript
async function displayData() {
    try {
        const wes = await axios.get('https://api.github.com/users/wesbos');
        console.log(data); // work with data
    } catch (err) {
        console.log(err); // handle error
    }
}
```

async 기능을 사용하여 모든 코드를 작성하십시오.  
catch 에서 오류를 포착하고 그에 따라 catch 안에 있는 문을 실행하거나 오류가 없다면 try 안에 있는 문을 실행합니다.

2. 고차함수  

```javascript
// create a function without any error handling
async function yolo() {
    // do something that errors out
    const wes = await axios.get('https://no.com');
}
```

위와 같이 작성하면 axios 에서 404 오류 같은 것을 반환하면 오류가 날 수 있습니다.  
아래와 같이 고차함수를 만들어주시겠어요?

```javascript
// maki a function to handle that error
function handleError(fn) {
    return function (...params) {
        return fn(...params).catch(function (err) { 
            // do something with the error!
            console.error('Oops!', err);
        })
    }
}
```

실제 함수를 인수로 사용하는 핸들 함수를 호출한 다음 그로부터 새로운 함수를 반환합니다.  
그리고 반환한 함수도 호출하면 또 함수를 반환하죠.  
함수이지만 끝에 .catch 가 붙어있습니다.  
실제 위 함수에서 오류를 처리하는 곳입니다.  
위 식은 아래와 같이 ES6를 사용해 한줄로도 작성할 수 있습니다.

```javascript
const handleError = fn => (...params) => fn(...params).catch(console.error);
```

---

```javascript
// start with a regular Route where an error could happen
const getOrders = async (req, res, next) => {
    const orders = Orders.find({ email: req.user.email });
    // something goes wrong
    if (!orders.length) throw Error('No Orders Found');
    // ...
}

// Since this unhandled, this route would case the app to quit
router.get('orders', getOrders);
```

주문 페이지가 있고 주문 페이지를 방문했을 때 사용자 권한에 대한 주문 방법을 찾으십시오.  
주문이 없으면 오류를 던져보겠습니다.  
그러나 이것은 모든 유형의 오류 구문이 될 수 있습니다.  

일반적으로 Express에서 다음을 호출하고 오류를 바로 다음으로 전달해야합니다.

```javascript
next('No Orders Found!');
```

```javascript
const displayErrors = async (error, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { error });
}

// any time we call next('Sometingh happened') displayErrors will kick in
app.use(displayErrors);
```

하지만 그런 다음 발생하는 것은 경로가 렌더링하지 않고 미들웨어 라인을 따라 미들웨어 Express 하단에 
후속 오류 코드 및 오류 메시지와 함께 오류 페이지를 렌더링합니다.  
하지만 그것은 좋지만 우리가 던지는 오류를 실제로 다루지는 않습니다.  

작동하려면 다음을 명시적으로 호출하십시오.  
예상치 못한 오류를 처리하지 않거나 구문 오류 또는 데이터베이스 연결 오류 또는 미들웨어 라인을 따라 발생했으므로 
여기서 해야할 일은 **모든 오류를 잡아서 다음 함수에 전달해야하는 것입니다.**  

3. Hot shot implicit return (what)

고차함수 하나를 더 만들겠습니다.

```javascript
const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch(next);
    }
}
```

```javascript
// or Hot Shot
const catchErrors = (fn) =>
    (req, res, next) => fn(req, res, next).catch(next)
```

이렇게하면 오류 캐치를 할 수 있다.

---

4. 네번째 옵션은 함수를 호출할 때 오류를 처리하는 것이다.

```javascript
async function loadData() {
    const wes = await axios.get('...');
}

loadData().catch(dealWithErrors);
```

오류가 발생하고 호출할 때 .catch 를 연결하여 종료하고 오류를 처리합니다.  

---

**Promise 에 대한 오류를 처리하지 않는 코드가 있는 경우, 전체 프로세스, 즉, 앱이 실제로 매우 간단하게 다운될 수 있습니다.**  

```javascript
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
})
```

그러므로 처리되지 않은 거부 이벤트를 수신한 다음 그에 따라 처리할 수 있습니다.  
아마도 일종의 오류 처리 서비스를 사용하여 기록하고..  
그래서 저는 async/await 에 대해 정말 흥분됩니다.  

.... 이번 강의는 한 5~60%만 이해된듯 ....