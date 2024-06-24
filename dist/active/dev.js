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
    console.log(a);
    let left = 0, right = L + 1;
    while (right - left > 1) {
        const mid = Math.floor((left + right) / 2);
        let last_index = 0, parts = 0;
        for (let i = 0; i < k + 2; i++) {
            console.log('mid', mid, 'a[i]', a[i], 'a[last_index]', a[last_index], 'i', i);
            console.log('diff ', a[i] - a[last_index]);
            if (a[i] - a[last_index] >= mid) {
                parts += 1;
                last_index = i;
                console.log('-----------------');
                console.log('lastindex ', last_index);
                console.log('-----------------');
            }
        }
        if (parts < n) {
            right = mid;
        }
        else {
            left = mid;
        }
    }
    console.log(left);
}
main(testinput);
// // main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
