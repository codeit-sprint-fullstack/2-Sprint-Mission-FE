// 이벤트 리스너 설정
// 이벤트 리스너에 전달되는 함수는 참조만 해야 하며, 실행되지 않아야 합니다
// forcusout 시 validateEmail() 함수를 호출
emailInput.addEventListener('focusout', () => {
  validateEmail(emailInput.value);
  validateForm();
});
passwordInput.addEventListener('focusout', () => {
  validatePassword(passwordInput.value);
  validateForm();
});

// input 시 validateForm() 함수를 호출
emailInput.addEventListener('input', () => validateForm());
passwordInput.addEventListener('input', () => validateForm());

// 로그인 버튼 초기화 비활성화
loginButton.disabled = true;

// 검증 후 로그인 버튼 다루기
function validateForm() {
  const email = emailInput.value;
  const password = passwordInput.value;

  const emailIsValid = !emailInput.classList.contains('error') && (email !== "");
  const passwordIsValid = !passwordInput.classList.contains('error') && (password !== "") && password.length >= 8;

  // 폼 전체 검증을 통해 로그인 버튼 활성화 또는 비활성화
  if (emailIsValid && passwordIsValid) {
    loginButton.disabled = false;
    loginButton.classList.add('button-click');
  } else {
    loginButton.disabled = true;
    loginButton.classList.remove('button-click');
  }
}

// 로그인 버튼 활성화 이벤트 생성
loginButton.addEventListener('click', () => {
  let link = '../items/index.html';
  if (!loginButton.disabled) {
    window.location.href = link;
  }
});