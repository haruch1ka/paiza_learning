const testinput = `5
0 1 2 3 4
4
-3 -1 1 3
12`

function main(inputStr: string) {
  const lines = inputStr.split('\n')

  const [n, m, k] = [Number(lines[0]), Number(lines[2]), Number(lines[4])]

  let a = lines[1].split(' ').map(Number)
  a = [-Infinity, ...a, Infinity]

  const b = lines[3].split(' ').map(Number)

  for (let i = 0; i < m; i++) {
    console.log('b[i]', b[i])
    let [left, right] = [-1, n + 1]
    let mid
    console.log('-----------------')
    while (right - left > 1) {
      mid = Math.floor((left + right) / 2)
      console.log('mid', mid)
      if (a[mid] < b[i]) {
        left = mid
      } else {
        right = mid
      }
    }
  }

  console.log(a, b)
  console.log(n, m, k)
}

main(testinput)
// // main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
