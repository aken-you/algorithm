// https://school.programmers.co.kr/learn/courses/30/lessons/340213

// 10초 전, 후, 건너뛰기
// return 동영상의 위치

function getAnswer(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;

  const mStr = minutes < 10 ? `0${minutes}` : String(minutes);
  const sStr = seconds < 10 ? `0${seconds}` : String(seconds);

  return mStr + ":" + sStr;
}

function getSeconds(str) {
  const [m, s] = str.split(":").map(Number);

  return m * 60 + s;
}

function getCurrent(command, current, opS, opE, videoLen) {
  // 시작 위치가 오프닝 구간일 경우, 오프닝 건너뛰기
  if (current >= opS && current <= opE) current = opE;

  if (command === "prev") {
    if (current < 10) return 0;

    current -= 10;
    if (current >= opS && current <= opE) current = opE;

    return current;
  }

  if (command === "next") {
    const rest = videoLen - current;

    if (rest < 10) return videoLen;

    // 이동하고 나서도 오프닝 구간일 경우, 오프닝 건너뛰기
    current += 10;

    if (current >= opS && current <= opE) current = opE;

    return current;
  }
}

function solution(video_len, pos, op_start, op_end, commands) {
  let current = getSeconds(pos);

  op_start = getSeconds(op_start);
  op_end = getSeconds(op_end);
  video_len = getSeconds(video_len);

  commands.forEach((command) => {
    const newCurrent = getCurrent(
      command,
      current,
      op_start,
      op_end,
      video_len
    );
    current = newCurrent;
  });

  return getAnswer(current);
}
