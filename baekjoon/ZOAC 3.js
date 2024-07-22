// https://www.acmicpc.net/problem/20436
// * 풀이
// 동시에 움직 x
// 키 누르는데 걸리는 시간 1
// 자음: 왼, 모음: 오
// return 시간 최솟값

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

inputs = inputs.split("\n");

const [fL, fR] = inputs[0].split(" ");
let words = inputs[1].split("");

// 각 키를 누르는데 걸리는 시간 미리 더함
let time = 0;

const alphabet = {};

let cnt = 0;
["q", "w", "e", "r", "t"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: true, dot: [0, idx] };
  cnt++;
});

["y", "u", "i", "o", "p"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: false, dot: [0, idx + cnt] };
});

cnt = 0;

["a", "s", "d", "f", "g"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: true, dot: [1, idx] };
  cnt++;
});

["h", "j", "k", "l"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: false, dot: [1, idx + cnt] };
});

cnt = 0;

["z", "x", "c", "v"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: true, dot: [2, idx] };
  cnt++;
});

["b", "n", "m"].forEach((alpha, idx) => {
  alphabet[alpha] = { flag: false, dot: [2, idx + cnt] };
});

// 이전 알파벳과 다음 알파벳의 위치 차이 구함
//    만약 자음일 경우(flag = true) 이전 자음의 위치와 현재 자음 위치 차이 구함
//    만약 모음일 경우(flag = false) 이전 모음의 위치와 현재 모음 위치 차이 구함
// 시간에 차이 값을 더함

const current = [alphabet[fL].dot, alphabet[fR].dot];

for (let i = 0; i < words.length; i++) {
  const w = alphabet[words[i]];
  const [x, y] = w.dot;
  time += 1;
  // 자음일 경우
  if (w.flag) {
    const [beforeX, beforeY] = current[0];

    time += Math.abs(beforeX - x) + Math.abs(beforeY - y);
    current[0] = [x, y];
    continue;
  }

  const [beforeX, beforeY] = current[1];

  time += Math.abs(beforeX - x) + Math.abs(beforeY - y);
  current[1] = [x, y];
}
console.log(time);
