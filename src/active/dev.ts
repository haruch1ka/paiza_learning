const counter =
  (count = 0) =>
  (adds = 1) =>
    (count += adds)

const increment = counter()
console.log(increment())
console.log(increment())
