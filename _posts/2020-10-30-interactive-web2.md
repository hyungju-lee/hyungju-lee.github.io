---
title: Bonus. modal2
layout: post
date: '2020-10-30 15:53'
categories:
- js_interactive_web2
---

## Bonus. modal2

* [modal2 - only javascript, ios,aos 대비](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/bonus_ui/interactive_coding_public/interactive_modal/index2.html){:target="_blank"}

팝업을 구현하다보면 다음과같은 요구사항을 종종 듣곤합니다.

1. Body 스크롤 안되게 막아주세요.
2. PC 브라우저에서 스크롤막을때 스크롤바가 없어지고 생기고에 의해서 콘텐츠가 좌우로 왔다갔다하는 현상을 막아주세요.

그리고 위에서 1번 요구사항을 충족시키면 또 다음과 같은 요구사항을 들을 때가 있습니다.

1. 스크롤 위치를 원래 있던 자리에 위치하게 해주세요. (body 스크롤을 막으면서 스크롤이 위치가 문서 맨 위로 올라가기 때문입니다.)

마크업하는 입장에서 정말 귀찮은(?) 요구입니다.

그러면서도 한편으론 위와 같은 요구사항들이 충족가능한 요구사항인지 궁금했습니다.

그래서 시간이 남을 때 테스트해봤습니다.

## 결론

결론은 가능합니다.  
자바스크립트로만 코드를 작성하고 아직 코드 정리도 안해 복잡해보일 수 있습니다.  
하지만 개념은 그렇게 크게 복잡하지 않습니다.

## body 스크롤 막기

![](/static/img/interaction/image49.jpg)

팝업이 열릴 때 html 태그와 body 태그에 위와 같은 속성들이 적용되게 했습니다.  

body 태그에 `padding-right: 17px` 을 주었는데, 이 값은 각 브라우저마다 scroll bar의 width값이 다르므로 자바스크립트로 계산되게 했습니다.

```javascript
var getScrollWidth = function () {
	var body = document.querySelector('body');
	var scrollDiv = document.createElement('div');
	scrollDiv.style.position = "absolute";
	scrollDiv.style.top = "-9999px";
	scrollDiv.style.overflow = "scroll";
	scrollDiv.style.width = "60px";
	scrollDiv.style.height = "60px";
	body.appendChild(scrollDiv);
	var scrollbarWidth = document.body.scrollHeight > innerHeight ? (scrollDiv.offsetWidth - scrollDiv.clientWidth) + "px" : 0 + "px";
	body.removeChild(scrollDiv);
	return scrollbarWidth;
}
```

위의 코드를 보면 body 태그에 새로 만든 가상 div 태그를 `appendChild` 시키고 `overflow: scroll` 을 주어 해당 브라우저의 **scroll bar** 너비를 읽도록했습니다.

그리고 해당 `document` 의 길이가 브라우저의 `innerHeight` 보다 길면 (스크롤이 있다는 뜻이므로) 해당 **scroll bar** 의 너비를 body 태그에 `padding-right` 값으로 주었습니다.

이렇게 하면 Window PC와 Android 브라우저에선 웬만하면 정상 작동합니다.

하지만 iOS에서는 상하단바(주소창)가 사라진 상태에서는 여전히 body 부분이 스크롤이 됩니다.

이러한 현상을 막으려면 **이벤트 전파** 를 막아야합니다.

팝업에서 발생한 scroll 이벤트가 body태그로 전파되면서 body태그가 스크롤되는 것이기 때문입니다.

## 이벤트 전파 막기

```javascript
var preventScrollFunc = function (e) {
	e.preventDefault();
	e.stopPropagation();
}

var preventFunc = function () {
	var preventEvent = ["scroll", "touchmove"];
	if (layerPopupInner.offsetHeight > layerPopupCont.offsetHeight) {
		preventEvent.forEach(function (val, i) {
			layerPopupInner.addEventListener(val, preventScrollFunc, false)
		})
	} else {
		preventEvent.forEach(function (val, i) {
			layerPopupInner.removeEventListener(val, preventScrollFunc, false)
		})
	}
}

addEventListener("resize", function () {
	if (isShow) {
		preventFunc();
	}
})
```

팝업이 열렸을 때 위의 함수들로 **팝업 컨텐츠의 길이가 브라우저 높이보다 길다면** 이벤트 전파를 막지 않고 스크롤이되게 하였고, **팝업 컨텐츠의 길이가 브라우저 높이보다 짧다면** 이벤트 전파를 막아 body 태그에서 스크롤이 되는 현상을 막았습니다.

그리고 `resize` 이벤트를 통하여 팝업이 열려있을 때 폰 가로모드/세로모드가 변한걸 감지해 이벤트 전파를 막을지 말지를 결정하도록 했습니다.

위와 같이하면 위의 요구사항을 모두 충족시킬 수 있습니다. 