'use strict'
const testinput = `10
3 11 18 25 40 58 69 81 88 99
5
11
100
2
41
69`
class Input {
  constructor(str, splitby = '\n') {
    this.inputDataArray = []
    this.topItem = ''
    const inputArr = str.split(splitby)
    this.inputDataArray = inputArr.filter(Boolean)
  }
  shiftTop(stringOrReg = ' ') {
    const shifted = this.inputDataArray.shift()
    const splited =
      shifted === null || shifted === void 0
        ? void 0
        : shifted.split(stringOrReg)
    if (typeof splited === 'undefined') {
      return []
    } else {
      return this.stringToNum(splited)
    }
  }
  stringToNum(stringArr) {
    return stringArr.map((e) => {
      if (e.match(/^-?[0-9]+$/)) {
        return Number(e)
      } else {
        return e
      }
    })
  }
}
function main(inputStr) {
  const input = new Input(inputStr)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _times = input.shiftTop()
  const inputorderArray = []
  input.inputDataArray.forEach((e) => {
    const formatted = input.stringToNum(new Input(e, ' ').inputDataArray)
    inputorderArray.push(formatted)
  })
  // const times = inputorderArray[2]
  const searchDataBase = inputorderArray.shift()
  const searchTargetLength = inputorderArray.shift()
  //number[]として扱う為にアサーションをする
  const searchTarget = inputorderArray
  const search = binarySearch(searchDataBase, 1)
  searchTarget.forEach((element) => {
    if (binarySearch(searchDataBase, element[0])) {
      console.log('Yes')
    } else {
      console.log('No')
    }
  })
}
function binarySearch(arr, target) {
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
// main(testinput);
main(require('fs').readFileSync('/dev/stdin', 'utf8'))
