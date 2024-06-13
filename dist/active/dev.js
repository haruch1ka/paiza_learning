"use strict";
const testinput = `10
45 62 11 81 75 90 13 2 97 32
5
90
75
50
1
63`;
class Input {
    constructor(str, splitby = '\n') {
        this.inputDataArray = [];
        this.topItem = '';
        const inputArr = str.split(splitby);
        this.inputDataArray = inputArr.filter(Boolean);
    }
    shiftTop(stringOrReg = ' ') {
        const shifted = this.inputDataArray.shift();
        const splited = shifted === null || shifted === void 0 ? void 0 : shifted.split(stringOrReg);
        if (typeof splited === 'undefined') {
            return [];
        }
        else {
            return this.stringToNum(splited);
        }
    }
    stringToNum(stringArr) {
        return stringArr.map((e) => {
            if (e.match(/^-?[0-9]+$/)) {
                return Number(e);
            }
            else {
                return e;
            }
        });
    }
}
function main(inputStr) {
    const input = new Input(inputStr);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _times = input.shiftTop();
    const inputorderArray = [];
    input.inputDataArray.forEach((e) => {
        const formatted = input.stringToNum(new Input(e, ' ').inputDataArray);
        inputorderArray.push(formatted);
    });
    // const times = inputorderArray[2]
    const sortTargetArray = inputorderArray.shift();
    const targetAllay = inputorderArray.shift();
    sortTargetArray.sort((a, b) => a - b);
    // console.log(sortTargetArray)
    inputorderArray.forEach((element) => {
        const searched = binary_search(sortTargetArray, sortTargetArray.length, element[0]);
        // console.log('element', element[0])
        // console.log('searched', searched)
        const count = sortTargetArray.length - searched;
        if (count < 0) {
            console.log(0);
        }
        else {
            console.log(count);
        }
    });
}
const binary_search = (A, n, k) => {
    //(A : 数列, n : 数列のサイズ, k : 基準)
    // 探索範囲 [left, right]
    let left = 0;
    let right = n;
    // 探索範囲を狭めていく
    while (left < right) {
        // 探索範囲の中央
        const mid = Math.floor((left + right) / 2); //切り下げ
        if (A[mid] <= k) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    }
    // 狭め終わったらmin_iを返す
    return right;
};
// main(testinput);
main(require('fs').readFileSync('/dev/stdin', 'utf8'))
