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

