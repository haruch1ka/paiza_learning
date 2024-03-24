const testInput = [
  "7 7",
  "62",
  "91",
  "29",
  "33",
  "79",
  "15",
  "91",
  "2 food 3134",
  "7 alcohol 2181",
  "6 softdrink 4631",
  "3 softdrink 3120",
  "4 softdrink 4004",
  "6 alcohol 1468",
  "6 alcohol 1245",
];
function main(input) {
  let inputArr = input.split("\n"); //入力を改行文字で分割
  // let inputArr = testInput;
  inputArr = inputArr.filter(Boolean); //余計な空白を削除
  let inputNum = inputArr.shift(); //一番上の行を取り出す。
  let inputData = inputArr.map((e) => e.split(" ")); //一番上の行以外の行をそれぞれ空白で分割する
  inputData = inputData.map((e) => {
    return e.map((e) => {
      if (e.match(/^[0-9]+$/)) {
        return Number(e);
      } else {
        return e;
      }
    });
  });

  let inputNumArr = inputNum.split(" ");
  inputNumArr = inputNumArr.map((e) => Number(e));

  const instance_array = [];

  for (let i = 0; i < inputNumArr[0]; i++) {
    let c = make_customer(inputData[i][0]);
    instance_array.push(c);
  }
  for (let i = inputNumArr[0]; i < inputNumArr[0] + inputNumArr[1]; i++) {
    let input = inputData[i];
    intoroduction_branch(instance_array, input);
  }

  //dispData
  Alldisp(instance_array);
}
class customer {
  constructor(age) {
    this.age = age;
    this.sum = 0;
  }
  order(order, price) {
    let current_price = price;
    if (order == "alcohol") {
      current_price = 0;
    }
    this.sum += current_price;
  }
}

class adult extends customer {
  #is_order_alcohol = false;
  order(order, price) {
    let current_price = price;
    if (order == "alcohol") {
      this.#is_order_alcohol = true;
    }
    if (this.#is_order_alcohol && order == "food") {
      current_price = current_price - 200;
    }
    this.sum += current_price;
  }
}

function make_customer(num_age) {
  if (num_age < 20) {
    return new customer(num_age);
  } else {
    return new adult(num_age);
  }
}

const intoroduction_branch = (data, input) => {
  data[input[0] - 1].order(input[1], input[2]);
};

function Alldisp(Arr) {
  Arr.forEach((element) => {
    console.log(element.sum);
  });
}

main(require("fs").readFileSync("/dev/stdin", "utf8"));
