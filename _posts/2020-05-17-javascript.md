---
title: ES6 버튼 클릭기능 구현하기
layout: post
date: '2020-05-17 21:16:00'
categories:
- js
---

똑같은 기능을 하지만 서로 다른 소스 두 가지

```javascript
let caseButton = document.querySelectorAll('.case_view a'),
    error = document.querySelectorAll('.error');

let caseViewFunc = (_index) => {
    return tabClickEevent = (e) => {
        e.preventDefault();
        for(j = 0; j < error.length; j++) {
            _index == j ? error[_index].style.display = null : error[j].style.display = 'none';
        }
    }
}

for (i = 0; i < caseButton.length; i++) {
    caseButton[i].onclick = caseViewFunc(i);
}
```

```javascript
let btn = document.querySelectorAll('.case_view a'),
    txt = document.querySelectorAll('.error');

btn = Array.prototype.slice.call(btn);
txt = Array.prototype.slice.call(txt);

btn.map((x, i) => {
    x.addEventListener('click', function () {
        if (txt[i].style.display === 'none') {
            txt[i].style.display = 'block';
        } else {
            txt[i].style.display = 'none';
        }
    })
})
```