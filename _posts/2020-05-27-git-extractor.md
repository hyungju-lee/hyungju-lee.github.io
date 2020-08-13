---
title: git date extractor 모듈
layout: post
date: '2020-05-27 10:02:00'
categories:
- node_gulp
---



git-date-extractor 모듈관련 이슈 


```bash
git log --pretty=format:%at -- "파일경로" | tail -n 1

'tail'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는
배치 파일이 아닙니다.
```

해당 파일의 생성날짜와 최근 변경날짜를 읽어옵니다.  
하지만 맨 뒤 `| tail -n 1` 부분의 명령어를 인식 못하는 터미널이 있을 수도 있습니다.   
그런 경우엔 생성날짜와 최근 변경날짜를 모두 0으로 읽어와 index.html 파일에 1970-01-01로 찍히게 됩니다.  
이럴 땐 환경변수를 추가해주면 된다고하는데.. 어려우니 패스..  
그냥 단순하게 git bash창으로 걸프 실행하면 해결 됩니다.  

**터미널 창이라고 해서 모든 git 명령어를 사용할 수 있는 건 아닌가봅니다.**
