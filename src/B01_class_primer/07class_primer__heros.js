let testinput = `1 3
23 128 533 552 44 69 420
1 muscle_training 565 241
1 study 132
1 levelup 379 585 4 145 276 8`
class Input {
  inputDataArray
  topArray = null
  constructor(str) {
    let inputArr = str.split('\n') //入力を改行文字で分割
    inputArr = inputArr.filter(Boolean) //余計な空白を削除
    let inputData = inputArr.map((e) => e.split(' ')) //一番上の行以外の行をそれぞれ空白で分割する
    this.inputDataArray = inputData.map((e) => {
      return e.map((e) => {
        if (e.match(/^[0-9]+$/)) {
          return Number(e)
        } else {
          return e
        }
      })
    })
  }
  shiftTop() {
    this.topArray = this.inputDataArray.shift() //一番上の行を取り出す。
    // console.log(this.topArray);
  }
}

class point {
  text
  root_a
  root_b
  static word = ''
  constructor(a, b, c) {
    this.text = a
    this.root_a = b
    this.root_b = c
  }
  getPoint(int) {
    if (int === 1) {
      return this.root_a
    } else {
      return this.root_b
    }
  }
  getText() {
    point.word += this.text
  }
}

function main(inputStr) {
  let input = new Input(inputStr)
  input.shiftTop()
  let times = input.topArray

  // console.log(times);
}

main(testinput)
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
