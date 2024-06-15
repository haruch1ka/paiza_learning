const testinput = `10
45 62 11 81 75 90 13 2 97 32
5
90
75
50
1
63`
class Input {
  public inputDataArray: string[] = []
  public topItem = ''
  constructor(str: string, splitby = '\n') {
    const inputArr: string[] = str.split(splitby)
    this.inputDataArray = inputArr.filter(Boolean)
  }

  shiftTop(stringOrReg: string | RegExp = ' '): (string | number)[] {
    const shifted = this.inputDataArray.shift()
    const splited = shifted?.split(stringOrReg)

    if (typeof splited === 'undefined') {
      return []
    } else {
      return this.stringToNum(splited)
    }
  }
  stringToNum(stringArr: string[]): (string | number)[] {
    return stringArr.map((e) => {
      if (e.match(/^-?[0-9]+$/)) {
        return Number(e)
      } else {
        return e
      }
    })
  }
}

function main(inputStr: string) {
  const input = new Input(inputStr)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _times = <number[]>input.shiftTop()

  const inputorderArray: (number | string)[][] = []
  input.inputDataArray.forEach((e) => {
    const formatted = input.stringToNum(new Input(e, ' ').inputDataArray)
    inputorderArray.push(formatted)
  })
  // const times = inputorderArray[2]

  const sortTargetArray = inputorderArray.shift() as number[]
  const targetAllayLength: number[] = inputorderArray.shift() as number[]
  const targetArray = inputorderArray as number[][]
  sortTargetArray.sort((a, b) => a - b)
  // console.log(sortTargetArray)
  targetArray.forEach((e) => {
    const target = e[0]
    // console.log('target', target)
    const result = binary_search(sortTargetArray, target) + 1
    console.log(sortTargetArray.length - result)
  })
}

const binary_search = (A: number[], target: number) => {
  let ok = -1
  let ng = A.length
  // console.log('                      ')
  // console.log('----------------------')
  // console.log('A', A)
  // console.log('target', target)
  // console.log('  ')
  while (ng - ok > 1) {
    const mid = Math.floor((ok + ng) / 2)
    if (is_ok(mid, target, A)) {
      ok = mid
      // console.log('ok', A[ok], 'mid', mid)
    } else {
      ng = mid
      // console.log('ng', A[ng], 'mid', mid)
    }
  }
  return ok
}
const is_ok = (mid: number, target: number, array: number[]) => {
  if (mid < 0) return true
  if (mid >= array.length) return false
  return array[mid] < target
}

// const binary_search = (A: number[], n: number, k: number) => {
//   //(A : 数列, n : 数列のサイズ, k : 基準)
//   // 探索範囲 [left, right]
//   let left = 0
//   let right = n
//   // console.log('k', k)
//   // 探索範囲を狭めていく
//   while (left < right) {
//     // 探索範囲の中央
//     const mid = Math.floor((left + right) / 2) //切り下げ
//     // console.log('left', left, 'mid', mid, 'right', right)
//     // console.log('A[mid]', A[mid])
//     if (k <= A[mid]) {
//       right = mid
//     } else {
//       left = mid + 1
//     }
//   }
//   // console.log('----------------------')
//   // 狭め終わったらmin_iを返す
//   return right
// }
main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8'))
