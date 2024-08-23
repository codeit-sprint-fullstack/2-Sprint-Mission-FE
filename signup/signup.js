// 이벤트 리스너 설정
emailInput.addEventListener('focusout', () => {
  validateEmail(emailInput.value);
  //validateForm();
});
passwordInput.addEventListener('focusout', () => {
  validatePassword(passwordInput.value);
  //validateForm();
});

repasswordInput.addEventListener('focusout', () => {
  validateRepassword(passwordInput.value, repasswordInput.value);
  //validateForm();
});

nicknameInput.addEventListener('input', () => {
  validateNickname(nicknameInput.value);
  //validateForm();
});

// 비밀번호확인 문자 표시/숨기기 설정
hideEye2.addEventListener('click', () => showPassword(repasswordInput, showEye2, hideEye2));
showEye2.addEventListener('click', () => hidePassword(repasswordInput, showEye2, hideEye2));

signButton.disabled = true;

signButton.addEventListener('click', () => {
  let link = '../login/index.html';
  if (!signButton.disabled) {
    window.location.href = link;
  }
});