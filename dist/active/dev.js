"use strict";
const testinput = `23 5 7
2 6 9 10 12 15 19`;
function main(inputStr) {
    // const input = new Input(inputStr)
    const lines = inputStr.split('\n');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [L, n, k] = lines[0].split(' ').map(Number);
    // console.log(L, n, k)
    let a = lines[1].split(' ').map(Number);
    a = [0, ...a, L];
    let [left, right] = [0, L];
    // console.log('L', L, 'n', n, 'k', k)
    // console.log(a)
    // console.log('left', left, 'right', right)
    for (let i = 1; i < k + 2; i++) {
        left = Math.max(left, a[i] - a[i - 1]);
    }
    left -= 1;
    // console.log('left', left)
    while (right - left > 1) {
        const mid = Math.floor((left + right) / 2);
        let last_index = 0, index = 0, parts = 0;
        const flag = true;
        while (flag) {
            // console.log('---------------------------------')
            // console.log('index + 1', index + 1, 'k + 2', k + 2)
            while (index + 1 < k + 2 && a[index + 1] - a[last_index] <= mid) {
                index += 1;
                // console.log('diff', a[index] - a[last_index])
            }
            // console.log('---------------------------------')
            // console.log('diff', a[index] - a[last_index], 'index', index)
            parts += 1;
            if (index == k + 1) {
                break;
            }
            last_index = index;
        }
        if (parts > n) {
            left = mid;
        }
        else {
            right = mid;
        }
    }
    console.log(right);
}
main(testinput);
// // main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
