// https://school.programmers.co.kr/learn/courses/30/lessons/138476
// * 내 풀이
// return 서로 다른 종류의 수 최소값

// 각 종류마다 개수를 구한다.
// 개수가 많은 순서대로 오름차순으로 정렬한다. (arr)
// arr 순회
// k - arr[i] 하고나서 cnt++;

// 시간복잡도: O(n);
function solution(k, tangerine) {
  const n = tangerine.length;
  const category = {};

  for (let i = 0; i < n; i++) {
    if (!category[tangerine[i]]) {
      category[tangerine[i]] = 1;
    } else {
      category[tangerine[i]] += 1;
    }
  }

  const arr = Object.values(category);

  arr.sort((a, b) => b - a);

  let cnt = 0;
  let sum = k;

  for (let i = 0; i < arr.length; i++) {
    sum -= arr[i];
    cnt++;

    if (sum <= 0) break;
  }

  return cnt;
}
