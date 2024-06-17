const testinput = `5 12
5 9 7 6 7`

function main(inputStr: string) {
  // const input = new Input(inputStr)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lines = inputStr.split('\n')
  const [n, k] = lines[0].split(' ').map(Number)
  const A = lines[1].split(' ').map(Number)
  console.log(binary_search(A, k).toFixed(20))
}

const binary_search = (A: number[], target: number) => {
  let counter = 0
  let [ok, ng] = [0, 10001]
  let pipelen = 0
  while (counter <= 100) {
    pipelen = 0
    const mid = (ok + ng) / 2
    //配列それぞれに対して本数を足していく
    A.forEach((e) => {
      pipelen += Math.floor(e / mid)
    })

    console.log('mid', mid, 'pipelen', pipelen)
    if (is_ok(target, pipelen)) {
      ok = mid
    } else {
      ng = mid
    }
    counter++
  }
  return ok
}
const is_ok = (target: number, pipelen: number) => {
  return target <= pipelen
}
main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
