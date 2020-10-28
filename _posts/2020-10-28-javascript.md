---
title: JavaScript 보안 문제 및 모범 사례
layout: post
date: '2020-10-28 10:12:00'
categories:
- js
---

## JavaScript 보안 문제 및 모범 사례

### XSS 및 CSRF 이해

JavaScript가 매우 잘 확립 된 프로그래밍 언어라는 것은 잘 알려져 있습니다.  
JavaScript는 양식 제출 / 검증, 상호 작용, 애니메이션, 사용자 활동 추적 등과 같은 확장 된 기능을 제공하는 동적 웹 페이지에서 주로 찾을 수 있습니다.  
그러나 일부 사용자는 **JavaScript의 보안 측면에 대해 매우 회의적**입니다.

JavaScript 취약성은 클라이언트 및 서버 측 문제 일 수 있습니다.  
해커는 애플리케이션을 통해 다양한 경로를 취함으로써 잠재적으로 비즈니스에 해를 끼칠 수 있습니다.  
이러한 위협은 어떤식 으로든 평가되고 처리되어야합니다.

이러한 일반적인 위협 중 두 가지와 애플리케이션을 이러한 위협으로부터 안전하게 보호 할 수있는 방법에 대해 설명합니다.

## Cross-Site Scripting (XSS) Attacks (XSS (교차 사이트 스크립팅) 공격)

교차 사이트 스크립팅은 가장 일반적인 브라우저 측 취약점 중 하나입니다.  
XSS 자체는 HTML 및 JavaScript와 같은 클라이언트 측 스크립팅 언어의 인터넷 보안 약점으로 인해 발생하는 위협입니다.  
XSS에서 공격자는 합법적이지만 취약한 웹 애플리케이션을 조작하여 악의적인 작업을 수행 할 수 있습니다.

XSS 공격은 신원 및 데이터 도용을 초래할 수 있습니다.  
바이러스가 확산되고 때로는 사용자의 브라우저를 원격으로 제어 할 수도 있습니다.

![](/static/img/script/image19.png)

### Example

XSS 공격의 간단한 예를 살펴 보겠습니다.

```html
//HTML
<form>
    <input id="query-input" type='TEXT' name="query">
    <button type="submit">Click me</button>
</form>
<div id="query-output">

</div>
```

```javascript
//JavaScript
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var query = new URL(window.location).searchParams.get('query')
    document.getElementById('query-input').value = query
    document.getElementById('query-output').innerHTML = query
}
```

![](/static/img/script/image173.jpg)

코드 펜을 사용하여 디버그 모드에서 위 코드를 시도 할 수 있습니다.  
빈 src 태그가있는 img 태그를 삽입하면 onerror 메소드가 트리거됩니다.  
따라서 내부에 스크립트를 삽입하면 실행됩니다.

예를 들어 텍스트 상자에 다음을 입력하면 콘솔에 쿠키가 인쇄되는 것을 볼 수 있습니다.

```html
<img src onerror="console.log(document.cookie)">
```

![](/static/img/script/image174.jpg)

이제 간단히 'query'를 매개 변수로 사용하여 위 코드를 URL에 복사하여 붙여 넣으면 위의 출력을 얻을 수 있습니다.

```text
http://localhost/page?query=<img src onerror="console.log(document.cookie)">
```

따라서 웹 사이트가 안전하지 않은 경우 해커는 일부 JS 코드를 매개 변수에 쉽게 삽입하고 사용자가 액세스 할 수있는 모든 데이터를 가져올 수 있습니다.  
이 코드는 피해자의 세션 ID를 해커의 사이트로 전송하는 것을 허용하므로 해커가 액세스 권한을 얻을 때 오용 될 수 있습니다.

만약 현재 `document.cookie`에 특정 어떤 정보가 담겨있다고한다면, 위와 같이 입력하는 것만으로도 쉽게 정보를 빼낼 수 있다는 것입니다.

## 예방

* 도착시 입력 필터링 — 사용자로부터 입력을받을 때마다 예상되는 입력 또는 유효한 입력을 기준으로 최대한 엄격하게 필터링합니다.
* 적절한 응답 헤더 사용 — HTML 또는 JavaScript를 포함하지 않는 HTTP 응답에서 XSS를 방지하려면 
`Content-Type` 및 `X-Content-Type-Options` 헤더를 사용하여 브라우저가 응답을 너가 의도한대로 해석하도록 할 수 있습니다.
* 출력시 데이터 인코딩 — 사용자가 입력 한 데이터가 HTTP 응답으로 출력 될 때 출력을 인코딩하여 활성 콘텐츠로 인식되지 않도록합니다.
* CSP (콘텐츠 보안 정책)-올바른 CSP 규칙 집합을 적용하면 브라우저가 인라인 JavaScript, eval(), setTimeout() 또는 신뢰할 수없는 URL에서 가져온 JavaScript와 같은 작업을 실행하지 못하도록 할 수 있습니다.

XSS 공격에 대해 자세히 알아 보려면 [이것](https://excess-xss.com/){:target="_blank"}을 읽어보십시오.

## CSRF (Cross-Site Request Forgery) 공격

CSRF 또는 XSRF는 해커가 세션 쿠키를 도용하여 피해자의 신원을 인계하거나 가장하는 공격입니다.  
이는 대상 사이트가 쿠키만을 사용하여 요청을 인증하여 해커가 쿠키를 훔치거나 가로 채고 합법적인 사용자로 가장 할 수있는 경우에 가능합니다.  
이 공격은 계정 변조, 데이터 도용, 사기 등으로 이어질 수 있습니다.  
대상에는 소셜 미디어, 브라우저 내 이메일 클라이언트, 온라인 뱅킹 및 네트워크 장치 용 웹 인터페이스와 같은 웹 애플리케이션이 포함됩니다.

![](/static/img/script/image20.png)

### Example

작동 원리에 대한 간단한 예를 살펴 보겠습니다.

은행이 있다고 가정합시다.  
당사 웹 사이트의 일반적인 은행 송금 요청은 다음과 같은 GET 요청입니다.

```text
GET http://www.bank.com/transfer.php?acct=PersonB&amount=100&currency=USD
```

우리 은행은 세션 쿠키를 사용하여 요청을 인증합니다.  
따라서 사용자가 돈을 이체하기위한 이벤트의 흐름은 다음과 같습니다.

* 은행 계좌에 로그인
* 세부 정보를 입력하고 전송을 클릭하십시오

사용자가 은행 계좌에 로그인하면 웹 사이트는 나중에 각 거래를 승인하는 데 사용하는 세션 쿠키를 저장합니다.

### Hacker in Action

해커가 현장에 들어 오면 해커는 매우 유용해 보이지만 숨겨진 아젠다가있는 웹 사이트를 만듭니다.  
블로그 웹 사이트라고 가정 해 보겠습니다.  
사용자가 새 블로그 게시물을 추가하면 악성 애플리케이션은 은행 웹 사이트에 GET 요청을 보내는 숨겨진 코드를 실행합니다.  
이 해킹이 성공하려면 사용자가 자신의 은행 계좌에 로그인해야합니다.  
세션 토큰이 있어야합니다.

해커가 GET 요청을 조작하는 방법은 다음과 같습니다.

```text
GET http://www.bank.com/transfer.php?acct=Hacker&amount=100&currency=USD
```

사용자가 "블로그 게시물 추가"를 클릭하면이 숨겨진 요청이 실행되고 사용자 모르게 돈이 해커의 은행 계좌로 이체됩니다.

위의 기술은 POST 요청에도 사용할 수 있습니다.  
해커가 해야 할 일은 숨겨진 입력과 은행 URL에 대한 POST가있는 <form>을 만드는 것입니다.

```html
<body onload="document.forms[0].submit()">
    <form action="http://www.bank.com/transfer.php" method="POST">
        <input type="hidden" name="acct" value="Hacker"/>
        <input type="hidden" name="amount" value="100"/>
        <input type="hidden" name="currency" value="USD"/>
        <input type="submit" value="View my pictures!"/>
    </form>
</body>
```

## 예방

* 세션 쿠키에 항상 SameSite 쿠키 속성 사용
* 리퍼러 헤더 또는 출처를 확인해야합니다.
* 매우 민감한 작업에 대한 사용자 상호 작용 기반 보호 구현을 고려하십시오.  
  사용자 상호 작용 기반 보호에는 재 인증 (암호 이상), 일회성 토큰, CAPTCHA가 포함됩니다.  
  올바르게 구현되면 강력한 CSRF 방어 역할을 할 수 있습니다.
  
더 많은 예방 기술을 보려면 [이 자료](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html){:target="_blank"}를 읽어 보시기 바랍니다.

---

JavaScript의 보안은 하룻밤 사이에 배우고 마스터 할 수 없는 매우 방대한 주제입니다.  
웹 사이트의 보안 수준에 대해 더 나은 아이디어를 얻으려면 사이버 보안 전문가에게 문의하는 것이 좋습니다.  
OWASP를 방문하여 웹 애플리케이션의 보안 측면에 대해 자세히 알아볼 수 있습니다.

## 참조

* [OWASP CheatSheet](https://cheatsheetseries.owasp.org/){:target="_blank"}
* [OWASP Web Goat](https://owasp.org/www-project-webgoat/){:target="_blank"}
* [Blog by Rachit Agarwal](https://www.algoworks.com/blog/security-concerns-with-javascript-development/){:target="_blank"}

## GitHub를 사용하여 Deno 모듈 게시

Deno는 패키지 관리자가 부족하고 단순히 "인터넷상의 파일에 연결"하려는 의도로 인해 커뮤니티의 많은 사람들이 이러한 접근 방식이 얼마나 안전하지 않고 불안정 할 수 있는지에 대해 긴장했습니다 (저도 포함합니다!).

진실은 그렇습니다. 이것은 Deno 개발자에게 잠재적으로 큰 문제가 될 수 있지만, 이에 대해 아무것도하지 않는 경우에만 가능합니다.  
그리고 이 작업을 정직하게 만들 수 있는 많은 옵션이 있습니다.  
왜 그렇지 않습니까?

모듈을 가져올 때 Deno의 문서에 따르면 파일의 URL 만 지정하므로 해당 부분은 간단합니다.  
문자 그대로 액세스 할 수 있는 모든 곳에 업로드하고 코드에서 해당 URL을 연결하면됩니다.  
하지만 버전 관리는 어떻습니까?

## Package versions

URL에 연결할 때 실제로 해당 URL의 버전을 지정하는 것은 아닙니다.  
아니면 당신입니까?  
다음 가져 오기 행을 보면 URL (버전 0.39.0)의 일부로 버전이 있음을 알 수 있습니다.

![](/static/img/script/image175.jpg)

이 URL 기반 체계에서 버전 관리를 처리하는 방법입니다.  
물론 이것은 URL이나 HTTP에서 모호한 기능이 아닙니다.  
버전을 일부로 포함하는 URL에 모듈을 게시하거나 버전을 파싱하기 위해 부하 분산 규칙 (또는 웹 서버 규칙)의 일부 형식을 사용하는 것입니다.  
URL에서 요청을 올바른 파일로 리디렉션하십시오.

Deno 모듈을 게시하는 동안 구현할 표준 또는 엄격한 요구 사항은 없습니다.  
확인해야 할 것은 일종의 버전 관리 체계를 제공하는 것뿐입니다.  
그렇지 않으면 사용자가 특정 항목에 잠글 수없고 대신 작동 여부에 관계없이 항상 최신 버전을 다운로드합니다.

>주의 : 보시다시피 Deno의 패키징 체계는 Node의 패키징 체계보다 훨씬 간단하며 현재 프런트 엔드에서 수년 동안 사용 된 접근 방식을 복사하는 데 매우 유효한 시도입니다.  
>즉, 대부분의 백엔드 언어는 더 명확하고 논란의 여지가있는 패키징 시스템을 가지고 있으므로 코드를 다른 사람과 공유하려는 경우 Deno로 전환하면 버전을 URL의 일부로 포함해야합니다.  
>그렇지 않으면 소비자에게 매우 열악한 서비스를 제공 할 것입니다.

이해할 수있는 것처럼 들리지만 이제 의문이 생깁니다.  
URL에 바로 버전 관리 체계를 추가 할 수있는 방식으로 자체 웹 서버를 갖고 구성해야 합당한 방식으로 Deno 모듈을 제공 할 수 있습니까?

그리고 그 질문에 대한 답은 : 아닙니다. 사실, 당신이 허용한다면 당신을 위해 할 수있는 플랫폼이 이미 있습니다 : GitHub.

익숙하지 않은 경우 GitHub를 사용하면 코드를 게시하고 다른 사람과 무료로 공유 할 수 있으며 Git이라는 버전 제어 시스템과 함께 작동하며 여러 곳에서 거의 업계 표준입니다.  
엔터프라이즈 버전도 있으므로 회사의 내부 저장소에 이미 사용할 수도 있습니다.

GitHub의 흥미로운 점은 Git 태그 이름 또는 Git 커밋 해시를 일부로 포함하는 URL 체계를 사용하여 콘텐츠를 게시한다는 것입니다.  
커밋 해시가 "사람에게 친숙한"것은 아니지만 (예 : b265e725845805d0c6691abbe7169f1ada8c4645) 태그 이름을 패키지 버전으로 사용할 수 있습니다.

이 점을 설명하기 위해 간단한 공용 저장소를 만들고 다음과 같이 네 가지 태그를 사용하여 간단한 "HelloWorld"모듈의 네 가지 버전을 게시했습니다.

![](/static/img/script/image21.png)

이제 태그를 생성하려면 `git tag` 명령을 사용하기 만하면됩니다.

```bash
//… write your module until you’re done with its 1st version
$ git add <your files here>
$ git commit -m <your commit message here>
$ git tag 1.0 //or however you wish you name your versions
$ git push origin 1.0
```

이 작업이 끝나고 코드가 푸시되면 GitHub로 이동하여 모듈의 기본 파일을 선택하고 화면 왼쪽 상단 사분면의 분기 선택기에서 포함 할 태그를 선택할 수 있습니다.

![](/static/img/script/image22.png)

태그 (버전)를 선택한 후 반대쪽 모서리 (페이지의 코드 섹션 위 오른쪽 모서리)에있는 "Raw"버튼을 클릭하면 GitHub 의 UI 없이 파일이 열립니다.  
URL을 보면 버전이 이미 포함되어있는 것을 볼 수 있습니다.

![](/static/img/script/image23.png)

이렇게하면 [https://raw.githubusercontent.com/deleteman/versioned-deno-module/4.0/hello.ts](https://raw.githubusercontent.com/deleteman/versioned-deno-module/4.0/hello.ts){:target="_blank"}와 유사한 URL이 열립니다.  
(굵은 섹션은 GitHub에서 태그 이름을 추가하는 위치이며 이를 참조로 변경할 수 있습니다.  
다른 버전을 변경하지 않고도 다른 버전을 사용할 수 있음), 코드에서 이를 사용하여 코드를 가져올 수 있습니다.

이 프로세스에서 주목해야 할 두 가지 사항이 있습니다.

1. 위 이미지의 코드 상단에서 로컬 파일을 가져 오는 방법을 확인하세요.  
   해당 파일도 버전이 지정되므로 로컬 종속성에 대해 걱정할 필요가 없습니다.  
   기본 모듈 파일의 올바른 버전에 연결하면 모두 올바르게 참조됩니다.
   
2. 이 프로세스를 통해 기본적으로 Deno 모듈을 항상 사용할 수있는 무료 CDN에 게시하게됩니다.  
   구성하거나 비용을 지불 할 필요가 없습니다.  
   코드만 걱정하면됩니다.  
   사실, 다른 모든 GitHub 기능 덕분에 사용자가 문제를보고 할 때 티켓 관리, 다른 사람들이 모듈에 기여할 때를위한 Pull Requests 제어 등과 같은 것들을 얻을 수 있습니다.  
   다른 대안이 있고 선호하는 CDN이 있을 수 있지만,이 경우 GitHub를 사용하는 것은 단일 (무료) 돌로 여러 새를 죽이는 좋은 방법 일 수 있습니다.

이제 URL을 사용하여 코드에서 해당 모듈을 참조 할 수 있으며 Deno가 이를 다운로드하고 컴파일 한 덕분에 작동합니다!

```javascript
import { HelloWorld } from 'https://raw.githubusercontent.com/deleteman/versioned-deno-module/4.0/hello.ts'

HelloWorld("Fernando", "bold")
```

## 결론

약간 무섭게 들릴지 모르지만 (저를 믿으세요. 저는 1 일차에 여러분과 함께했습니다) npm (또는 다른 패키지 관리자)이 없다는 것은 그렇게 큰 문제가 아닙니다.  
모듈 개발자는 항상 특정 지침을 따라 작업을 사용하는 사람들이 갑작스런 주요 변경 사항을 도입하지 않고 GitHub가 이미 OpenSource 코드를 공유 할 수있는 최고의 무료 플랫폼을 제공하고 있는지 확인해야합니다.

그럼 당신은 어떤가요?  
Deno 모듈을 이미 공유하기 시작 했습니까?  
소비자가 실제로 버전 관리를 사용할 수 있는지 확인하기 위해 어떤 프로세스를 사용하고 있습니까?  
다른 사람들도 여러분의 경험에서 배울 수 있도록 아래에 댓글을 남겨주세요!

이 기사는 제가 현재 쓰고있는 Deno에 관한 책의 일부입니다.  
따라서 Deno에 대해 더 알고 싶고 새로운 패키징 체계가 어떻게 작동하는지 알고 싶다면 여기에서 해당 프로젝트에 대해 더 자세히 읽어 볼 수 있습니다.