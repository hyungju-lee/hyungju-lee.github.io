'use strict'

const {src, parallel} = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

const server = () => {
    return connect.server({
        root: 'dist/',
        port: 8000,
        livereload: true
    })
};

// 브라우저 오픈 업무
const browser = () => {
    const options = {
        uri: 'http://localhost:8000/',
        app: "chrome" //chrome, firefox, iexplore, opera, safari
    };
    return src('dist/')
        .pipe(open(options)); // local 서버가 아닌 파일 경로로 열려면 '<%file.path%>' 를 넣어주면된다.
};

exports.default = parallel(server, browser);