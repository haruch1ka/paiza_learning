const testinput = `1 3
23 128 533 552 44 69 420
1 muscle_training 565 241
1 study 132
1 levelup 379 585 4 145 276 8`
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

class Hero {
  public level: number
  public hp: number
  public attack: number
  public defense: number
  public speed: number
  public creverness: number
  public fortune: number
  constructor(
    l: number,
    h: number,
    a: number,
    d: number,
    s: number,
    c: number,
    f: number,
  ) {
    this.level = l
    this.hp = h
    this.attack = a
    this.defense = d
    this.speed = s
    this.creverness = c
    this.fortune = f
  }
  levelUp(h: number, a: number, d: number, s: number, c: number, f: number) {
    this.level++
    this.hp += h
    this.attack += a
    this.defense += d
    this.speed += s
    this.creverness += c
    this.fortune += f
  }
  muscle_training(h: number, a: number) {
    this.hp += h
    this.attack += a
  }
  running(d: number, s: number) {
    this.defense += d
    this.speed += s
  }
  study(c: number) {
    this.creverness += c
  }
  pray(f: number) {
    this.fortune += f
  }
  returnStatus() {
    const status: string[] = []
    status.push(String(this.level))
    status.push(String(this.hp))
    status.push(String(this.attack))
    status.push(String(this.defense))
    status.push(String(this.speed))
    status.push(String(this.creverness))
    status.push(String(this.fortune))
    return status.join(' ')
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

  const heroArray: Hero[] = []
  for (let i = 0; i < times[0]; i++) {
    const hero = new Hero(
      ...(inputorderArray[i] as [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ]),
    )
    heroArray.push(hero)
  }
  for (let i = times[0]; i < times[0] + times[1]; i++) {
    const target = <number>inputorderArray[i][0]
    if (inputorderArray[i][1] === 'levelup') {
      heroArray[target - 1].levelUp(
        Number(inputorderArray[i][2]),
        Number(inputorderArray[i][3]),
        Number(inputorderArray[i][4]),
        Number(inputorderArray[i][5]),
        Number(inputorderArray[i][6]),
        Number(inputorderArray[i][7]),
      )
    } else if (inputorderArray[i][1] === 'muscle_training') {
      heroArray[target - 1].muscle_training(
        Number(inputorderArray[i][2]),
        Number(inputorderArray[i][3]),
      )
    } else if (inputorderArray[i][1] === 'running') {
      heroArray[target - 1].running(
        Number(inputorderArray[i][2]),
        Number(inputorderArray[i][3]),
      )
    } else if (inputorderArray[i][1] === 'study') {
      heroArray[target - 1].study(Number(inputorderArray[i][2]))
    } else if (inputorderArray[i][1] === 'pray') {
      heroArray[target - 1].pray(Number(inputorderArray[i][2]))
    }
  }
  heroArray.forEach((e) => {
    console.log(e.returnStatus())
  })
}

main(testinput)
