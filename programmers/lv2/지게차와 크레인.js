// https://school.programmers.co.kr/learn/courses/30/lessons/388353
// 1시간동안 풀었음

// n x m
// 하나 요청: 접근 가능한 컨테이너 꺼내기
// 외부에서 접근 가능한 노드인지 확인
//  i=0, n-1
//  j=0, m-1
//  bfs로 시작점은 이미 꺼낸 외부 노드들
// 맞다면, 꺼내기

function canAccess(storage, checked, target) {
  const can = [];
  const n = storage.length;
  const m = storage[0].length;

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const queue = [];
  const visited = Array.from({ length: storage.length }, () =>
    new Array(storage[0].length).fill(false)
  ); // bfs 방문 체크

  for (let row = 0; row < n; row++) {
    if (!checked[row][0] && target === storage[row][0]) can.push([row, 0]);
    else if (checked[row][0]) {
      queue.push([row, 0]);
    }
    visited[row][0] = true;

    if (!checked[row][m - 1] && target === storage[row][m - 1])
      can.push([row, m - 1]);
    else if (checked[row][m - 1]) {
      queue.push([row, m - 1]);
    }
    visited[row][m - 1] = true;
  }

  for (let col = 1; col < m - 1; col++) {
    if (!checked[0][col] && target === storage[0][col]) can.push([0, col]);
    else if (checked[0][col]) {
      queue.push([0, col]);
    }
    visited[0][col] = true;

    if (!checked[n - 1][col] && target === storage[n - 1][col])
      can.push([n - 1, col]);
    else if (checked[n - 1][col]) {
      queue.push([n - 1, col]);
    }
    visited[n - 1][col] = true;
  }

  while (queue.length) {
    const [x, y] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      if (visited[nx][ny]) continue;

      // 이미 꺼낸 노드라면 queue에 넣기
      if (checked[nx][ny]) {
        queue.push([nx, ny]);
      } else {
        if (target === storage[nx][ny]) {
          can.push([nx, ny]); // 접근 가능한 노드
        }
      }

      visited[nx][ny] = true;
    }
  }

  return can;
}

// 두개 요청: 모든 컨테이너 꺼내기

function solution(storage, requests) {
  var answer = 0;
  const checked = Array.from({ length: storage.length }, () =>
    new Array(storage[0].length).fill(false)
  );
  const words = {};

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage[i].length; j++) {
      if (!words[storage[i][j]]) words[storage[i][j]] = [[i, j]];
      else words[storage[i][j]].push([i, j]);
    }
  }

  for (let req of requests) {
    // 한개 요청
    if (req.length === 1) {
      const can = canAccess(storage, checked, req);

      for (let c of can) {
        const [x, y] = c;

        checked[x][y] = true;
      }
      continue;
    }

    // 두개 요청
    const arr = words[req[0]] ?? [];

    arr.forEach(([x, y]) => (checked[x][y] = true));
  }

  for (let i = 0; i < checked.length; i++) {
    for (let j = 0; j < checked[0].length; j++) {
      if (!checked[i][j]) answer++;
    }
  }

  return answer;
}
