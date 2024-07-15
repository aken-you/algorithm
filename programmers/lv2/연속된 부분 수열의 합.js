// https://school.programmers.co.kr/learn/courses/30/lessons/178870
// * 내 풀이 - 누적값 + 투 포인터
// k: 부분 수열의 합
// 길이가 짧은 수열
//  길이가 짧은 수열이 여러 개일 경우 startIdx가 작은 수열을 찾는다.
// return [부분 수열 startIdx, lastIdx]

// 누적값 구하기

function solution(sequence, k) {
  const n = sequence.length;
  const sums = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    if (i === 0) sums[i] = sequence[i];
    else {
      sums[i] = sequence[i] + sums[i - 1];
    }
  }

  // 만약 sums[0] === k이라면 바로 return;
  if (sums[0] === k) {
    return [0, 0];
  }

  let result = null;
  let start = 0;
  let last = 1;

  // diff = sums[last] - sums[start]를 구함
  //  start = 0일 경우 diff = sums[last]
  // diff < k, last++;
  // diff > k, start++;
  // diff = k, 비교한 다음 last++; start++;
  //  last - start < result[1] - result[0] + 1, result = [start, last]
  //  last - start = result[1] - result[0] + 1, start < result[0]라면 result = [start, last]

  while (start < n - 1 && last < n) {
    const diff = sums[last] - (start === 0 ? 0 : sums[start]);
    const cnt = last - start;

    if (diff < k) last++;
    else if (diff > k) start++;
    else {
      const startIdx = start === 0 ? 0 : start + 1;

      if (result === null) {
        result = [startIdx, last];
        start++;
        last++;
        continue;
      }

      if (cnt < result[1] - result[0] + 1) result = [startIdx, last];
      else if (cnt === result[1] - result[0] + 1) {
        if (startIdx < result[0]) result = [startIdx, last];
      }

      start++;
      last++;
    }
  }

  return result;
}

// * 다른 풀이 - 누적값 배열을 구하지 않고 구하는 법
function solution(sequence, k) {
  let result = null;
  const n = sequence.length;

  let sum = sequence[0];
  let start = 0;
  let last = 0;

  while (last < n) {
    if (sum < k) {
      last++;
      sum += sequence[last];
    } else if (sum > k) {
      sum -= sequence[start];
      start++;
    } else {
      if (result === null) {
        result = [start, last];
        last++;
        sum += sequence[last];
        continue;
      }

      if (last - start + 1 < result[1] - result[0] + 1) result = [start, last];
      else if (last - start + 1 === result[1] - result[0] + 1) {
        if (start < result[0]) result = [start, last];
      }

      last++;
      sum += sequence[last];
    }
  }

  return result;
}
