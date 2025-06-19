// https://school.programmers.co.kr/learn/courses/30/lessons/12927
// !실패

function solution(n, works) {
  // n이 남은 작업량보다 클 경우, 피로도는 0
  if (n >= works.reduce((acc, curr) => acc + curr, 0)) return 0;

  const sorted = works.sort((a, b) => b - a);

  while (n) {
    const maxNum = sorted[0]; // 최댓값으로 고정

    for (let i = 0; i < sorted.length; i++) {
      // 최댓값보다 크다면 1 차감 => sorted의 최댓값은 항상 맨 앞에 위치
      if (sorted[i] >= maxNum) {
        n -= 1;
        sorted[i] -= 1;
      }

      if (n === 0) break;
    }
  }

  return sorted.reduce((acc, curr) => acc + curr * curr, 0);
}

// ! 실패(25.06.19)
// max heap으로 구현
class MaxHeap {
  list = [];

  swap(aI, bI) {
    const temp = this.list[aI];
    this.list[aI] = this.list[bI];
    this.list[bI] = temp;
  }

  getMaxChildIndex(i) {
    const [left, right] = [i * 2 + 1, i * 2 + 2];

    if (right >= this.list.length) return left;

    return this.list[left] > this.list[right] ? left : right;
  }

  push(value) {
    this.list.push(value);

    // 맨 아래에 있는 자식 노드부터 위로 올라가면서 정렬
    let childIdx = this.list.length - 1;
    let parentIdx = Math.floor((childIdx - 1) / 2);

    // 부모가 존재해야 하고
    // 부모 노드가 자식 노드보다 작으면 => 정렬
    while (parentIdx >= 0 && this.list[parentIdx] < this.list[childIdx]) {
      this.swap(parentIdx, childIdx);
      childIdx = parentIdx;
      parentIdx = Math.floor((childIdx - 1) / 2);
    }
  }

  pop() {
    this.swap(0, this.list.length - 1); // 최댓값을 쉽게 뽑기 위해 swap
    const value = this.list.pop();

    // root부터 정렬 시작
    let parentIdx = 0;
    let childrenIdx = this.getMaxChildIndex(parentIdx);

    while (
      childrenIdx < this.list.length &&
      this.list[parentIdx] < this.list[childrenIdx]
    ) {
      this.swap(childrenIdx, parentIdx);
      parentIdx = childrenIdx;
      childrenIdx = this.getMaxChildIndex(parentIdx);
    }

    return value;
  }
}

function solution(n, works) {
  const sum = works.reduce((acc, curr) => acc + curr, 0);

  if (sum <= n) return 0;

  const heap = new MaxHeap();

  works.sort((a, b) => b - a);
  works.forEach((e) => heap.push(e));

  while (n) {
    const value = heap.pop();

    heap.push(value - 1);
    n -= 1;
  }

  return heap.list.reduce((acc, curr) => acc + curr * curr, 0);
}
