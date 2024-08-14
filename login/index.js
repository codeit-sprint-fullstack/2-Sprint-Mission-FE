// 이메일 입력상태 함수
function validateEmail() {
  const elInputEmail = document.querySelector('#email');
  const blankEmailError = document.querySelector('.blank-email-error');
  const emailError = document.querySelector('.email-error');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (elInputEmail.value.length === 0) {
    blankEmailError.style.display = 'block';
    elInputEmail.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    emailError.style.display = 'none';
    return false;
  } else if (elInputEmail.value.length > 0 && !emailPattern.test(elInputEmail.value)) {
    blankEmailError.style.display = 'none';
    elInputEmail.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    emailError.style.display = 'block';
    return false;
  } else {
    blankEmailError.style.display = 'none';
    elInputEmail.style.cssText = 'none';
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
    elInputPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    passwordError.style.display = 'none';
    return false;
  } else if (elInputPassword.value.length < 8) {
    blankPasswordError.style.display = 'none';
    elInputPassword.style.cssText = 'outline: 0.1rem solid var(--error-color);';
    passwordError.style.display = 'block';
    return false;
  } else {
    blankPasswordError.style.display = 'none';
    elInputPassword.style.cssText = 'none';
    passwordError.style.display = 'none';
    return true;
  }
}

// 버튼 활성화
function buttonActivation() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const loginButton = document.querySelector("#login-button");
  let formValid = true;

  if(emailValid && passwordValid) {
    loginButton.disabled = !formValid;
  } else {
    loginButton.disabled = formValid;
  }

}

//로그인버튼 클릭시 items페이지로 이동
function goUrl() {
  location.href = '/items';
}

document.querySelector('#email').addEventListener('focusout',validateEmail);// 이메일 입력상태 호출
document.querySelector('#password').addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출
document.querySelector('#password').addEventListener('focusout',buttonActivation);
document.querySelector('#login-button').addEventListener('click',goUrl);


