---
title: webpack html-loader, html-webpack-plugin (gulp 대신 webpack 사용하려고 진행했던 공부)
layout: post
date: '2020-10-10 21:20:00'
categories:
- study_webpack
---

# webpack html-loader, html-webpack-plugin

webpack은 다른 모듈 번들러와 달리 진입점이 한개다.  
즉 그렇기 때문에 `html-loader`와 `html-webpack-plugin`의 기능을 전부 사용할 순 없다.

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title><%= htmlWebpackPlugin.options.title %></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<%= require('html-loader!./partial.html') %>
<img src="logo.png" alt="">
</body>
</html>
```

```javascript
// webpack.config.js
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    entry: './example.js',
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
            { test: /\.png$/, loader: 'file-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html'
        }),
        new MiniCssExtractPlugin({ filename: 'styles.css' })
    ]
};
```

예를들어 위와같이 `partial.html` 파일을 `require`하는 구문이 있다고하자.  
웹팩 `html-webpack-plugin`에는 기본적으로 `lodash template` 기능이 있어 `ejs` 구문을 해석할 수 있다. (전부는 아니다.)  
그래서 위와 같은 `require`로 포함된 파일을 불러올 수 있다.

하지만, 그렇게되면 `<img src="logo.png" alt="">` 여기에 걸려있는 `logo.png`는 **로더**에서 처리를 못한다.  
아웃풋에도 그대로 `<img src="logo.png" alt="">`로 내보내진다.  
이를 위해 해당 부분도 진입점으로 잡기위해 `html-loader`를 연동하면 그땐 `require`구문이 해석이 안된다.  

그렇다고 `copyPlugin`으로 **img** 폴더를 그대로 아웃풋으로 내보내면, 웹팩을 굳이 사용하는 의미가 없다.  
그렇게되면 웹팩을 가지고 걸프나 그런트처럼 사용하게 되는 것이다.  
차라리 그러면 걸프나 그런트를 사용하는 것이 나을 것이다.

즉, 애초에 `gulp`, `grunt`와는 다른 철학을 가지고 설계된 **webpack**이기에 마크업에서 **webpack**을 gulp나 grunt 처럼 사용하려 시도했던 것(내가) 조차 잘못된 거였다.  
애초에 불가능했던 거다.  
이번 공부를 통해 이러한 점을 알게되어서 다행이다.  

여튼 웹팩은 그래서 **리액트**, **뷰**, **앵귤러**에 쓰이는 것 같다.  
반대로 **걸프**나 **그런트**는 안쓰이지 않는가.

웹팩 공부하며 좋았던 개념을 걸프에 적용해보자.

1. 용량 적은 이미지(대략 20kb 이하) base64 인코딩 - 색깔 조정도 가능한지 알아보자.
2. 웹팩 데브서버처럼 인메모리얼 서버가 있는지 확인하자
3. 핫모듈 - 이는 걸프의 `since: lastRun` 기능과 비슷한 개념같다.

**위와 같은 기능을 더 조사해 `gulp`를 디벨롭하자.**