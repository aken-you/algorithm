// https://school.programmers.co.kr/learn/courses/30/lessons/1844?language=javascript
// * 풀이
// 캐릭터가 상대 팀 진영에 도착하기 위해서 지나가야 하는 칸의 개수의 최솟값 return
// 단, 상대 팀 진영에 도착할 수 없을 때는 -1 return
// maps는 n x m 크기

// bfs
// 1. 현재 탐색 중인 노드와 인접한 노드를 확인한다.
// 만약 1일 경우 방문 표시와 (현재 탐색 중인 노드 거리 + 1)을 저장하고, willCheck에 넣는다.
// 만약 0이거나 범위를 벗어날 경우, 탐색하지 않는다.

// 시간복잡도: O(n * m)
// distance로 방문 여부를 확인했으나 시간이 더 오래걸렸다.

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];
  const distance = Array.from({ length: n }, () => new Array(m).fill(0));
  const willCheck = [[0, 0]];

  distance[0][0] = 1;

  while (willCheck.length > 0) {
    const [currX, currY] = willCheck.shift();

    for (let i = 0; i < 4; i++) {
      const nx = currX + dx[i];
      const ny = currY + dy[i];

      // 범위가 벗어난 경우
      if (!(maps[nx] && maps[nx][ny])) continue;
      // 벽인 경우
      if (maps[nx][ny] === 0) continue;
      // 이미 방문한 경우
      if (distance[nx][ny] > 0) continue;

      // 방문 표시 + 거리 측정
      distance[nx][ny] = distance[currX][currY] + 1;
      willCheck.push([nx, ny]);
    }
  }

  return distance[n - 1][m - 1] === 0 ? -1 : distance[n - 1][m - 1];
}

// * 예전에 푼 풀이 - distance와 checked를 사용
// distance: 거리
// checked: 방문 여부
// bfs
// 1. 시작 노드를 queue에 넣고, 방문 표시한다.
// 2. queue에 노드를 꺼내어 인접한 노드들을 확인한다.
//  a. 만약 인접한 노드가 이미 방문했다면 continue
//  b. 방문하지 않았다면 queue에 넣고, 방문 표시한다. 거리도 현재 노드에 +1

function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const checked = Array.from({ length: n }, () => Array(m).fill(false));
  const d = Array.from({ length: n }, () => Array(m).fill(0));

  const queue = [[0, 0]];

  checked[0][0] = true;
  d[0][0] = 1;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let i = 0; i < dx.length; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!maps[nx] || !maps[nx][ny]) continue;

      if (checked[nx][ny]) continue;

      // 방문 표시
      checked[nx][ny] = true;
      // 거리
      d[nx][ny] = d[x][y] + 1;
      // queue에 넣기
      queue.push([nx, ny]);
    }
  }

  if (!checked[n - 1][m - 1]) return -1;

  return d[n - 1][m - 1];
}
