export default function formatTimeAgo(date) {
  const parsedDate = new Date(date);

  // 날짜 유효성 검사
  if (isNaN(parsedDate)) {
    return '날짜 정보 없음';
  }

  const now = new Date();
  const secondsAgo = Math.floor((now - parsedDate) / 1000);

  const intervals = [
    { label: '년', seconds: 31536000 },
    { label: '개월', seconds: 2592000 },
    { label: '일', seconds: 86400 },
    { label: '시간', seconds: 3600 },
    { label: '분', seconds: 60 },
    { label: '초', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} 전`;
    }
  }
  return '방금 전';
}
