// https://school.programmers.co.kr/learn/courses/30/lessons/12978
// ! 실패

// return 음식 주문 받을 수 있는 마을 개수
// 인접리스트

function solution(N, road, K) {
  let result = new Set();

  let graph = {};

  for (let i = 0; i < road.length; i++) {
    const [a, b, c] = road[i];

    if (!graph[a]) graph[a] = [];
    graph[a].push({ node: b, dis: c });

    if (!graph[b]) graph[b] = [];
    graph[b].push({ node: a, dis: c });
  }

  function dfs() {
    const stack = [1];
    const checked = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);

    checked[1] = 0;

    while (stack.length) {
      const current = stack.pop();

      const adjArr = graph[current];

      for (let i = 0; i < adjArr.length; i++) {
        const { node: next, dis } = adjArr[i];

        if (checked[next] > dis + checked[current]) {
          checked[next] = dis + checked[current];
          stack.push(next);
        }
      }
    }

    return checked.filter((e) => e <= K).length;
  }

  return dfs();
}
