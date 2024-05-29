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
      if (e.match(/^[0-9]+$/)) {
        return Number(e)
      } else {
        return e
      }
    })
  }
}

class SuperCar {
  public fuel: number
  public fuelEfficiency: number
  public distance = 0
  constructor(fuel: number, fuelEfficiency: number) {
    this.fuel = fuel
    this.fuelEfficiency = fuelEfficiency
  }
  run() {
    if (this.fuel >= 1) {
      this.fuel -= 1
      this.distance += this.fuelEfficiency
    }
  }
  fly() {
    //何もしない
  }
  teleport() {
    //何もしない
  }
}
class SuperSuperCar extends SuperCar {
  override fly() {
    if (this.fuel >= 5) {
      this.fuel -= 5
      this.distance += this.fuelEfficiency ** 2
    } else {
      this.run()
    }
  }
}
class SuperSuperSuperCar extends SuperSuperCar {
  override fly() {
    if (this.fuel >= 5) {
      this.fuel -= 5
      this.distance += 2 * this.fuelEfficiency ** 2
    } else {
      this.run()
    }
  }
  override teleport() {
    if (this.fuel >= this.fuelEfficiency ** 2) {
      this.fuel -= this.fuelEfficiency ** 2
      this.distance += this.fuelEfficiency ** 4
    } else {
      this.fly()
    }
  }
}

function makeCar(
  carType: string,
  fuel: number,
  fuelEfficiency: number,
): SuperCar | SuperSuperCar | SuperSuperSuperCar {
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

function main(inputStr: string) {
  const input = new Input(inputStr)
  const times = <number[]>input.shiftTop()
  const inputorderArray: (number | string)[][] = []
  input.inputDataArray.forEach((e) => {
    const formatted = input.stringToNum(new Input(e, ' ').inputDataArray)
    inputorderArray.push(formatted)
  })

  const carArray: (SuperCar | SuperSuperCar | SuperSuperSuperCar)[] = []
  for (let i = 0; i < times[0]; i++) {
    const input = <[string, number, number]>inputorderArray[i]
    const car = makeCar(...input)
    carArray.push(car)
  }

  for (let i = times[0]; i < times[0] + times[1]; i++) {
    const input = <[number, string]>inputorderArray[i]
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
main(testinput)
