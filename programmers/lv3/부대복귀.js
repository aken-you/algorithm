// https://school.programmers.co.kr/learn/courses/30/lessons/132266
// * 풀이
// 두 지역 간의 길을 통과하는 데 걸리는 시간: 1
// 각 부대원은 지도 정보를 이용하여 최단시간에 부대로 복귀 => bfs
// 되돌아오는 경로가 없어져 복귀가 불가능한 부대원 o

// n: 총 지역 수
// roads: 두 지역을 왕복할 수 있는 길 정보
// sources: 각 부대원이 위치한 서로 다른 지역
// destination: 강철부대 지역
// return 주어진 sources의 원소 순서대로 강철부대로 복귀할 수 있는 최단시간
// 복귀가 불가능한 경우 해당 부대원의 최단시간은 -1

class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  shift() {
    const node = this.head;

    this.head = this.head.next;
    this.length -= 1;

    return node.value;
  }
}

// bfs

// willCheck에 end를 미리 넣고 checked에 넣는다.
// willCheck에서 가장 맨 앞에 있는 노드를 꺼낸다.
// 현재 노드와 인접한 노드를 확인한다.
//  만약 이미 탐색했을 경우 넘어간다.
//  탐색하지 않았을 경우 checked에 넣고, 거리측정하고, willCheck에 넣는다.
// sources 순회 (s)
//  s = end이면 0
//  거리가 0이면 갈 수 없는 곳이므로 -1
//  거리가 1이상이면 거리 반환

function bfs(graph, end, sources) {
  const result = [];

  const checked = new Array(graph.length + 1).fill(false);
  const willCheck = new Queue();
  const distance = new Array(graph.length + 1).fill(0);

  willCheck.push(end);
  checked[end] = true;

  while (willCheck.length > 0) {
    const current = willCheck.shift();

    graph[current].forEach((adj) => {
      if (checked[adj]) return;

      checked[adj] = true;
      distance[adj] = distance[current] + 1;
      willCheck.push(adj);
    });
  }

  sources.forEach((s) => {
    if (s === end) {
      result.push(0);
      return;
    }

    if (distance[s] === 0) result.push(-1);
    else if (distance[s] > 0) result.push(distance[s]);
  });

  return result;
}

// 시간 복잡도: O(n + roads.length + sources.length) = O(100만대)
// n: 노드의 개수
// roads.length: edges의 개수

function solution(n, roads, sources, destination) {
  const graph = Array.from({ length: n + 1 }, () => new Array());

  // 그래프 생성
  for (let i = 0; i < roads.length; i++) {
    const [start, end] = roads[i];

    graph[start].push(end);
    graph[end].push(start);
  }

  return bfs(graph, destination, sources);
}

// * BFS 다른 방법
// willCheck가 배열이어도 시간복잡도는 만족한다.
// 하지만 당연히 Queue가 더 빠르다.
function bfs(graph, end, sources) {
  const result = [];

  const checked = new Array(graph.length + 1).fill(false);
  const willCheck = [];
  const distance = new Array(graph.length + 1).fill(0);

  willCheck.push(end);
  checked[end] = true;

  while (willCheck.length > 0) {
    const current = willCheck.shift();

    graph[current].forEach((adj) => {
      if (checked[adj]) return;

      checked[adj] = true;
      distance[adj] = distance[current] + 1;
      willCheck.push(adj);
    });
  }

  sources.forEach((s) => {
    if (s === end) {
      result.push(0);
      return;
    }

    if (distance[s] === 0) result.push(-1);
    else if (distance[s] > 0) result.push(distance[s]);
  });

  return result;
}
