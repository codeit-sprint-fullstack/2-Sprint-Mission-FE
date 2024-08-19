const nickname = document.querySelector(`input#nickname`);
const nicknameError = document.querySelector(`.nickname-error`);
const nicknameRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]*$/;

const pwdCfm = document.querySelector(`input#password-confirm`);
const pwdCfmError = document.querySelector(`.pwd-cfm-error`);

const buttonLogInSignUp = document.querySelector(`button#button-signup`);

let allCfmed=[false, false, false, false];

email.addEventListener("input", function (e) {
  if (!email.value) {
    allCfmed[0]=false;
    buttonLogInSignUp.disabled=true;
  }
  else if (!emailRegEx.test(email.value)) {
    allCfmed[0]=false;
    buttonLogInSignUp.disabled=true;
  }
  else {
    allCfmed[0]=true;
    buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
});

nickname.addEventListener("input", function (e) {
  if (!nickname.value) {
    nickname.classList.add("alert");
    nicknameError.innerHTML="닉네임을 입력해주세요.";
    allCfmed[1]=false;
    buttonLogInSignUp.disabled=true;
  }
  else if (!nicknameRegEx.test(nickname.value)) {
    nickname.classList.add("alert");
    nicknameError.innerHTML="잘못된 닉네임 형식입니다.";
    allCfmed[1]=false;
    buttonLogInSignUp.disabled=true;
  }
  else {
    nickname.classList.remove("alert");
    nicknameError.innerHTML="";
    allCfmed[1]=true;
    buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
})

pwd.addEventListener("input", function (e) {
  if (!pwd.value) {
    allCfmed[2]=false;
    buttonLogInSignUp.disabled=true;
  }
  else if (pwd.value.length < 8) {
    allCfmed[2]=false;
    buttonLogInSignUp.disabled=true;
  }
  else {
    allCfmed[2]=true;
    buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
});

pwdCfm.addEventListener("input", function (e) {
  if (!pwdCfm.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML="위의 비밀번호를 다시 한번 더 입력해주세요.";
    allCfmed[3]=false;
    buttonLogInSignUp.disabled=true;
  }
  else if (pwdCfm.value !== pwd.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML="비밀번호가 다릅니다. 다시 확인해주세요.";
    allCfmed[3]=false;
    buttonLogInSignUp.disabled=true;
  }
  else {
    pwdCfm.classList.remove("alert");
    pwdCfmError.innerHTML="";
    allCfmed[3]=true;
    buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
})