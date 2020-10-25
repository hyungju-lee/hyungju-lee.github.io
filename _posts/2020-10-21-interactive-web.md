---
title: 5. 텍스트 마스크 효과 만들기
layout: post
date: '2020-10-21 00:47'
categories:
- js_interactive_web2
---

## 5. 텍스트 마스크 효과 만들기

* [참고링크](https://hyungju-lee.github.io/hyungju-lee-interactions/interactive-web2/study/section6/step1/index.html){:target="_blank"}

* <button data-toggle="collapse" data-target="#html">html</button>

{:.collapse #html}
```html
<div class="wrap">
    <header class="header_wrap">
        <div class="logo">INTERACTIVE CODING</div>
    </header>
    <section class="sec01 active">
        <article class="inner">
            <div class="tb_row">
                <div class="tb_cell">
                    <nav class="nav_list">
                        <ul class="list">
                            <li>
                                <a href="" class="active">
                                    <span class="txt">TODAY</span>
                                    <span class="mask"></span> <!-- mask1 텍스트 등장 전에 나오는 흰색 배경-->
                                    <span class="mask2"></span> <!-- mask2 메뉴 오버시 나오는 노란색 밑줄 -->
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span class="txt">IMAGE Mask</span>
                                    <span class="mask"></span>
                                    <span class="mask2"></span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span class="txt">TEXT Mask</span>
                                    <span class="mask"></span>
                                    <span class="mask2"></span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <span class="txt">OVERLAP</span>
                                    <span class="mask"></span>
                                    <span class="mask2"></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="bg_rotate"></div>
        </article>
    </section>
    <footer class="footer">
        <div class="text_area">
            <p>
                2020 GGANG CODING. 당신의 열정을 응원합니다. :)
            </p>
        </div>
    </footer>
</div>
```

* <button data-toggle="collapse" data-target="#css">css</button>

{:.collapse #css}
```css
/* common */
.wrap {position:relative; overflow: hidden;}
.inner {max-width:1100px; height: 100%;  margin: 0 auto;}
.com_tit01 {font-family: 'NotoB'; font-size:60px; color:#fff; text-align: center;}
.com_txt01 {max-width:70%; margin:0 auto; font-family: 'NotoR'; font-size:24px; color:#fff; text-align: center;;}
.header_wrap {position: fixed; left:0; top:0; z-index:100; width:100%; height:70px; border-bottom:1px solid rgba(255,255,255,.2);}
.header_wrap .logo {margin-top:15px; padding-left:20px; font-size:24px; color:#fff;;}
.footer {position:relative; height:300px; background: #111}
.footer .text_area {position: relative; z-index: 20; padding:20px;}
.footer .text_area p {color:#fff; font-size:34px;}
.tb_row {display: table; width:100%; height: 100%;}
.tb_row .tb_cell {display: table-cell; vertical-align: middle;}

/* 텍스트 마스크 효과 */
.sec01 {position:relative; height:100vh; background: #111;}
.sec01 .nav_list {position: relative; z-index:20;}
.sec01 .nav_list .list {}
.sec01 .nav_list .list li {}
.sec01 .nav_list .list li a {overflow:hidden; position:relative; display:inline-block; font-size:140px; line-height: 1; color:#fff; transition:transform .5s;}
.sec01 .nav_list .list li a .mask {position:absolute; left:0; top:0; z-index:10; height:100%; background: #fff; animation:text_mask 2s 1 cubic-bezier(0.24, 0.77, 0.32, 0.95) both paused;}
.sec01 .nav_list .list li a .txt {position:relative; z-index:20; display: block; animation:text_opacity 2s 1s 1 cubic-bezier(0.24, 0.77, 0.32, 0.95) both paused;}
.sec01.active .nav_list .list li a .mask {animation-play-state: running;}
.sec01.active .nav_list .list li a .txt {animation-play-state: running;}

.sec01 .nav_list .list li a .mask2 {position:absolute; left:0; bottom:0; z-index:-1; width:0%; height:40%; background: #e9c400; transition:width .5s cubic-bezier(0.24, 0.77, 0.32, 0.95);}
.sec01 .nav_list .list li a:hover {transform:translateX(-10px); -webkit-transform:translateX(-10px); -moz-transform:translateX(-10px); -o-transform:translateX(-10px); -ms-transform:translateX(-10px);}
.sec01 .nav_list .list li a:hover .mask2 {width:100%;}
.sec01 .nav_list .list li a:hover {text-decoration: none;}
.sec01 .nav_list .list li a:focus {text-decoration: none;}

.sec01 .bg_rotate {position:absolute; left:50%; top:50%; z-index:10; width:1200px; height:1215px; margin-left:-357px; margin-top:-350px; background-image:url('../images/bg_rotate01.png'); background-repeat: no-repeat; background-size:cover; opacity: .15; animation:rotate_bg 40s infinite linear paused;}
.sec01.active .bg_rotate {animation-play-state: running;}

@keyframes text_mask {
    0%{
        width: 0;
        transform:translateX(0%);
    }
    50%{
        width: 100%;
        transform:translateX(0%);
    }
    100%{
        width: 100%;
        transform:translateX(101%);
    }
}

@keyframes text_opacity {
    0%{
        opacity: 0;
        color:#3535ff;
        transform:translateX(-50%);
    }
    100%{
        opacity: 1;
        color:#fff;
        transform:translateX(0%);
    }
}

@keyframes rotate_bg {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
```

* <button data-toggle="collapse" data-target="#javascript">javascript</button>

{:.collapse #javascript}
```javascript
setTimeout(function(){
	$('section').addClass('active');
},200)
```

![](/static/img/interaction/image27.jpg)
![](/static/img/interaction/image31.jpg)
![](/static/img/interaction/image28.jpg)
![](/static/img/interaction/image29.jpg)
![](/static/img/interaction/image30.jpg)