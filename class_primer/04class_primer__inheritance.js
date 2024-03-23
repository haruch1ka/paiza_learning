const testInput = [
  "2 5",
  "59",
  "5", 
  "2 food 1223",
  "1 alcohol 4461",
  "1 alcohol 457",
  "1 alcohol 1438",
  "2 softdrink 1581"
    ];

function main(input) {
  let inputArr = input.split("\n"); //入力を改行文字で分割
  // let inputArr = testInput;
  inputArr = inputArr.filter(Boolean); //余計な空白を削除
  let inputNum = inputArr.shift(); //一番上の行を取り出す。
  const inputData = inputArr.map((e) => e.split(" ")); //一番上の行以外の行をそれぞれ空白で分割する

  const enployeeData = [];

  const intoroduction_branch = (Arr) => {
    const input = Arr;
    switch (input[0]) {
      case "make": {
        enployeeData.push(make_employee(input[1], input[2]));
        break;
      }
      case "getnum": {
        const index = input[1];
        const tar = enployeeData[index - 1];
        console.log(tar.getnum());
        break;
      }
      case "getname": {
        const index = input[1];
        const tar = enployeeData[index - 1];
        console.log(tar.getname());
        break;
      }

      case "change_num": {
        const index = input[1];
        const tar = enployeeData[index - 1];
        tar.changeNum(input[2]);
        break;
      }

      case "change_name": {
        const index = input[1];
        const tar = enployeeData[index - 1];
        tar.changeName(input[2]);
      }
      default:
        break;
    }
  };
  inputData.forEach((e) => {
    intoroduction_branch(e);
  });

  //dispData
  // Alldisp(enployeeData);
}
class employee {
  constructor(number, name) {
    this.number = number;
    this.name = name;
  }
  getnum() {
    return this.number;
  }
  getname() {
    return this.name;
  }
  changeNum(number) {
    this.number = number;
  }
  changeName(name) {
    this.name = name;
  }
}

function make_employee(number, name) {
  return new employee(number, name);
}

function Alldisp(Arr) {
  Arr.forEach((element) => {
    console.log(element);
  });
}

main(require("fs").readFileSync("/dev/stdin", "utf8"));
