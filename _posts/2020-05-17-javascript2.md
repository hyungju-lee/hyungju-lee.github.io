---
title: cdn 다운안될 경우를 대비
layout: post
date: '2020-05-17 21:20:00'
categories:
- javascript
---

다음과 같이하면 됩니다.  
하지만 모바일은 안됩니다.(PC는 됩니다)  
그 이유는 모바일은 계속해서 다운 시도를 하기 때문입니다.  
일정시간이 지나서도 다운 시도가 실패한다면 다운 시도 자체를 막을 필요가 있습니다.  
일정시간 후에 다운시도를 막아야지 아래 식이 모바일에서도 온전하게 작동합니다.

```html
<script src="https://cdn/jquery-3.5.0.min.js"></script>
<script src="https://cdn/swiper.min.js"></script>
<script src="https://cdn/5.6.10/lottie.min.js"></script>

window.jQuery || document.write('<script defer src="https://code.jquery.com/jquery-3.5.0.min.js"></\script>')
window.jQuery || document.write('<script defer src="https://unpkg.com/swiper/js/swiper.min.js"></\script>')
window.jQuery || document.write('<script defer src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.6.10/lottie.min.js"></\script>')
```