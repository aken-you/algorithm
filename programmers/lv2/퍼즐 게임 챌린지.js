// https://school.programmers.co.kr/learn/courses/30/lessons/340212?language=javascript
// !실패

// return 숙련도의 최솟값

function game(level, diffs, times, limit) {
  let time = 0;

  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i];
    const timeCur = times[i];
    const timePrev = i === 0 ? 0 : times[i - 1];

    if (diff > level) {
      const cnt = diff - level;

      time += cnt * (timeCur + timePrev) + timeCur;
    } else {
      time += timeCur;
    }

    if (time > limit) {
      return false;
    }
  }

  return time;
}

function solution(diffs, times, limit) {
  const n = diffs.length;

  // Math.max로 최대값 구하면 런타임 에러 발생
  let maxDiff = diffs[0];

  for (let i = 1; i < n; i++) {
    if (diffs[i] >= maxDiff) maxDiff = diffs[i];
  }

  let left = 1; // 숙련도 최솟값
  let right = maxDiff; // 숙련도 최댓값
  let answer;

  // 이진 탐색
  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // 현재 숙련도

    if (game(mid, diffs, times, limit)) {
      answer = mid;
      right = mid - 1; // 더 낮은 숙련도에서 통과할 수 있는지 확인
    } else {
      left = mid + 1; // 현재 숙련도는 통과하지 못하므로 숙련도를 높임
    }
  }

  return answer;
}
