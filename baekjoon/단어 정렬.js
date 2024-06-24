// https://www.acmicpc.net/problem/1181
// * 풀이
// 1. 길이 짧
// 2. 길이 같으면 사전 순
// 중복된 단어는 하나만 남김

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();
inputs = inputs.split("\n");

const n = Number(inputs[0]);
let words = inputs.slice(1);

// 중복 제거
words = new Set(words);
words = [...words];

// * sort
// a < b라면 a가 먼저 온다
// a > b라면 b가 먼저 온다
// a = b라면 순서 변경 x
words.sort((a, b) => {
  if (a.length !== b.length) return a.length - b.length;

  const arr = [a, b];
  arr.sort();

  if (arr[0] === a) return -1;
  else return 1;
});

console.log(words.join("\n"));
