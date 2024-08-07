// https://school.programmers.co.kr/learn/courses/30/lessons/142085#
// ! 실패

// * heap
// 왼쪽 자식 node의 index = 부모노드 index * 2 + 1
// 오른쪽 자식 node의 index = 부모노드 index * 2 + 2
// 부모 노드의 index = Math.floor((자식 노드의 index-1) / 2)
class MaxHeap {
  list = [];

  get length() {
    return this.list.length;
  }

  parentIndexOf(a) {
    return Math.floor((a - 1) / 2);
  }

  maxChildIndexOf(a) {
    const [left, right] = [a * 2 + 1, a * 2 + 2];

    if (right >= this.length) return left;

    return this.list[left] > this.list[right] ? left : right;
  }

  swap(i, j) {
    const tmp = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = tmp;
  }

  push(a) {
    this.list.push(a);

    let childIndex = this.list.length - 1;
    let parentIndex = this.parentIndexOf(childIndex);

    while (parentIndex >= 0 && this.list[parentIndex] < this.list[childIndex]) {
      this.swap(childIndex, parentIndex);
      childIndex = parentIndex;
      parentIndex = this.parentIndexOf(childIndex);
    }
  }

  pop() {
    this.swap(0, this.length - 1);
    const value = this.list.pop();

    let parentIndex = 0;
    let childIndex = this.maxChildIndexOf(parentIndex);

    while (
      childIndex < this.length &&
      this.list[parentIndex] < this.list[childIndex]
    ) {
      this.swap(childIndex, parentIndex);
      parentIndex = childIndex;
      childIndex = this.maxChildIndexOf(parentIndex);
    }

    return value;
  }
}

function solution(n, k, enemy) {
  let heap = new MaxHeap();
  let result = 0;

  for (let i = 0; i < enemy.length; i++) {
    heap.push(enemy[i]);
    n -= enemy[i];

    if (n < 0) {
      if (k === 0) return result;
      k--;
      n += heap.pop();
    }

    result += 1;
  }

  return result;
}
