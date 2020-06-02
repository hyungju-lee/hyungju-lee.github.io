'use strict'

const fs = require('fs'),
    path = require('path'),
    resemble = require('resemblejs');

const compare = () => {

    const name = fs.readFileSync('dist/before/index.html', 'utf8'),
        name2 = fs.readFileSync('dist/after/index.html', 'utf8');
    let nameList = name.match(/[src]*\/*html\/(.*?)\.html/g),
        nameList2 = name2.match(/[src]*\/*html\/(.*?)\.html/g);
    const num = nameList.length > nameList2.length ? nameList2.length : nameList.length;

    for (let i=0; i<num; i++) {
        resemble(`pc/before/${path.basename(nameList[i])}.png`)
            .compareTo(`pc/after/${path.basename(nameList2[i])}.png`)
            .onComplete(function (data) {
                let diff = JSON.stringify(data.diffBounds)
                if (data.misMatchPercentage !== '0.00') {
                    console.log(`pc - ${nameList[i]} : ${nameList2[i]} = ${data.misMatchPercentage}, ${diff}`);
                }
            });
    }

    for (let i=0; i<num; i++) {
        resemble(`m/before/${path.basename(nameList[i])}.png`)
            .compareTo(`m/after/${path.basename(nameList2[i])}.png`)
            .onComplete(function (data) {
                let diff = JSON.stringify(data.diffBounds)
                if (data.misMatchPercentage !== '0.00') {
                    console.log(`m - ${nameList[i]} : ${nameList2[i]} = ${data.misMatchPercentage}, ${diff}`);
                }
            });
    }
}

compare();

