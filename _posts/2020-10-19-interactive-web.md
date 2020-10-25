---
title: 4. IE11에선 scale이 확대될 때 덜덜 떨리는 현상이 있는데 이에 대한 해결 방법
layout: post
date: '2020-10-19 22:31'
categories:
- js_interactive_web2
---

## 4. 한가지 팁 : 이미지에 마우스오버를 했을 때 scale 확대 - IE11에선 scale이 확대될 때 덜덜 떨리는 현상이 있다. 이에 대한 해결 방법

```css
.img_box:hover img {
    transform: scale(1.2) rotate(-0.01deg);
}
```

`scale`과 `rotate` 속성을 같이 적용하면 된다.  
위의 코드처럼 `rotate(-0.01deg)` 정도만 적용하게 되면 실제로 회전되는 효과는 구분하기 힘들지만, 덜덜 떨리는 현상은 없어지게 된다.  
