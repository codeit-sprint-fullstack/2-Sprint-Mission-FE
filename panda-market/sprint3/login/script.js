const buttonLogInSignUp = document.querySelector(`#button-login`);

const validationState = {
  email: false,
  password: false
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
		buttonLogInSignUp.disabled = !(validationState.email && validationState.password);
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
		buttonLogInSignUp.disabled = !(validationState.email && validationState.password);
	}
});

buttonLogInSignUp.addEventListener("click", function (e) {
	if (!USER_DATA[email.value]) {
		popupText.innerHTML = `이메일 ${email.value} 은 가입되어 있지 않습니다.`;
		popupCon.classList.remove("none");
		popupOK.focus();
	}
	else if (USER_DATA[email.value].password !== pwd.value) {
		popupText.innerHTML = `비밀번호가 일치하지 않습니다.`;
		popupCon.classList.remove("none");
		popupOK.focus();
	}
	else {
		window.location.href = "/items";
	}
});
