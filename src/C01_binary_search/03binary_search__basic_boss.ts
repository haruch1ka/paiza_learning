const testinput = `10
-45 62 -11 81 75 -90 13 2 97 -32
5
-30 65
-90 -90
-15 85
-50 50
-10 -1`
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
  const sortTargetArray = inputorderArray.shift() as number[]
  inputorderArray.shift() as number[]
  const targetArray = inputorderArray as number[][]
  sortTargetArray.sort((a, b) => a - b)

  // console.log(sortTargetArray)
  targetArray.forEach((e) => {
    const target = e[0]
    const target2 = e[1]
    const result = binary_search(sortTargetArray, target, is_ok) + 1
    const result2 = binary_search(sortTargetArray, target2, is_ok2) + 1
    const r = sortTargetArray.length - result
    const r2 = sortTargetArray.length - result2
    console.log(r - r2)
  })
}

const binary_search = (
  A: number[],
  target: number,
  is_ok: (mid: number, target: number, array: number[]) => boolean,
) => {
  let ok = -1
  let ng = A.length
  while (ng - ok > 1) {
    const mid = Math.floor((ok + ng) / 2)
    if (is_ok(mid, target, A)) {
      ok = mid
    } else {
      ng = mid
    }
  }
  return ok
}
const is_ok = (mid: number, target: number, array: number[]) => {
  if (mid < 0) return true
  if (mid >= array.length) return false
  return array[mid] < target
}
const is_ok2 = (mid: number, target: number, array: number[]) => {
  if (mid < 0) return false
  if (mid >= array.length) return true
  return array[mid] <= target
}
main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8'))
