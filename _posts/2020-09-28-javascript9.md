---
title: 9. Message Queues and Event Loops (메시지 대기열 및 이벤트 루프)
layout: post
date: '2020-09-28 16:55:00'
categories:
- js
---

## 9. Message Queues and Event Loops (메시지 대기열 및 이벤트 루프)

[MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop#:~:text=JavaScript%20has%20a%20concurrency%20model,languages%20like%20C%20and%20Java){:target="_blank"}에 따르면 
JavaScript에는 코드 실행, 이벤트 수집 및 처리, 대기중인 하위 작업 실행을 담당하는 이벤트 루프를 기반으로하는 동시성 모델이 있습니다.  
이 모델은 C 및 Java와 같은 다른 언어의 모델과는 상당히 다릅니다.  

메시지 큐는 위의 동시성 모델에서 가장 오래된 것부터 시작하는 메시지를 처리하는 데 사용됩니다.  
이벤트가 발생하고 이벤트 리스너가 첨부되어있을 때마다 메시지가 추가됩니다.  

이러한 개념을 이해하면 JS가 내부에서 작동하고 코드를 해석하는 방법을 더 잘 이해할 수 있습니다.