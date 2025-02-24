class Node {
  constructor(value) {
    this.next = null;
    this.value = value;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // 맨 끝에 값 추가: O(1)
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;

    return this;
  }

  // 맨 끝에 값 삭제: O(n)
  pop() {
    if (!this.head) return undefined;

    // 맨 앞에서부터 탐색하여 삭제할 tail 찾기
    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    // tail을 삭제하고 새로운 tail 설정
    this.tail = newTail;
    this.tail.next = null;

    this.length -= 1;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  // 맨 앞에 값 삭제: O(1)
  shift() {
    if (!this.head) return undefined;

    let current = this.head;

    this.head = current.next;
    this.length -= 1;

    if (this.length === 0) {
      this.tail = null;
    }

    return current;
  }

  // 맨 앞에 값 추가: O(1)
  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;

    return this;
  }

  // 특정 위치의 값 조회: O(n)
  get(idx) {
    if (idx < 0 || idx >= this.length) return null;

    let counter = 0;
    let current = this.head;

    while (counter !== idx) {
      current = current.next;
      counter += 1;
    }

    return current;
  }

  // 특정 위치의 값 변경
  set(idx, value) {
    const target = this.get(idx);

    if (target) {
      target.value = value;
      return target;
    }

    return null;
  }

  // 특정 위치에 값 추가
  insert(idx, value) {
    if (idx < 0 || idx >= this.length) return null;
    if (idx === this.length) return this.push(value);
    if (idx === 0) return this.unshift(value);

    const newNode = new Node(value);
    const prev = this.get(idx - 1);
    const temp = prev.next;

    prev.next = newNode;
    newNode.next = temp;
    this.length += 1;

    return newNode;
  }

  // 특정 위치 값 삭제: O(n)
  remove(idx) {
    if (idx < 0 || idx >= this.length) return null;
    if (idx === 0) return this.shift();
    if (idx === this.length - 1) return this.pop();

    const prev = this.get(idx - 1);
    const removed = prev.next;

    prev.next = removed.next;
    this.length -= 1;

    return removed;
  }

  // 역순으로 뒤집기
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let next;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev; // next 포인터를 이전 노드를 가리키도록 변경
      prev = current;
      current = next;
    }

    return this;
  }

  print() {
    var arr = [];
    var current = this.head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }
    console.log(arr);
  }
}

const list = new SinglyLinkedList();

list.push(100);
list.push(201);
list.push(250);
list.push(350);
list.push(999);
