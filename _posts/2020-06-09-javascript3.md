---
title: promise
layout: post
date: '2020-06-09 21:19:00'
categories:
- javascript
---

## promise

```javascript
var aaaa = function() {
  let a = [];
  return new Promise(resolve => {
    setTimeout(function(){
      [1, 2].map(b => a.push(b))
      resolve(a);
    }, 5000)
  });
};

var bbbb = function() {
  let c = [];
  return new Promise(resolve => {
    setTimeout(function(){
      [5, 6].map(d => c.push(d))
      resolve(c);
    }, 3000)
  });
};


(async () => {
  const slow = await aaaa();
  console.log(slow);

  const slow2 = await bbbb();
  console.log(slow2);
})()
```