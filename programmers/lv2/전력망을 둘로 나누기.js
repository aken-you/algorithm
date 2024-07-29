// https://school.programmers.co.kr/learn/courses/30/lessons/86971
// * 풀이
// 전선 하나 끊음 -> 네트워크 2개로 분할
// 송전탑의 개수를 최대한 비슷하게 -> 차이가 가장 적은 경우의 수 찾아야 함
// return | 송전탑 개수 차이 |

// 전선을 하나씩 끊어서 차이 구해야 함

// 차이를 구하는 법은 dfs
// checked가 되지 않은 노드인 경우, checked하고 다음에 탐색
// 탐색할 것이 없다면 끝내고 몇개를 탐색했는지 반환

// 만약 탐색 결과가 2개인 경우
//  두 개의 차이를 구해서 최솟값보다 작다면 대체

function solution(n, wires) {
  let min = -1;
  const graph = {};

  // graph 만들기
  for (let i = 0; i < wires.length; i++) {
    const [from, to] = wires[i];

    if (!graph[from]) graph[from] = new Set([to]);
    else graph[from].add(to);

    if (!graph[to]) graph[to] = new Set([from]);
    else graph[to].add(from);
  }

  const dfs = (start, checked) => {
    const stack = [start];
    let cnt = 1;

    checked[start] = true;

    while (stack.length > 0) {
      const current = stack.pop();

      graph[current].forEach((node) => {
        if (!checked[node]) {
          checked[node] = true;
          stack.push(node);
          cnt++;
        }
      });
    }

    return cnt;
  };

  // 전선을 하나씩 끊어서 차이 구해야 함
  for (let i = 0; i < wires.length; i++) {
    const [from, to] = wires[i];
    const checked = Array(n).fill(false);

    graph[from].delete(to);
    graph[to].delete(from);

    const result = [];

    for (let j = 1; j < n; j++) {
      if (!checked[j]) {
        const cnt = dfs(j, checked);
        result.push(cnt);
      }
    }

    if (result.length === 2) {
      const diff = Math.abs(result[0] - result[1]);

      if (min === -1) {
        min = diff;
      } else {
        if (diff < min) min = diff;
      }
    }

    graph[from].add(to);
    graph[to].add(from);
  }

  return min;
}
