import validate from "./validation.js";
const inputId = document.querySelector("#username");
const guideId = document.querySelector("#username-guide");
const inputPw = document.querySelector("#password");
const guidePw = document.querySelector("#password-guide");
const inputConfirmPw = document.querySelector("#password-check");
const guideConfirmPw = document.querySelector("#password-check-guide");
const signUpButton = document.querySelector("#sign-up-button");
const togglePw = document.querySelector("#watch-toggle");
const toggleConfirmPw = document.querySelector("#watch-toggle-check");
const modal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modal-message");
const modalButton = document.querySelector("#modal-button");
const inputData = {
  id: inputId,
  pw: inputPw,
  confirmPw: inputConfirmPw,
  btn: signUpButton,
  togglePw,
  toggleConfirmPw,
  modal,
  modalMessage,
};
inputId.addEventListener("focusout", () => validate.id(inputData, guideId));
inputPw.addEventListener("focusout", () => validate.pw(inputData, guidePw));
inputConfirmPw.addEventListener("focusout", () =>
  validate.confirmPw(inputData, guideConfirmPw)
);
signUpButton.addEventListener("click", () =>
  validate.signUp(validate.userData, inputData)
);
togglePw.addEventListener("click", () => validate.togglePw(inputData));
toggleConfirmPw.addEventListener("click", () =>
  validate.toggleConfirmPw(inputData)
);
modalButton.addEventListener("click", () => validate.closeModal(inputData));
