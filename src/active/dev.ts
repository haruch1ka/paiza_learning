const testinput = `10
7 6 10 2 5 4 8 3 9 1`
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
  const times = inputorderArray[2]

  const sortTargetArray = inputorderArray[0]

  function merge_sort(A: number[], left: number, right: number) {
    if (left + 1 < right) {
      const mid = Math.floor((left + right) / 2)
      merge_sort(A, left, mid)
      merge_sort(A, mid, right)
      marge(A, left, mid, right)
    }
  }
  merge_sort(sortTargetArray as number[], 0, sortTargetArray.length)
  console.log(sortTargetArray.join(' '))
}

function marge(A: number[], left: number, mid: number, right: number) {
  const nl = mid - left
  const nr = right - mid

  const L: number[] = []
  const R: number[] = []

  for (let i = 0; i < nl; i++) {
    L[i] = A[left + i]
  }
  for (let i = 0; i < nr; i++) {
    R[i] = A[mid + i]
  }
  // console.log('A', A)
  // console.log('L', L)
  // console.log('R', R)
  // console.log('--------------------')
  // console.log('left', left)
  // console.log('mid', mid)
  // console.log('right', right)
  L[nl] = Infinity
  R[nr] = Infinity

  let Lindex = 0
  let Rindex = 0

  for (let i = left; i < right; i++) {
    if (L[Lindex] < R[Rindex]) {
      // console.log(L[Lindex], 'vs', R[Rindex])
      A[i] = L[Lindex]
      Lindex++
    } else {
      // console.log(L[Lindex], 'vs', R[Rindex])
      A[i] = R[Rindex]
      Rindex++
      count++
    }
  }
  // console.log('--------------------')
}
let count = 0
main(testinput)
console.log(count)

// main(require("fs").readFileSync("/dev/stdin", "utf8"));
