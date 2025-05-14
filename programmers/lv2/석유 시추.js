// https://school.programmers.co.kr/learn/courses/30/lessons/250136

// return 가장 많은 석유량

// dfs로 석유 덩어리 개수와 그 덩어리가 어떤 열에 위치하는지 확인

function solution(land) {
  const n = land.length;
  const m = land[0].length;

  const checked = Array.from({ length: n }, () => new Array(m).fill(false));
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let map = {};

  for (let i = 0; i < m; i++) map[i] = 0;

  function dfs(start) {
    const stack = [start];
    let cnt = 1;
    const cols = new Set();

    cols.add(start[1]);

    while (stack.length) {
      const node = stack.pop();

      for (let i = 0; i < 4; i++) {
        const nx = node[0] + dx[i];
        const ny = node[1] + dy[i];

        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (checked[nx][ny] || land[nx][ny] === 0) continue;

        checked[nx][ny] = true;
        stack.push([nx, ny]);
        cols.add(ny);
        cnt += 1;
      }
    }

    return { cnt, cols };
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (checked[i][j] || land[i][j] === 0) continue;

      checked[i][j] = true;
      const { cnt, cols } = dfs([i, j]);

      cols.forEach((col) => (map[col] += cnt));
    }
  }

  return Math.max(...Object.values(map));
}
