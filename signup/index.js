// element setting
const elInputEmail = document.querySelector('#email');
const elInputPassword = document.querySelector('#password');
const elInputConfirmPassword = document.querySelector('#confirmPassword');
const elSignupBtn = document.querySelector('#signupButton');

// 이메일 입력상태 함수
function validateEmail() {
  const blankEmailError = document.querySelector('.blankEmailError');
  const emailError = document.querySelector('.emailError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (elInputEmail.value.length === 0) {
    blankEmailError.style.display = 'block';
    elInputEmail.classList.add('borderRed');
    emailError.style.display = 'none';
    return false;
  } else if (elInputEmail.value.length > 0 && !emailPattern.test(elInputEmail.value)) {
    blankEmailError.style.display = 'none';
    elInputEmail.classList.add('borderRed');
    emailError.style.display = 'block';
    return false;
  } else {
    blankEmailError.style.display = 'none';
    elInputEmail.classList.remove('borderRed');
    emailError.style.display = 'none';
    return true;
  }
}

// 비밀번호 입력상태 함수
function validatePassword() {
  const blankPasswordError = document.querySelector('.blankPasswordError');
  const passwordError = document.querySelector('.passwordError');

  if (elInputPassword.value.length === 0) {
    blankPasswordError.style.display = 'block';
    elInputPassword.classList.add('borderRed');
    passwordError.style.display = 'none';
    return false;
  } else if (elInputPassword.value.length < 8) {
    blankPasswordError.style.display = 'none';
    elInputPassword.classList.add('borderRed');
    passwordError.style.display = 'block';
    return false;
  } else {
    blankPasswordError.style.display = 'none';
    elInputPassword.classList.remove('borderRed');
    passwordError.style.display = 'none';
    return true;
  }
}

// 비밀번호 확인 입력상태 함수
function validateConfirmPassword() {
  const confirmPasswordError = document.querySelector('.confirmPasswordError');
  const rewritePasswordError = document.querySelector('.rewritePasswordError');
  
  if (elInputConfirmPassword.value.length === 0) {
    rewritePasswordError.style.display = 'block';
    elInputConfirmPassword.classList.add('borderRed');
    confirmPasswordError.style.display = 'none';
    return false
  } else if (elInputPassword.value !== elInputConfirmPassword.value) {
    rewritePasswordError.style.display = 'none';
    elInputConfirmPassword.classList.add('borderRed');
    confirmPasswordError.style.display = 'block';
    return false;
  } else {
    confirmPasswordError.style.display = 'none';
    elInputConfirmPassword.classList.remove('borderRed');
    rewritePasswordError.style.display = 'none';
    return true;
  }
}

// 버튼 활성화
function buttonActivation() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  const confirmPasswordValid = validateConfirmPassword();
  let formValid = true;

  if(emailValid && passwordValid && confirmPasswordValid) {
    elSignupBtn.disabled = !formValid;
  } else {
    elSignupBtn.disabled = formValid;
  }
}

// 회원가입버튼 클릭시 login페이지로 이동
function goUrl() {
  location.href = '../login';
}

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// USER_DATA 이메일 유무 체크 후 기능
function checkUserData() {
  const checkEmail = USER_DATA.some(user => user.email === elInputEmail.value);

  if (checkEmail) {
    alert('사용 중인 이메일입니다');
  } else {
    elSignupBtn.addEventListener('click',goUrl);
  }
}

/* event handling */ 
elInputEmail.addEventListener('focusout',validateEmail);// 이메일 입력상태 호출
elInputPassword.addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출
elInputConfirmPassword.addEventListener('focusout',validateConfirmPassword);// 비밀번호확인 입력상태 호출
elInputConfirmPassword.addEventListener('focusout',buttonActivation); // 버튼 활성화
elSignupBtn.addEventListener('click',checkUserData); // USER_DATA 이메일 유무 체크
