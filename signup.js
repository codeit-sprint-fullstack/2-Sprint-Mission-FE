const pw_toggle = document.getElementById("watch-toggle");
const inputPassword = document.getElementById("password");
const check_toggle = document.getElementById("watch-toggle-check");
const inputCompare = document.getElementById("password-check");
const inputId = document.querySelector("#username");
const guideId = document.querySelector("#username-guide");
const guidePassword = document.querySelector("#password-guide");
const guideCompare = document.querySelector("#password-check-guide");
const signupButton = document.querySelector("#sign-up-button");
const inputNickname = document.querySelector("#nickname");
const userData = [{
    id: "gggm0117@naver.com",
    nickname: "햇살",
    password: "1q2w3e4r!",
},];
function inspectId() {
  let error;
  try {
    if (inputId.value === "") {
      error = new TypeError("이메일을 입력해주세요.");
      guideId.value = error.message;
      throw error;
    } else if (!inputId.checkValidity()) {
      error = new TypeError("잘못된 이메일 형식입니다.");
      guideId.value = error.message;
      throw error;
    } else {
      guideId.value = "";
      inputId.classList.remove("fail");
      inputId.classList.add("pass");
      
    }
  } catch {
    inputId.classList.remove("pass");
    inputId.classList.add("fail");
  } finally {
    inspectButton()
  }
}

function inspectPassword() {
  let error;
  try {
    if (inputPassword.value == "") {
      error = new TypeError("비밀번호를 입력해주세요.");
      throw error;
    } else if (inputPassword.value.length < 8) {
      error = new TypeError("비밀번호를 8자 이상 입력해주세요.");
      throw error;
    } else {
      guidePassword.value = "";
      inputPassword.classList.remove("fail");
      inputPassword.classList.add("pass");
    }
  } catch {
    inputPassword.classList.remove("pass");
    inputPassword.classList.add("fail");
    guidePassword.value = error.message;
  } finally {
    inspectButton()
  }
}
function inspectCompare() {
  let error;
  try {
    if (inputCompare.value == "") {
      error = new TypeError("비밀번호를 입력해주세요.");
      throw error;
    } else if (inputCompare.value !== inputPassword.value) {
      error = new TypeError("비밀번호가 일치하지 않습니다.");
      throw error;
    } else {
      guideCompare.value = "";
      inputCompare.classList.remove("fail");
      inputCompare.classList.add("pass");
    }
  } catch {
    guideCompare.value = error.message;
    inputCompare.classList.remove("pass");
    inputCompare.classList.add("fail");
  } finally {
    inspectButton()
  }
}
function inspectButton() {
  if (
    inputId.classList.contains("pass") &&
    inputPassword.classList.contains("pass") &&
    inputCompare.classList.contains("pass")
  ) {
    signupButton.classList.remove('deactivate')
  }else{
    signupButton.classList.add('deactivate')
  }
}

function trySignup(){
    preventDefault();
    const signupData = {
        id: inputId.value,
        nickname: inputNickname.value,
        password: inputPassword.value,
    };
    const matchData = userData.find((user)=> user.id === inputId.value);
    if(matchData){
        alert("사용 중인 이메일입니다.");
    }else {
        userData.push(signupData);
        alert("회원가입 성공");
        window.location.href = "/items.html";
    }
}

pw_toggle.addEventListener("click", function () {
  if (inputPassword.getAttribute("type") === "password") {
    inputPassword.setAttribute("type", "text");
    pw_toggle.setAttribute("src", "image/btn_visibility_on_24px.svg");
  } else {
    inputPassword.setAttribute("type", "password");
    pw_toggle.setAttribute("src", "image/btn_visibility_off_24px.svg");
  }
});
check_toggle.addEventListener("click", function () {
  if (inputCompare.getAttribute("type") === "password") {
    inputCompare.setAttribute("type", "text");
    check_toggle.setAttribute("src", "image/btn_visibility_on_24px.svg");
  } else {
    inputCompare.setAttribute("type", "password");
    check_toggle.setAttribute("src", "image/btn_visibility_off_24px.svg");
  }
});
inputId.addEventListener("focusout", inspectId);
inputPassword.addEventListener("focusout", inspectPassword);
inputCompare.addEventListener("focusout", inspectCompare);
signupButton.addEventListener('click',trySignup);