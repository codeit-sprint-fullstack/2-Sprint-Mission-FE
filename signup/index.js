const emailInput = document.querySelector('#username');
const nicknameInput = document.querySelector('#nickname');
const passwordInput = document.querySelector('#password1');
const passwordConfirmInput = document.querySelector('#password2');
const btn = document.querySelector('#signin-button');

function showErrorMsg(el, errorID, errorMsg) {
  const showingMsg = document.getElementById(errorID);
  showingMsg.style.display = 'block';
  showingMsg.innerHTML = errorMsg;
  el.style.border = '1px solid #F74747';
}

function hideErrorMsg(el, errorID) {
  const hidingMsg = document.getElementById(errorID);
  hidingMsg.style.display = 'none';
  el.style.border = 'none';
}

let isEmailValid;
let isNicknameValid;
let isPasswordValid;
let isPasswordConfrimValid;

function emailValidCheck(e) {
  const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailCheck.test(e);
}

function emailChecker() {
  isEmailValid = false;

  hideErrorMsg(emailInput, 'email-error');

  if (!emailInput.value) {
    showErrorMsg(emailInput, 'email-error', '이메일을 입력해주세요.');
  } else if (!emailValidCheck(emailInput.value)) {
    showErrorMsg(emailInput, 'email-error', '잘못된 이메일 형식입니다.');
  } else {
    isEmailValid = true;
  }

  activeBtn();
}

function nicknameChecker() {
  isNicknameValid = false;
  
  hideErrorMsg(nicknameInput, 'nickname-error');
  if (!nickname.value) {
    showErrorMsg(nicknameInput, 'nickname-error', '닉네임을 입력해주세요.');
  } else {
    isNicknameValid = true;
  }
  
  activeBtn();
}

function passwordChecker() {
  isPasswordValid = false;

  hideErrorMsg(passwordInput, 'password-error');

  if (!passwordInput.value) {
    showErrorMsg(passwordInput, 'password-error', '비밀번호를 입력해주세요.');
  } else if (passwordInput.value.length < 8) {

    showErrorMsg(passwordInput, 'password-error', '비밀번호를 8자 이상 입력해주세요.');
  } else {
    isPasswordValid = true;
  }

  activeBtn();
}

function password2Checker() {
  isPasswordConfrimValid = false;
  
  hideErrorMsg(passwordConfirmInput, 'password2-check-error');

  if (passwordInput) {
    if (passwordConfirmInput.value === passwordInput.value) {
      isPasswordConfrimValid = true;
    } else {
      showErrorMsg(passwordConfirmInput, 'password2-check-error', '비밀번호가 일치하지 않습니다.');
    }
  }

  activeBtn();
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

function activeBtn() {
  console.log(isEmailValid, isPasswordValid);
  
  if (isEmailValid && isNicknameValid && isPasswordValid && isPasswordConfrimValid) {
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
passwordConfirmInput.addEventListener('focusout', password2Checker);