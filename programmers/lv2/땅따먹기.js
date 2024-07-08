// https://school.programmers.co.kr/learn/courses/30/lessons/12913
// ! 실패 - 시간초과
// 각 행의 4칸 중 한 칸만 밟으면서 내려와야 합니다
// 한 행씩 내려올 때, 같은 열을 연속해서 밟을 수 없는
// return 마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 최대값

// dfs
// [x, y] : 현재 노드
// x+1 행에 y-3~y+3 열까지
//  방문하지 않았다면 dfs

let max = 0;

const dfs = (land, node, sum, checked) => {
  const [x, y] = node;

  checked[x][y] = true;
  sum += land[x][y];

  if (x === land.length - 1) {
    checked[x][y] = false;
    if (max < sum) max = sum;
    return;
  }

  for (let i = 0; i < 4; i++) {
    if (y === i) continue;

    if (!checked[x + 1][i]) {
      dfs(land, [x + 1, i], sum, checked);
    }
  }

  checked[x][y] = false;
};

function solution(land) {
  const n = land.length;
  const checked = Array.from({ length: n }, () => new Array(4).fill(false));

  for (let i = 0; i < 4; i++) {
    dfs(land, [0, i], 0, checked);
  }

  return max;
}

// * 1시간 지나고 나서 내 풀이
// 이전 행에 있는 요소와 현재 값을 더한 것들 중 가장 최댓값 구하기
//  이전 행에 있는 요소의 열 === 현재 값이 있는 열이라면 pass

function solution(land) {
  const n = land.length;
  const result = Array.from({ length: n }, () => new Array(4).fill(0));

  land[0].forEach((e, idx) => (result[0][idx] = e));

  for (let row = 1; row < n; row++) {
    for (let col = 0; col < 4; col++) {
      let max = 0;

      for (let j = 0; j < 4; j++) {
        if (col === j) continue;

        const sum = result[row - 1][j] + land[row][col];

        if (max < sum) max = sum;
      }

      result[row][col] = max;
    }
  }

  return Math.max(...result[result.length - 1]);
}
