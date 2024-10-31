import { useState } from "react";
import styles from './LogInPage.module.css';
import PopUp from "../components/PopUp.jsx";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { postLogin } from "../apis/loginSignupService.js";
import { useSetUser, useUser } from "../context/UserProvider.jsx";

const EMAIL_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;
const PWD_MIN_LENGTH = 6;

function LogInPage() {
	const [pwdIsVisible, setPwdIsVisible] = useState(false);
	const [error, setError] = useState(null);
	const user = useUser();
	const setUser = useSetUser();
	const navigate = useNavigate();
	const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
		mode: "all",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data) => {
		console.log(data);
		const { email, password } = data;
		const res = await postLogin({ email, password });
		if (res?.message) {
			setError(res);
		} else {
			setUser(res);
			localStorage.setItem("user", JSON.stringify(res));
			navigate("/");
		}
	};

	if (user && !error) return <Navigate to="/" />;

	return (
	<>
		<main className={styles.main}>
			<Link to="/"><img className={styles.logo} src="/images/Property-1=lg.png" alt="판다마켓 logo"/></Link>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="email">이메일</label>
				<input {...register("email", { required: '이메일을 입력해 주세요.', pattern: { value: EMAIL_REGEX, message: '이메일이 유효하지 않습니다.'} })} placeholder="이메일을 입력해주세요" type="email" autoComplete="on" required/>
				{errors.email && <div className={styles.error}>{errors.email.message}</div>}
				<label htmlFor="password">비밀번호</label>
				<div className={styles.pwd_container}>
					<input {...register("password", { required: '비밀번호를 입력해 주세요.', minLength: { value: PWD_MIN_LENGTH, message: `비밀번호는 ${PWD_MIN_LENGTH}자 이상이어야 합니다.` } })} placeholder="비밀번호를 입력해주세요" type={pwdIsVisible ? "text" : "password"} required/>
					<img src={pwdIsVisible ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"} alt="Button visibility toggle" onClick={() => setPwdIsVisible(prev => !prev)} />
				</div>
				{errors.password && <div className={styles.error}>{errors.password.message}</div>}
				<button id="button-login" type="submit" disabled={errors.email || errors.password}>로그인</button>
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
		<PopUp error={error} setError={setError} />
	</>);
}

export default LogInPage;
