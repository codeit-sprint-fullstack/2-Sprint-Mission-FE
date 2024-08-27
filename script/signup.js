import * as module from './lib/module.js';
import * as modal from './lib/modal.js';

fetch('../modal.html')
  .then(response => response.text())
  .then(html => document.getElementById('modal-placeholder').innerHTML = html);

// 회원가입 버튼 상태 업데이트
const updateSignupButtonState = () => {
  const emailInput = document.getElementById('email');
  const nicknameInput = document.getElementById('nickname');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const signupButton = document.querySelector('.signup_btn');

  const isValid = emailInput.classList.contains('valid') && nicknameInput.classList.contains('valid') && passwordInput.classList.contains('valid') && confirmPasswordInput.classList.contains('valid');
    signupButton.classList.toggle('active', isValid);
    signupButton.classList.toggle('disabled', !isValid);
    signupButton.disabled = !isValid;
};

// 회원가입 처리
const signup = event => {
  event.preventDefault();
  const emailInput = document.getElementById('email').value;
  const user = module.userData.find(user => user.email === emailInput);

  user
  ? modal.showModal('사용 중인 이메일입니다.')
  : window.location.href = "/login";
};

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const nicknameInput = document.getElementById('nickname');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const signupForm = document.getElementById('signupForm');
  const idContainer = document.querySelector('.id_container');
  const nicknameContainer = document.querySelector('.nickname_container')
  const passwordContainer = document.querySelector('.password_container');
  const confirmPasswordContainer = document.querySelector('.confirm_password_container');
  const toggleButton = document.getElementById('togglePassword');
  const confirmToggleButton = document.getElementById('confirmTogglePassword');

  const emailValidateInputs = () => {
    const isValid = emailInput.value !== '' && module.validateEmail(emailInput.value);
    emailInput.classList.toggle('valid', isValid);
    emailInput.classList.toggle('invalid', !isValid);
    idContainer.classList.toggle('valid', isValid);
    idContainer.classList.toggle('invalid', !isValid);
    document.getElementById('emailError').innerText = !emailInput.value
      ? '이메일을 입력해주세요.'
      : !isValid ? '잘못된 이메일 형식입니다.' : '';
    updateSignupButtonState();
  };

  const nicknameValidateInputs = () => {
    const isValid = nicknameInput.value.trim() !== '';
    nicknameInput.classList.toggle('valid', isValid);
    nicknameInput.classList.toggle('invalid', !isValid);
    nicknameContainer.classList.toggle('valid', isValid);
    nicknameContainer.classList.toggle('invalid', !isValid);
    document.getElementById('nicknameError').innerText = isValid
      ? '' // 유효할 때는 에러 메시지를 비웁니다.
      : '닉네임을 입력해주세요.'; // 비어 있을 때 에러 메시지 표시
    updateSignupButtonState();
  };

  const passwordValidateInputs = () => {
    const isValid = passwordInput.value !== '' && module.validatePassword(passwordInput.value);
    passwordInput.classList.toggle('valid', isValid);
    passwordInput.classList.toggle('invalid', !isValid);
    passwordContainer.classList.toggle('valid', isValid);
    passwordContainer.classList.toggle('invalid', !isValid);
    document.getElementById('passwordError').innerText = !passwordInput.value
      ? '비밀번호를 입력해주세요.'
      : !isValid ? '비밀번호를 8자 이상 입력해주세요.' : '';
    updateSignupButtonState();
  };

  const confirmPasswordValidateInputs = () => {
    const isValid = confirmPasswordInput.value !== '' && confirmPasswordInput.value === passwordInput.value;
    confirmPasswordInput.classList.toggle('valid', isValid);
    confirmPasswordInput.classList.toggle('invalid', !isValid);
    confirmPasswordContainer.classList.toggle('valid', isValid);
    confirmPasswordContainer.classList.toggle('invalid', !isValid);
    document.getElementById('confirmPasswordError').innerText = !confirmPasswordInput.value
      ? '비밀번호를 입력해주세요.'
      : !isValid ? '비밀번호가 일치하지 않습니다.' : '';
    updateSignupButtonState();
  };

  emailInput.addEventListener('blur', () => module.handleInputBlur(emailInput));
  nicknameInput.addEventListener('blur', () => module.handleInputBlur(nicknameInput));
  passwordInput.addEventListener('blur', () => module.handleInputBlur(passwordInput));
  confirmPasswordInput.addEventListener('blur', () => module.handleInputBlur(confirmPasswordInput));
 
  emailInput.addEventListener('focusout', emailValidateInputs);
  nicknameInput.addEventListener('focusout', nicknameValidateInputs);
  passwordInput.addEventListener('focusout', passwordValidateInputs);
  confirmPasswordInput.addEventListener('focusout', confirmPasswordValidateInputs);
  signupForm.addEventListener('submit', signup);

  // 비밀번호 표시/숨김 토글 설정
  module.togglePasswordVisibility(passwordInput, toggleButton);
  module.togglePasswordVisibility(confirmPasswordInput, confirmToggleButton);
  
});
