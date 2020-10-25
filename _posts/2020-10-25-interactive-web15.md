---
title: 9. UI섹션과 3D 모델 이미지 매치 시키기
layout: post
date: '2020-10-25 19:17'
categories:
- js_interactive_web2
---

## 9. UI섹션과 3D 모델 이미지 매치 시키기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step4/index.html){:target="_blank"}
* [원근감 조절](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section10/step2/index2.html){:target="_blank"}

```javascript
var changeImage = function (index) {
    document.querySelectorAll(".cube_box .cube_face").forEach(function (val, i) {
        val.style.backgroundImage = "url(../images/"+(index+1)+".jpg)";
    })
}
```

```css
.cube_wrap {position: fixed; top:50%; left:50%; width: 400px; height: 400px; perspective: 150px; transform: translate(-50%, -50%)}
```

`perspective` 값을 `150px`로 수정하면 마치 4차원 공간에 있는 것처럼 보이게 할 수 있다.  
위의 링크를 확인해보면 **원근감을 조절해 얻을 수 있는 효과가 꽤 다양하다는 것을 느낄 수 있을 것이다.**