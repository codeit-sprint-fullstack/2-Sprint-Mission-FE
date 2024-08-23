//변수 정의
const emailInput = document.querySelector('.emailInput');
const passwordInput = document.querySelector('.passwordInput');
const passwordRepeatInput = document.querySelector('.passwordRepeatInput');
const usernameInput = document.querySelector('.usernameInput');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
const passwordRepeatError = document.querySelector('.passwordRepeatError');
const signupButton = document.querySelector('.signUpButton');

//데이터베이스
const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

//alert변수
const customAlert = document.querySelector('.customAlert');
const alertMessage = document.querySelector('.alertMessage');
const alertButton = document.querySelector('.alertButton');

// 페이지 로드 시 customAlert 숨기기
document.addEventListener('DOMContentLoaded', function() {
  customAlert.style.display = 'none'; 
});

//이메일 유효성 검증
function validateEmail(email) {
  const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return pattern.test(email);
}

// 회원가입 버튼 비활성화, 활성화
function buttonOnOff() {
  const emailValid = validateEmail(emailInput.value);
  const passwordValid = passwordInput.value.length >= 8;
  const passwordSuccess = passwordInput.value === passwordRepeatInput.value;
  const usernameValid = usernameInput.value.trim() !== '';

  if (!emailValid || !passwordValid || !passwordSuccess || !usernameValid ||  emailInput.value === '' || passwordInput.value === '' || passwordRepeatInput.value === '' || usernameInput.value === '' ) {
    signupButton.disabled = true;
    signupButton.classList.remove('buttonOn');
  }  else {
    signupButton.disabled = false;
    signupButton.classList.add('buttonOn');
  }
}

//이메일 검사
emailInput.addEventListener('focusout', function(event) {
  const email = emailInput.value;

  if (email === '') {
    emailInput.classList.add('inputError');
    emailError.textContent = '이메일을 입력해주세요.';
    emailError.style.display = 'block';
  } else if (!validateEmail(email)) { 
    emailInput.classList.add('inputError');
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailError.style.display = 'block';
  } else {
    emailInput.classList.remove('inputError'); 
    emailError.textContent = ''; 
    emailError.style.display = 'none';
  }

  buttonOnOff();
});

//비밀번호 검사
passwordInput.addEventListener('focusout', function(event) {
  const password = passwordInput.value;

  if (password === '') {
    passwordInput.classList.add('inputError');
    passwordError.textContent = '비밀번호를 입력해주세요.';
    passwordError.style.display = 'block';
  } else if (password.length < 8) {
    passwordInput.classList.add('inputError');
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.';
    passwordError.style.display = 'block';
  } else {
    passwordInput.classList.remove('inputError');
    passwordError.textContent = '';
    passwordError.style.display = 'none';
  }

  buttonOnOff();
});

//비밀번호 확인 검사
passwordRepeatInput.addEventListener('focusout', function(event) {
  const password = passwordInput.value;
  const passwordRepeat = passwordRepeatInput.value;

  if (passwordRepeat === '') {
    passwordRepeatInput.classList.add('inputError');
    passwordRepeatError.textContent = '비밀번호를 다시 입력해주세요.';
    passwordRepeatError.style.display = 'block';
  } else if (password !== passwordRepeat) {
    passwordRepeatInput.classList.add('inputError');
    passwordRepeatError.textContent = '비밀번호가 일치하지 않습니다.';
    passwordRepeatError.style.display = 'block';
  } else {
    passwordRepeatInput.classList.remove('inputError');
    passwordRepeatError.textContent = '';
    passwordRepeatError.style.display = 'none';
  }

  buttonOnOff();
});

//alert 띄우기
signupButton.addEventListener('click', function(event) {
  event.preventDefault();  

  buttonOnOff();
  if (signupButton.disabled) {
    return;
  }

  const email = emailInput.value;
  let emailCheck = false; 

  for (let i = 0; i < USER_DATA.length; i++) {
    let user = USER_DATA[i];
    if (user.email === email) {
      emailCheck = true;
      break;  
    }
  }

  if (emailCheck) {
    showCustomAlert('사용 중인 이메일입니다.');
  } else {
    window.location.href = '/login.html';
  }
});

//alert
function showCustomAlert(message) {
  alertMessage.textContent = message; 
  customAlert.style.display = "flex"; 

  alertButton.onclick = function() {
    customAlert.style.display = "none";
  }
}

emailInput.addEventListener('input', buttonOnOff);
passwordInput.addEventListener('input', buttonOnOff);
passwordRepeatInput.addEventListener('input', buttonOnOff);
usernameInput.addEventListener('input', buttonOnOff);
