const loginBtn = document.querySelector('.login-btn');

// 로그인 버튼 활성화 함수
function loginBtnActivation(email, password) {
  const emailValid = email && emailFormat.test(email);
  const passwordValid = password && password.length >= 8;

  if (emailValid && passwordValid) {
    loginBtn.classList.add('button-abled');
    loginBtn.disabled = false;
    loginBtn.style.cursor = 'pointer';
  } else {
    loginBtn.classList.remove('button-abled');
    loginBtn.disabled = true;
  }
}

// 유저 데이터 확인 함수
function isLoginValid(email, password) {
  const emailMatch = USER_DATA.find((value) => value.email === email);
  const passwordMatch = USER_DATA.find((value) => value.password === password);

  if (!emailMatch || !passwordMatch) {
    return errorModal.classList.remove('hide');
  }

  alert('로그인에 성공하였습니다!');
  location.href = '../items';
}

// 로그인 버튼 활성화 이벤트 생성
inputEmail.addEventListener('keyup', () =>
  loginBtnActivation(inputEmail.value, inputPassword.value)
);
inputPassword.addEventListener('keyup', () =>
  loginBtnActivation(inputEmail.value, inputPassword.value)
);

// 유저 데이터 확인 이벤트 생성
loginBtn.addEventListener('click', () =>
  isLoginValid(inputEmail.value, inputPassword.value)
);
