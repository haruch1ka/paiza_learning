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
  const targetAllay: number[] = inputorderArray.shift() as number[]

  sortTargetArray.sort((a, b) => a - b)
  // console.log(sortTargetArray)
  inputorderArray.forEach((element) => {
    const searched = binary_search(
      sortTargetArray,
      sortTargetArray.length,
      element[0] as number,
    )
    // console.log('element', element[0])
    // console.log('searched', searched)
    const count = sortTargetArray.length - searched
    if (count < 0) {
      console.log(0)
    } else {
      console.log(count)
    }
  })
}

const binary_search = (A: number[], n: number, k: number) => {
  //(A : 数列, n : 数列のサイズ, k : 基準)
  // 探索範囲 [left, right]
  let left = 0
  let right = n

  // 探索範囲を狭めていく
  while (left < right) {
    // 探索範囲の中央
    const mid = Math.floor((left + right) / 2) //切り下げ

    if (A[mid] <= k) {
      left = mid + 1
    } else {
      right = mid
    }
  }
  // 狭め終わったらmin_iを返す
  return right
}
main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8'))
