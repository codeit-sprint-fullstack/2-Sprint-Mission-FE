const nickname = document.querySelector(`#nickname`);
const nicknameError = document.querySelector(`.nickname-error`);
const nicknameRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]*$/;

const pwdCfm = document.querySelector(`#password-confirm`);
const pwdCfmError = document.querySelector(`.pwd-cfm-error`);

const buttonLogInSignUp = document.querySelector(`#button-signup`);

const validationState = {
  email: false,
  nickname: false,
  password: false,
  passwordConfirm: false
};

email.addEventListener("focusout", function (e) {
  if (!email.value) {
    validationState.email = false;
    buttonLogInSignUp.disabled = true;
  }
  else if (!emailRegEx.test(email.value)) {
    validationState.email = false;
    buttonLogInSignUp.disabled = true;
  }
  else {
    validationState.email = true;
    buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
  }
});

nickname.addEventListener("focusout", function (e) {
  if (!nickname.value) {
    nickname.classList.add("alert");
    nicknameError.innerHTML = "닉네임을 입력해주세요.";
    validationState.nickname = false;
    buttonLogInSignUp.disabled = true;
  }
  else if (!nicknameRegEx.test(nickname.value)) {
    nickname.classList.add("alert");
    nicknameError.innerHTML = "잘못된 닉네임 형식입니다.";
    validationState.nickname = false;
    buttonLogInSignUp.disabled = true;
  }
  else {
    nickname.classList.remove("alert");
    nicknameError.innerHTML = "";
    validationState.nickname = true;
    buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
  }
});

pwd.addEventListener("focusout", function (e) {
  if (!pwd.value) {
    validationState.password = false;
    buttonLogInSignUp.disabled = true;
  }
  else if (pwd.value.length < 8) {
    validationState.password = false;
    buttonLogInSignUp.disabled = true;
  }
  else {
    validationState.password = true;
    buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
  }
});

pwdCfm.addEventListener("focusout", function (e) {
  if (!pwdCfm.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML = "위의 비밀번호를 다시 한번 더 입력해주세요.";
    validationState.passwordConfirm = false;
    buttonLogInSignUp.disabled = true;
  }
  else if (pwdCfm.value !== pwd.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML = "비밀번호가 일치하지 않습니다.";
    validationState.passwordConfirm = false;
    buttonLogInSignUp.disabled = true;
  }
  else {
    pwdCfm.classList.remove("alert");
    pwdCfmError.innerHTML = "";
    validationState.passwordConfirm = true;
    buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
  }
});

const visPwdCfm = pwdCfm.nextElementSibling;
visPwdCfm.addEventListener("click", handleVisPwd);

buttonLogInSignUp.addEventListener("click", function (e) {
  if (USER_DATA[email.value]) {
    popupText.innerHTML = `이메일 ${email.value} 은 이미 가입되어 있습니다.`;
    popupCon.classList.remove("none");
    popupOK.focus();
  }
  else {
    popupText.innerHTML = `회원가입 되었습니다.`;
    popupCon.classList.remove("none");
    setTimeout(function () {
      window.location.href = "/login";
    }, 512);
  }
});


