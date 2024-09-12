const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const pwError = document.getElementById('pwError');
const modalMassage = document.getElementById('modalMassage');
const modal = document.getElementById('modal');
const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;

const loginButton = document.getElementById('button');

const userData = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];
const inputData = {
    email: email.value,
    password: password.value
  }
const match_data = userData.find(user => user.email === inputData.email);

function emailValidation() {
  if (email.value === '') {
    email.classList.add('fail');
    loginButton.classList.add('disabled');
    emailError.textContent = '이메일을 입력해주세요.';
  } else if (!emailRegex.test(email.value)) {
    email.classList.add('fail');
    loginButton.classList.add('disabled');
    emailError.textContent = '잘못된 이메일 형식입니다.';
  } else {
    email.classList.add('pass');
    email.classList.remove('fail');
    loginButton.classList.remove('disabled');
    emailError.textContent = '';
  }
}
function pwValidation() {
  if (password.value === '') {
    password.classList.add('fail');
    loginButton.classList.add('disabled');
    pwError.textContent = '비밀번호를 입력해주세요.';
  } else if (password.value.length<8) {
    password.classList.add('fail');
    loginButton.classList.add('disabled');
    pwError.textContent = '비밀번호를 8자 이상 입력해주세요.';
  } else {
    password.classList.add('pass');
    password.classList.remove('fail');
    loginButton.classList.remove('disabled');
    pwError.textContent = '';
  }
}

function btnActive() {

  if (this.classList.contains('pass')) {
    loginButton.classList.remove('disabled');
    } else {
      loginButton.classList.add('disabled');
    };
}
function login (inputData, userData) {
  if(inputData.email.value === userData.email.value) {
    if(inputData.password.value === userData.password.value) {
    window.location.href = "/items";
    } else {
      modal.classList.remove('hidden');
      modalMassage.textContent = '비밀번호가 일치하지 않습니다.';
    };
  } else {
    modal.classList.remove('hidden');
    modalMassage.textContent = '등록되지 않은 이메일 입니다.';
  }
}

email.addEventListener('focusout', emailValidation);
password.addEventListener('focusout', pwValidation);
loginButton.addEventListener('onclick', login);