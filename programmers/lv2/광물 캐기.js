// https://school.programmers.co.kr/learn/courses/30/lessons/172927
// ! 실패 - 시간 초과
// return 최소한의 피로도
// 곡괭이 종류에 상관없이 광물 5개를 캔 후 사용 x

function solution(picks, minerals) {
  var answer = 0;
  let arr = [];

  for (let i = 0; i < picks.length; i++) {
    const cnt = picks[i];

    arr = [...arr, ...new Array(cnt).fill(i)];
  }

  const checked = new Array(arr.length).fill(false);
  const pObj = {
    0: [1, 1, 1],
    1: [5, 1, 1],
    2: [25, 5, 1],
  };
  const map = {
    diamond: 0,
    iron: 1,
    stone: 2,
  };

  // current: 현재 곡괭이
  // p: 피로도
  // cnt: 캔 광석 수
  let min = 0;

  function dfs(p, cnt, use) {
    // ! 피로도가 이미 min을 넘어가면 종료 => 이 if문 없으면 시간 초과 케이스 발생
    if (p > min && min > 0) return;
    // 모든 광물을 다 캤거나 더이상 곡괭이가 없을 때 종료
    if (cnt === minerals.length || use === arr.length) {
      if (min === 0 || p < min) min = p;
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (checked[i]) continue;

      const pick = arr[i];

      // 곡괭이 종류에 상관없이 광물 5개를 캔 후 사용 x
      let nextP = p;
      let nextCnt = cnt;

      for (let j = 0; j < 5; j++) {
        const m = map[minerals[nextCnt]]; // 0 1 2
        nextP += pObj[pick][m];
        nextCnt += 1;

        if (nextCnt === minerals.length) {
          break;
        }
      }

      checked[i] = true;

      dfs(nextP, nextCnt, use + 1);
      checked[i] = false;
    }
  }

  dfs(0, 0, 0);

  return min;
}

// 다른 사람 풀이 - dfs
function solution(picks, minerals) {
  let answer = 1000;
  const tiredList = [
    [1, 1, 1],
    [5, 1, 1],
    [25, 5, 1],
  ];

  // 몇 개의 광물을 캘 수 있는지
  const max = Math.min((picks[0] + picks[1] + picks[2]) * 5, minerals.length);

  const DFS = (level, sum) => {
    if (level >= max) {
      answer = Math.min(sum, answer);
    }

    for (let i = 0; i < 3; i++) {
      if (picks[i] <= 0) continue;

      picks[i]--;

      let tired = 0;

      for (let j = 0; j < 5; j++) {
        const nextLevel = level + j;
        if (nextLevel === max) {
          answer = Math.min(tired + sum, answer);
          break;
        }

        if (minerals[nextLevel] === "diamond") tired += tiredList[i][0];
        else if (minerals[nextLevel] === "iron") tired += tiredList[i][1];
        else tired += tiredList[i][2];
      }

      DFS(level + 5, sum + tired);

      picks[i]++;
    }
  };

  DFS(0, 0);
  return answer;
}

// 다른 사람 풀이 - 시간 복잡도 측면에서 dfs보다 효율적
function solution(picks, minerals) {
  let answer = 0;
  const tiredList = [
    [1, 1, 1],
    [5, 1, 1],
    [25, 5, 1],
  ];

  const unitCnt = Math.ceil(minerals.length / 5);
  const unitMax = Math.min(picks[0] + picks[1] + picks[2], unitCnt);

  const sortedArr = [];

  // 각 unit의 피로도 계산
  for (let i = 0; i < unitCnt; i++) {
    // 곡괭이가 없으면 캐지 못함
    if (i >= unitMax) break;

    // 5개 단위로 자름
    const arr = minerals.splice(0, 5);
    const tired = [0, 0, 0];

    // 5개에서 다이아몬드, 철, 돌의 개수를 구하기
    arr.forEach((m) => {
      if (m === "diamond") tired[0] += 1;
      else if (m === "iron") tired[1] += 1;
      else tired[2] += 1;
    });

    sortedArr.push(tired);
  }

  // 다이아몬드 > 철 > 돌 순으로 피로도가 높은 순서대로 정렬
  sortedArr.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return b[2] - a[2];
      } else {
        return b[1] - a[1];
      }
    } else {
      return b[0] - a[0];
    }
  });

  // 자른 단위로 피로도 계산
  sortedArr.forEach((arr) => {
    const [d, i, s] = arr;
    let idx = 0;

    if (picks[0] !== 0) idx = 0;
    else if (picks[1] !== 0) idx = 1;
    else idx = 2;

    if (picks[idx] !== 0) {
      // 피로도 계산
      answer += tiredList[idx][0] * d;
      answer += tiredList[idx][1] * i;
      answer += tiredList[idx][2] * s;
      picks[idx] -= 1;
    }
  });

  return answer;
}
