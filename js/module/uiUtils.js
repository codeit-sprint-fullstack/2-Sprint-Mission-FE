/* 모달 다이얼로그 요소 생성 */
const modalElement = document.createElement('dialog');
modalElement.id = 'error-modal';

modalElement.innerHTML = `
  <div class="modal-content">
    <p id="modal-message">오류 메시지가 여기에 표시됩니다.</p>
    <button id="modal-confirm-btn">확인</button>
  </div>
`;
document.body.appendChild(modalElement);

// 모달 다이얼로그 콘트롤
const modalMessage = modalElement.querySelector('#modal-message');
const confirmButton = modalElement.querySelector('#modal-confirm-btn');

export function showModal(message, type = 'info', redirectUrl = null) {
  
  modalMessage.textContent = message;

  // 모달 메시지 색상을 type에 따라 변경
  if (type === 'error') {
    modalMessage.style.color = 'red';
  } else {
    modalMessage.style.color = '#333'; 
  }

  modalElement.showModal();

  // 확인 버튼 클릭 시 모달 닫기 및 페이지 이동 처리
  confirmButton.addEventListener('click', () => {
    closeModal();
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, { once: true }); // 'once: true'를 통해 이벤트 핸들러가 한 번만 실행되도록 설정
}

export function closeModal() {
  modalElement.close();
}

// 확인 버튼 클릭 시 모달 닫기
confirmButton.addEventListener('click', closeModal);