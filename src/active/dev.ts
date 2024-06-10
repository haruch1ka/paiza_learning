const testinput = `10
3 11 18 25 40 58 69 81 88 99
5
11
100
2
41
69`
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

  const searchDataBase = inputorderArray.shift()
  const searchTargetLength: number[] = inputorderArray.shift() as number[]
  //number[]として扱う為にアサーションをする

  const searchTarget = inputorderArray as number[][]

  const search = binarySearch(searchDataBase as number[], 1)

  searchTarget.forEach((element) => {
    console.log(binarySearch(searchDataBase as number[], element[0]))
  })
}

function binarySearch(arr: number[], target: number): boolean {
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (arr[mid] === target) {
      return true
    } else if (arr[mid] < target) {
      left = mid + 1
    } else if (target < arr[mid]) {
      right = mid - 1
    }
  }
  return false
}
main(testinput)

// main(require("fs").readFileSync("/dev/stdin", "utf8"));
