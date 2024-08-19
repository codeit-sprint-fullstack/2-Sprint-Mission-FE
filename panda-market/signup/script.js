const email = document.querySelector(`input#email`);
const emailError = document.querySelector(`.email-error`);
const emailRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]+\.[\w]{2,3}$/;
const nickname = document.querySelector(`input#nickname`);
const nicknameError = document.querySelector(`.nickname-error`);
const nicknameRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]*$/;
const pwd = document.querySelector(`input#password`);
const pwdError = document.querySelector(`.pwd-error`);
const pwdCfm = document.querySelector(`input#password-confirm`);
const pwdCfmError = document.querySelector(`.pwd-cfm-error`);
const buttonSignUp = document.querySelector(`button#button-signup`);

let allCfmed=[false, false, false, false];

email.addEventListener("input", function (e) {
  if (!email.value) {
    email.classList.add("alert");
    emailError.innerHTML="이메일을 입력해주세요.";
    allCfmed[0]=false;
    buttonSignUp.disabled=true;
  }
  else if (!emailRegEx.test(email.value)) {
    email.classList.add("alert");
    emailError.innerHTML="잘못된 이메일 형식입니다.";
    allCfmed[0]=false;
    buttonSignUp.disabled=true;
  }
  else {
    email.classList.remove("alert");
    emailError.innerHTML="";
    allCfmed[0]=true;
    buttonSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
});

nickname.addEventListener("input", function (e) {
  if (!nickname.value) {
    nickname.classList.add("alert");
    nicknameError.innerHTML="닉네임을 입력해주세요.";
    allCfmed[1]=false;
    buttonSignUp.disabled=true;
  }
  else if (!nicknameRegEx.test(nickname.value)) {
    nickname.classList.add("alert");
    nicknameError.innerHTML="잘못된 닉네임 형식입니다.";
    allCfmed[1]=false;
    buttonSignUp.disabled=true;
  }
  else {
    nickname.classList.remove("alert");
    nicknameError.innerHTML="";
    allCfmed[1]=true;
    buttonSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
})

pwd.addEventListener("input", function (e) {
  if (!pwd.value) {
    pwd.classList.add("alert");
    pwdError.innerHTML="비밀번호를 입력해주세요.";
    allCfmed[2]=false;
    buttonSignUp.disabled=true;
  }
  else if (pwd.value.length < 8) {
    pwd.classList.add("alert");
    pwdError.innerHTML="비밀번호를 8자 이상 입력해주세요.";
    allCfmed[2]=false;
    buttonSignUp.disabled=true;
  }
  else {
    pwd.classList.remove("alert");
    pwdError.innerHTML="";
    allCfmed[2]=true;
    buttonSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
});

pwdCfm.addEventListener("input", function (e) {
  if (!pwdCfm.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML="위의 비밀번호를 다시 한번 더 입력해주세요.";
    allCfmed[3]=false;
    buttonSignUp.disabled=true;
  }
  else if (pwdCfm.value !== pwd.value) {
    pwdCfm.classList.add("alert");
    pwdCfmError.innerHTML="비밀번호가 다릅니다. 다시 확인해주세요.";
    allCfmed[3]=false;
    buttonSignUp.disabled=true;
  }
  else {
    pwdCfm.classList.remove("alert");
    pwdCfmError.innerHTML="";
    allCfmed[3]=true;
    buttonSignUp.disabled=!(allCfmed[0]&&allCfmed[1]&&allCfmed[2]&&allCfmed[3]);
  }
})