// https://school.programmers.co.kr/learn/courses/30/lessons/258711?language=javascript
// !실패: 아이디어를 얻지 못했음
// 도넛
// n: n, e: n
// 막대
// n: n, e: n-1
// 8자
// n: 2n+1, e: 2n+2

// return [생성한 정점 번호, 도넛 수, 막대 수, 8자 수]
// 생성한 정점 노드: 나가는 간선 개수 > 1
//  생성한 정점과 연결된 간선의 수 = 그래프 총 개수
// 막대: 들어오는 간선이 없는 노드 1개와 나가는 간선이 없는 노드 1개 존재
// 8자: 들어오는 간선이 2개와 나가는 간선이 2개인 노드 1개 존재

// edges 순회하면서 각 노드마다 들어오고 나가는 간선 개수 체크
// 들어오는 간선이 없고 나가는 간선의 수가 2이상일 경우 => 생성한 정점 노드
// 들어오는 간선이 없고 나가는 간선의 수가 1일 경우 or 들어오는 간선의 수가 1이고 나가는 간선의 수가 0일 경우 => 막대
// 들어오는 간선이 2개이고 나가는 간선이 2개인 경우 => 8자
// 생성한 정점과 연결된 간선의 개수 - 막대 - 8자 = 도넛

function solution(edges) {
  const graph = {};

  // 0: 들어오는 간선 개수, 1: 나가는 간선 개수
  for (let i = 0; i < edges.length; i++) {
    const [a, b] = edges[i];

    graph[a] = graph[a] ?? [0, 0];
    graph[b] = graph[b] ?? [0, 0];

    graph[a][1] += 1;
    graph[b][0] += 1;
  }

  const result = [0, 0, 0, 0];

  for (const [node, [received, given]] of Object.entries(graph)) {
    if (received === 0 && given >= 2) {
      result[0] = Number(node);
      continue;
    }

    if (given === 0) {
      result[2] += 1;
      continue;
    }

    if (received >= 2 && given === 2) {
      result[3] += 1;
    }
  }

  result[1] = graph[result[0]][1] - result[2] - result[3];

  return result;
}
