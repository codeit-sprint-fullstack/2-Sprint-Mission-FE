function showModal(message) {
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  // 모달 메시지 설정
  modalMessage.innerText = message;

  // 모달을 화면에 표시
  modal.style.display = "flex";

  // 모달 닫기 기능 설정
  modalCloseBtn.onclick = () => modal.style.display = "none";
}

export {
  showModal
}