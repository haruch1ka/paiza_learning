let testinput = `4 4 1
p 2 4
a 3 1
i 4 2
z 1 2
1
1
1
2`;
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
		// console.log(this.topArray);
	}
}

class point {
	text;
	root_a;
	root_b;
	static word = "";
	constructor(a, b, c) {
		this.text = a;
		this.root_a = b;
		this.root_b = c;
	}
	getPoint(int) {
		if (int === 1) {
			return this.root_a;
		} else {
			return this.root_b;
		}
	}
	getText() {
		point.word += this.text;
	}
}

function main(inputStr) {
	// console.log(inputStr);
	let input = new Input(inputStr);
	input.shiftTop();
	let times = input.topArray;

	// console.log(times);

	let pointInputArr = [];
	let rootchoiceArr = [];

	for (let i = 0; i < times[0]; i++) {
		pointInputArr.push(input.inputDataArray[i]);
	}
	for (let i = times[0]; i < times[0] + times[1]; i++) {
		rootchoiceArr.push(input.inputDataArray[i][0]);
	}

	const pointArr = makePoint(pointInputArr);

	let currentPoint = times[2];
	let t, p;
	rootchoiceArr.forEach((e) => {
		t = pointArr[currentPoint - 1].getText();
		p = pointArr[currentPoint - 1].getPoint(e);
		currentPoint = p;
	});
	pointArr[currentPoint - 1].getText();

	console.log(point.word);
}

// main(testinput);
main(require("fs").readFileSync("/dev/stdin", "utf8"));

function makePoint(array) {
	let res = [];
	array.forEach((e) => {
		res.push(new point(e[0], e[1], e[2]));
	});
	return res;
}
