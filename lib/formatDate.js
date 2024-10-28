export default function formatDate(commentDate) {
  const now = new Date();
  const commentTime = new Date(commentDate);
  const timeDifference = now - commentTime; // 시간 차이 (밀리초 단위)

  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간 단위로 변환
  //혹시나 데이터에 있을 미래 시간을 대비
  if (timeDifference < 0) {
    const day = String(commentTime.getDate()).padStart(2, "0");
    const month = String(commentTime.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1 더함
    const year = String(commentTime.getFullYear()).slice(-2); // 마지막 두 자리 연도

    return `${year}.${month}.${day}`;
  }
  if (hoursDifference < 12) {
    // 12시간 이내이면 "X시간 전" 형식으로 표시
    return `${hoursDifference}시간 전`;
  } else {
    // 12시간이 지나면 "DD.MM.YY" 형식으로 표시
    const day = String(commentTime.getDate()).padStart(2, "0");
    const month = String(commentTime.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1 더함
    const year = String(commentTime.getFullYear()).slice(-2); // 마지막 두 자리 연도

    return `${year}.${month}.${day}`;
  }
}
