const testinput = `5 3
2 1 3 5 4
2 2 4 3 5`
function main(inputStr: string) {
  const lines = inputStr.split('\n')
  const [n, k] = lines[0].split(' ').map(Number)
  const w = lines[1].split(' ').map(Number)
  const v = lines[2].split(' ').map(Number)
  const guery = []
  for (let i = 0; i < n; i++) {
    guery.push([v[i], w[i]])
  }
  console.log(guery)
  const ok = binary_search(guery, n, k)
  console.log(n, k)
  console.log(ok)
}

const binary_search = (A: number[][], n: number, k: number) => {
  let [ok, ng] = [0, 50001]
  for (let _ = 0; _ < 100; _++) {
    const mid = (ok + ng) / 2
    const tmp = Array(n).fill(0)
    for (let i = 0; i < n; i++) {
      const [v, w] = A[i]
      tmp[i] = v - mid * w
    }

    tmp.sort((a, b) => b - a)
    tmp.filter((element, index) => index < k).reduce((a, b) => a + b, 0) >= 0
      ? (ok = mid)
      : (ng = mid)
  }
  return ok
}
main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
