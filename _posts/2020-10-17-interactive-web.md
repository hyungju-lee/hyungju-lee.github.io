---
title: 1. 무한스크롤링
layout: post
date: '2020-10-17 10:46'
categories:
- js_interactive_web2
---

## 1. 구글, 네이버에서 사용하는 무한스크롤 원리와 구현

* [구글, 네이버에서 사용하는 무한스크롤 원리와 구현](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section2/step2/index.html){:target="_blank"}

### 무한스크롤의 단점

사용자가 꽤많이 스크롤링을 한 상태에서 새로고침을 하면 다시 맨 위로 올라가게 된다.  
즉 사용자가 원하는 리스트를 찾아 클릭하고 해당 항목을 확인한 뒤에 뒤로가기를 눌러 이전페이지로 돌아갔을 때, 
스크롤이 맨 위로 올라가게되므로 여러가지 불편한점이 많이 생기게 된다는 것이다.  

그럼 구글에선 이와 같은 문제를 어떻게 처리했을까?

![](/static/img/interaction/image17.jpg)

위와 같이 원하는 리스트 클릭시 옆에 새로운 레이아웃을 생성해 간략한 내용을 보여주도록 했고, 해당 내용을 클릭하면 새창으로 해당 페이지에 들어가도록 해놓은 것을 확인할 수 있다.  
위와 같이 구현해놓으면 새로고침했을 때 맨 위로 되돌아가는 문제점을 어느정도 해결할 수 있다.  
그리고 이 방법이 정답은 아니겠지만, 만약 우리가 무한스크롤에 대한 컨텐츠를 제작하게 되었을 때, 이러한 문제와 해결방안을 미리알고 있다면, **기획 단계에서부터 큰 힘이 될수 있을거라 생각한다.**

## 무한스크롤 구현방법

문서의 끝에 도달했을 때, 이미지 3개씩 총 10번을 호출 후 종료하도록 했다.  
10번 호출이 끝나면 더 이상 호출되지 않는다.  
만약 실무라면 DB와 연동해서 이미지 리스트를 뿌리도록 해야될 것이다.  
하지만 우리는 지금 DB를 사용하는 것도 아니고 API를 사용하는 것도 아니기 때문에 단순하게 이미지 3개씩 총 10번을 호출하고 종료하도록 만들었다.

* <button data-toggle="collapse" data-target="#jQuery">jQuery</button>

{:.collapse #jQuery}
```javascript
(function (win, $) {
    var target = $(".sc_infinity .list");
    var breakList = 10;
    var listCount = 0;
    var winTop;
    var onTop;

    var getList = function () {
        var list;
        listCount++;
        if (listCount > breakList) {
            list = null;
        } else {
            list = '<li><figure><img src="../images/1.jpg"></figure></li>';
            list += '<li><figure><img src="../images/2.jpg"></figure></li>';
            list += '<li><figure><img src="../images/3.jpg"></figure></li>';
        }
        return list;
    }

    var listCall = function () {
        winTop = $(window).scrollTop();
        onTop = $(document).height() - $(window).height() - $('.footer').height();

        if (winTop >= onTop) { 
            var data = getList(); 
            if (data !== null) { 
                target.append(data);
            } else {
                return false;
            }
        }
    }

    var init = function () {
        listCall(); 
    }

    init();

    $(window).on("scroll", function(){ 
        listCall();
    });
})(window, window.jQuery)
```

* <button data-toggle="collapse" data-target="#javaScript">javaScript</button>

{:.collapse #javaScript}
```javascript
(function () {
    var target = document.querySelector(".sc_infinity .list");
    var parser = new DOMParser();
    var breakList = 10;
    var listCount = 0;
    var winTop;
    var onTop;

    var getList = function () {
        var list = "";
        listCount++;
        if (listCount > breakList) {
            list = null;
        } else {
            for (var i = 0; i < 3; i++) {
                list += "<li><figure><img src=\"../images/" + (i+1) + ".jpg\"></figure></li>";
            }
            list = parser.parseFromString(list, "text/html").querySelectorAll("li");
        }
        return list
    }

    var listCall = function () {
        winTop = pageYOffset;
        onTop = document.body.scrollHeight - innerHeight - document.querySelector(".footer").offsetHeight;
        if (winTop >= onTop) {
            var data = getList();
            if (data !== null) {
                target.appendChild(data[0])
                target.appendChild(data[1])
                target.appendChild(data[2])
            } else {
                return false;
            }
        }
    }

    var init = function () {
        listCall();
    }

    init();
    addEventListener("scroll", function () {
        listCall();
    })
})()
```