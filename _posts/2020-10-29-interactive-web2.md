---
title: 10. svg와 영상을 활용한 인터렉션2
layout: post
date: '2020-10-28 23:13'
categories:
- js_interactive_web2
---

## 10. svg와 영상을 활용한 인터렉션2

* [svg와 영상을 활용한 인터렉션](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section11/step2/index.html){:target="_blank"}

`path`를 지우고 그리기 위해서는 두 가지 속성이 필요하다.

![](/static/img/interaction/image47.jpg)

1. stroke-dasharray : 파선을 뜻한다.
2. stroke-dashoffset : 선이 시작할 위치

위 속성 각각에 path의 전체 길이(total length) 값을 넣어주면 선이 사라진다.

![](/static/img/interaction/image48.jpg)

![](/static/img/interaction/svg-path.gif)

위와 같이 path 태그에 `stroke-dasharray` 와 `stroke-dashoffset` 속성이 적용되어있는 것을 볼 수 있고, 
`stroke-dashoffset` 속성 값을 조절하면 선이 그려지는 것을 볼 수 있다.  

`stroke-dashoffset`이 3054에서 0이되도록 만들면 svg 이미지가 다 그려지게된다.