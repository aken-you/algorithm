// https://school.programmers.co.kr/learn/courses/30/lessons/154540
// * 풀이
// 지도: 직사각형
// x or 1~9
// x: 바다
// 1~9: 무인도

// 상하좌우 연결된 땅: 최대 며칠동안 머물 수 있는지
// return 오름차순
//  지낼 수 있는 무인도가 없으면 -1

// 0,0~n-1,m-1까지 순회 (i, j)
// !checked[i][j]라면 dfs 탐색

// dfs(current);
// cnt
// stack = [current];
// current 방문 체크
// cnt += current에 적힌 숫자
// stack가 비었을 때까지 아래 과정 반복
// stack 노드 꺼내서 주변 노드 탐색
// 주변 노드를 방문하지 않았을 경우 && 바다가 아닌 경우
//  방문 표시
//  stack에 넣기
//  cnt += 주변 노드에 적힌 숫자

function dfs(start, checked, maps) {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const stack = [start];
  let cnt = 0;

  checked[start[0]][start[1]] = true;
  cnt += Number(maps[start[0]][start[1]]);

  while (stack.length) {
    const [x, y] = stack.pop();

    for (let i = 0; i < 4; i++) {
      const nx = dx[i] + x;
      const ny = dy[i] + y;

      if (nx < 0 || nx >= maps.length || ny < 0 || ny >= maps[0].length)
        continue;
      if (maps[nx][ny] === "X" || checked[nx][ny]) continue;

      checked[nx][ny] = true;
      stack.push([nx, ny]);
      cnt += Number(maps[nx][ny]);
    }
  }

  return cnt;
}

function solution(maps) {
  const answer = [];
  const n = maps.length;
  const m = maps[0].length;
  const checked = Array.from({ length: n }, () => Array(m).fill(false));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checked[i][j] || maps[i][j] === "X") continue;

      const cnt = dfs([i, j], checked, maps);
      answer.push(cnt);
    }
  }
  answer.sort((a, b) => a - b);

  return answer.length === 0 ? [-1] : answer;
}
