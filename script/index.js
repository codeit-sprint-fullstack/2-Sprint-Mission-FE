function updateUI() {
  const logo = document.getElementById('logo');
  const viewportWidth = window.innerWidth;
  const brElements = document.querySelectorAll('.dynamic-br');
  const topBrElement = document.querySelector('.top-dynamic-br');

  // 로고 이미지 변경
  logo.src = viewportWidth <= 743 ? 'img/판다마켓.svg' : 'img/Group 19.svg';

  // 줄바꿈 처리
  const shouldHaveBreak = viewportWidth >= 1200 || viewportWidth <= 743;
  brElements.forEach((brElement, index) => {
    brElement.innerHTML = shouldHaveBreak && (index === 0 && viewportWidth < 1200) ? '' : shouldHaveBreak ? '<br>' : '';
  });
  topBrElement ? topBrElement.innerHTML = shouldHaveBreak ? '<br>' : '' : null;
}

// 페이지 로드 및 리사이즈 시 UI 업데이트
window.addEventListener('resize', updateUI);
window.addEventListener('load', updateUI);

// 최초 호출로 UI 업데이트
updateUI();