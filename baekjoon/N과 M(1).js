// https://www.acmicpc.net/problem/15649
// * 내 풀이
// 수열은 사전 순으로 증가하는 순서로 출력
// 중복되는 수열 x
// 각 수열은 공백으로 구분해서 출력
// 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
// 길이가 M인 수열을 모두 구하기

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

const [n, m] = inputs.split(" ").map(Number);

// dfs - 재귀

// 만약 m의 길이가 되면, return
// 나머지 수들을 순회
//    만약 탐색하지 않은 노드라면
//        체크 표시 true
//        재귀 호출
//        체크 표시 false

const result = [];
const checked = new Array(n).fill(false);
const numbers = Array.from({ length: n }, (e, i) => i + 1);

const dfs = (arr) => {
  if (arr.length === m) {
    result.push(arr);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    dfs([...arr, numbers[i]]);
    checked[i] = false;
  }
};

dfs([]);

console.log(result.map((arr) => arr.join(" ")).join("\n"));

// * 다른 풀이
// dfs의 파라미터를 depth로 설정
const result = new Array(m).fill("");
const checked = new Array(n).fill(false);
const numbers = Array.from({ length: n }, (e, i) => i + 1);

const dfs = (cnt) => {
  // result에서 m-1 인덱스까지만 존재하므로
  if (cnt === m) {
    console.log(result.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    result[cnt] = numbers[i];
    dfs(cnt + 1);
    checked[i] = false;
  }
};

dfs(0);
