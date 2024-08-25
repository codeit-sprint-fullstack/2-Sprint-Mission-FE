import * as module from './lib/module.js';
import * as modal from './lib/modal.js';

fetch('../modal.html')
  .then(response => response.text())
  .then(html => document.getElementById('modal-placeholder').innerHTML = html);

// 로그인 버튼 상태 업데이트
const updateLoginButtonState = () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginButton = document.querySelector('.login_btn');

  const isValid = emailInput.classList.contains('valid') && passwordInput.classList.contains('valid');
    loginButton.classList.toggle('active', isValid);
    loginButton.classList.toggle('disabled', !isValid);
    loginButton.disabled = !isValid;
};

// 로그인 처리
const login = event => {
  event.preventDefault();
  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;
  const user = module.userData.find(user => user.email === emailInput);

  user && user.password === passwordInput 
  ? window.location.href = "/items"
  : modal.showModal('비밀번호가 일치하지 않습니다.');
};

document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('loginForm');
  const idContainer = document.querySelector('.id_container');
  const passwordContainer = document.querySelector('.password_container');
  const toggleButton = document.getElementById('togglePassword');

  const emailValidateInputs = () => {
    const isValid = emailInput.value !== '' && module.validateEmail(emailInput.value);
    emailInput.classList.toggle('valid', isValid);
    emailInput.classList.toggle('invalid', !isValid);
    idContainer.classList.toggle('valid', isValid);
    idContainer.classList.toggle('invalid', !isValid);
    document.getElementById('emailError').innerText = !emailInput.value
      ? '이메일을 입력해주세요.'
      : !isValid ? '잘못된 이메일 형식입니다.' : '';
    updateLoginButtonState();
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
    updateLoginButtonState();
  };

  emailInput.addEventListener('blur', () => module.handleInputBlur(emailInput));
  passwordInput.addEventListener('blur', () => module.handleInputBlur(passwordInput));

  emailInput.addEventListener('focusout', emailValidateInputs);
  passwordInput.addEventListener('focusout', passwordValidateInputs);
  loginForm.addEventListener('submit', login);

  // 비밀번호 표시/숨김 토글 설정
  module.togglePasswordVisibility(passwordInput, toggleButton);
  
});
