// https://school.programmers.co.kr/learn/courses/30/lessons/12899#
// ! 실패 - bfs로 풀었더니 시간 초과
// 자연수만 존재
// 1, 2, 4만 사용
// return n을 124나라에서 사용하는 숫자로 바꾼 값

// nums = Array(n+1).fill("");
// 1~n까지 순회하면서 Nums 채우기
// 1, 2, 4, 11, 12, 14, 21, 22, 24, 41, ...

// bfs
// queue에 노드 하나 꺼냄
// 그 노드 값에 1, 2, 4 하나씩 붙여봄

function solution(n) {
  const nums = Array(n + 1).fill(null);
  const num = ["1", "2", "4"];

  const bfs = () => {
    const queue = [""];

    let idx = 0;

    while (queue.length > idx) {
      if (3 * idx > n) break;

      const current = queue[idx];

      for (let i = 0; i < 3; i++) {
        const str = current + num[i];

        if (!nums[3 * idx + i + 1]) {
          nums[3 * idx + i + 1] = str;
          queue.push(str);
        }
      }

      idx++;
    }
  };

  bfs();

  return nums[n];
}

// * 풀이
// 3진수 이용
// num / 3한 몫과 나머지를 구함
// 만약 나머지가 0이라면
//  나머지 => 4로 변환
//  몫 -= 1;
// 만약 나머지가 0이 아니라면
//  result = result + 나머지;

function solution(n) {
  let num = n;
  let result = "";

  while (num > 0) {
    let a = Math.floor(num / 3);
    let b = num % 3;

    if (b === 0) {
      b = 4;
      a -= 1;
    }

    result = String(b) + result;
    num = a;
  }

  return result;
}
