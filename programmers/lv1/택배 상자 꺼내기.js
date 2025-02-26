// https://school.programmers.co.kr/learn/courses/30/lessons/389478

// return 꺼내야 하는 상자 총 개수

// 총 높이 = row = 0~Math.ceil(n/w)
// col = 0~w-1

// i가 짝수인 경우, j=0~w-1까지 arr 채우기
// i가 홀수인 경우, j=w-1~0까지 arr 채우기

// target = num의 위치
// target[1] = j && i > target[0]다면 answer++
function solution(n, w, num) {
  var answer = 1;

  const rowMax = Math.ceil(n / w);
  const colMax = w - 1;

  let number = 1;

  const arr = Array.from({ length: rowMax }, () => new Array(w).fill(0));

  let target;

  for (let i = 0; i < rowMax; i++) {
    if (number > n) break;

    if (i % 2 === 0) {
      for (let j = 0; j < w; j++) {
        if (number > n) break;
        if (number === num) target = [i, j];

        arr[i][j] = number;
        number++;

        if (target && target[1] === j && i > target[0]) answer++;
      }
    } else {
      for (let j = w - 1; j >= 0; j--) {
        if (number > n) break;
        if (number === num) target = [i, j];
        arr[i][j] = number;
        number++;

        if (target && target[1] === j && i > target[0]) answer++;
      }
    }
  }

  return answer;
}
