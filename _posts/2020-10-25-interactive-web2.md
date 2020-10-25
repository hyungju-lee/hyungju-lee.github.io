---
title: 6. 반응형 모바일버전 작성하기
layout: post
date: '2020-10-25 01:20'
categories:
- js_interactive_web2
---

## 6. 반응형 모바일버전 작성하기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step3/index.html){:target="_blank"}

해당 예제는 애플 인터렉션 강의와는 다르게 각각의 스크롤 애니메이션 프레임마다 얼마나 빠르게, 또는 느리게 인터렉션이 구현되어야 하는지를 따로 정하는 요소는 없다.  
의도한 것인지는 모르겠으나 개인적으로 자바스크립트 정리 수준은 애플 인터렉션 강의가 훨씬 더 나은 방법이라고 생각한다.  
물론 해당 예제도 도움이 많이 된다.

```css
@media only screen and (max-width: 1024px) {
    .interaction_box h2 {font-size:32px;}
    .fix_motion {height: 3000px;}
    .fix_motion .sticky_cont .cont_box .bg_img {background-image: url('../images/steve_jobs_m.jpg'); }
    .fix_motion .sticky_cont .cont_box .intro_txt h2 {font-size: 50px;}
    .fix_motion .sticky_cont .cont_box .ending_txt .tb_row .tb_cell p {font-size:50px;}
}
```

```javascript
$(window).on("resize", function(){
    changeOverlap();
});
```

>섹션의 `height` 길이를 통해서 스크롤에 따른 페럴렉스 효과의 진행 속도를 조절할 수 있다.  
>이렇게 하는건 거의 페럴렉스에서 보편적인 방법인가보다.