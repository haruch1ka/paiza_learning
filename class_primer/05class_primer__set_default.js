let testinput = `7 12
68
85
57
32
90
74
7
2 0
4 A
3 0
1 A
4 softdrink 3781
6 softdrink 3010
4 0
5 alcohol 1018
1 0
1 softdrink 376
1 softdrink 797
2 alcohol 4284
`;
class Input {
  inputDataArray;
  topArray = null;
  constructor(str) {
    let inputArr = str.split("\n"); //入力を改行文字で分割
    inputArr = inputArr.filter(Boolean); //余計な空白を削除
    let inputData = inputArr.map((e) => e.split(" ")); //一番上の行以外の行をそれぞれ空白で分割する
    this.inputDataArray = inputData.map((e) => {
      return e.map((e) => {
        if (e.match(/^[0-9]+$/)) {
          return Number(e);
        } else {
          return e;
        }
      });
    });
  }
  shiftTop() {
    this.topArray = this.inputDataArray.shift(); //一番上の行を取り出す。
    console.log(this.topArray);
  }
}

function main(inputstr) {
  let input = new Input(inputstr);
  input.shiftTop();
  console.log(input.inputDataArray);

  const customersArray = [];

  const customerlength = input.topArray[0];
  for (let i = 0; i < input.topArray[0]; i++) {
    let c = make_customer(input.inputDataArray[i][0]);
    customersArray.push(c);
  }
  for (let i = input.topArray[0]; i < input.inputDataArray.length; i++) {
    let order = input.inputDataArray[i];
    intoroduction_branch(customersArray, order);
  }

  //dispData
  Alldisp(customersArray);
}
class customer {
  constructor(age) {
    this.age = age;
    this.sum = 0;
  }
  order_food(price) {
    this.sum += price;
  }
  order_softdrink(price) {
    this.sum += price;
  }
  order_alcohol(price) {}
}

class adult extends customer {
  #is_order_alcohol = false;
  order_food(price) {
    if (this.#is_order_alcohol) {
      this.sum += price - 200;
    } else {
      this.sum += price;
    }
  }
  order_softdrink(price) {
    this.sum += price;
  }
  order_alcohol(price) {
    this.sum += price;
    this.#is_order_alcohol = true;
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
  const customer_index = input[0] - 1;
  const customer_order = input[1];
  if (customer_order == "food") {
    console.log("food");
    // data[customer_index].order_food(input[2]);
  } else if (customer_order == "softdrink") {
    console.log("softdrink");
    // data[customer_index].order_softdrink(input[2]);
  } else if (customer_order == "alcohol") {
    console.log("alcohol");
    // data[customer_index].order_alcohol(input[2]);
  } else if (customer_order == 0) {
    console.log("beer");
    // data[customer_index].order_alcohol(500);
  } else if (customer_order == "A") {
    console.log("okaikei");
  } else {
    throw new Error("注文の入力の例外");
  }

  // data[customer_index].order(customer_order, input[2]);
};

// function Alldisp(Arr) {
//   Arr.forEach((element) => {
//     console.log(element.sum);
//   });
// }

main(testinput);
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
