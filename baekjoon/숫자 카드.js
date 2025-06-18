// https://www.acmicpc.net/problem/10815
// !다시 풀기

const fs = require("fs");
const inputs = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const n = Number(inputs[0]);
// 숫자 카드에 적혀져 있는 숫자들
const nums = inputs[1].split(" ").map(Number); // 중복되는 수 x
const m = Number(inputs[2]);
const quizs = inputs[3].split(" ").map(Number);

// 상근이가 가지고 있으면 1, 아니면 0 출력

// nums, quizs 오름차순으로 정렬
// -10 2 3 6 10
const sortedNums = [...nums]; // !복사한 다음 정렬하기
sortedNums.sort((a, b) => a - b);
// -10 -5 2 3 4 5 9 10
const sortedQuizs = [...quizs];
sortedQuizs.sort((a, b) => a - b);

let map = {};
let startI = 0;

sortedQuizs.forEach((q) => {
  let index = startI;

  while (index < sortedNums.length && sortedNums[index] < q) {
    index += 1;
  }

  if (sortedNums[index] === q) {
    map[String(q)] = "1";
    startI = index + 1; // 다음 요소부터 탐색
  } else {
    map[String(q)] = "0";
    startI = index;
  }
});

let answer = "";

quizs.forEach((q) => (answer += map[q] + " "));

console.log(answer.trim());
