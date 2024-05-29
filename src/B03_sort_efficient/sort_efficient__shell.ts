const testinput = `5
4 1 3 5 2`
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

  const sortTargetArray = inputorderArray[0]
  bubleSort(sortTargetArray as number[])
}

function bubleSort(arr: number[]) {
  const resArr = arr
  for (let i = 0; i < resArr.length - 1; i++) {
    for (let j = resArr.length - 1; i < j; j--) {
      if (resArr[j] < resArr[j - 1]) {
        ;[resArr[j], resArr[j - 1]] = [resArr[j - 1], resArr[j]]
      }
    }
    console.log(resArr.join(' '))
  }
}

main(testinput)
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
