// https://school.programmers.co.kr/learn/courses/30/lessons/43165
// * 풀이
// 순서를 바꾸지 x
// return target이 되는 경우의 수

// dfs
// 모든 노드를 탐색했을 경우 return;
//  단, sum === target이면 answer+=1;
// 현재 노드 이후의 노드를 탐색
//  dfs(i, sum + numbers[i])
//  dfs(i, sum - numbers[i])

function solution(numbers, target) {
  let answer = 0;
  const n = numbers.length;
  const checked = new Array(n).fill(false);

  const dfs = (idx, sum) => {
    if (idx === n - 1) {
      if (sum === target) {
        answer += 1;
      }

      return;
    }
    const next = idx === null ? 0 : idx + 1;

    dfs(next, sum + numbers[next]);
    dfs(next, sum - numbers[next]);
  };

  dfs(null, 0);

  return answer;
}
