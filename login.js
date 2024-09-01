import validate from "./validation.js";
const inputId = document.querySelector("#username");
const guideId = document.querySelector("#id-guide");
const inputPw = document.querySelector("#password");
const guidePw = document.querySelector("#pw-guide");
const loginButton = document.querySelector("#login-button");
const togglePw = document.querySelector("#watch-toggle");
const modal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modal-message");
const modalButton = document.querySelector("#modal-button");

const inputData = {
  id: inputId,
  pw: inputPw,
  btn: loginButton,
  togglePw,
  modal,
  modalMessage,
};

inputId.addEventListener("focusout", () => validate.id(inputData, guideId));
inputPw.addEventListener("focusout", () => validate.pw(inputData, guidePw));
loginButton.addEventListener("click", () =>
  validate.login(validate.userData, inputData)
);
togglePw.addEventListener("click", () => validate.togglePw(inputData));
modalButton.addEventListener("click", () => validate.closeModal(inputData));
