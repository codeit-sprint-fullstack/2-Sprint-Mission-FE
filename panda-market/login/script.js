const buttonLogInSignUp = document.querySelector(`button#button-login`);

let allCfmed=[false, false];

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
		buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]);
	}
});

pwd.addEventListener("input", function (e) {
	if (!pwd.value) {
		allCfmed[1]=false;
		buttonLogInSignUp.disabled=true;
	}
	else if (pwd.value.length < 8) {
		allCfmed[1]=false;
		buttonLogInSignUp.disabled=true;
	}
	else {
		allCfmed[1]=true;
		buttonLogInSignUp.disabled=!(allCfmed[0]&&allCfmed[1]);
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
		popupText.innerHTML = `로그인 되었습니다.`;
		popupCon.classList.remove("none");
		setTimeout(function () {
			window.location.href = "/items";
		}, 512);
	}
});
