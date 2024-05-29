const testinput = `5 5 3 3
0 0
0 1
0 2
0 3
0 4
1 0
1 1
1 2
1 3
1 4
2 1 1
2 2 1
2 3 1
1 W
1 E
3 S`

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

interface vector {
  [key: string]: number[]
}
//ロボットクラスの作成
class Robot {
  //field
  //x座標
  public x: number
  //y座標
  public y: number
  //ロボットのレベル
  public level: number
  //ロボットの移動能力
  public moveAbility: number
  //ロボットの移動距離

  private vector: vector = {}
  //constructor
  constructor(x: number, y: number, level: number) {
    this.x = x
    this.y = y
    this.level = level
    this.moveAbility = this.getMoveAbility(level)
    this.vector = {
      N: [0, -1],
      E: [1, 0],
      S: [0, 1],
      W: [-1, 0],
    }
  }
  //method
  //ロボットの移動
  move(direction: string) {
    const dx = this.vector[direction][0] * this.getMoveAbility(this.level)
    const dy = this.vector[direction][1] * this.getMoveAbility(this.level)

    this.x += dx
    this.y += dy
  }
  levelUp() {
    if (this.level == 4) {
      this.level = 4
    } else if (this.level < 4) {
      this.level += 1
    }
  }
  //ロボットのレベルに応じた移動能力を返す
  private getMoveAbility(lever: number): number {
    if (lever === 1) {
      return 1
    } else if (lever === 2) {
      return 2
    } else if (lever === 3) {
      return 5
    } else if (lever === 4) {
      return 10
    } else {
      throw new Error('レベルが不正です')
    }
  }
  public print() {
    console.log(this.x + ' ' + this.y + ' ' + this.level)
  }
}
//工具場所クラスの作成
class ToolPlace {
  //field
  //工具場所の配列
  public toolPlaceArray: [number, number][]
  //constructor
  constructor(toolPlaceArray: [number, number][]) {
    this.toolPlaceArray = toolPlaceArray
  }
  //method
  //ロボットが工具場所にいるかどうかを判定
  isRobotOnToolPlace(robot: Robot): boolean {
    return this.toolPlaceArray.some((e) => e[0] === robot.x && e[1] === robot.y)
  }
  print() {
    console.log(this.toolPlaceArray)
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
  // const maxDistance: number[] = [times[0], times[1]]
  const robotNumber: number = times[2]
  const robotMoveNumber: number = times[3]

  // console.log(maxDistance + ' ' + 'maxDistance')
  // console.log(robotNumber + ' ' + 'robotNumber')
  // console.log(robotMoveNumber + ' ' + 'robotMoveNumber')

  //arrayの0番目から9番目までを含む配列を作成
  const toolPlace = new ToolPlace(
    inputorderArray.slice(0, 10) as [number, number][],
  )
  const robotInputArray = inputorderArray.slice(10, 10 + robotNumber) as [
    number,
    number,
    number,
  ][]

  //robotの配列を作成
  const robotArray: Robot[] = []
  for (let i = 0; i < robotNumber; i++) {
    const robot = new Robot(
      robotInputArray[i][0],
      robotInputArray[i][1],
      robotInputArray[i][2],
    )
    robotArray.push(robot)
  }

  const robotMoveInput = inputorderArray.slice(
    10 + robotNumber,
    10 + robotNumber + robotMoveNumber,
  ) as [number, string][]

  for (let i = 0; i < robotMoveInput.length; i++) {
    const robot = robotArray[robotMoveInput[i][0] - 1]
    const hougaku = robotMoveInput[i][1]
    robot.move(hougaku)
    if (toolPlace.isRobotOnToolPlace(robot)) {
      robot.levelUp()
    }
  }
  for (let i = 0; i < robotArray.length; i++) {
    robotArray[i].print()
  }

  //robotの移動

  // console.log(times)
}
main(testinput)
// main(require("fs").readFileSync("/dev/stdin", "utf8"));
