import { setError, clearError } from "../common.js";

const emailInput = document.querySelector('.input-email');
const emailError = document.querySelector('#email-error');
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const nickInput = document.querySelector('.input-nick');
const nickError = document.querySelector('#nick-error');

const pwInput = document.querySelector('.input-pw');
const pwError = document.querySelector('#pw-error');

const checkpwInput = document.querySelector('.input-checkpw');
const checkpwError = document.querySelector('#checkpw-error');

const signupBtn = document.querySelector('.sign-up');

const pw_visibilityBtn = document.querySelector('#pw-visibility');
const checkpw_visibilityBtn = document.querySelector('#checkpw-visibility');

const bg = document.querySelector('.modal-bg');
const modalBtn = document.querySelector('.modal-close');
const modalTxt = document.querySelector('.modal-error');

let pw_isClicked = false;
let checkpw_isClicked = false;

pw_visibilityBtn.addEventListener('click', function(e) {
  pw_isClicked = !pw_isClicked
  if(pw_isClicked){
    pwInput.setAttribute('type', 'text');
    pw_visibilityBtn.setAttribute('src','../img/btn_visibility_on.png');
    return;
  }
  pwInput.setAttribute('type', 'password');
  pw_visibilityBtn.setAttribute('src','../img/visibility.png');
})

checkpw_visibilityBtn.addEventListener('click', function(e) {
  checkpw_isClicked = !checkpw_isClicked;
  if(checkpw_isClicked){
    checkpwInput.setAttribute('type', 'text');
    checkpw_visibilityBtn.setAttribute('src','../img/btn_visibility_on.png');
    return;
  }
  checkpwInput.setAttribute('type', 'password');
  checkpw_visibilityBtn.setAttribute('src','../img/visibility.png');
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
    signupButton();
  }
}

function validateNick() {
  try {
    const nickname = nickInput.value.trim();

    if (nickname === '') {
      throw new TypeError('닉네임을 입력해주세요.');
    }

    if (!nickname.checkValidity()) {
      throw new TypeError('잘못된 닉네임 형식입니다.');
    }

    clearError(nickInput, nickError);
  }

  catch (error) {
    setError(nickInput, nickError, error.message);
  }

  finally {
    signupBtn();
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
      throw new TypeError(`비밀번호를 ${MIN_LENGTH}자 이상 입력해주세요.`);
    }

    clearError(pwInput, pwError);
  }

  catch (error) {
    setError(pwInput, pwError, error.message);
  }

  finally {
    signupButton();
  }
}

function matchPw() {
  try {
    const checkPwd = checkpwInput.value.trim();
    const password = pwInput.value.trim();

    if (checkPwd === '') {
      throw new TypeError('비밀번호를 입력해주세요.');
    }

    if (checkPwd.value !== password.value) {
      throw new TypeError('비밀번호가 일치하지 않습니다.');
    }

    clearError(checkpwInput, checkpwError);
  }
  
  catch (error) {
    setError(checkpwInput, checkpwError, error.message);
  }

  finally {
    signupButton();
  }
}

function signupButton() {
  const isValid = emailInput.classList.contains('pass') && nickInput.classList.contains('pass') && pwInput.classList.contains('pass') && checkpwInput.classList.contains('pass');
  if (isValid) {
    signupBtn.classList.remove('inactive');
    signupBtn.classList.add('active');
    signupBtn.style.backgroundColor = "#3692FF";
  }
  else {
    signupBtn.classList.add('inactive');
    signupBtn.classList.remove('active');
    signupBtn.style.backgroundColor = "#9CA3AF";
  }
}

function signClickBtn() {
  const new_data = {
    email: emailInput.value,
    password: pwInput.value
  }

  const match_data = USER_DATA.find(user => user.email === new_data.email)

  if (match_data) {
    modalTxt.textContent = "사용 중인 이메일입니다.";
    bg.style.display = 'block';
  }

  else {
    modalTxt.textContent = "회원가입 성공";
    bg.style.display = 'block';
    window.location.href = "/login";
  }
}

function modalClose() {
  bg.style.display = 'none';
}


emailInput.addEventListener('focusout', validateEmail);
nickInput.addEventListener('focusout', validateNick);
pwInput.addEventListener('focusout', validatePw);
checkpwInput.addEventListener('focusout', matchPw);
signupBtn.addEventListener('click', signClickBtn);
modalBtn.addEventListener('click', modalClose);