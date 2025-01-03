// https://school.programmers.co.kr/learn/courses/30/lessons/258712
// * 풀이
// return 다음달에 누가 선물을 많이 받을 선물의 수

// a, b 중 선물 많이 준 사람: +1
// 기록 x or 동일하다면 선물 지수가 큰 사람 +1
//      선물 지수도 같다면 선물 주고받지 x
// 선물 지수 = 준 선물 수 - 받은 선물 수

// gift 순회 (i)
// a, b = gift[i].split(' ') (a: 준 사람, b: 받은 사람)
// 선물 지수 계산
//   giftNums[maps[a]] += 1;
//   giftNums[maps[b]] -= 1;
// arr[maps[a]][maps[b]] += 1;

// i=0~n-1, j=i+1~n-1
// arr[i][j] arr[j][i] 비교
// arr[i][j] === arr[j][i] => giftNums 비교
//  giftNums[i] > giftNums[j] => result[i] += 1
//  giftNums[i] < giftNums[j] => result[j] += 1
// arr[i][j] > arr[j][i] => result[i] += 1
// arr[i][j] < arr[j][i] => result[j] += 1
function solution(friends, gifts) {
  const n = friends.length;
  const arr = Array.from({ length: n }, () => new Array(n).fill(0));
  const maps = {};
  const giftNums = {};

  const result = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    maps[friends[i]] = i;
    giftNums[i] = 0;
  }

  for (let i = 0; i < gifts.length; i++) {
    const [a, b] = gifts[i].split(" ");
    giftNums[maps[a]] += 1;
    giftNums[maps[b]] -= 1;
    arr[maps[a]][maps[b]] += 1;
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (arr[i][j] === arr[j][i]) {
        if (giftNums[i] > giftNums[j]) {
          result[i] += 1;
        } else if (giftNums[i] < giftNums[j]) {
          result[j] += 1;
        }
      } else if (arr[i][j] > arr[j][i]) {
        result[i] += 1;
      } else {
        result[j] += 1;
      }
    }
  }

  return Math.max(...result);
}
