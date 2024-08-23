/*
 로그인 및 회원가입 페이지의 이메일, 비밀번호, 비밀번호 확인 input에 필요한 유효성 검증 함수를 만들고 적용해 주세요.
 이메일 input에서 focus out 할 때, 값이 없을 경우 input에 빨강색 테두리와 아래에 “이메일을 입력해주세요.” 빨강색 에러 메세지를 보입니다.
 이메일 input에서 focus out 할 때, 이메일 형식에 맞지 않는 경우 input에 빨강색 테두리와 아래에 “잘못된 이메일 형식입니다” 빨강색 에러 메세지를 보입니다.
 비밀번호 input에서 focus out 할 때, 값이 없을 경우 아래에 “비밀번호를 입력해주세요.” 에러 메세지를 보입니다
 비밀번호 input에서 focus out 할 때, 값이 8자 미만일 경우 아래에 “비밀번호를 8자 이상 입력해주세요.” 에러 메세지를 보입니다.

 input 에 빈 값이 있거나 에러 메세지가 있으면 ‘로그인’ 버튼은 비활성화 됩니다.
 Input 에 유효한 값을 입력하면 ‘로그인' 버튼이 활성화 됩니다.
 
 활성화된 ‘로그인’ 버튼을 누르면 “/items” 로 이동합니다
  */
// 요소들을 가져오기
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const loginButton = document.querySelector('#login');
const loginForm = document.querySelector('login');

const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');

const hideEye = document.querySelector('.toggle-password');
const showEye = document.querySelector('.toggle-password-2');

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

// 비밀번호 표시/숨기기 설정
hideEye.addEventListener('click', showPassword);
showEye.addEventListener('click', hidePassword);
// 비밀번호 표시 함수
function showPassword() {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    showEye.classList.remove('hide');
    hideEye.classList.add('hide');
  }
}

// 비밀번호 숨기기 함수
function hidePassword() {
  if (passwordInput.type === 'text') {
    passwordInput.type = 'password';
    hideEye.classList.remove('hide');
    showEye.classList.add('hide');
  }
}

/*
// 폼 제출 이벤트 처리
document.querySelector('login').addEventListener('submit', function(event) {
  event.preventDefault(); // 기본 폼 제출 동작 막기

  // 로그인 버튼이 활성화된 상태에서만 /items로 이동
  if (!loginButton.disabled) {
      window.location.href = "../items/index.html";
  }
});
*/
/*
// 비밀번호 일치 여부를 확인하는 함수
function isMatch (password1, password2) {
  return password1 === password2;
}
*/

/* password validation !!
function strongPassword (str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(str);
}
*/
