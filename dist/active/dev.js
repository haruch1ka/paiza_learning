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
    const times = inputorderArray[2];
    const sortTargetArray = inputorderArray.shift();
    const targetAllay = inputorderArray.shift();
    sortTargetArray.sort(function (a, b) { return a - b; });
    inputorderArray.forEach((element) => {
        const searched = binalySearch(element[0], sortTargetArray);
        console.log(sortTargetArray.length - searched);
    });
}
main(testinput);
function binalySearch(target, array) {
    let left = 0;
    let right = array.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (array[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid;
        }
    }
    return right;
}
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
