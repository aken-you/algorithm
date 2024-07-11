// https://www.acmicpc.net/problem/15650
// * 내 풀이
// return m 길이인 수열을 모두 구하기
// 중복되는 수열 x
// 각 수열은 공백으로 구분해서 출력

// 수열 조건
// 1~n까지 중복 없이 m개 선택
// 오름 차순

let inputs = require("fs").readFileSync("/dev/stdin").toString().trim();

const [n, m] = inputs.split(" ").map(Number);

// dfs - 재귀
// 만약 길이가 m이라면
//    배열들을 오름차순으로 정렬
//    만약 이미 출력한 배열이라면 return;
//    아니라면 출력하고 return;
// 다른 숫자들을 순회
//    방문하지 않은 숫자면
//        방문 true 표시
//        arr에 숫자 넣고 재귀 호출
//        방문 false 표시
const result = [];
const numbers = Array.from({ length: n }, (e, idx) => idx + 1);
const checked = Array(n).fill(false);

const dfs = (arr) => {
  if (arr.length === m) {
    const newArr = [...arr].sort((a, b) => a - b);
    const str = newArr.join(" ");

    if (result.includes(str)) {
      return;
    } else {
      console.log(str);
      result.push(str);
    }
  }

  for (let i = 0; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    dfs([...arr, numbers[i]]);
    checked[i] = false;
  }
};

dfs([]);

// * 다른 풀이
// dfs의 파라미터를 depth로 설정

// 만약 길이가 m이라면
//    출력하고 return;
// 다른 숫자들을 순회 (단, 직전 숫자보다 커야함 => 오름 차순 순서대로 탐색해야하기 때문)
//    방문하지 않은 숫자이면
//        방문 true 표시
//        result[현재 cnt] = numbers[i]
//        재귀 호출 (cnt 1 증가, 다음에 탐색할 숫자 - 인수로 전달)
//        방문 false 표시
const result = Array(m).fill("");
const numbers = Array.from({ length: n }, (e, idx) => idx + 1);
const checked = Array(n).fill(false);

const dfs = (cnt, beforeNumber) => {
  if (cnt === m) {
    console.log(result.join(" "));
    return;
  }

  for (let i = beforeNumber + 1; i < n; i++) {
    if (checked[i]) continue;

    checked[i] = true;
    result[cnt] = numbers[i];
    dfs(cnt + 1, i);
    checked[i] = false;
  }
};

dfs(0, -1);
