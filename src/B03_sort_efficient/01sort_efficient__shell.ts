const testinput = `10
7 6 10 2 5 4 8 3 9 1
2
4 1`
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

  times.forEach((element) => {
    insertionSort(sortTargetArray as number[], element as number)
  })
  // console.log(sortTargetArray.join(' '))
}

function insertionSort(arr: number[], h: number) {
  let num_of_move = 0
  for (let i = h; i < arr.length; i++) {
    const temp = arr[i]
    let j = i - h
    // console.log('temp', temp)
    // console.log('arr[j]', arr[j])
    while (j >= 0 && arr[j] > temp) {
      arr[j + h] = arr[j]
      j -= h
      num_of_move++
    }
    arr[j + h] = temp
  }
  console.log(num_of_move)
}

main(testinput)
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
