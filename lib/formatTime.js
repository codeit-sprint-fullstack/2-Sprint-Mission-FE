export default function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) {
    return `${seconds}초 전`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}분 전`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}일 전`;
  }
}
