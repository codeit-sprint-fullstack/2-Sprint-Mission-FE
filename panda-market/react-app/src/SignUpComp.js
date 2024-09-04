import { useEffect } from "react";
import PopUp from "./PopUp";
import USER_DATA from "./scripts/data";

function SignUpComp() {
	useEffect(() => {
		const email = document.querySelector(`#email`);
		const emailError = document.querySelector(`.email-error`);
		const emailRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;

		const pwd = document.querySelector(`#password`);
		const pwdError = document.querySelector(`.pwd-error`);

		email.addEventListener("input", function (e) {
			if (!email.value) {
				email.classList.add("alert");
				emailError.innerHTML = "이메일을 입력해주세요.";
			}
			else if (!emailRegEx.test(email.value)) {
				email.classList.add("alert");
				emailError.innerHTML = "잘못된 이메일 형식입니다.";
			}
			else {
				email.classList.remove("alert");
				emailError.innerHTML = "";
			}
		});

		pwd.addEventListener("input", function (e) {
			if (!pwd.value) {
				pwd.classList.add("alert");
				pwdError.innerHTML = "비밀번호를 입력해주세요.";
			}
			else if (pwd.value.length < 8) {
				pwd.classList.add("alert");
				pwdError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
			}
			else {
				pwd.classList.remove("alert");
				pwdError.innerHTML = "";
			}
		});

		const handleVisPwd = function (e) {
			if (e.target.previousElementSibling.getAttribute("type") === "password") {
				e.target.setAttribute("src", "/images/btn_visibility_on_24px.svg");
				e.target.previousElementSibling.setAttribute("type", "text");
			}
			else {
				e.target.setAttribute("src", "/images/btn_visibility_off_24px.svg");
				e.target.previousElementSibling.setAttribute("type", "password");
			}
		};
		const visPwd = pwd.nextElementSibling;
		visPwd.addEventListener("click", handleVisPwd);

		///////////////////////////////////
		//  Popup module
		///////////////////////////////////
		const popupCon = document.querySelector(`.popup-container`);
		// const popup = document.querySelector(`.popup`);
		const popupOK = document.querySelector(`.popup-button-ok`);
		const popupText = document.querySelector(`.popup-text`);

		popupOK.addEventListener("click", function (e) {
			popupCon.classList.add("none");
		});

		const nickname = document.querySelector(`#nickname`);
		const nicknameError = document.querySelector(`.nickname-error`);
		const nicknameRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]*$/;

		const pwdCfm = document.querySelector(`#password-confirm`);
		const pwdCfmError = document.querySelector(`.pwd-cfm-error`);

		const buttonLogInSignUp = document.querySelector(`#button-signup`);

		const validationState = {
			email: false,
			nickname: false,
			password: false,
			passwordConfirm: false
		};

		email.addEventListener("input", function (e) {
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
				buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
			}
		});

		nickname.addEventListener("input", function (e) {
			if (!nickname.value) {
				nickname.classList.add("alert");
				nicknameError.innerHTML = "닉네임을 입력해주세요.";
				validationState.nickname = false;
				buttonLogInSignUp.disabled = true;
			}
			else if (!nicknameRegEx.test(nickname.value)) {
				nickname.classList.add("alert");
				nicknameError.innerHTML = "잘못된 닉네임 형식입니다.";
				validationState.nickname = false;
				buttonLogInSignUp.disabled = true;
			}
			else {
				nickname.classList.remove("alert");
				nicknameError.innerHTML = "";
				validationState.nickname = true;
				buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
			}
		});

		pwd.addEventListener("input", function (e) {
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
				buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
			}
		});

		pwdCfm.addEventListener("input", function (e) {
			if (!pwdCfm.value) {
				pwdCfm.classList.add("alert");
				pwdCfmError.innerHTML = "위의 비밀번호를 다시 한번 더 입력해주세요.";
				validationState.passwordConfirm = false;
				buttonLogInSignUp.disabled = true;
			}
			else if (pwdCfm.value !== pwd.value) {
				pwdCfm.classList.add("alert");
				pwdCfmError.innerHTML = "비밀번호가 일치하지 않습니다.";
				validationState.passwordConfirm = false;
				buttonLogInSignUp.disabled = true;
			}
			else {
				pwdCfm.classList.remove("alert");
				pwdCfmError.innerHTML = "";
				validationState.passwordConfirm = true;
				buttonLogInSignUp.disabled = !(validationState.email && validationState.nickname && validationState.password && validationState.passwordConfirm);
			}
		});

		const visPwdCfm = pwdCfm.nextElementSibling;
		visPwdCfm.addEventListener("click", handleVisPwd);

		buttonLogInSignUp.addEventListener("click", function (e) {
			if (USER_DATA[email.value]) {
				popupText.innerHTML = `이메일 ${email.value} 은 이미 가입되어 있습니다.`;
				popupCon.classList.remove("none");
				popupOK.focus();
			}
			else {
				popupText.innerHTML = `회원가입 되었습니다.`;
				popupCon.classList.remove("none");
				setTimeout(function () {
					window.location.href = "/login";
				}, 512);
			}
		});
	}, []);

	return (
	<>
		<main>
			<a href="/"><img className="logo" src="/images/Property-1=lg.png" alt="판다마켓 logo"/></a>
			<form>
				<label for="email">이메일</label>
				<input id="email" name="email" placeholder="이메일을 입력해주세요" type="email" autocomplete="on" required/>
				<div className="email-error"></div>
				<label for="nickname">닉네임</label>
				<input id="nickname" name="nickname" placeholder="닉네임을 입력해주세요" type="text" autocomplete="on" required/>
				<div className="nickname-error"></div>
				<label for="password">비밀번호</label>
				<div className="pwd-container">
					<input id="password" name="password" placeholder="비밀번호를 입력해주세요" type="password" required/>
					<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off"/>
				</div>
				<div className="pwd-error"></div>
				<label for="password-confirm">비밀번호 확인</label>
				<div className="pwd-container">
					<input id="password-confirm" name="password-confirm" placeholder="비밀번호를 다시 한 번 입력해주세요" type="password" required/>
					<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off"/>
				</div>
				<div className="pwd-cfm-error"></div>
				<button id="button-signup" type="button" disabled>회원가입</button>
			</form>
			<div className="oauth">
				<span>간편 로그인하기</span>
				<div className="oauth-images">
					<a href="https://www.google.com/"><img src="/images/oauth-Google.png" alt="구글로 로그인하기" className="img-oauth"/></a>
					<a href="https://www.kakaocorp.com/page/"><img src="/images/oauth-Kakao.png" alt="카카오로 로그인하기" className="img-oauth"/></a>
				</div>
			</div>
			<div className="check-description">
				이미 회원이신가요?
				<a href="/login">로그인</a>
			</div>
		</main>
		<PopUp/>
	</>);
}

export default SignUpComp;
