// https://school.programmers.co.kr/learn/courses/30/lessons/17683#
// !실패 - 1시간 초과

// 시작,끝난,제목,정보
// 음악 시간 < 재생 시간 : 반복 재생
// 일치하는 음악이 여러개 || 재생 시간이 같을 경우: 재생 시간이 제일 긴 음악 제목 반환
// 일치하는 음악 x : None

// 재생 시간 구하기
// 음악 시간 < 재생 시간라면, (재생 시간 - 음악 시간)만큼 음 뒤에 붙이기
// 재생된 음에서 m이 존재하는지 확인
//  answer 재생 시간 < 현재 재생 시간: answer 갱신
//  answer 재생 시간 = 현재 재생 시간: 먼저 입력된 음악 제목을 answer 갱신
//  answer === '': answer 갱신

function getDiff(s, e) {
  const [sh, sm] = s.split(":").map(Number);
  const [eh, em] = e.split(":").map(Number);

  return eh * 60 + em - (sh * 60 + sm);
}

function solution(m, musicinfos) {
  let answer = "";
  let playTime = 0;

  const reg = new RegExp(m, "g"); // * 정규식 생성 (flag는 두 번째 인자로 전달)

  for (let music of musicinfos) {
    const [s, e, title, info] = music.split(",");

    const diff = getDiff(s, e);

    let musicPlay = "";

    // info에서 음 찾기
    const infos = [];
    let idx = 0;

    while (idx < info.length) {
      if (info[idx + 1] === "#") {
        infos.push(info.slice(idx, idx + 2));
        idx += 2;
      } else {
        infos.push(info[idx]);
        idx += 1;
      }
    }

    // (재생 시간 - 음악 시간)만큼 음 뒤에 붙이기
    for (let i = 0; i < diff; i++) {
      musicPlay += infos[i % infos.length];
    }

    // 재생된 음에서 m이 존재하는지 확인
    //  answer 재생 시간 < 현재 재생 시간: answer 갱신
    //  answer 재생 시간 = 현재 재생 시간: 먼저 입력된 음악 제목을 answer 갱신
    //  answer === '': answer 갱신
    const correct = [...musicPlay.matchAll(reg)]; // * matchAll 배열로 변환

    for (let i = 0; i < correct.length; i++) {
      const startIdx = correct[i].index;
      const lastIdx = startIdx + m.length;

      if (musicPlay[lastIdx] === "#") continue;

      if (answer.length === "") {
        answer = title;
        playTime = diff;
        continue;
      }

      if (playTime < diff) {
        answer = title;
        playTime = diff;
      }
    }
  }

  return answer.length === 0 ? "(None)" : answer;
}

// * 다른 풀이
function solution(m, musicinfos) {
  const len = musicinfos.length;
  m = filterString(m);

  // 재생 시간 기준으로 내림차순 정렬
  musicinfos = musicinfos.sort((a, b) => {
    const [a_start, a_end, a_title, a_pattern] = a.split(",");
    const [b_start, b_end, b_title, b_pattern] = b.split(",");

    return countTime(b_start, b_end) - countTime(a_start, a_end);
  });

  for (let i = 0; i < len; i++) {
    const [start, end, title, pattern] = musicinfos[i].split(",");
    const duration = countTime(start, end);

    let music = filterString(pattern);

    // pattern 단위로 music에 붙임
    while (music.length < duration) {
      music += music;
    }
    music = music.slice(0, duration + 1); // duration만큼 자름

    if (music.includes(m)) return title;
  }

  return "(None)";
}

// #이 붙은 음을 숫자로 변환
function filterString(string) {
  let result = string;

  result = result.replaceAll("A#", "1");
  result = result.replaceAll("C#", "2");
  result = result.replaceAll("D#", "3");
  result = result.replaceAll("F#", "4");
  result = result.replaceAll("G#", "5");

  return result;
}

function countTime(start, end) {
  const [s_H, s_M] = start.split(":");
  const [e_H, e_M] = end.split(":");

  const hourDiff = +e_H - +s_H;
  const minDiff = +e_M - +s_M;

  return 60 * hourDiff + minDiff;
}
