// https://school.programmers.co.kr/learn/courses/30/lessons/150369
// !실패
// 이동 거리 계산을 잘못함

const delItem = (arr, cap) => {
  let cnt = 0;

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] >= cap) {
      arr[i] -= cap; // 트럭이 담을 수 있는 양만큼 제거
      cnt += cap;
      break;
    } else {
      cap -= arr[i];
      cnt += arr[i];
      arr[i] = 0;
    }
  }

  return cnt; // 삭제된 개수 총 합
};

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

// 배열의 가장 마지막 요소가 0일 경우 제거
const deleteZero = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === 0) arr.pop();
    else break;
  }
};

function solution(cap, n, deliveries, pickups) {
  let distance = 0;
  let dSum = getSum(deliveries);
  let pSum = getSum(pickups);

  while (dSum > 0 || pSum > 0) {
    deleteZero(deliveries);
    deleteZero(pickups);

    distance += Math.max(deliveries.length, pickups.length) * 2;

    const dCnt = delItem(deliveries, cap); // 삭제된 배달 개수
    const pCnt = delItem(pickups, cap); // 삭제된 수거 개수

    dSum -= dCnt;
    pSum -= pCnt;
  }

  return distance;
}
