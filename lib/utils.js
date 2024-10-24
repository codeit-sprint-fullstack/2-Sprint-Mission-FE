export function generateRandomNickname() {
  const nicknames = ['총명한판다', '알뜰한판다', '상냥한판다', '놀라운판다', '김판다'];
  return nicknames[Math.floor(Math.random() * nicknames.length)];
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}