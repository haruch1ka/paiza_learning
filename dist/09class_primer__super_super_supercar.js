'use strict'
const testinput = `5 10
supersupercar 1102 67
supersupercar 63296 25
supersupersupercar 47388 32
supersupercar 30968 68
supersupercar 53668 78
2 run
3 teleport
1 fly
2 run
4 run
5 fly
5 run
2 fly
4 run
1 fly`
class Input {
  constructor(str, splitby = '\n') {
    this.inputDataArray = []
    this.topItem = ''
    const inputArr = str.split(splitby)
    this.inputDataArray = inputArr.filter(Boolean)
  }
  shiftTop(stringOrReg = ' ') {
    const shifted = this.inputDataArray.shift()
    const splited =
      shifted === null || shifted === void 0
        ? void 0
        : shifted.split(stringOrReg)
    if (typeof splited === 'undefined') {
      return []
    } else {
      return this.stringToNum(splited)
    }
  }
  stringToNum(stringArr) {
    return stringArr.map((e) => {
      if (e.match(/^[0-9]+$/)) {
        return Number(e)
      } else {
        return e
      }
    })
  }
}
class SuperCar {
  constructor(fuel, fuelEfficiency) {
    this.distance = 0
    this.fuel = fuel
    this.fuelEfficiency = fuelEfficiency
  }
  run() {
    if (this.fuel >= 1) {
      this.fuel -= 1
      this.distance += this.fuelEfficiency
    }
  }
  fly() {}
  teleport() {}
}
class SuperSuperCar extends SuperCar {
  fly() {
    if (this.fuel >= 5) {
      this.fuel -= 5
      this.distance += this.fuelEfficiency ** 2
    } else {
      this.run()
    }
  }
}
class SuperSuperSuperCar extends SuperSuperCar {
  fly() {
    if (this.fuel >= 5) {
      this.fuel -= 5
      this.distance += 2 * this.fuelEfficiency ** 2
    } else {
      this.run()
    }
  }
  teleport() {
    if (this.fuel >= this.fuelEfficiency ** 2) {
      this.fuel -= this.fuelEfficiency ** 2
      this.distance += this.fuelEfficiency ** 4
    } else {
      this.fly()
    }
  }
}
function makeCar(carType, fuel, fuelEfficiency) {
  switch (carType) {
    case 'supercar':
      return new SuperCar(fuel, fuelEfficiency)
    case 'supersupercar':
      return new SuperSuperCar(fuel, fuelEfficiency)
    case 'supersupersupercar':
      return new SuperSuperSuperCar(fuel, fuelEfficiency)
    default:
      throw new Error("Car type doesn't exist")
  }
}
function main(inputStr) {
  const input = new Input(inputStr)
  const times = input.shiftTop()
  const inputorderArray = []
  input.inputDataArray.forEach((e) => {
    const formatted = input.stringToNum(new Input(e, ' ').inputDataArray)
    inputorderArray.push(formatted)
  })
  const carArray = []
  for (let i = 0; i < times[0]; i++) {
    const input = inputorderArray[i]
    const car = makeCar(...input)
    carArray.push(car)
  }
  for (let i = times[0]; i < times[0] + times[1]; i++) {
    const input = inputorderArray[i]
    const thisCar = carArray[input[0] - 1]
    switch (input[1]) {
      case 'run':
        thisCar.run()
        break
      case 'fly':
        thisCar.fly()
        break
      case 'teleport':
        thisCar.teleport()
        break
      default:
        throw new Error("Car's action doesn't exist")
    }
  }
  carArray.forEach((element) => {
    console.log(element.distance)
  })
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'))
