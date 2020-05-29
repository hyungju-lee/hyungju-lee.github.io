'use strict'

const fs = require('fs'),
    webshot = require('webshot');


const screenShot = () => {
    // PC 스크린샷
    const pcOpts = {
        windowSize: {
            width: 1024,
            height: 768
        },
        shotSize: {
            width: 'window',
            height: 'all'
        },
        userAgent : "Mozilla/5.0 (Macintosh; Intel Mac OS X)",
        renderDelay: 1000,
    }

    // 모바일 스크린샷
    const mOpts = {
        screenSize: {
            width: 375,
            height: 812
        },
        shotSize: {
            width: 375,
            height: 'all'
        },
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
        renderDelay: 1000,
    };

    const name = fs.readFileSync('dist/before/index.html', 'utf8'),
        name2 = fs.readFileSync('dist/after/index.html', 'utf8');
    let nameList = name.match(/[src]*\/*html\/(.*?)\.html/g),
        nameList2 = name2.match(/[src]*\/*html\/(.*?)\.html/g);
    const num = nameList.length > nameList2.length ? nameList2.length : nameList.length;

    for (let i=0; i<num; i++) {
        webshot(`http://localhost:8000/before/${nameList[i]}`, `pc/before/${nameList[i]}.jpg`, pcOpts, function (err) {
            if (err) console.log(err);
        });
        webshot(`http://localhost:8000/after/${nameList2[i]}`, `pc/after/${nameList2[i]}.jpg`, pcOpts, function (err) {
            if (err) console.log(err);
        });
    }

    for (let i=0; i<num; i++) {
        webshot(`http://localhost:8000/before/${nameList[i]}`, `m/before/${nameList[i]}.jpg`, mOpts, function (err) {
            if (err) console.log(err);
        });
        webshot(`http://localhost:8000/after/${nameList2[i]}`, `m/after/${nameList2[i]}.jpg`, mOpts, function (err) {
            if (err) console.log(err);
        });
    }
}

screenShot();