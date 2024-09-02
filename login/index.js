import { setError, clearError } from "../common.js";

const emailInput = document.querySelector('.input-email');
const emailError = document.querySelector('#email-error');
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const pwInput = document.querySelector('.input-pw');
const pwError = document.querySelector('#pw-error');

const loginBtn = document.querySelector('.log-in');

const visibilityBtn = document.querySelector('.visibility');

const bg = document.querySelector('.modal-bg');
const modalBtn = document.querySelector('.modal-close');
const modalTxt = document.querySelector('.modal-error');

let isClicked = false;

visibilityBtn.addEventListener('click', function(e) {
  isClicked = !isClicked
  if (isClicked){
    pwInput.setAttribute('type', 'text');
    visibilityBtn.setAttribute('src','../img/btn_visibility_on.png');
    return;
  }
  pwInput.setAttribute('type', 'password');
  visibilityBtn.setAttribute('src','../img/visibility.png');
})

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
]

// const setError = (inputName, inputError, message) => {
//   inputName.classList.add('fail');
//   inputName.classList.remove('pass');
//   inputError.value = message;
// }

// const clearError = (inputName, inputError) => {
//   inputName.classList.remove('fail');
//   inputName.classList.add('pass');
//   inputError.value = '';
// }

function validateEmail() {
  let error;
  try {
    const email = emailInput.value.trim();

    if (email === '') {
      throw new TypeError('이메일을 입력해주세요.');
    }

    if (!emailPattern.test(email.value)) {
      throw new TypeError('잘못된 이메일 형식입니다.');
    }

    clearError(emailInput, emailError);
  }
  
  catch (error) {
    setError(emailInput, emailError, error.message);
  }

  finally {
    loginButton();
  }
}

function validatePw() {
  const MIN_LENGTH = 8;

  try {
    const password = pwInput.value.trim();

    if (password === '') {
      throw new TypeError('비밀번호를 입력해주세요.');
    }

    if (password.length < MIN_LENGTH) {
      throw new TypeError(`비밀번호를 ${MIN_LENGTH}자 이상 입력해주세요.`)
    }

    clearError(pwInput, pwError);
  }

  catch (error) {
    setError(pwInput, pwError, error.message);
  }

  finally {
    loginButton();
  }
}

function loginButton() {
  const isValid = emailInput.classList.contains('pass') && pwInput.classList.contains('pass');
  if (isValid) {
    loginBtn.classList.remove('inactive');
    loginBtn.classList.add('active');
    loginBtn.style.backgroundColor = "#3692FF";
  }
  else {
    loginBtn.classList.remove('active');
    loginBtn.classList.add('inactive');
    loginBtn.style.backgroundColor = "#9CA3AF";
  }
}

function loginClickBtn() {
  const new_data = {
    email: emailInput.value,
    password: pwInput.value
  }

  const match_data = USER_DATA.find(user => user.email === new_data.email);

  if (match_data) {
    if (match_data.password === new_data.password) {
      window.location.href = "/items";
    }
    else {
      bg.style.display = "block";
    }
  }
  else {
    bg.style.display = "block";
  }
}

function modalClose() {
  bg.style.display = 'none';
}

emailInput.addEventListener('focusout', validateEmail);
pwInput.addEventListener('focusout', validatePw);
loginBtn.addEventListener('click', loginClickBtn);
modalBtn.addEventListener('click', modalClose);