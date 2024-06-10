// https://school.programmers.co.kr/learn/courses/30/lessons/118670

// * 풀이 - 정확성 테스트 통과 / 효율성 테스트 실패
// shiftRow: 모든 행이 아래쪽으로 한 칸씩 밀려납니다.
// rotate: 행렬의 바깥쪽에 있는 원소들을 시계 방향으로 한 칸 회전
// return 연산을 차례대로 시행한 후의 행렬 상태

// operations 순회

// Rotate일 경우
// 0~cLen-2 순회 (cUnit)
//  (0, cUnit) => (0, cUnit + 1)
//  (rLen -1, cLen -1 - cUnit) => (rLen -1, cLen -1 - cUnit - 1)
// 0 ~ rLen-2 순회 (rUnit)
//  (rUnit, cLen-1) => (rUnit + 1, cLen-1)
//  (rLen - 1 - rUnit, 0) => (rLen - 1 - rUnit - 1, 0)

// 시간복잡도 O(operations.length * (rLen * cLen)) = O(10만 * 10만)

function rotate(arr) {
  const rLen = arr.length;
  const cLen = arr[0].length;

  let beforeC1 = arr[0][0];
  let beforeC2 = arr[rLen - 1][cLen - 1];

  for (let c = 0; c < cLen - 1; c++) {
    let temp1 = arr[0][c + 1];
    arr[0][c + 1] = beforeC1;
    beforeC1 = temp1;

    let temp2 = arr[rLen - 1][cLen - c - 2];
    arr[rLen - 1][cLen - c - 2] = beforeC2;
    beforeC2 = temp2;
  }

  let beforeR1 = beforeC1;
  let beforeR2 = beforeC2;

  for (let r = 0; r < rLen - 1; r++) {
    let temp1 = arr[r + 1][cLen - 1];
    arr[r + 1][cLen - 1] = beforeR1;
    beforeR1 = temp1;

    let temp2 = arr[rLen - r - 2][0];
    arr[rLen - r - 2][0] = beforeR2;
    beforeR2 = temp2;
  }

  return arr;
}

// shiftRow일 경우
// rc[rLen-1] 저장
// 0 ~ rLen-2 순회 (r)
//  rc[r] = rc[r+1]
// rc[0] = rc[rLen-1];
function shiftRow(arr) {
  const rLen = arr.length;
  const cLen = arr[0].length;
  const lastArr = [...arr[rLen - 1]];
  let beforeArr = arr[0];

  for (let r = 0; r < rLen - 1; r++) {
    const temp = [...arr[r + 1]];
    arr[r + 1] = beforeArr;
    beforeArr = temp;
  }

  arr[0] = lastArr;

  return arr;
}

function solution(rc, operations) {
  const rLen = rc.length;
  const cLen = rc[0].length;
  let result = Array.from({ length: rLen }, () => new Array(cLen).fill(0));

  for (let i = 0; i < rLen; i++) {
    for (let j = 0; j < cLen; j++) result[i][j] = rc[i][j];
  }

  operations.forEach((oper) => {
    if (oper === "Rotate") {
      result = rotate(result);
    } else if (oper === "ShiftRow") {
      result = shiftRow(result);
    }
  });

  return result;
}

// * 해답 - deque 사용
// deque 구현 - 이중 연결 리스트 사용

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  pushFront(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // head의 prev를 node로 설정
      this.head.prev = newNode;
      // node의 next를 head로 설정
      newNode.next = this.head;
      // head를 node로 설정
      this.head = newNode;
    }

    this.length++;
  }

  popFront() {
    // head가 없다면
    if (this.head === null) return null;

    const value = this.head.value;

    // head의 next를 head로 설정
    this.head = this.head.next;
    this.head.prev = null;
    this.length--;

    return value;
  }

  push(value) {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // tail의 next를 newNode로 설정
      this.tail.next = newNode;
      // newNode의 prev를 tail로 설정
      newNode.prev = this.tail;
      // tail를 newNode로 설정
      this.tail = newNode;
    }

    this.length++;
  }

  pop() {
    // tail이 없다면
    if (this.tail === null) return null;

    const value = this.tail.value;

    // tail의 prev를 tail로 설정
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length--;

    return value;
  }

  printNode() {
    let result = "";

    for (let node = this.head; node !== null; node = node.next) {
      result += `${node.value} -> `;
    }

    console.log(result);
  }
}
