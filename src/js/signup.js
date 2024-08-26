import * as verification from './verification.js';

console.log(verification);

const signupBtn = document.getElementById('signupButton');
const inputId = document.querySelector('.js-input__id');
const inputNickName = document.querySelector('.js-input__nickname');
const inputPw = document.querySelector('.js-input__pw');
const inputCheckPw = document.querySelector('.js-input__checkpw');
const modal = document.querySelector('.modal');
const showPW = document.querySelectorAll('.label-wrap img');

let idChk = false;
let nickNameChk = false;
let pwChk = false;
let pwReChk = false;

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

  signupBtn.disabled = !(idChk && nickNameChk && pwChk && pwReChk);
});

inputNickName.addEventListener('focusin', (e) =>
  e.target.classList.remove('error')
);
inputNickName.addEventListener('focusout', (e) => {
  const errorMsg = e.target.parentElement.querySelector('.js-error-msg');

  if (e.target.textLength === 0) {
    nickNameChk = false;
    e.target.classList.add('error');

    errorMsg.textContent = '닉네임을 입력해주세요.';
  } else {
    nickNameChk = true;

    errorMsg.textContent = '';
  }

  signupBtn.disabled = !(idChk && nickNameChk && pwChk && pwReChk);
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

  signupBtn.disabled = !(idChk && nickNameChk && pwChk && pwReChk);
});

inputCheckPw.addEventListener('focusin', (e) =>
  e.target.classList.remove('error')
);
inputCheckPw.addEventListener('focusout', (e) => {
  const errorMsg =
    e.target.parentElement.parentElement.querySelector('.js-error-msg');

  if (inputPw.value !== e.target.value) {
    pwReChk = false;
    e.target.classList.add('error');

    errorMsg.textContent = '비밀번호가 일치하지 않습니다.';
  } else {
    pwReChk = true;

    errorMsg.textContent = '';
  }

  signupBtn.disabled = !(idChk && nickNameChk && pwChk && pwReChk);
});

signupBtn.addEventListener('click', (e) => {
  if (verification.isUser(inputId.value)) {
    modal.classList.remove('off');
  } else {
    location.href = '../login';
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
