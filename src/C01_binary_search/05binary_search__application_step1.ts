const testinput = `3 8
13 3 9
8 0 2
16 17 15
7 14 9 10 3 13 16 8`

function main(inputStr: string) {
  // const input = new Input(inputStr)
  const lines = inputStr.split('\n')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [n, k] = lines[0].split(' ').map(Number)
  const bingoLine: number[][] = []
  for (let i = 0; i < n; i++) {
    bingoLine.push(lines[i + 1].split(' ').map(Number))
  }
  // console.log(bingoLine)
  const drawn_numbers = lines[n + 1].split(' ').map(Number)
  // console.log(drawn_numbers)

  const bingoCard: boolean[][] = Array.from({ length: n }, () =>
    Array(n).fill(false),
  )
  // console.log(bingoCard)

  drawn_numbers.forEach((num) => {
    // console.log('number', num)
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (bingoLine[i][j] === num) {
          bingoCard[i][j] = true
        }
      }
    }
  })
  const center = (n - 1) / 2
  bingoCard[center][center] = true
  // console.log(bingoCard)

  const oblique_array: boolean[] = []
  const oblique_array2: boolean[] = []
  for (let i = 0; i < n; i++) {
    oblique_array.push(bingoCard[i][i])
  }
  for (let i = 0; i < n; i++) {
    const index = n - 1
    oblique_array2.push(bingoCard[i][index - i])
  }
  // console.log(oblique_array)
  // console.log(oblique_array2)

  let counter = 0
  for (let i = 0; i < n; i++) {
    if (bingoCard[i].every((v) => v === true)) {
      counter++
    }

    if (bingoCard.every((v) => v[i] === true)) {
      counter++
    }
  }
  if (oblique_array.every((v) => v === true)) counter++
  if (oblique_array2.every((v) => v === true)) counter++
  console.log(counter)
}

main(testinput)
// main(require('fs').readFileSync('/dev/stdin', 'utf8').trim())
