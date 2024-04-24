"use strict";
const testinput = `1 3
23 128 533 552 44 69 420
1 muscle_training 565 241
1 study 132
1 levelup 379 585 4 145 276 8`;
class Input {
    constructor(str, splitby = '\n') {
        this.inputDataArray = [];
        this.topItem = '';
        const inputArr = str.split(splitby);
        this.inputDataArray = inputArr.filter(Boolean);
    }
    shiftTop(stringOrReg = ' ') {
        const shifted = this.inputDataArray.shift();
        const splited = shifted === null || shifted === void 0 ? void 0 : shifted.split(stringOrReg);
        if (typeof splited === 'undefined') {
            return [];
        }
        else {
            return this.stringToNum(splited);
        }
    }
    stringToNum(stringArr) {
        return stringArr.map((e) => {
            if (e.match(/^[0-9]+$/)) {
                return Number(e);
            }
            else {
                return e;
            }
        });
    }
}
class Hero {
    constructor(l, h, a, d, s, c, f) {
        this.level = l;
        this.hp = h;
        this.attack = a;
        this.defense = d;
        this.speed = s;
        this.creverness = c;
        this.fortune = f;
    }
    levelUp(h, a, d, s, c, f) {
        this.level++;
        this.hp += h;
        this.attack += a;
        this.defense += d;
        this.speed += s;
        this.creverness += c;
        this.fortune += f;
    }
    muscle_training(h, a) {
        this.hp += h;
        this.attack += a;
    }
    running(d, s) {
        this.defense += d;
        this.speed += s;
    }
    study(c) {
        this.creverness += c;
    }
    pray(f) {
        this.fortune += f;
    }
    returnStatus() {
        const status = [];
        status.push(String(this.level));
        status.push(String(this.hp));
        status.push(String(this.attack));
        status.push(String(this.defense));
        status.push(String(this.speed));
        status.push(String(this.creverness));
        status.push(String(this.fortune));
        return status.join(' ');
    }
}
function main(inputStr) {
    const input = new Input(inputStr);
    const times = input.shiftTop();
    const inputorderArray = [];
    input.inputDataArray.forEach((e) => {
        const formatted = input.stringToNum(new Input(e, ' ').inputDataArray);
        inputorderArray.push(formatted);
    });
    const heroArray = [];
    for (let i = 0; i < times[0]; i++) {
        const hero = new Hero(...inputorderArray[i]);
        heroArray.push(hero);
    }
    for (let i = times[0]; i < times[0] + times[1]; i++) {
        const target = inputorderArray[i][0];
        if (inputorderArray[i][1] === 'levelup') {
            heroArray[target - 1].levelUp(Number(inputorderArray[i][2]), Number(inputorderArray[i][3]), Number(inputorderArray[i][4]), Number(inputorderArray[i][5]), Number(inputorderArray[i][6]), Number(inputorderArray[i][7]));
        }
        else if (inputorderArray[i][1] === 'muscle_training') {
            heroArray[target - 1].muscle_training(Number(inputorderArray[i][2]), Number(inputorderArray[i][3]));
        }
        else if (inputorderArray[i][1] === 'running') {
            heroArray[target - 1].running(Number(inputorderArray[i][2]), Number(inputorderArray[i][3]));
        }
        else if (inputorderArray[i][1] === 'study') {
            heroArray[target - 1].study(Number(inputorderArray[i][2]));
        }
        else if (inputorderArray[i][1] === 'pray') {
            heroArray[target - 1].pray(Number(inputorderArray[i][2]));
        }
    }
    heroArray.forEach((e) => {
        console.log(e.returnStatus());
    });
}
main(testinput);
