'use strict'
const testinput = `5
4 1 3 5 2`
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
  const sortTargetArray = inputorderArray[0]
  selectionSort(sortTargetArray)
}
function selectionSort(arr) {
  const resArr = arr
  for (let i = 0; i < resArr.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < resArr.length; j++) {
      if (resArr[j] < resArr[minIndex]) {
        minIndex = j
      }
    }
    ;[resArr[i], resArr[minIndex]] = [resArr[minIndex], resArr[i]]
    console.log(resArr.join(' '))
  }
}
// main(testinput);
main(require('fs').readFileSync('/dev/stdin', 'utf8'))
