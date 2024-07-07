// https://school.programmers.co.kr/learn/courses/30/lessons/132265
// * 내 풀이
// 맨 앞과 맨 뒤에서부터 종류의 수를 구함 (left, right)
// i에서의 left와 i+1에서의 right가 동일하면 result++;

function solution(topping) {
  const size = new Set(topping).size;
  const n = topping.length;

  const cnt = Array.from({ length: n }, (e) => ({ left: 0, right: 0 }));

  const leftC = new Set();
  const rightC = new Set();

  for (let i = 0; i < n; i++) {
    const left = topping[i];
    const right = topping[n - 1 - i];

    if (!leftC.has(left)) {
      leftC.add(left);
    }

    if (!rightC.has(right)) {
      rightC.add(right);
    }

    cnt[i]["left"] = leftC.size;
    cnt[n - 1 - i]["right"] = rightC.size;
  }

  let result = 0;

  for (let i = 0; i < n - 1; i++) {
    if (cnt[i].left === cnt[i + 1].right) result++;
  }

  return result;
}
