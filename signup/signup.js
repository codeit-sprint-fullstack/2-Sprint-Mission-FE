const inputName = document.querySelector('#nickname');
const inputPasswordRepeat = document.querySelector('#password-repeat');
const signupBtn = document.querySelector('.signup-btn');
const noneName = document.querySelector('.none-nickname-value');
const nonePasswordRepeat = document.querySelector(
  '.none-password-repeat-value'
);
const missMatchPassword = document.querySelector('.miss-match-password');
const hidePasswordRepeatIcon = document.querySelector('.password-repeat-hide');
const showPasswordRepeatIcon = document.querySelector('.password-repeat-show');

// 닉네임 유효성 검사 함수
function noneNameChecker(name) {
  if (name !== '') {
    noneName.classList.add('hide');
    inputName.classList.remove('error');
  } else {
    noneName.classList.remove('hide');
    inputName.classList.add('error');
  }
}

// 비밀번호 재확인 유효성 검사 함수
function isPasswordRepeatValid(password, rePassword) {
  if (rePassword !== '') {
    nonePasswordRepeat.classList.add('hide');
    inputPasswordRepeat.classList.remove('error');
    missMatchPassword.classList.add('hide');

    if (password !== rePassword) {
      missMatchPassword.classList.remove('hide');
      inputPasswordRepeat.classList.add('error');
      nonePasswordRepeat.classList.add('hide');
    }
  } else {
    nonePasswordRepeat.classList.remove('hide');
    inputPasswordRepeat.classList.add('error');
    missMatchPassword.classList.add('hide');
  }
}

// 재확인 비밀번호 표시 함수
function showPasswordRepeat(password) {
  if (password.type === 'password') {
    password.type = 'text';
    showPasswordRepeatIcon.classList.remove('hide');
    hidePasswordRepeatIcon.classList.add('hide');
  }
}

// 재확인 비밀번호 숨기기 함수
function hidePasswordRepeat(password) {
  if (password.type === 'text') {
    password.type = 'password';
    hidePasswordRepeatIcon.classList.remove('hide');
    showPasswordRepeatIcon.classList.add('hide');
  }
}

// 회원가입 버튼 활성화 함수
function signupBtnActivation(email, password, name, rePassword) {
  if (
    email &&
    password &&
    name &&
    rePassword &&
    emailFormat.test(email) &&
    password.length >= 8 &&
    password === rePassword
  ) {
    signupBtn.classList.add('button-abled');
    signupBtn.disabled = false;
    signupBtn.style.cursor = 'pointer';
  } else {
    signupBtn.classList.remove('button-abled');
    signupBtn.disabled = true;
  }
}

// 중복 이메일 확인 함수
function isSignupValid(email) {
  const emailMatch = USER_DATA.find((value) => value.email === email);

  if (emailMatch) {
    return errorModal.classList.remove('hide');
  }

  if (email !== '') {
    alert('회원가입 하신 것을 축하드립니다!');
    location.href = '../login';
  }
}

// 회원가입 버튼 활성화 이벤트 생성
inputEmail.addEventListener('keyup', () =>
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputPassword.addEventListener('keyup', () =>
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputName.addEventListener('keyup', () =>
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);
inputPasswordRepeat.addEventListener('keyup', () =>
  signupBtnActivation(
    inputEmail.value,
    inputPassword.value,
    inputName.value,
    inputPasswordRepeat.value
  )
);

// 닉네임, 비밀번호 재확인 유효성 검사 이벤트 생성
inputName.addEventListener('focusout', () => noneNameChecker(inputName.value));
inputPasswordRepeat.addEventListener('focusout', () =>
  isPasswordRepeatValid(inputPassword.value, inputPasswordRepeat.value)
);

// 중복 이메일 확인 이벤트 생성
signupBtn.addEventListener('click', () => isSignupValid(inputEmail.value));

// 재확인 비밀번호 표시/숨기기 이벤트 생성
hidePasswordRepeatIcon.addEventListener('click', () =>
  showPasswordRepeat(inputPasswordRepeat)
);
showPasswordRepeatIcon.addEventListener('click', () =>
  hidePasswordRepeat(inputPasswordRepeat)
);
