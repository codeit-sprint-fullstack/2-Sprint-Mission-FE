export default function generateRandomNickname() {
  const adjectives = ["멋진", "귀여운", "신비로운", "재밌는", "용감한"];
  const nouns = ["고양이", "강아지", "코알라", "드래곤", "유니콘"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
}
