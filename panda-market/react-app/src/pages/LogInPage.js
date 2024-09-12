import { useEffect } from "react";
// import '../login.css';
import PopUp from "../PopUp.js";
import USER_DATA from "../scripts/data.js";

function LogInPage() {
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

		const buttonLogInSignUp = document.querySelector(`#button-login`);

		const validationState = {
			email: false,
			password: false
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
				buttonLogInSignUp.disabled = !(validationState.email && validationState.password);
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

	}, []);

	return (
	<>
		<main>
			<a href="/"><img className="logo" src="/images/Property-1=lg.png" alt="판다마켓 logo"/></a>
			<form>
				<label for="email">이메일</label>
				<input id="email" name="email" placeholder="이메일을 입력해주세요" type="email" autocomplete="on" required/>
				<div className="email-error"></div>
				<label for="password">비밀번호</label>
				<div className="pwd-container">
					<input id="password" name="password" placeholder="비밀번호를 입력해주세요" type="password" required/>
					<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off"/>
				</div>
				<div className="pwd-error"></div>
				<button id="button-login" type="button" disabled>로그인</button>
			</form>
			<div className="oauth">
				<span>간편 로그인하기</span>
				<div className="oauth-images">
					<a href="https://www.google.com/"><img src="/images/oauth-Google.png" alt="구글로 로그인하기" className="img-oauth"/></a>
					<a href="https://www.kakaocorp.com/page/"><img src="/images/oauth-Kakao.png" alt="카카오로 로그인하기" className="img-oauth"/></a>
				</div>
			</div>
			<div className="check-description">
				판다마켓이 처음이신가요?
				<a href="/signup">회원가입</a>
			</div>
		</main>
		<PopUp/>
	</>);
}

export default LogInPage;
