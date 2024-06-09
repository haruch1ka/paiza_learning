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
  const times = inputorderArray[2]

  const sortTargetArray = inputorderArray.shift() as number[]
  const targetAllay: number[] = inputorderArray.shift() as number[]

  sortTargetArray.sort(function(a, b) { return a - b })
  inputorderArray.forEach((element) => {
    const searched = binalySearch(element[0] as number, sortTargetArray)
    console.log(sortTargetArray.length - searched)
  })
}

main(testinput)
function binalySearch(target: number, array: number[]): number {
  let left = 0
  let right = array.length -1 
  while (left < right) {
    const mid = Math.floor((left + right) /2)
    if(array[mid] < target) {
      left = mid + 1 
    } else {
      right = mid 
    }
  }
   return right
}
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
