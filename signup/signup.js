// 이벤트 리스너 설정
emailInput.addEventListener('focusout', () => {
  validateEmail(emailInput.value);
  validateSign();
});
passwordInput.addEventListener('focusout', () => {
  validatePassword(passwordInput.value);
  validateSign();
});

repasswordInput.addEventListener('input', () => {
  validateRepassword(passwordInput.value, repasswordInput.value);
  validateSign();
});

nicknameInput.addEventListener('input', () => {
  validateNickname(nicknameInput.value);
  validateSign();
});

emailInput.addEventListener('input', () => validateSign());
// 비밀번호 입력시 비밀번호 확인도 실행
passwordInput.addEventListener('input', () => {
  // 단 아무것도 건드리지 않았을 때는 오류가 발생하지 않도록.
  if (repasswordInput.value !== "") {
    validateRepassword(passwordInput.value, repasswordInput.value);
  }
  validateSign();
});

// 비밀번호확인 문자 표시/숨기기 설정
hideEye2.addEventListener('click', () => showPassword(repasswordInput, showEye2, hideEye2));
showEye2.addEventListener('click', () => hidePassword(repasswordInput, showEye2, hideEye2));

signButton.disabled = true;
// 검증 후 회원가입 버튼 작동
function validateSign() {
  const email = emailInput.value;
  const password = passwordInput.value;
  const nickname = nicknameInput.value;
  const repassword = repasswordInput.value;

  const emailIsValid = !emailInput.classList.contains('error') && (email !== "");
  const passwordIsValid = !passwordInput.classList.contains('error') && (password !== "") && password.length >= 8;
  const repasswordIsValid = (repassword === password && repassword!== "");
  const nicknameIsValid = (nickname!== "");

  // 폼 전체 검증을 통해 로그인 버튼 활성화 또는 비활성화
  if (emailIsValid && passwordIsValid && repasswordIsValid && nicknameIsValid) {
    signButton.disabled = false;
    signButton.classList.add('button-click');
  } else {
    signButton.disabled = true;
    signButton.classList.remove('button-click');
  }
}

// 회원가입 버튼 활성화 이벤트 생성
signButton.addEventListener('click', () => {
  let link = '../login/index.html';
  if (!signButton.disabled) {
    const email = emailInput.value;
    const password = passwordInput.value;

    // 사용자 데이터베이스에서 이메일 찾기
    const user = USER_DATA.find(user => user.email === email);

    if (user) {
      // 이미 가입된 이메일이라면.
      alert('사용 중인 이메일입니다');
    } else {
      USER_DATA.push({ email: email, password: password });
      alert('회원가입이 성공적으로 처리되었습니다.');
      window.location.href = link;
    }
  }
});
