const testinput = `5 10
8 2 24 40 25 42 26
59 48 13 21 13 56 2
5 59 7 57 5 25 24
99 28 6 32 5 23 2
62 24 19 11 19 7 21
2 1 3 2
2 1 3 2
5 1 3 1
5 3 1 2
1 1 2 2
4 2 3 1
5 3 3 2
2 3 3 2
4 1 5 3
2 3 3 2`
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

class Player {
  public name: number
  public hp: number
  public skill: Skill[]
  public isAlive: boolean
  constructor(hp: number, Skill: Skill[], name: number) {
    this.hp = hp
    this.skill = Skill
    this.name = name
    this.isAlive = true
  }
  //プレイヤーは攻撃メソッドとバフメソッドをもつ
  action(skill_num: number): Skill {
    const myskill: Skill = this.skill[skill_num - 1]
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
  damage(damage: number) {
    this.hp -= damage
    if (this.hp <= 0) {
      this.isAlive = false
    }
  }
}
//技クラス
class Skill {
  public power: number
  public flame: number
  public isBuff: boolean
  public isAttack: boolean
  constructor(flame: number, power: number) {
    if (power === 0 && flame === 0) {
      this.isBuff = true
      this.isAttack = false
    } else {
      this.isBuff = false
      this.isAttack = true
    }
    this.power = power
    this.flame = flame
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

  //プレイヤーインスタンスの作成
  const playerArray: Player[] = []
  for (let i = 0; i < times[0]; i++) {
    const hp = inputorderArray[i][0] as number
    const skillArray: Skill[] = []
    for (let j = 0; j < inputorderArray[i].length; j++) {
      if (j !== 0 && j % 2 !== 0) {
        const skill = new Skill(
          inputorderArray[i][j] as number,
          inputorderArray[i][j + 1] as number,
        )
        skillArray.push(skill)
      }
    }
    const player = new Player(hp, skillArray, i + 1)
    playerArray.push(player)
  }

  //プレイヤーの攻撃
  for (let i = times[0]; i < times[0] + times[1]; i++) {
    const attackker = playerArray[(inputorderArray[i][0] as number) - 1]
    const attackerSkill = attackker.action(inputorderArray[i][1] as number)
    const defense = playerArray[(inputorderArray[i][2] as number) - 1]
    const defenceSkill = defense.action(inputorderArray[i][3] as number)

    if (!attackker.isAlive || !defense.isAlive) {
      continue
    }
    if (attackerSkill.isAttack && defenceSkill.isAttack) {
      if (attackerSkill.flame < defenceSkill.flame) {
        defense.damage(attackerSkill.power)
      } else if (attackerSkill.flame > defenceSkill.flame) {
        attackker.damage(defenceSkill.power)
      }
    } else if (attackerSkill.isBuff && defenceSkill.isBuff) {
      attackker.buff()
      defense.buff()
    } else if (attackerSkill.isBuff && defenceSkill.isAttack) {
      attackker.buff()
      attackker.damage(defenceSkill.power)
    } else if (attackerSkill.isAttack && defenceSkill.isBuff) {
      defense.buff()
      defense.damage(attackerSkill.power)
    } else {
      throw new Error('error')
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
main(testinput)
