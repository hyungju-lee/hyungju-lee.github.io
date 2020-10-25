---
title: 5. 최종 브라우저 테스트 - 버그 수정
layout: post
date: '2020-10-24 16:54'
categories:
- js_interactive_web2
---

## 5. 최종 브라우저 테스트 - 버그 수정

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step8/index.html){:target="_blank"}

## Safari

섹션 1 텍스트 마스킹 효과에서 문제가 있다.  
Safari도 IE와 마찬가지로 `transform`에서 `margin-left`로 수정하자.

```css
@keyframes text_mask {
    0%{
        width: 0;
        margin-left: 0;
    }
    50%{
        width: 100%;
        margin-left: 0;
    }
    100%{
        width: 100%;
        margin-left: 101%;
    }
}
```

## IE

1. 애니메이션 작동이 되질 않는다.  
개발자 도구에서 보면 `animation` 속성에 빨간 줄이 간 것을 볼 수 있다.  
`animtion` 속성을 사용 할 때 `animation-play-state: paused` 속성도 같이 합쳐쓴 것이 오류가 됐다.  
해당 속성을 따로 작성해야된다.

2. 텍스트 두개 중첩하여 오버랩하는 부분도 문제가 있다.  
`transform`으로 움직이는걸 `margin-left` 속성으로 움직이게 하면 해결된다.

```css
@keyframes move_text_mask{
	0%{
		/*transform:translateX(-50%);*/
		margin-left:-50%;
	}
	50%{
		margin-left:50%;
	}
	100%{
		margin-left:0;
	}
}
```

**애니메이션을 구현할 때 translate를 사용하면 요소의 너비값을 제대로 인식하지 않거나 다른 버그들로 인해서 translate가 제대로 동작하지 않는 경우가 있다.**  
**이럴 때 당황하지 마시고 margin이나 position left 값을 활용해서 코드를 수정해보는걸 추천한다.**