const email = document.querySelector(`input#email`);
const emailError = document.querySelector(`.email-error`);
const emailRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-\_\.]+\.[\w]{2,3}$/;

const pwd = document.querySelector(`input#password`);
const pwdError = document.querySelector(`.pwd-error`);

email.addEventListener("input", function (e) {
	if (!email.value) {
		email.classList.add("alert");
		emailError.innerHTML="이메일을 입력해주세요.";
	}
	else if (!emailRegEx.test(email.value)) {
		email.classList.add("alert");
		emailError.innerHTML="잘못된 이메일 형식입니다.";
	}
	else {
		email.classList.remove("alert");
		emailError.innerHTML="";
	}
});

pwd.addEventListener("input", function (e) {
	if (!pwd.value) {
		pwd.classList.add("alert");
		pwdError.innerHTML="비밀번호를 입력해주세요.";
	}
	else if (pwd.value.length < 8) {
		pwd.classList.add("alert");
		pwdError.innerHTML="비밀번호를 8자 이상 입력해주세요.";
	}
	else {
		pwd.classList.remove("alert");
		pwdError.innerHTML="";
	}
});

