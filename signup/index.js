const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// element setting
const elInputEmail = document.querySelector('#email');
const elInputPassword = document.querySelector('#password');
const elInputConfirmPassword = document.querySelector('#confirmPassword');
const elSignupBtn = document.querySelector('#signupButton');
const togglePasswordAll = document.querySelectorAll('.togglePassword');

let emailComplete
let passwordComplete
let confirmPasswordComplete

// 에러 메세지 표시
function showErrorMessage(elInput, errorId) {
  const visibleErrorMessage = document.querySelector(errorId)
  visibleErrorMessage.style.display = 'block';
  elInput.classList.add('borderRed');
}
// 에러 메세지 지우기
function removeErrorMessage(elInput, errorId) {
  const visibleErrorMessage = document.querySelector(errorId)
  visibleErrorMessage.style.display = 'none';
  elInput.classList.remove('borderRed');
}
// 이메일 입력상태 함수
function validateEmail() {
  removeErrorMessage(elInputEmail, '#emptyEmailError');
  removeErrorMessage(elInputEmail, '#emailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailComplete = false

  if (elInputEmail.value.length === 0) {
    showErrorMessage(elInputEmail, '#emptyEmailError');
  } else if (!emailPattern.test(elInputEmail.value)) {
    showErrorMessage(elInputEmail, '#emailError');
  } else {
    emailComplete = true;
  }
  buttonActivation();
}

// 비밀번호 입력상태 함수
function validatePassword() {
  removeErrorMessage(elInputPassword, '#emptyPasswordError');
  removeErrorMessage(elInputPassword, '#passwordError');
  passwordComplete = false

  if (elInputPassword.value.length === 0) {
    showErrorMessage(elInputPassword, '#emptyPasswordError');
  } else if (elInputPassword.value.length < 8) {
    showErrorMessage(elInputPassword, '#passwordError');
  } else {
    passwordComplete = true;
  }
  buttonActivation();
}

// 비밀번호 확인 입력상태 함수
function validateConfirmPassword() {
  removeErrorMessage(elInputConfirmPassword, '#emptyConfirmPasswordError');
  removeErrorMessage(elInputConfirmPassword, '#confirmPasswordError');
  confirmPasswordComplete = false

  if (elInputConfirmPassword.value.length === 0) {
    showErrorMessage(elInputConfirmPassword, '#emptyConfirmPasswordError');
  } else if (elInputPassword.value !== elInputConfirmPassword.value) {
    showErrorMessage(elInputConfirmPassword, '#confirmPasswordError');
  } else {
    confirmPasswordComplete = true;
  }
  buttonActivation();
}

// 버튼 활성화
function buttonActivation() {
  if(emailComplete && passwordComplete && confirmPasswordComplete) {
    elSignupBtn.disabled = false;
    elSignupBtn.addEventListener('click',checkUserData); // USER_DATA 이메일 유무 체크
  } else {
    elSignupBtn.disabled = ture;
  }
}

// USER_DATA 확인 후 모달생성,닫기 및 페이지이동 기능
function checkUserData() {
  const checkEmail = USER_DATA.some(user => user.email === elInputEmail.value);
  const existEmailError = document.querySelector('.modalContainer')
  if (checkEmail) {
    existEmailError.style.display = 'flex';
  } else {
    location.href = '../login'; // 회원가입버튼 클릭시 login페이지로 이동
  }

  // 에러 메시지 모달 닫기
document.querySelector('.modalButton').addEventListener('click', () => {
  const existEmailError = document.querySelector('.modalContainer');
  existEmailError.style.display = 'none';
});
}

// togglePassword 클릭시 비밀번호 표시/숨기기
togglePasswordAll.forEach(togglePassword => {
  togglePassword.addEventListener('click', function() {
    const passwordFiled = this.previousElementSibling;
    if(passwordFiled.type === 'password') {
      passwordFiled.type = 'text';
      togglePassword.classList.add('togglePasswordHide');
    } else {
      passwordFiled.type = 'password';
      togglePassword.classList.remove('togglePasswordHide');
    }
  })  
});

/* event handling */ 
elInputEmail.addEventListener('focusout',validateEmail);// 이메일 입력상태 호출
elInputPassword.addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출
elInputConfirmPassword.addEventListener('focusout',validateConfirmPassword);// 비밀번호확인 입력상태 호출
