function main(input) {
  let inputArr = input.split("\n");

  inputArr = inputArr.filter(Boolean);
  let inputNum = inputArr.shift();
  const users = inputArr.map((e) => e.split(" "));

  const inputNumArr = inputNum.split(" ");
  const usersDataArr = [];
  const userUpdateDateArr = [];

  const first = Number(inputNumArr[0]);
  const second = Number(inputNumArr[1]);
  for (let i = 0; i < first; i++) {
    const user = makeUser(users[i]);
    usersDataArr.push(user);
  }
  for (let i = first; i < first + second; i++) {
    userUpdateDateArr.push(users[i]);
  }

  //disp
  for(let i = 0;i<second;i++){
    changeKeyValue(usersDataArr, userUpdateDateArr[i][0], "nickname", userUpdateDateArr[i][1]);
  }


  usersDataArr.forEach((e) => {
      dispUser(e);
    });
  
}
function makeUser(Arr) {
  return { nickname: Arr[0], old: Arr[1], birth: Arr[2], state: Arr[3] };
}
function dispUser(UserObj) {
  const sp = " ";
  console.log(UserObj.nickname + sp + UserObj.old + sp + UserObj.birth + sp + UserObj.state);
}
function changeKeyValue(Arr, index, key, value) {
  const newArr = Arr;
  newArr[index - 1][key] = value;
}
function sort(Users) {
  return Users.sort(function (a, b) {
    if (Number(a.old) > Number(b.old)) {
      return 1;
    } else {
      return -1;
    }
  });
}

function Alldisp(Arr) {
  Arr.forEach((element) => {
    console.log(element);
  });
}

main(require("fs").readFileSync("/dev/stdin", "utf8"));
