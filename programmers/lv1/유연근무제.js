// https://school.programmers.co.kr/learn/courses/30/lessons/388351

// 희망 시각 + 10분까지 출근
//  주말은 이벤트에 영향 x
// return 상품을 받을 직원 수

// timelogs를 순회 (i)
// i번째 직원이 상품을 받을 수 있는지 확인 (j)
//  (startday+j)가 6또는7이라면 확인 x
//  아니라면, schedules[i] + 10 < timelogs[i][j]인지 확인

function solution(schedules, timelogs, startday) {
  var answer = 0;

  for (let i = 0; i < timelogs.length; i++) {
    let flag = true;

    for (let j = 0; j < timelogs[i].length; j++) {
      const dayNum = (startday - 1 + j) % 7;

      if (dayNum === 5 || dayNum === 6) continue;

      const baseH = schedules[i] / 100;
      const baseM = schedules[i] % 100;

      const hour = Math.floor(baseH) + (baseM + 10 >= 60 ? 1 : 0);
      const minutes = (baseM + 10) % 60;

      const endTime = hour * 100 + minutes;

      if (endTime < timelogs[i][j]) {
        flag = false;
        break;
      }
    }

    if (flag === true) {
      answer += 1;
    }
  }

  return answer;
}
