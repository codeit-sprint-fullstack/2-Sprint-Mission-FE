function formatToYMD(date: string | number | Date): string {
  const commentTime = new Date(date);
  const day = String(commentTime.getDate()).padStart(2, "0");
  const month = String(commentTime.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1 더함
  const year = String(commentTime.getFullYear()).slice(-2); // 마지막 두 자리 연도

  return `${year}.${month}.${day}`;
}

export default function formatDate(commentDate: string | number | Date): string {
  const now = new Date();
  const commentTime = new Date(commentDate);
  const timeDifference = now.getTime() - commentTime.getTime(); // 시간 차이 (밀리초 단위)

  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간 단위로 변환

  if (timeDifference < 0 || hoursDifference > 24) {
    return formatToYMD(commentDate);
  }

  return `${hoursDifference}시간 전`;
}
