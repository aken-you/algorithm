// https://school.programmers.co.kr/learn/courses/30/lessons/12923
// !실패

// i번째 자리에 어떤 숫자가 올까
// = i 본인을 제외한 가장 큰 약수
//  그런 약수가 없을 경우 0 넣기
//  단, 10000000보다 작거나 같아야 함

function solution(begin, end) {
  var answer = [];

  // num을 넣으면 약수중에서 자신을 빼고 가장 큰 수를 리턴
  function check(num) {
    var checkArr = [];

    if (num === 1) {
      return 0;
    }

    // 약수 구하기
    for (var i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        checkArr.push(i);

        // 1e7보다 작다면 바로 반환
        if (num / i <= 1e7) {
          return num / i;
        }
      }
    }

    // 1e7보다 작은 약수가 없었을 경우 i들 중 가장 큰 약수 반환
    if (checkArr.length !== 0) {
      return checkArr[checkArr.length - 1];
    }
    // 없다면 1을 리턴 (1은 모두 나눠짐.)
    return 1;
  }

  for (var i = begin; i <= end; i++) {
    var checkNum = check(i);
    if (checkNum !== undefined) {
      answer.push(checkNum);
    }
  }

  return answer;
}
