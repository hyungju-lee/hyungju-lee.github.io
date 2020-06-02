'use strict'

process.setMaxListeners(0);

const fs = require('fs'),
    path = require('path'),
    captureWebsite = require('capture-website');

fs.mkdirSync('pc/after', { recursive: true });
fs.mkdirSync('pc/before', { recursive: true });
fs.mkdirSync('m/after', { recursive: true });
fs.mkdirSync('m/before', { recursive: true });

const before = fs.readFileSync('dist/before/index.html', 'utf8'),
    after = fs.readFileSync('dist/after/index.html', 'utf8');
let beforeList = before.match(/[src]*\/*html\/(.*?)\.html/g),
    afterList = after.match(/[src]*\/*html\/(.*?)\.html/g),
    beforeItems = [],
    afterItems = [];

for (let i=0; i<beforeList.length; i++) {
    if (!Array.isArray(beforeItems[i])) beforeItems[i] = [];
    beforeItems[i] = [`http://localhost:8000/before/${beforeList[i]}`, path.basename(beforeList[i])]
}

for (let i=0; i<afterList.length; i++) {
    if (!Array.isArray(beforeItems[i])) afterItems[i] = [];
    afterItems[i] = [`http://localhost:8000/after/${afterList[i]}`, path.basename(afterList[i])]
}

const mobileOpts = {
    fullPage: true,
    emulateDevice: 'iPhone X',
    delay: 5
};

const pcOpts = {
    fullPage: true,
    delay: 5
};

(async () => {
    await Promise.all(beforeItems.map(([url, filename]) => {
        return captureWebsite.file(url, `pc/before/${filename}.png`, pcOpts);
    }));
    await Promise.all(afterItems.map(([url, filename]) => {
        return captureWebsite.file(url, `pc/after/${filename}.png`, pcOpts);
    }));
    await Promise.all(beforeItems.map(([url, filename]) => {
        return captureWebsite.file(url, `m/before/${filename}.png`, mobileOpts);
    }));
    await Promise.all(afterItems.map(([url, filename]) => {
        return captureWebsite.file(url, `m/after/${filename}.png`, mobileOpts);
    }));
})();