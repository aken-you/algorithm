// https://www.acmicpc.net/problem/1212
// * 못 풀었음!
// 8진수 문자열을 한자리씩 순회하여 2진수로 변환
const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim();

// 8진수의 맨 앞의 숫자가 0인 경우를 제외하고 반드시 1로 시작해야 하기 때문에 반복문 이전에 미리 처리
let result = input[0] === "0" ? "0" : parseInt(input[0], 8).toString(2);

for (let i = 1; i < input.length; i++) {
  result += parseInt(input[i], 8).toString(2).padStart(3, "0");
}

console.log(result);
