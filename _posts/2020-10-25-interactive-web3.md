---
title: 최종 브라우저 테스트, 그리고 모더나이저.js 사용법 학습(인터넷 익스플로러 대응)
layout: post
date: '2020-10-25 01:28'
categories:
- js_interactive_web2
---

## 최종 브라우저 테스트, 그리고 모더나이저.js 사용법 학습(인터넷 익스플로러 대응)

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step4/index.html){:target="_blank"}

`position: sticky`는 IE에서 사용을 못한다.  
그럼 어떻게 해야될까?  
`position: sticky`를 제공하지 않는 IE에선 인트로 텍스트, 엔딩텍스트를 삭제하고 스티븐 잡스 이미지만 보이도록 하겠다.  

모션이나 인터렉션을 제작할 때 다양한 브라우저와 기기 테스트를 진행하게 되는데, 가끔 난관에 부딪힐 때가 있을 것이다.  
이럴 때 기획자 또는 디자이너와 상의할 일이 생기겠지?  
**그때 이 모더나이저 활용법을 제대로 알고 있다면 커뮤니케이션에 있어서 큰 도움이 될 것이다.**

### IE - sticky 모션이 활성화되지 않는 문제 해결방법 (feat. modernizr)

* [모더나이저 사이트](https://modernizr.com/){:target="_blank"}

![](/static/img/interaction/image34.jpg)
![](/static/img/interaction/image35.jpg)

다운로드를 클릭하면 위와 같은 페이지가 뜬다.  
일단 **minify**와 **add css classes**는 체크한다.  
설명은 나중에 하도록 하겠다.

그리고 중앙에 보면 속성들이 나열되어 있다.  
**여기서 우리에게 필요한 속성들만 체크해주면 된다.**  

![](/static/img/interaction/image36.jpg)
![](/static/img/interaction/image37.jpg)

위에 **View example**을 클릭하면 예시가 뜬다.  
`no-`라는 접두사가 붙은 거는 이 속성을 지원하지 않는 환경이라는 뜻이다.  
접두사가 안 붙은 거는 이 속성을 지원하는 환경이라는 뜻이다.  

JS도 마찬가지로 sticky를 사용할 수 있는 환경인지 아닌 환경인지를 `if`문으로 구분하고 있다.  

![](/static/img/interaction/image38.jpg)
![](/static/img/interaction/image39.jpg)

빌드된 코드를 보면 위와 같이 압축이 되어있다.  
아까 **minify**에 체크했기 때문이다.

이 코드를 예제에 다음과 같이 붙여놓도록 하겠다.

```javascript
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csspositionsticky-csstransforms-csstransitions-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function s(){var e,n,t,s,o,i,a;for(var l in w)if(w.hasOwnProperty(l)){if(e=[],n=w[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],a=i.split("."),1===a.length?Modernizr[a[0]]=s:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=s),C.push((s?"":"no-")+a.join("-"))}}function o(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(x&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),x?_.className.baseVal=n:_.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):x?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function a(e,n){return function(){return e.apply(n,arguments)}}function l(e,n,t){var s;for(var o in e)if(e[o]in n)return t===!1?e[o]:(s=n[e[o]],r(s,"function")?a(s,t||n):s);return!1}function f(e,n){return!!~(""+e).indexOf(n)}function u(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function c(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(n,t,r){var s;if("getComputedStyle"in e){s=getComputedStyle.call(e,n,t);var o=e.console;if(null!==s)r&&(s=s.getPropertyValue(r));else if(o){var i=o.error?"error":"log";o[i].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else s=!t&&n.currentStyle&&n.currentStyle[r];return s}function p(){var e=n.body;return e||(e=i(x?"svg":"body"),e.fake=!0),e}function m(e,t,r,s){var o,a,l,f,u="modernizr",c=i("div"),d=p();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=s?s[r]:u+(r+1),c.appendChild(l);return o=i("style"),o.type="text/css",o.id="s"+u,(d.fake?d:c).appendChild(o),d.appendChild(c),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),c.id=u,d.fake&&(d.style.background="",d.style.overflow="hidden",f=_.style.overflow,_.style.overflow="hidden",_.appendChild(d)),a=t(c,e),d.fake?(d.parentNode.removeChild(d),_.style.overflow=f,_.offsetHeight):c.parentNode.removeChild(c),!!a}function y(n,r){var s=n.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(c(n[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];s--;)o.push("("+c(n[s])+":"+r+")");return o=o.join(" or "),m("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==d(e,null,"position")})}return t}function g(e,n,s,o){function a(){c&&(delete N.style,delete N.modElem)}if(o=r(o,"undefined")?!1:o,!r(s,"undefined")){var l=y(e,s);if(!r(l,"undefined"))return l}for(var c,d,p,m,g,v=["modernizr","tspan","samp"];!N.style&&v.length;)c=!0,N.modElem=i(v.shift()),N.style=N.modElem.style;for(p=e.length,d=0;p>d;d++)if(m=e[d],g=N.style[m],f(m,"-")&&(m=u(m)),N.style[m]!==t){if(o||r(s,"undefined"))return a(),"pfx"==n?m:!0;try{N.style[m]=s}catch(h){}if(N.style[m]!=g)return a(),"pfx"==n?m:!0}return a(),!1}function v(e,n,t,s,o){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+T.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?g(a,n,s,o):(a=(e+" "+z.join(i+" ")+i).split(" "),l(a,n,t))}function h(e,n,r){return v(e,t,t,n,r)}var C=[],w=[],S={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){w.push({name:e,fn:n,options:t})},addAsyncTest:function(e){w.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=S,Modernizr=new Modernizr;var _=n.documentElement,x="svg"===_.nodeName.toLowerCase(),b=S._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];S._prefixes=b,Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",t=i("a"),r=t.style;return r.cssText=e+b.join(n+";"+e).slice(0,-e.length),-1!==r.position.indexOf(n)});var P="Moz O ms Webkit",T=S._config.usePrefixes?P.split(" "):[];S._cssomPrefixes=T;var z=S._config.usePrefixes?P.toLowerCase().split(" "):[];S._domPrefixes=z;var E={elem:i("modernizr")};Modernizr._q.push(function(){delete E.elem});var N={style:E.elem.style};Modernizr._q.unshift(function(){delete N.style}),S.testAllProps=v,S.testAllProps=h,Modernizr.addTest("cssanimations",h("animationName","a",!0)),Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),Modernizr.addTest("csstransitions",h("transition","all",!0)),s(),o(C),delete S.addTest,delete S.addAsyncTest;for(var k=0;k<Modernizr._q.length;k++)Modernizr._q[k]();e.Modernizr=Modernizr}(window,document);
```

![](/static/img/interaction/image40.jpg)

코드를 넣고 페이지를 확인하면 위와 같이 `html` 태그에 우리가 모더나이저에서 선택했던 속성들이 추가된 것을 알 수 있다.  
아까 우리가 선택한 `csspositionsticky`, `cssanimations`, `csstransforms`, `csstransitions` 클래스명이 붙은 것을 확인할 수 있고 
크롬에선 다 지원을 하기에 `no-`라는 접두사가 붙지 않았다.

![](/static/img/interaction/image41.jpg)

IE에서 확인하면 위와 같이 **sticky**에는 `no-`라는 접두사가 붙은 것을 확인할 수 있다.  
그리고 위와 같이 해당 클래스명들이 html 태그에 추가된 이유는 **우리가 모더나이즈 사이트에서 빌드하기 전에 Add CSS classes 를 체크했기 때문이다.**

![](/static/img/interaction/image42.jpg)

그리고 html 태그에 추가된 클래스들을 활용해 위와 같이 스타일을 더 추가해준다.  
IE에선 sticky가 안되므로 **no-csspositionsticky** 클래스를 활용해 스타일을 추가해준다.

```javascript
if (Modernizr.csspositionsticky) {
    init(); //start
}
```

그리고 자바스크립트를 보면 위와 같이 `Modernizr.csspositionsticky`가 true여야만 init() 함수를 호출하는 것을 알 수 있다.  
false인 경우엔 init 함수를 호출하지 않는다.  
IE에선 `Modernizr.csspositionsticky`가 false를 반환한다.

**csspositionsticky** 이 부분은 우리가 모더나이즈 사이트에서 직접 선택한 해당 네이밍과 같다.  

![](/static/img/interaction/image43.jpg)

**즉, 위의 명칭들을 가져다가 CSS 또는 JS에서 사용하면 된다는 것이다.**

---

이벤트 핸들러도 실행되어야 하는 환경에서만 실행되도록 다음과 같이 함수로 묶어준다.  
그리고 코드 수정을 해준다.

```javascript
function init() { //최초 한번실행
    changeOverlap();
    bindEvent();
}

function bindEvent() {
    $(window).on("scroll", function (e) { //스크롤 이벤트를 추가합니다.
        changeOverlap();
    });

    $(window).on("resize", function () {
        changeOverlap();
    });
}

if (Modernizr.csspositionsticky) {
    init(); //start
}
```

---

>위 모더나이즈 방법을 활용하면 속성을 지원하지 않는 브라우저에서는 어떻게 대처할지 선택지를 하나 늘릴 수 있을 것이다.