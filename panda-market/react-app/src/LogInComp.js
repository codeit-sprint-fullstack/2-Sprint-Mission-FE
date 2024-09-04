import PopUp from "./PopUp";

function LogInComp() {
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

export default LogInComp;
