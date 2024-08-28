const USER_DATA = [
  { email: 'codeit1@codeit.com', password: "codeit101!" },
  { email: 'codeit2@codeit.com', password: "codeit202!" },
  { email: 'codeit3@codeit.com', password: "codeit303!" },
  { email: 'codeit4@codeit.com', password: "codeit404!" },
  { email: 'codeit5@codeit.com', password: "codeit505!" },
  { email: 'codeit6@codeit.com', password: "codeit606!" },
];

// 에러 메세지 표시
function showErrorMessage(elInput, errorId) {
  const visibleErrorMessage = document.querySelector(errorId);
  visibleErrorMessage.style.display = 'block';
  elInput.classList.add('borderRed');
}

// 에러 메세지 지우기
function removeErrorMessage(elInput, errorId) {
  const visibleErrorMessage = document.querySelector(errorId);
  visibleErrorMessage.style.display = 'none';
  elInput.classList.remove('borderRed');
}

// togglePassword 클릭시 타입 변환
function changeFiledType() {
  const passwordFiled = this.previousElementSibling;
  if(passwordFiled.type === 'password') {
    passwordFiled.type = 'text';
    this.classList.add('togglePasswordHide');
  } else {
    passwordFiled.type = 'password';
    this.classList.remove('togglePasswordHide');
  }
}
export { USER_DATA, showErrorMessage, removeErrorMessage, changeFiledType };