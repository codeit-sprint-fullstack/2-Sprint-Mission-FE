const emailInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const btn = document.querySelector('#login-button');

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
let isPasswordValid;

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

function goLogin(e) {
  e.preventDefault();

  const eachUserData = USER_DATA.find(el => el.email === emailInput.value);
  if (eachUserData) {
    if (eachUserData.password === passwordInput.value) {
      window.location.href = '/items';
    } else {
      showModal('비밀번호가 일치하지 않습니다.');
    }
  } else {
    showModal('이메일이 없습니다.');
  }
}

function activeBtn() {
  console.log(isEmailValid, isPasswordValid);
  
  if (isEmailValid && isPasswordValid) {
    btn.classList.add('isValid')
    btn.disabled = false;
    btn.addEventListener('click', goLogin);
  } else if (document.querySelector('.isValid')) {
    btn.disabled = true;
    btn.classList.remove('isValid');
  }
}

emailInput.addEventListener('focusout', emailChecker);
passwordInput.addEventListener('focusout', passwordChecker);
