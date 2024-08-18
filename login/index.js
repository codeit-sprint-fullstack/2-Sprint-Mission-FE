// element setting
const elInputEmail = document.querySelector('#email');
const elInputPassword = document.querySelector('#password');
const elLoginBtn = document.querySelector('#loginButton');


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

// 버튼 활성화
function buttonActivation() {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  let formValid = true;

  if(emailValid && passwordValid) {
    elLoginBtn.disabled = !formValid;
  } else {
    elLoginBtn.disabled = formValid;
  }

}

//로그인버튼 클릭시 items페이지로 이동
function goUrl() {
  location.href = '/items';
}

const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// USER_DATA 확인 후 'alert' 및 페이지이동 기능
function checkUserData() {
  const checkEmail = USER_DATA.some(user => user.email === elInputEmail.value);
  const checkPassword = USER_DATA.some(user => user.password === elInputPassword.value);

  if (!checkEmail) {
    alert('이메일 혹은 비밀번호가 잘못 되었습니다.');
  } else if (checkEmail && !checkPassword) {
    alert('비밀번호가 일치하지 않습니다.');
  } else {
    elLoginBtn.addEventListener('click',goUrl);
  }
}

/* event handling */ 
elInputEmail.addEventListener('focusout',validateEmail); // 이메일 입력상태 호출
elInputPassword.addEventListener('focusout',validatePassword); // 비밀번호 입력상태 호출
elInputPassword.addEventListener('focusout',buttonActivation);
elLoginBtn.addEventListener('click',checkUserData); // USER_DATA 확인 후 'alert' 및 페이지 이동기능
