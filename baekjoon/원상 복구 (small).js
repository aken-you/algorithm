// https://www.acmicpc.net/problem/22858
// ! 실패
// n k
// k번 섞은 후 카드 배치
// d

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n").map((e) => e.split(" ").map(Number));

const [n, k] = inputs[0];
let before = Array(n).fill(0);
let after = inputs[1];
const d = inputs[2].map((e) => e - 1);

// before(셔플 전), after(셔플 후)
// 1~k까지 순회(i)
// 0~n-1 순회(j)
// idx = d[j]; before[idx] = after[j];

for (let i = 1; i <= k; i++) {
  for (let j = 0; j < n; j++) {
    const idx = d[j];
    // ! 여기서 틀림
    before[idx] = after[j];
  }
  after = [...before];
}

console.log(before.join(" "));
