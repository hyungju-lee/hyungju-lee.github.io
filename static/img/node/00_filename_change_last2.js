'use strict';

// 파일시스템, 패스 모듈
const fs = require('fs'),
    path = require('path');

// 팩토리
const Operator = class {
    static factory(v) {
        if (v instanceof Object) {
            if (!Array.isArray(v)) v = Object.values(v);
            return new ArrayOp(v.map(v => Operator.factory(v)));
        } else return new PrimaOp(v);
    }

    constructor(v) {
        this.v = v;
    }

    * gene() {
        throw 'override';
    }
};
const PrimaOp = class extends Operator {
    constructor(v) {
        super(v);
    }

    * gene() {
        yield this.v;
    }
};
const ArrayOp = class extends Operator {
    constructor(v) {
        super(v);
    }

    * gene() {
        for (const v of this.v) yield* v.gene();
    }
};

// 상수
const filePath = './src/html/';
const realFile = fs.readdirSync(filePath);
const indexList = fs.readFileSync('./index.html', 'utf8');
const categories = indexList.replace(/(\r\n|\r|\n)/g, '').replace(/\t/g, '').match(/<ul>(.*?)<\/ul>/g);

// 프로미스
const initPromise = new Promise(resolve => {
    const isfile = [];
    realFile.map(file => path.join(filePath, file))
        .filter(file => fs.statSync(file).isFile())
        .forEach(file => {
            const extname = path.extname(file);
            const basename = path.basename(file);
            if (extname === '.html') {
                isfile.push(String(basename))
            }
        })
    resolve(isfile);
})
const changePromise = new Promise(resolve => {
    const categoriesArray = [];
    for (const v of Operator.factory(categories).gene()) {
        categoriesArray.push(v.match(/src\/(.*?)\.html/g));
    }
    resolve(categoriesArray);
})

// 실행식
initPromise.then(result => {
    const init = {};
    result.map(a => init[path.join(filePath, a)] = path.join(filePath, a.replace(/^\d{1,}_(\d{1,}_)*/, '')))
    return init
}).then(result => {
    for (const property in result) {
        fs.renameSync(property, result[property])
    }
    return result;
}).then(result => {
    const compare = fs.readdirSync(filePath);
    const rename = {};
    const noExit = [
        'index.html 파일엔 명시되어있으나 실제론 존재하지 않는 파일입니다.'
    ];
    changePromise.then(result => {
        for (let m = 0; m < result.length; m++) {
            let k = m >= 10 ? m : '0' + m;
            for (let i = 0; i < result[m].length; i++) {
                let n = i >= 10 ? i : '0' + i;
                if (compare.some(x => x === path.basename(result[m][i]).replace(/^\d{1,}_(\d{1,}_)*/, ''))) {
                    rename[result[m][i].replace(/src\//, '').replace(/html\//, '').replace(/(\d{1,}_)*/, '')] =
                        k + '_' + n + '_' + result[m][i].replace(/src\//, '').replace(/html\//, '').replace(/^\d{1,}_(\d{1,}_)*/, '');
                } else {
                    noExit.push(result[m][i]);
                }
            }
        }
    })
    return {noExit, rename};
}).then(({noExit, rename}) => {
    for (const property in rename) {
        fs.renameSync(path.join(filePath, property), path.join(filePath, rename[property]));
    }
    fs.writeFileSync('result.txt', noExit.join('\n'));
}).then(result => {
    const newFile = fs.readdirSync(filePath);
    for (const v of newFile) {
        if (!/^\d/.test(v)) {
            if (fs.statSync(path.join(filePath, v)).isFile()) {
                fs.rename(path.join(filePath, v), path.join(filePath, `99999_${v}`), (err) => {
                    if (err) throw err;
                    // console.log('Rename complete!');
                })
            } else {
                // console.log(`${v}는 html 파일이 아닙니다.`)
            }
        } else {
            // console.log(`${v}는 index.html에 명시되어있는 파일입니다.`);
        }
    }
}).catch(error => console.error(error))