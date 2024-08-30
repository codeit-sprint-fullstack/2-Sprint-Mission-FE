const emailInput = document.querySelector('#username');
const nicknameInput = document.querySelector('#nickname');
const passwordInput = document.querySelector('#password1');
const password2Input = document.querySelector('#password2');
const btn = document.querySelector('#signin-button');

function showErrorMsg(el, errorID) {
  const showingMsg = document.getElementById(errorID);
  showingMsg.style.display = 'block';
  el.style.border = '1px solid #F74747';
}

function hideErrorMsg(el, errorID) {
  const hidingMsg = document.getElementById(errorID);
  hidingMsg.style.display = 'none';
  el.style.border = 'none';
}

let emailValidation;
let nicknameValidation;
let passwordValidation;
let password2Validation;

function emailValidCheck(e) {
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailCheck.test(e);
}

function emailChecker() {
  emailValidation = false;

  hideErrorMsg(emailInput, 'email-empty-error');
  hideErrorMsg(emailInput, 'email-input-error');

  if (!emailInput.value) {
    showErrorMsg(emailInput, 'email-empty-error');
  } else if (!emailValidCheck(emailInput.value)) {
    showErrorMsg(emailInput, 'email-input-error');
  } else {
    emailValidation = true;
  }

  btnActivate();
}

function nicknameChecker() {
  nicknameValidation = false;
  
  hideErrorMsg(nicknameInput, 'nickname-empty-error');

  if (!nickname.value) {
    showErrorMsg(nicknameInput, 'nickname-empty-error')
  } else {
    nicknameValidation = true;
  }
  
  btnActivate();
}

function passwordChecker() {
  passwordValidation = false;

  hideErrorMsg(passwordInput, 'password-empty-error');
  hideErrorMsg(passwordInput, 'password-input-error');

  if (!passwordInput.value) {
    showErrorMsg(passwordInput, 'password-empty-error');
  } else if (passwordInput.value.length < 8) {
    showErrorMsg(passwordInput, 'password-input-error');
  } else {
    passwordValidation = true;
  }

  btnActivate();
}

function password2Checker() {
  password2Validation = false;
  
  hideErrorMsg(password2Input, 'password2-check-error');

  if (passwordInput) {
    if (password2Input.value === passwordInput.value) {
      password2Validation = true;
    } else {
      showErrorMsg(password2Input, 'password2-check-error');
    }
  }

  btnActivate();
}

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

function showModal(message) {
  const modal = document.querySelector('.alert-modal');
  const modalMessage = document.querySelector('.modal-message');
  const modalButton = document.querySelector('.modal-button');

  modalMessage.textContent = message;
  modal.style.display = 'flex';

  modalButton.onclick = function() {
    modal.style.display = 'none';
  }
}

function goSignIn(e) {
  e.preventDefault();

  const eachUserData = USER_DATA.find(el => el.email === emailInput.value);
  if (eachUserData) {
    showModal('사용 중인 이메일입니다.');
  } else {
    window.location.href="/login";
  }
}

function btnActivate() {
  console.log(emailValidation, passwordValidation);
  
  if (emailValidation && nicknameValidation && passwordValidation && password2Validation) {
    btn.classList.add('isValid')
    btn.disabled = false;
    btn.addEventListener('click', goSignIn);
  } else if (document.querySelector('.isValid')) {
    btn.disabled = true;
    btn.classList.remove('isValid');
  }
}

emailInput.addEventListener('focusout', emailChecker);
nicknameInput.addEventListener('focusout', nicknameChecker);
passwordInput.addEventListener('focusout', passwordChecker);
password2Input.addEventListener('focusout', password2Checker);