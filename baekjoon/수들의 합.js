// https://www.acmicpc.net/problem/1789
// * 내 풀이
// 서로 다른 N개의 자연수 합 = S
// S를 알 때, N의 최댓값

let s = require("fs").readFileSync("/dev/stdin").toString().trim();
s = Number(s);

let sum = 0;
let i = 1;

// 1, 2 = 1개
// 3, 4, 5 = 2개
// 6, 7, 8, 9 = 3개
// 10, 11, 12, 13, 14 = 4개
// ...

// sum === s라면
// i 출력하고 break
// sum > s라면 i-1 출력하고 break;
// sum < s라면 i++;
while (true) {
  sum += i;

  if (sum === s) {
    console.log(i);
    break;
  } else if (sum > s) {
    console.log(i - 1);
    break;
  }

  i++;
}
