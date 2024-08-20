// https://school.programmers.co.kr/learn/courses/30/lessons/42626
// ! 실패
// 모든 음식 스코빌 지수 k이상으로 만들기
// 스코빌 지수 가장 낮은 2개끼리 섞기
// 섞은 음식 스코빌 지수 = 가장 맵지 않은 음식의 스코빌 지수 + 두 번째로 맵지 않은 스코빌 지수 * 2

// scoville 오름차순으로 정렬 (idx=0)
// minHeap에 요소들 집어넣기

// 부모: Math.floor((n-1)/2)
// 왼쪽 자식: i * 2 + 1;
// 오른쪽 자식: i * 2 + 2;

class MinHeap {
  list = [];

  parentIdx(childIdx) {
    return Math.floor((childIdx - 1) / 2);
  }

  swap(a, b) {
    const temp = this.list[a];
    this.list[a] = this.list[b];
    this.list[b] = temp;
  }

  push(value) {
    this.list.push(value);

    let childIdx = this.list.length - 1;
    let parentIdx = this.parentIdx(childIdx);

    while (parentIdx >= 0 && this.list[childIdx] < this.list[parentIdx]) {
      this.swap(childIdx, parentIdx);

      childIdx = parentIdx;
      parentIdx = this.parentIdx(childIdx);
    }
  }

  minChildIdx(parentIdx) {
    const left = parentIdx * 2 + 1;
    const right = parentIdx * 2 + 2;

    if (right >= this.list.length) return left;

    return this.list[left] < this.list[right] ? left : right;
  }

  pop() {
    // ! 예외 처리
    this.swap(0, this.list.length - 1);
    const value = this.list.pop();

    // 마지막 요소를 root로

    let parentIdx = 0;
    let minIdx = this.minChildIdx(parentIdx);

    while (
      minIdx < this.list.length &&
      this.list[parentIdx] > this.list[minIdx]
    ) {
      this.swap(parentIdx, minIdx);
      parentIdx = minIdx;
      minIdx = this.minChildIdx(parentIdx);
    }

    return value;
  }
}

function solution(scoville, K) {
  let cnt = 0;
  let sum = 0;
  let idx = 0;

  const minHeap = new MinHeap();

  scoville.sort((a, b) => a - b);
  scoville.forEach((e) => minHeap.push(e));

  while (minHeap.list.length >= 2 && minHeap.list[0] < K) {
    const first = minHeap.pop();
    const second = minHeap.pop();

    minHeap.push(first + second * 2);
    cnt++;
  }

  return minHeap.list[0] >= K ? cnt : -1;
}
