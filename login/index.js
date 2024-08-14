// 이메일 입력상태 함수
function validateEmail() {
  const elInputEmail = document.querySelector('#email');
  const blankEmailError = document.querySelector('.blank-email-error');
  const emailError = document.querySelector('.email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (elInputEmail.value.length === 0) {
    blankEmailError.style.display = 'block';
    emailError.style.display = 'none';
    return false;
  } else if (elInputEmail.value.length > 0 && !emailPattern.test(elInputEmail.value)) {
    blankEmailError.style.display = 'none';
    emailError.style.display = 'block';
    return false;
  } else {
    blankEmailError.style.display = 'none';
    emailError.style.display = 'none';
    return true;
  }
}

// 비밀번호 입력상태 함수
function validatePassword() {
  const elInputPassword = document.querySelector('#password');
  const blankPasswordError = document.querySelector('.blank-password-error');
  const passwordError = document.querySelector('.password-error');

  if (elInputPassword.value.length === 0) {
    blankPasswordError.style.display = 'block';
    passwordError.style.display = 'none';
    return false;
  } else if (elInputPassword.value.length < 8) {
    blankPasswordError.style.display = 'none';
    passwordError.style.display = 'block';
    return false;
  } else {
    blankPasswordError.style.display = 'none';
    passwordError.style.display = 'none';
    return true;
  }
}

document.querySelector('#email').addEventListener('focusout',validateEmail);// 이메일 입력상태 호출
document.querySelector('#password').addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출




