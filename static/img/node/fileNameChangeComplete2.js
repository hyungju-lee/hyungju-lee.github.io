'use strict';

// node file system module and path module
const fs = require('fs'),
    path = require('path');

const indexList = fs.readFileSync('./index.html', 'utf8');
const realFile = fs.readdirSync('./src/html/');
let realHtmlFile = [];
const compare = indexList.match(/[src]*\/*html\/(.*?)\.html/g);
let compareBaseName = [];
const arr = indexList.replace(/\n/g, '').match(/<ul>(.*?)<\/ul>/g);
let arr2 = [];
let obj = {};
let notExit = {};


// 실제 존재하는데 index.html 상에 기록되지 않은 파일을 위한 식
// 실제 존재하는 html 파일
realFile.map(file => path.join('./src/html/', file))
    .filter(file => fs.statSync(file).isFile())
    .forEach(file => {
        const extname = path.extname(file);
        const basename = path.basename(file);
        if (extname === '.html') {
            realHtmlFile.push(String(basename));
        }
    })

// index.html 리스트 상에서만 존재하는 html 파일
for (let k=0; k<compare.length; k++) {
    compareBaseName.push(path.basename(compare[k]));
}

// 실제 존재하는 HTML 파일과 index.html 상에 기록되어있는 html 파일 비교
for (let o=0; o<realHtmlFile.length; o++) {
    if(!compareBaseName.some(x => x === realHtmlFile[o])) {
        let oldPath = path.join('./src/html', realHtmlFile[o]);
        let newPath = path.join('./src/html', '99999999_' + realHtmlFile[o]);
        obj[oldPath] = newPath;
    }
}


// index.html에 기재되어있는 파일들 이름 바꾸기
arr.forEach(cont => arr2.push(cont.match(/[src]*\/*html\/(.*?)\.html/g)));

let arr2Compare = [];
for (let p=0; p<arr2.length; p++) {
    for (let v=0; v<arr2[p].length; v++) {
        if (!arr2Compare[p]) arr2Compare[p] = [];
        arr2Compare[p].push(arr2[p][v].replace(/[src]*\/*[html]*\//, ''))
    }
}

for (let i=0; i<arr2.length; i++) {
    let n = i < 10? '0'+i : i;
    let m = 0;
    for (let j=0; j<arr2[i].length; j++) {
        m = j < 10? '0' + j : j;
        if(!realHtmlFile.some(x => x === arr2Compare[i][j])) {
            let oldPath = path.join('./src/html', 'notExit.txt');
            let newPath = path.join('./src/html', arr2Compare[i][j]);
            notExit[oldPath] = newPath;
        } else {
            let b = path.basename(arr2[i][j]);
            let bkey = path.join('./src/html', b);
            let s = n + '_' + m + '_' + b.replace(/[0-9]{1,}_/g, '');
            obj[bkey] = path.join('./src/html/', s);
        }
    }
}

for (const property in obj) {
    fs.rename(property, obj[property], (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    })
}


for (const property in notExit) {
    fs.writeFile(property, notExit[property], (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}