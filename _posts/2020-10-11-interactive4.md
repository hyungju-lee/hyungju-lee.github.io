---
title: 페럴렉스는 어떻게 구현되는가?
layout: post
date: '2020-10-11 21:54'
categories:
- js_interactive_web
---

## 페럴렉스는 어떻게 구현되는가?

* [횡스크롤 형식의 페럴렉스 사이트](https://www.cabletv.com/the-walking-dead){:target="_blank"}
* [엄청난 스크롤을 해야하는 사이트](https://neal.fun/deep-sea/){:target="_blank"}

PC에서만 적용되는 mouse 이벤트로만 인터렉션 공부를 해서 실망하셨을 수도 있다.  
하지만 **device orientation**이란 값이 있다.  
그걸 적용하면 모바일에서도 같은 인터렉션 적용이 가능하다.  
이쪽은 따로 검색을 해보셔도 괜찮을 것 같다.

---

## 페럴렉스

페럴렉스는 레이어의 움직임을 서로 달리하는 개념이라고 생각하면 된다.  
포토샵의 레이어를 여러개 겹쳐놓고 스크롤에 따라 각각의 레이어를 달리 움직이는 것이 페럴렉스이다.