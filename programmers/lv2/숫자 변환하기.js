// https://school.programmers.co.kr/learn/courses/30/lessons/154538
// ! 실패
// * 내 풀이 - 시간 초과, 런타임 에러 발생
// 런타임 에러가 발생하는 이유: 재귀 호출의 깊이가 깊어서
// 자연수 x => y

// 가능한 연산
// x + n
// x * 2
// x * 3

// return 변환하기 위한 최소 연산 횟수
//  변환 x => return -1;

function solution(x, y, n) {
  let min = 1000000;

  function calculate(a, cnt) {
    if (a === y) {
      if (min > cnt) {
        min = cnt;
      }
      return;
    } else if (a > y || min < cnt) return;
    else {
      calculate(a * 2, cnt + 1);
      calculate(a * 3, cnt + 1);
      calculate(a + n, cnt + 1);
    }
  }

  calculate(x, 0);

  return min === 1000000 ? -1 : min;
}

// * 1. BFS
// 맨 처음 checked[y]에 연산 횟수를 저장했으면, 그것이 가장 최소 연산 횟수임

function solution(x, y, n) {
  let min = -1;

  function bfs() {
    const queue = [x];
    const checked = new Array(y + 1).fill(false);

    checked[x] = 0;

    // * queue.shift보다 idx로 풀면 훨씬 빠른 시간 복잡도를 가짐
    let idx = 0;
    while (queue.length > idx) {
      if (checked[y]) break;

      const current = queue[idx];

      if (!checked[current + n] && current + n <= y) {
        checked[current + n] = checked[current] + 1;
        queue.push(current + n);
      }

      if (!checked[current * 2] && current * 2 <= y) {
        checked[current * 2] = checked[current] + 1;
        queue.push(current * 2);
      }

      if (!checked[current * 3] && current * 3 <= y) {
        checked[current * 3] = checked[current] + 1;
        queue.push(current * 3);
      }

      idx++;
    }

    return checked[y] === false ? -1 : checked[y];
  }

  return bfs();
}

// * 2. DP: 반복되는 연산이 발생할 때 이전 연산을 저장해두고 다음 연산에 활용
function solution(x, y, n) {
  const dp = Array(y + 1).fill(Infinity);

  dp[x] = 0;

  for (let i = x; i <= y; i++) {
    // 해당 값이 연산된 적이 없으면
    if (dp[i] === Infinity) continue;

    if (i + n <= y) {
      // 이미 연산된 적이 있는 dp[i+n]과 dp[i+n]의 예비 값인 dp[i] + 1 중 작은 값을 저장
      dp[i + n] = Math.min(dp[i + n], dp[i] + 1);
    }
    if (i * 2 <= y) {
      dp[i * 2] = Math.min(dp[i * 2], dp[i] + 1);
    }
    if (i * 3 <= y) {
      dp[i * 3] = Math.min(dp[i * 3], dp[i] + 1);
    }
  }

  return dp[y] === Infinity ? -1 : dp[y];
}
