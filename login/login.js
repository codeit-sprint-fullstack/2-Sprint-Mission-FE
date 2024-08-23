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

// 검증 후 로그인 버튼 작동
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
    const email = emailInput.value;
    const password = passwordInput.value;

    // 사용자 데이터베이스에서 이메일 찾기
    const user = USER_DATA.find(user => user.email === email);

    if (user) {
        if (user.password === password) {
            // 이메일과 비밀번호가 모두 일치할 경우 페이지 이동
            window.location.href = link;
        } else {
            // 비밀번호가 일치하지 않는 경우
            alert('비밀번호가 일치하지 않습니다.');
        }
    } else {
        // 이메일이 데이터베이스에 없는 경우
        alert('비밀번호가 일치하지 않습니다.');
    }
  }
});