'use strict'

process.setMaxListeners(0);

const fs = require('fs'),
    path = require('path'),
    exec = require('child_process'),
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
    // 포트번호
    let port;

    // 결과물
    let res;

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

    const questions = [
        {
            type: 'number',
            name: 'port',
            message: '포트번호를 입력해주세요.',
            default: 8000,
        },
        {
            type: 'confirm',
            name: 'result',
            message: '결과물을 텍스트 파일로 내보낼까요?',
        },
        {
            type: 'number',
            name: 'PCBrowserWidth',
            message: 'PC 브라우저 width 값을 얼마로 할까요?',
            default: 1280,
        },
        {
            type: 'confirm',
            name: 'iphoneX',
            message: '아이폰X 화면으로 찍으실건가요?',
        },
        {
            type: 'number',
            name: 'mobileBrowserWidth',
            message: '모바일 width 값은 얼마로 할까요?',
            default: 375,
            when: function (answers) {
                if (answers.iphoneX) return false;
                return true
            }
        }
    ];
    inquirer.prompt(questions).then(function (answers) {
        const answerData = JSON.stringify(answers);
        const answerDataJson = JSON.parse(answerData);
        port = answerDataJson.port;
        res = answerDataJson.result;
        pcOpts.width = answerDataJson.PCBrowserWidth;
        mobileOpts.emulateDevice = answerDataJson.iphoneX === true ? 'iPhone X' : '';
        mobileOpts.width = answerDataJson.mobileBrowserWidth;
    }).then(function () {
        // server 실행
        exec.exec(`http-server -a localhost -p ${port}`, {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(stdout);
        });

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
            if (res) {
                fs.writeFileSync('result.txt', com);
                console.log(com);
            } else {
                console.log(com);
            }
            process.exit();
        })();
    }).catch(function (err) {
        console.log(err);
    });
}

setting();