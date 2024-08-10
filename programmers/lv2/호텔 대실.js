// https://school.programmers.co.kr/learn/courses/30/lessons/155651
// * 풀이
// return 최소한의 객실만을 사용
// 한 번 사용한 객실 => 10분 청소 (퇴실 시간 기준) => 다음 손님 사용

// 시작 시간 순서대로 오름차순으로 정렬 (arr)

const changeMin = (timeStr) => {
  const [hour, min] = timeStr.split(":").map(Number);
  return hour * 60 + min;
};

function solution(book_time) {
  let nextNum = 1;
  const rooms = {};

  const arr = book_time.sort((a, b) => {
    const aMin = changeMin(a[0]);
    const bMin = changeMin(b[0]);

    if (aMin !== bMin) return aMin - bMin;

    const aEndMin = changeMin(a[1]);
    const bEndMin = changeMin(b[1]);

    return aEndMin - bEndMin;
  });

  // arr 순회
  // rooms의 values 들을 순회
  // 끝나는 시간 + 10분과 시작 시간이 가장 가까운 방을 찾기
  // 없다면 다음 방
  //  j === rooms 마지막 방, room 새로운 방 생성
  for (let i = 0; i < arr.length; i++) {
    const [start, end] = arr[i];
    const startMin = changeMin(start);

    if (Object.values(rooms).length === 0) {
      rooms[nextNum] = end;
      nextNum += 1;
      continue;
    }

    const roomsKey = Object.keys(rooms);
    let minKey = null;
    let min = null;

    for (let j = 0; j < roomsKey.length; j++) {
      let endTime = changeMin(rooms[roomsKey[j]]) + 10;

      const diff = startMin - endTime;

      if (diff >= 0) {
        if (min === null || min > diff) {
          min = diff;
          minKey = roomsKey[j];
        }
      }
    }

    if (minKey !== null) {
      rooms[minKey] = end;
    } else {
      rooms[nextNum] = end;
      nextNum += 1;
    }
  }

  return Object.keys(rooms).length;
}
