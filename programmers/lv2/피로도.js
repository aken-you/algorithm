// https://school.programmers.co.kr/learn/courses/30/lessons/87946
// * 실패

// ! 1. 순열
const getPermutations = (arr, selecteNumber) => {
  const results = [];
  // arr에 있는 요소들 중 하나를 선택
  if (selecteNumber === 1) return arr.map((value) => [value]);

  arr.forEach((fixed, index, originArr) => {
    // fixed를 제외한 나머지 요소들
    const rest = [...originArr.slice(0, index), ...originArr.slice(index + 1)];
    // 나머지에 대해서 순열을 구한다
    const permutations = getPermutations(rest, selecteNumber - 1);
    // 순열을 구한 후 fixed와 합친다.
    const attached = permutations.map((permutation) => [fixed, ...permutation]);

    results.push(...attached);
  });

  return results;
};

// 시작하기 위해 필요한 최소한의 피로도: 최소 필요 피로도
// 마쳤을 때 소모: 소모 피로도
// return 유저가 탐험할 수 있는 최대 던전 수

// dungeons의 index에 대한 순열을 구한다.
// 구한 순열에 대해 순회
// current=k,cnt = 0으로 초기화
// 최소 필요 피로도를 만족한다면
//  현재 피로도 = 현재 피로도 - 소모 피로도
//  cnt++;
// 만약 cnt > max라면, max = cnt;

function solution(k, dungeons) {
  let max = -1;
  const n = dungeons.length;
  const cases = getPermutations(
    Array.from({ length: n }, (e, idx) => idx),
    n
  );

  for (let i = 0; i < cases.length; i++) {
    let cnt = 0;
    let current = k;

    for (let j = 0; j < cases[i].length; j++) {
      const [minHp, hp] = dungeons[cases[i][j]];

      if (current >= minHp) {
        current -= hp;
        cnt++;
      }
    }

    if (cnt > max) max = cnt;
  }

  return max;
}

// ! 2. DFS
let max = 0;

function DFS(dungeons, depth, visited, hp) {
  for (let i = 0; i < dungeons.length; i++) {
    if (!visited[i] && dungeons[i][0] <= hp) {
      visited[i] = true;

      DFS(dungeons, depth + 1, visited, hp - dungeons[i][1]);

      visited[i] = false;
    }
  }

  max = Math.max(depth, max);
}

function solution(k, dungeons) {
  const n = dungeons.length;
  const visited = Array.from({ length: n }, () => false);

  DFS(dungeons, 0, visited, k);

  return max;
}

solution(80, [
  [80, 20],
  [50, 40],
  [30, 10],
]);
