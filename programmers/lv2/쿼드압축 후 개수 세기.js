// https://school.programmers.co.kr/learn/courses/30/lessons/68936
// * 풀이

// S 내부 모든 수가 같다면 => S를 해당 수로 압축
// return [0의 개수, 1의 개수]

// 시간복잡도: O(n^2 * logn)

function solution(arr) {
  const result = [0, 0];

  const check = (x, y, n) => {
    if (n === 1) {
      result[arr[x][y]] += 1;
      return;
    }

    let flag = true;

    // 시간 복잡도: O(n^2)
    for (let i = x; i < x + n; i++) {
      for (let j = y; j < y + n; j++) {
        if (arr[i][j] !== arr[x][y]) {
          flag = false;
          break;
        }
      }
    }

    // 시간 복잡도: O(log4 (n^2)) = O(log2 n)
    // 배열을 4개의 하위 배열로 나누고, 각 하위 배열에 대해 재귀 호출 수행
    const half = Math.floor(n / 2);

    if (!flag) {
      check(x, y, half);
      check(x + half, y, half);
      check(x, y + half, half);
      check(x + half, y + half, half);
    } else {
      result[arr[x][y]] += 1;
    }
  };

  check(0, 0, arr.length);

  return result;
}
