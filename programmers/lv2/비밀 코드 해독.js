// https://school.programmers.co.kr/learn/courses/30/lessons/388352

// 1~n 서로 다른 정수 5개 오름차순으로 정렬

// return 비밀 코드로 가능한 정수 조합 개수

function isPossible(combi, q, ans) {
  for (let i = 0; i < q.length; i++) {
    let cnt = 0;

    // 입력한 정수인 q[i]에서 combi에 포함된 정수의 개수 확인
    for (let j = 0; j < combi.length; j++) {
      const e = combi[j];

      if (q[i].includes(e)) {
        cnt += 1;
      }
    }

    // cnt가 일치하는 개수와 동일하지 않으면, 비밀 코드될 수 x
    if (cnt !== ans[i]) return false;
  }

  return true;
}

function solution(n, q, ans) {
  var answer = 0;

  const combis = [];
  const checked = new Array(n).fill(false);

  // 조합으로 비밀코드의 모든 경우의 수 구하기
  function getCombis(arr, num = 0) {
    if (arr.length === 5) {
      answer += isPossible(arr, q, ans) ? 1 : 0;
      return;
    }

    for (let i = num + 1; i <= n; i++) {
      if (checked[i - 1]) continue;

      checked[i - 1] = true;
      getCombis([...arr, i], i);
      checked[i - 1] = false;
    }
  }

  getCombis([]);

  return answer;
}
