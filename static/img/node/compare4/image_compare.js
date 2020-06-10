'use strict'

process.setMaxListeners(0);

const fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    inquirer = require('inquirer'),
    captureWebsite = require('capture-website'),
    resemble = require('resemblejs'),
    file = [
        path.join(__dirname, 'pc/before'),
        path.join(__dirname, 'pc/after'),
        path.join(__dirname, 'm/before'),
        path.join(__dirname, 'm/after')
    ],
    before = fs.readFileSync(path.join(__dirname, 'dist/before/index.html'), 'utf8'),
    after = fs.readFileSync(path.join(__dirname, 'dist/after/index.html'), 'utf8');

// make folders
file.map(f => fs.mkdirSync(f, {recursive: true}))

// before index.html 과 after index.html 파일에서 리스트를 추출하여 beforeList, afterList 변수에 저장
let beforeList = before.match(/[src]*\/*html\/(.*?)\.html/g),
    afterList = after.match(/[src]*\/*html\/(.*?)\.html/g),
    beforeItems = [],
    afterItems = [];

// beforeItems 배열과 afterItems 배열에 로컬서버 주소를 각각 저장
for (let i = 0; i < beforeList.length; i++) {
    if (!Array.isArray(beforeItems[i])) beforeItems[i] = [];
    beforeItems[i] = [`http://localhost:8000/dist/before/${beforeList[i]}`, path.basename(beforeList[i])]
}
for (let i = 0; i < afterList.length; i++) {
    if (!Array.isArray(beforeItems[i])) afterItems[i] = [];
    afterItems[i] = [`http://localhost:8000/dist/after/${afterList[i]}`, path.basename(afterList[i])]
}

// screenshot compare function
const compare = () => {
    const num = beforeList.length > afterList.length ? afterList.length : beforeList.length,
        res = ['pc', 'm'];
    let compareRes = [];
    return new Promise(resolve => {
        res.map(a => {
            for (let i = 0; i < num; i++) {
                resemble(path.join(__dirname, `${a}/before/${path.basename(beforeList[i])}.png`))
                    .compareTo(path.join(__dirname, `${a}/after/${path.basename(afterList[i])}.png`))
                    .onComplete(function (data) {
                        let diff = JSON.stringify(data.diffBounds)
                        if (data.misMatchPercentage !== '0.00') {
                            compareRes.push(`${a} - ${beforeList[i]} : ${afterList[i]} = ${data.misMatchPercentage}, ${diff}`);
                        }
                    });
            }
        })
        resolve(compareRes.join('\n'));
    })
}

// Setting screenshot options and 실행
function setting() {
    // screeshot options
    let mobileOpts = {
        fullPage: true,
        delay: 5,
        // emulateDevice: 'iPhone X',
        // width: mobileWidth,
    };
    let pcOpts = {
        fullPage: true,
        delay: 5,
        // width: pcWidth,
    };

    const questions = [{
            type: 'input',
            name: 'PCBrowserWidth',
            message: 'pc browser width:'
        },
            {
                type: 'list',
                choices: [ 'true', new inquirer.Separator(), 'false' ],
                name: 'iphoneX',
                message: 'Mobile device iphone X?'
            },
        ],
        mOpt = {
            type: 'input',
            name: 'mobileBrowserWidth',
            message: 'mobile browser width'
        }
    inquirer.prompt(questions).then(function (answers) {
        const answerData = JSON.stringify(answers);
        const answerDataJson = JSON.parse(answerData);
        pcOpts.width = Number(answerDataJson.PCBrowserWidth);
        mobileOpts.emulateDevice = answerDataJson.iphoneX === 'true' ? 'iPhone X' : '';
        return answerDataJson;
    }).then(function (data) {
        if (data.iphoneX === 'false') inquirer.prompt(mOpt).then(function (answers) {
            mobileOpts.width = Number(answers.mobileBrowserWidth);
        });
    }).then(function () {
        // server 실행
        exec('http-server -a localhost -p 8000');

        // screenshot and compare
        (async () => {
            await Promise.all(beforeItems.map(([url, filename]) => {
                return captureWebsite.file(url, path.join(__dirname, `pc/before/${filename}.png`), pcOpts);
            }));
            await Promise.all(afterItems.map(([url, filename]) => {
                return captureWebsite.file(url, path.join(__dirname, `pc/after/${filename}.png`), pcOpts);
            }));
            await Promise.all(beforeItems.map(([url, filename]) => {
                return captureWebsite.file(url, path.join(__dirname, `m/before/${filename}.png`), mobileOpts);
            }));
            await Promise.all(afterItems.map(([url, filename]) => {
                return captureWebsite.file(url, path.join(__dirname, `m/after/${filename}.png`), mobileOpts);
            }));
            const com = await compare();
            console.log(com);
            process.exit();
        })();
    });
}

setting();