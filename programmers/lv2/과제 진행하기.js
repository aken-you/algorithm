// https://school.programmers.co.kr/learn/courses/30/lessons/176962
// ! 실패

function getM(str) {
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
}

function solution(plans) {
  let answer = [];
  let stack = [];

  plans = plans.map((e) => [e[0], getM(e[1]), Number(e[2])]);
  // 시작 시간 순서대로 정렬
  plans.sort((a, b) => a[1] - b[1]);

  for (let i = 0; i < plans.length - 1; i++) {
    let finishTime = plans[i][1] + plans[i][2];
    let nextStartTime = plans[i + 1][1];

    // 현재 과제 끝나는 시간 > 다음 과제 시작 시간
    //  stack에 현재 과제 넣기 => 현재 과제 중단
    if (finishTime > nextStartTime) {
      stack.push([plans[i][0], finishTime - nextStartTime]);
      continue;
    }

    // 현재 과제 끝나는 시간 = 다음 과제 시작 시간
    // answer에 현재 과제 이름 추가
    if (finishTime > nextStartTime) {
      answer.push(plans[i][0]);
      continue;
    }

    // 현재 과제 끝나는 시간 < 다음 과제 시작 시간
    //  answer에 현재 과제 이름 추가
    //  stack에 멈춰둔 과제가 있을 경우
    //    멈춘 과제 끝나는 시간 <= 다음 과제 시작 시간
    //      answer에 멈춘 과제 이름 추가; stack.pop()
    //    멈춘 과제 끝나는 시간 > 다음 과제 시작 시간
    //      멈춘 과제 플레이 타임 = 멈춘 과제 끝나는 시간 - 다음 과제 시작 시간
    //      stack.push(다음 과제)

    answer.push(plans[i][0]);
    let leftTime = nextStartTime - finishTime;

    while (stack.length > 0 && leftTime > 0) {
      const stopped = stack.pop();

      if (stopped[1] <= leftTime) {
        answer.push(stopped[0]);
      } else {
        stack.push([stopped[0], stopped[1] - leftTime]);
      }

      leftTime -= stopped[1];
    }
  }
  // 마지막 과제는 무조건 시작 시간에 play
  answer.push(plans[plans.length - 1][0]);

  for (let i = stack.length - 1; i >= 0; i--) {
    answer.push(stack[i][0]);
  }
  return answer;
}
