import * as verification from './verification.js';

const loginBtn = document.getElementById('loginButton');
const inputId = document.querySelector('.js-input__id');
const inputPw = document.querySelector('.js-input__pw');
const modal = document.querySelector('.modal');
const showPW = document.querySelectorAll('.label-wrap img');

let idChk = false;
let pwChk = false;

inputId.addEventListener('focusin', (e) => e.target.classList.remove('error'));
inputId.addEventListener('focusout', (e) => {
  const errorMsg = e.target.parentElement.querySelector('.js-error-msg');

  if (!verification.verifyId(e.target.value)) {
    idChk = false;
    e.target.classList.add('error');

    errorMsg.textContent =
      e.target.textLength === 0
        ? '이메일을 입력해주세요.'
        : '잘못된 이메일 형식입니다';
  } else {
    idChk = true;

    errorMsg.textContent = '';
  }

  loginBtn.disabled = !(idChk && pwChk);
});

inputPw.addEventListener('focusin', (e) => e.target.classList.remove('error'));
inputPw.addEventListener('focusout', (e) => {
  const errorMsg =
    e.target.parentElement.parentElement.querySelector('.js-error-msg');

  if (e.target.textLength === 0) {
    pwChk = false;
    e.target.classList.add('error');

    errorMsg.textContent = '비밀번호를 입력해주세요.';
  } else if (e.target.textLength < 8) {
    pwChk = false;
    e.target.classList.add('error');

    errorMsg.textContent = '비밀번호를 8자 이상 입력해주세요.';
  } else {
    pwChk = true;

    errorMsg.textContent = '';
  }

  loginBtn.disabled = !(idChk && pwChk);
});

loginBtn.addEventListener('click', (e) => {
  if (!verification.verifyPw(inputId.value, inputPw.value)) {
    modal.classList.remove('off');
  } else {
    location.href = '../items';
  }
});

modal.querySelector('.button').addEventListener('click', (e) => {
  modal.classList.add('off');
});

for (let eye of showPW) {
  eye.addEventListener('click', (e) => {
    if (e.target.classList.contains('eye')) {
      e.target.src = '../src/Image/btn_visibility_off_24px.png';
      e.target.parentElement
        .querySelector('input')
        .setAttribute('type', 'password');
    } else {
      e.target.src = '../src/Image/btn_visibility_on_24px.png';
      e.target.parentElement
        .querySelector('input')
        .setAttribute('type', 'text');
    }

    e.target.classList.toggle('eye');
  });
}
