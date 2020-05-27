'use strict';

const fs = require('fs'),
    path = require('path');


const arr = fs.readdirSync('./src/html/');
let arr2 = [];
let obj;
let arr4;
let obj2 = {};

arr.map(file => path.join('./src/html/', file))
    .filter(file => fs.statSync(file).isFile())
    .forEach(file => {
        const extname = path.extname(file);
        const basename = path.basename(file);
        if (extname === '.html') {
            arr2.push(String(basename));
        }
    })

obj = arr2.reduce((a, x) => {
    if (!a[x[0]]) a[x[0]] = [];
    a[x[0]].push(x);
    return a;
}, {})

arr4 = Object.keys(obj).map(function (key) {
    return obj[key];
});


for (let i=0; i<arr4.length; i++) {
    let n = i < 10? '0'+i : i;
    let m = 0;
    for (let j=0; j<arr4[i].length; j++) {
        m = j < 10? '0' + j : j;
        obj2[arr4[i][j]] = n + '_' + m + '_' + arr4[i][j];
    }
}


for (const property in obj2) {
    let oldPath = path.join('./src/html/', property);
    let newPath = path.join('./src/html/', obj2[property]);
    fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
    })
}

