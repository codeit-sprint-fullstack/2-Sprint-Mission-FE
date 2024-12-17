import { useState } from "react";
import styles from '../styles/LogInPage.module.css';
import PopUp from "@/components/PopUp.tsx";
import { useForm } from "react-hook-form";
import { postSignup } from "@/apis/loginSignupService.ts";
import { useSetUser, useUser } from "@/context/UserProvider.tsx";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const EMAIL_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+@[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+\.[\w]{2,3}$/;
const NICKNAME_REGEX = /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣0-9\-_.]+$/;
const PWD_MIN_LENGTH = 6;

function SignUpPage() {
  const [pwdIsVisible, setPwdIsVisible] = useState(false);
  const [pwdCfmIsVisible, setPwdCfmIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const user = useUser();
  const setUser = useSetUser();
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    const { email, nickname, password, passwordConfirm } = data;
    try {
      const res = await postSignup({ email, nickname, password, passwordConfirmation: passwordConfirm });
      if (res?.message) {
        setError(res);
      } else {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        router.push("/items");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
    }
  };

  if (user && !error) {
    return router.push('/');
  }

  return (
  <>
    <main className={styles.main}>
      <Link href="/"><div className={styles.logo}><Image fill src="/images/Property-1=lg.png" alt="판다마켓 logo"/></div></Link>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">이메일</label>
        <input {...register("email", { required: '이메일을 입력해주세요.', pattern: { value: EMAIL_REGEX, message: '잘못된 이메일 형식입니다.' } })} placeholder="이메일을 입력해주세요" type="email" autoComplete="on" required/>
        {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        <label htmlFor="nickname">닉네임</label>
        <input {...register("nickname", { required: '닉네임을 입력해주세요.', pattern: { value: NICKNAME_REGEX, message: '잘못된 닉네임 형식입니다.' } })} placeholder="닉네임을 입력해주세요" type="text" autoComplete="on" required/>
        {errors.nickname && <div className={styles.error}>{errors.nickname.message}</div>}
        <label htmlFor="password">비밀번호</label>
        <div className={styles.pwd_container}>
          <input {...register("password", { required: '비밀번호를 입력해주세요.', minLength: { value: PWD_MIN_LENGTH, message: `비밀번호는 ${PWD_MIN_LENGTH}자 이상이어야 합니다.` }})} placeholder="비밀번호를 입력해주세요" type={pwdIsVisible ? "text" : "password"} required/>
          <div className={styles.visible}><Image fill src={pwdIsVisible ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"} alt="Button visibility off" onClick={() => setPwdIsVisible(prev => !prev)} /></div>
        </div>
        {errors.password && <div className={styles.error}>{errors.password.message}</div>}
        <label htmlFor="passwordConfirm">비밀번호 확인</label>
        <div className={styles.pwd_container}>
          <input {...register("passwordConfirm", { required: '비밀번호를 다시 한 번 입력해주세요.', validate: (val) => {
            if (watch('password') !== val) {
              return "비밀번호가 일치하지 않습니다.";
            }
          } })} placeholder="비밀번호를 다시 한 번 입력해주세요" type={pwdCfmIsVisible ? "text" : "password"} required/>
          <div className={styles.visible}><Image fill src={pwdCfmIsVisible ? "/images/btn_visibility_on_24px.svg" : "/images/btn_visibility_off_24px.svg"} alt="Button visibility off" onClick={() => setPwdCfmIsVisible(prev => !prev)} /></div>
        </div>
        {errors.passwordConfirm && <div className={styles.error}>{errors.passwordConfirm.message}</div>}
        <button id="button-signup" type="submit" disabled={errors.email || errors.nickname || errors.password || errors.passwordConfirm}>회원가입</button>
      </form>
      <div className={styles.oauth}>
        <span>간편 로그인하기</span>
        <div className={styles.oauth_images}>
          <Link href="https://www.google.com/"><div className={styles.oauth_img_wrapper}><Image fill src="/images/oauth-Google.png" alt="구글로 로그인하기" className={styles.img_oauth}/></div></Link>
          <Link href="https://www.kakaocorp.com/page/"><div className={styles.oauth_img_wrapper}><Image fill src="/images/oauth-Kakao.png" alt="카카오로 로그인하기" className={styles.img_oauth}/></div></Link>
        </div>
      </div>
      <div className={styles.check_description}>
        이미 회원이신가요?{" "}
        <Link href="/login">로그인</Link>
      </div>
    </main>
    <PopUp error={error} setError={setError} />
  </>);
}

export default SignUpPage;
