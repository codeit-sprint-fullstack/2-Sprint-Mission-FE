import validate from "./validation.js";
const inputId = document.querySelector('#username');
const guideId = document.querySelector('#id-guide');
const inputPw = document.querySelector('#password');
const guidePw = document.querySelector('#pw-guide');
const loginButton = document.querySelector('#login-button');
const togglePw = document.querySelector('#watch-toggle');
const modal = document.querySelector("#modal");
const modalMessage = document.querySelector("#modal-message");
const modalButton = document.querySelector("#modal-button");
const userData = [
    { id: 'codeit1@codeit.com', pw: "codeit101!" },
    { id: 'codeit2@codeit.com', pw: "codeit202!" },
    { id: 'codeit3@codeit.com', pw: "codeit303!" },
    { id: 'codeit4@codeit.com', pw: "codeit404!" },
    { id: 'codeit5@codeit.com', pw: "codeit505!" },
    { id: 'codeit6@codeit.com', pw: "codeit606!" },
];
const inputData={
    id: inputId,
    pw: inputPw,
    btn: loginButton,
    togglePw,
    modal,
    modalMessage,
};

inputId.addEventListener("focusout", ()=>validate.id(inputData,guideId));
inputPw.addEventListener("focusout",()=>validate.pw(inputData,guidePw));
loginButton.addEventListener("click", ()=>validate.login(userData, inputData));
togglePw.addEventListener("click",()=> validate.togglePw(inputData));
modalButton.addEventListener("click",()=>validate.closeModal(inputData));

