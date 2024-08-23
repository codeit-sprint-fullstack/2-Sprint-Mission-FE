// 요소들을 가져오기
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('#password');
const repasswordInput = document.querySelector('#repassword');
const nicknameInput = document.querySelector('#nickname');

const loginButton = document.querySelector('#login');
const signButton = document.querySelector('#singup');

const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const repasswordError = document.querySelector('#repasswordError');

const hideEye = document.querySelector('#eye-not');
const showEye = document.querySelector('#eye-view');
const hideEye2 = document.querySelector('#eye-not2');
const showEye2 = document.querySelector('#eye-view2');

// 로그인/회원가입 유저 데이터
const USER_DATA = [
  { email: 'magry78@gmail.com', password: "galaxy5540*" },
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 이메일 유효성 검사
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
function validateEmail(email) {
  if (email === "") {
      emailInput.style.border = "1px solid #F74747";
      emailInput.classList.add('error');
      emailError.innerHTML = "이메일을 입력해주세요.";
  } else if (!emailPattern.test(email)) {
      emailInput.style.border = "1px solid #F74747";
      emailInput.classList.add('error');
      emailError.innerHTML = "잘못된 이메일 형식입니다.";
  } else {
      emailInput.style.border = "";
      emailInput.classList.remove('error');
      emailError.innerHTML = "";
  }
}

// 비밀번호 유효성 검사
function validatePassword(password) {
  if (password === "") {
      passwordInput.style.border = "1px solid #F74747";
      passwordInput.classList.add('error');
      passwordError.innerHTML = "비밀번호를 입력해주세요.";
  } else if (password.length < 8) {
      passwordInput.style.border = "1px solid #F74747";
      passwordInput.classList.add('error');
      passwordError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
  } else {
      passwordInput.style.border = "";
      passwordInput.classList.remove('error');
      passwordError.innerHTML = "";
  }
}

// 비밀번호 확인 유효성 검사
function validateRepassword(password1, password2) {
  if (password1 !== password2) {
    repasswordInput.style.border = "1px solid #F74747";
    repasswordInput.classList.add('error');
    repasswordError.innerHTML = "비밀번호가 일치하지 않습니다.";
  }else {
    repasswordInput.style.border = "";
    repasswordInput.classList.remove('error');
    repasswordError.innerHTML = "";
  }
}

// 닉네임 입력 여부 확인
function validateNickname(nickname) {
  if(nickname !== "") {
    nicknameInput.style.outline = "1px solid var(--blue-color)";
  } else{
    nicknameInput.style.outline = "none";
  }
}

// 비밀번호 문자 표시/숨기기 설정
hideEye.addEventListener('click', () => showPassword(passwordInput, showEye, hideEye));
showEye.addEventListener('click', () => hidePassword(passwordInput, showEye, hideEye));

// 비밀번호 표시 함수
function showPassword(pInput, show, hide) {
  if (pInput.type === 'password') {
    pInput.type = 'text';
    show.classList.remove('hide');
    hide.classList.add('hide');
  }
}

// 비밀번호 숨기기 함수
function hidePassword(pInput, show, hide) {
  if (pInput.type === 'text') {
    pInput.type = 'password';
    hide.classList.remove('hide');
    show.classList.add('hide');
  }
}

/* strong password validation !!
function strongPassword (str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
*/
