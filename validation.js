function id(input, guide) {
  if (input.id.value === "") {
    guide.value = "이메일을 입력해주세요.";
    input.id.classList.remove("pass");
    input.id.classList.add("fail");
  } else if (!input.id.checkValidity()) {
    guide.value = "이메일을 입력해주세요.";
    input.id.classList.remove("pass");
    input.id.classList.add("fail");
  } else {
    guide.value = "";
    input.id.classList.remove("fail");
    input.id.classList.add("pass");
  }
  this.readyBtn(input);
}
function pw(input, guide) {
  if (input.pw.value === "") {
    guide.value = "비밀번호를 입력해주세요.";
    input.pw.classList.remove("pass");
    input.pw.classList.add("fail");
  } else if (input.pw.value.length < 8) {
    guide.value = "비밀번호 8자 이상 입력해주세요.";
    input.pw.classList.remove("pass");
    input.pw.classList.add("fail");
  } else {
    guide.value = "";
    input.pw.classList.remove("fail");
    input.pw.classList.add("pass");
  }
  this.readyBtn(input);
}

function confirmPw(input, guide) {
  if (input.confirmPw.value === "") {
    guide.value = "비밀번호를 입력해주세요.";
    input.confirmPw.classList.remove("pass");
    input.confirmPw.classList.add("fail");
  } else if (input.confirmPw.value !== input.pw.value) {
    guide.value = "비밀번호가 일치하지 않습니다.";
    input.confirmPw.classList.remove("pass");
    input.confirmPw.classList.add("fail");
  } else {
    guide.value = "";
    input.confirmPw.classList.remove("fail");
    input.confirmPw.classList.add("pass");
  }
  this.readyBtn(input);
}

function login(userData, inputData) {
  const matchData = userData.find(user => user.id === inputData.id.value);
  if (matchData) {
    if (matchData.pw === inputData.pw.value) {
      window.location.href = "/items.html";
    } else {
      inputData.modalMessage.textContent='비밀번호가 일치하지 않습니다.';
      inputData.modal.classList.remove("hidden");
    }
  } else {
    inputData.modalMessage.textContent='등록된 정보가 없습니다.';
    inputData.modal.classList.remove("hidden");
  }
}
function signUp(userData, inputData) {
  const signUpData = {
    id: inputData.id,
    pw: inputData.pw,
  };
  const matchData = userData.find(user => user.id === inputData.id.value);
  if (matchData) {
    inputData.modalMessage.textContent="사용 중인 이메일입니다.";
    inputData.modal.classList.remove("hidden");
  } else {
    userData.push(signUpData);
    window.location.href = "/login.html";
  }
}
function readyBtn(input) {
  const isIdValid = input.id.classList.contains("pass");
  const isPwValid = input.pw.classList.contains("pass");
  const isConfirmPwValid = input.confirmPw
    ? input.confirmPw.classList.contains("pass")
    : true;
  if (isIdValid && isPwValid && isConfirmPwValid) {
    input.btn.classList.remove("deactivate");
    input.btn.classList.add("activate");
  } else {
    input.btn.classList.remove("activate");
    input.btn.classList.add("deactivate");
  }
}
function togglePw(input) {
  if (input.pw.getAttribute("type") === "password") {
    input.pw.setAttribute("type", "text");
    input.togglePw.setAttribute("src", "image/btn_visibility_on_24px.svg");
  } else {
    input.pw.setAttribute("type", "password");
    input.togglePw.setAttribute("src", "image/btn_visibility_off_24px.svg");
  }
}
function toggleConfirmPw(input) {
  if (input.confirmPw.getAttribute("type") === "password") {
    input.confirmPw.setAttribute("type", "text");
    input.toggleConfirmPw.setAttribute("src", "image/btn_visibility_on_24px.svg");
  } else {
    input.confirmPw.setAttribute("type", "password");
    input.toggleConfirmPw.setAttribute("src", "image/btn_visibility_off_24px.svg");
  }
}

function closeModal(inputData){
  inputData.modal.classList.add("hidden");
}
const validate = {
  id,
  pw,
  confirmPw,
  login,
  signUp,
  readyBtn,
  togglePw,
  toggleConfirmPw,
  closeModal,
};
export default validate;
