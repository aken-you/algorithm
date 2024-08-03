// https://school.programmers.co.kr/learn/courses/30/lessons/42587
// * 풀이
// return 해당 프로세스가 몇 번째로 실행되는지
// 숫자가 클수록 우선순위 높음

// A, B, C, D
// C D A B: A, B 꺼냈다가 다시 집어 넣음
// D A B: C 꺼냄 (DAB보다 높아서)
// A B: D 꺼냄 (AB보다 같거나 높아서)
// B: A 꺼냄 (B보다 높아서)

// 뒤 요소들 중 가장 큰 우선 순위를 확인
// 가장 큰 수와 현재 요소 우선 순위 비교
//  현재 요소 < 가장 큰 수, queue 뒤에 넣기
//  아닐 경우, 빠져 나오기

function solution(priorities, location) {
  let result;
  const n = priorities.length;

  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push({ idx: i, priority: priorities[i] });
  }

  let cnt = 0;

  while (true) {
    const { idx, priority } = arr[0];

    const max = Math.max(...arr.slice(1).map((e) => e.priority));

    arr.shift();

    if (priority < max) {
      arr.push({ idx, priority });
    } else {
      cnt += 1;

      if (idx === location) {
        result = cnt;
        break;
      }
    }
  }

  return result;
}
