---
title: 반응형 모바일버전 작성하기
layout: post
date: '2020-10-25 01:20'
categories:
- js_interactive_web2
---

## 반응형 모바일버전 작성하기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section7/step3/index.html){:target="_blank"}

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