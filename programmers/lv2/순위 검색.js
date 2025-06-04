// https://school.programmers.co.kr/learn/courses/30/lessons/72412
// !실패

// target 이상의 값이 처음 나오는 index를 반환
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
}

function getResult(arr, score, map) {
  const keys = Object.keys(map);
  let cnt = 0;

  const firstFiltering = keys.filter((key) =>
    arr.every((e) => key.includes(e))
  );

  firstFiltering.forEach((str) => {
    const arr = map[str];
    const idx = binarySearch(arr, score);

    cnt += arr.length - idx;
  });

  return cnt;
}

function solution(info, query) {
  const answer = [];
  const map = {};

  info.forEach((i) => {
    const [test, job, exp, food, score] = i.split(" ");
    const key = `${test}${job}${exp}${food}`;

    if (map[key]) map[key].push(Number(score));
    else map[key] = [Number(score)];
  });

  for (const key in map) {
    map[key].sort((a, b) => a - b);
  }

  query
    .map((str) => {
      return str.split(/and|\s|\-/).filter((e) => e !== "");
    })
    .forEach((arr) => {
      const score = arr.pop();
      const cnt = getResult(arr, score, map);
      answer.push(cnt);
    });

  return answer;
}
