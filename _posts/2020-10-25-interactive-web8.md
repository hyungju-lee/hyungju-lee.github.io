---
title: 8. html, css 작성하기 - 모바일 포함
layout: post
date: '2020-10-25 12:25'
categories:
- js_interactive_web2
---

## 8. html, css 작성하기 - 모바일 포함

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section9/step1/index.html){:target="_blank"}

해당 예제도 마찬가지로 `position: sticky` 속성을 활용하였다.  

```html
<div class="canvas_wrap">
    <figure class="no_canvas">
        <img src="../images/seq/62.jpg">
    </figure>
</div>
```

`canvas_wrap`에는 `canvas` 태그가 들어가야한다.  
하지만 `canvas` 태그는 스크립트에서 추가할 예정이기 때문에 현재 위 예제파일에선 `canvas` 요소가 없는 상태이다.  

**그럼 `no_canvas` 요소는 뭘까?**  

`no_canvas` 요소는 `canvas` 요소를 지원하지 않거나 사용할 수 없을 때 보여지게될 이미지이다.  
`canvas` 요소에 사용되는 이미지는 총 116장이다.  
그 중에서 이번 예제에서는 가장 제품의 모습을 잘 보여주는 이미지를 선택해 `no_canvas` 요소에 담았다.  
