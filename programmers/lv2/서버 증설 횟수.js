// https://school.programmers.co.kr/learn/courses/30/lessons/389479

// m명 증가 -> 1개 추가
// m명 미만 -> 증설 x

// n시에 증설 => n + k시 까지 운영
// return 서버를 최소 몇 번 증설해야 하는지

// servers 요소 종료해야 할 시간
// 현재 이용하고 있는 사람 수 p
// servers에 종료해야 할 시간 = idx가 있다면 삭제
// Math.floor(p / m)만큼 서버 운영해야 함
//  만약 servers.length < Math.floor(p / m)라면,
//      answer += Math.floor(p / m)-servers.length
//      servers.push(...new Array(Math.floor(p / m)-servers.length).fill(idx + k))

function solution(players, m, k) {
  var answer = 0;
  let servers = [];

  players.forEach((p, idx) => {
    const need = Math.ceil(p / m);

    servers = servers.filter((end) => end > idx);

    if (servers.length < Math.floor(p / m)) {
      const add = Math.floor(p / m) - servers.length;
      answer += add;
      servers.push(...new Array(add).fill(idx + k));
    }
  });

  return answer;
}
