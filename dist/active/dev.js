"use strict";
const testinput = `10
7 6 10 2 5 1 8 3 9 4`;
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
    const sortTargetArray = inputorderArray[0];
    quickSort(sortTargetArray, 0, sortTargetArray.length);
    console.log(sortTargetArray.join(' '));
}
function quickSort(A, left, right) {
    console.log('-------------------');
    console.log(A.join(' '));
    console.log('left', left, 'arrLength', right);
    if (left + 1 >= right) {
        return;
    }
    const pivot = A[right - 1];
    let cur_index = left;
    console.log('pivot', pivot);
    console.log('cur_index', cur_index);
    for (let i = left; i < right - 1; i++) {
        console.log('i', i);
        console.log(' ', 'A[i]', A[i], 'pivot', pivot);
        if (A[i] < pivot) {
            ;
            [A[cur_index], A[i]] = [A[i], A[cur_index]];
            console.log(' ', 'A[cur_index]', A[cur_index], 'A[i]', A[i]);
            console.log(' ', A.join(' '));
            cur_index++;
            count++;
        }
    }
    console.log(' end ', 'A[cur_index], A[right - 1]', A[cur_index], A[right - 1]);
    [A[cur_index], A[right - 1]] = [A[right - 1], A[cur_index]];
    console.log(A.join(' '));
    console.log('left', left, 'cur_index', cur_index, 'right', right);
    quickSort(A, left, cur_index);
    quickSort(A, cur_index + 1, right);
}
let count = 0;
main(testinput);
console.log(count);
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
