import { useEffect } from "react";
import styles from './LogInPage.module.css';
import PopUp from "../PopUp.jsx";
import USER_DATA from "../scripts/data.js";
import { Link } from "react-router-dom";

function LogInPage() {
	useEffect(() => {
		const email = document.querySelector(`#email`);
		const emailError = document.querySelector(`#email-error`);
		const emailRegEx = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;

		const pwd = document.querySelector(`#password`);
		const pwdError = document.querySelector(`#pwd-error`);

		email.addEventListener("input", function (e) {
			if (!email.value) {
				email.classList.add(styles.alert);
				emailError.innerHTML = "이메일을 입력해주세요.";
			}
			else if (!emailRegEx.test(email.value)) {
				email.classList.add(styles.alert);
				emailError.innerHTML = "잘못된 이메일 형식입니다.";
			}
			else {
				email.classList.remove(styles.alert);
				emailError.innerHTML = "";
			}
		});

		pwd.addEventListener("input", function (e) {
			if (!pwd.value) {
				pwd.classList.add(styles.alert);
				pwdError.innerHTML = "비밀번호를 입력해주세요.";
			}
			else if (pwd.value.length < 8) {
				pwd.classList.add(styles.alert);
				pwdError.innerHTML = "비밀번호를 8자 이상 입력해주세요.";
			}
			else {
				pwd.classList.remove(styles.alert);
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
		// * Popup module
		///////////////////////////////////
		const popupCon = document.querySelector(`#popup-container`);
		// const popup = document.querySelector(`#popup`);
		const popupOK = document.querySelector(`#popup-button-ok`);
		const popupText = document.querySelector(`#popup-text`);

		popupOK.addEventListener("click", function (e) {
			popupCon.classList.add(styles.none);
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
				popupCon.classList.remove(styles.none);
				popupOK.focus();
			}
			else if (USER_DATA[email.value].password !== pwd.value) {
				popupText.innerHTML = `비밀번호가 일치하지 않습니다.`;
				popupCon.classList.remove(styles.none);
				popupOK.focus();
			}
			else {
				window.location.href = "/items";
			}
		});

	}, []);

	return (
	<>
		<main className={styles.main}>
			<Link to="/"><img className={styles.logo} src="/images/Property-1=lg.png" alt="판다마켓 logo"/></Link>
			<form>
				<label htmlFor="email">이메일</label>
				<input id="email" name="email" placeholder="이메일을 입력해주세요" type="email" autoComplete="on" required/>
				<div id="email-error" className={styles.email_error}></div>
				<label htmlFor="password">비밀번호</label>
				<div className={styles.pwd_container}>
					<input id="password" name="password" placeholder="비밀번호를 입력해주세요" type="password" required/>
					<img src="/images/btn_visibility_off_24px.svg" alt="Button visibility off"/>
				</div>
				<div id="pwd-error" className={styles.pwd_error}></div>
				<button id="button-login" type="button" disabled>로그인</button>
			</form>
			<div className={styles.oauth}>
				<span>간편 로그인하기</span>
				<div className={styles.oauth_images}>
					<Link to="https://www.google.com/"><img src="/images/oauth-Google.png" alt="구글로 로그인하기" className={styles.img_oauth}/></Link>
					<Link to="https://www.kakaocorp.com/page/"><img src="/images/oauth-Kakao.png" alt="카카오로 로그인하기" className={styles.img_oauth}/></Link>
				</div>
			</div>
			<div className={styles.check_description}>
				판다마켓이 처음이신가요?{" "}
				<Link to="/signup">회원가입</Link>
			</div>
		</main>
		<PopUp/>
	</>);
}

export default LogInPage;
