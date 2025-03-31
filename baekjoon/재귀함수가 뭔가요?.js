// https://www.acmicpc.net/problem/17478

const fs = require("fs");
const N = Number(fs.readFileSync("./dev/stdin").toString());

const WHAT_IS = '"재귀함수가 뭔가요?"';
const RECURSIVE_FUNCTION = '"재귀함수는 자기 자신을 호출하는 함수라네"';
const END = "라고 답변하였지.";

const UNDER_BAR = "____";

console.log("어느 한 컴퓨터공학과 학생이 유명한 교수님을 찾아가 물었다.");

const story = [
  WHAT_IS,
  '"잘 들어보게. 옛날옛날 한 산 꼭대기에 이세상 모든 지식을 통달한 선인이 있었어.',
  "마을 사람들은 모두 그 선인에게 수많은 질문을 했고, 모두 지혜롭게 대답해 주었지.",
  '그의 답은 대부분 옳았다고 하네. 그런데 어느 날, 그 선인에게 한 선비가 찾아와서 물었어."',
];

function question(depth) {
  if (depth === N) {
    console.log(
      [WHAT_IS, RECURSIVE_FUNCTION]
        .map((str) => `${UNDER_BAR.repeat(depth)}${str}`)
        .join("\n")
    );

    answer(N);
    return;
  }

  console.log(
    story.map((str) => `${UNDER_BAR.repeat(depth)}${str}`).join("\n")
  );

  question(depth + 1);
}

function answer(depth) {
  if (depth === -1) return;

  console.log(UNDER_BAR.repeat(depth) + END);

  answer(depth - 1);
}

question(0);
