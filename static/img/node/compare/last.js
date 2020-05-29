'use strict'

const fs = require('fs'),
    resemble = require('resemblejs');


const compare = () => {

    const name = fs.readFileSync('dist/before/index.html', 'utf8'),
        name2 = fs.readFileSync('dist/after/index.html', 'utf8');
    let nameList = name.match(/[src]*\/*html\/(.*?)\.html/g),
        nameList2 = name2.match(/[src]*\/*html\/(.*?)\.html/g);
    const num = nameList.length > nameList2.length ? nameList2.length : nameList.length;

    for (let i=0; i<num; i++) {
        resemble(`pc/before/${nameList[i]}.jpg`)
            .compareTo(`pc/after/${nameList2[i]}.jpg`)
            .onComplete(function (data) {
                let diff = JSON.stringify(data.diffBounds)
                console.log(`pc - ${nameList[i]} : ${nameList2[i]} = ${data.misMatchPercentage}, ${diff}`);
            });
    }

    for (let i=0; i<num; i++) {
        resemble(`m/before/${nameList[i]}.jpg`)
            .compareTo(`m/after/${nameList2[i]}.jpg`)
            .onComplete(function (data) {
                let diff = JSON.stringify(data.diffBounds)
                console.log(`m - ${nameList[i]} : ${nameList2[i]} = ${data.misMatchPercentage}, ${diff}`);
            });
    }
}

compare();

