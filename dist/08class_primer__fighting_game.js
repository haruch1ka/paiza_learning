'use strict'
const testinput = `3 6
10 1 1 2 2 3 3
10 0 0 6 1 7 2
10 0 0 7 5 8 3
1 1 2 2
1 2 3 2
1 3 2 3
2 2 3 1
2 3 3 1
1 2 3 2`
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
class Player {
  constructor(hp, Skill, name) {
    this.hp = hp
    this.skill = Skill
    this.name = name
  }
  //プレイヤーは攻撃メソッドとバフメソッドをもつ
  action(skill_num) {
    const myskill = this.skill[skill_num - 1]
    if (myskill.isBuff) {
      this.buff()
    }
    return myskill
  }
  buff() {
    this.skill.forEach((e) => {
      e.power += 5
      if (e.flame > 3) {
        e.flame -= 3
      } else {
        e.flame = 1
      }
    })
  }
  damage(damage) {
    if (this.hp <= 0) return
    this.hp -= damage
  }
}
//技クラス
class Skill {
  constructor(power, flame) {
    if (power === 0 && flame === 0) {
      this.isBuff = true
    } else {
      this.isBuff = false
    }
    this.power = power
    this.flame = flame
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
  //プレイヤーインスタンスの作成
  const playerArray = []
  for (let i = 0; i < times[0]; i++) {
    const hp = inputorderArray[i][0]
    const skillArray = []
    for (let j = 0; j < inputorderArray[i].length; j++) {
      if (j !== 0 && j % 2 !== 0) {
        const skill = new Skill(
          inputorderArray[i][j],
          inputorderArray[i][j + 1],
        )
        skillArray.push(skill)
      }
    }
    const player = new Player(hp, skillArray, i + 1)
    playerArray.push(player)
  }
  // console.log(playerArray)
  //プレイヤーの攻撃
  for (let i = times[0]; i < times[0] + times[1]; i++) {
    const attackker = playerArray[inputorderArray[i][0] - 1]
    const attackerSkill = attackker.action(inputorderArray[i][1])
    const defense = playerArray[inputorderArray[i][2] - 1]
    const diffenceSkill = defense.action(inputorderArray[i][3])
    if (attackerSkill !== null && diffenceSkill !== null) {
      if (attackerSkill.flame > diffenceSkill.flame) {
        defense.damage(attackerSkill.power)
      } else {
        attackker.damage(diffenceSkill.power)
      }
    }
  }
  let count = 0
  for (let i = 0; i < playerArray.length; i++) {
    if (playerArray[i].hp > 0) {
      count++
    }
  }
  console.log(count)
}
main(require('fs').readFileSync('/dev/stdin', 'utf8'))
