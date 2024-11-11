import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { getLogin, getSignin } from "@/pages/api/AuthService";
import { validation } from "../utils/validation";
import Image from "next/image";
import Link from "next/link";
import style from "./styles/Auth.module.css";
import pandaLogo from "../public/login/panda.png";
import google from "../public/login/google.png";
import kakao from "../public/login/kakao.png";

export default function Auth() {
  const router = useRouter();
  const currentPath = router.pathname;
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoginPage = currentPath === "/login";
  const { error, isFormValid } = validation(email, password, passwordCheck, isLoginPage, nickname);
 
  const mutation = useMutation({
    mutationFn: isLoginPage ? getLogin : getSignin,
    onSuccess: (data) => {
      if (data) {
        router.push("/items");
      }
    },
    onError: (error) => {
      console.error(error.message);
      alert("요청에 실패했습니다. 다시 시도해 주세요");
    }
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = isLoginPage ? { email, password } : { email, password, nickname };
    mutation.mutate(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isFormValid) {
      handleSubmit();
    }
  };

  return (
    <div className={style.container} onKeyDown={handleKeyDown}>
      <Link className={style.logoLink} href="/">
        <div className={style.logoGroup}>
          <Image className={style.logo} src={pandaLogo} alt="Panda Logo" />
          <h1 className={style.logoTitle}>판다마켓</h1>
        </div>
      </Link>
      <div className={style.inputForm}>
        <p className={style.email}>이메일</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${style.emailInput} ${error.email ? style.errorInput : style.successInput}`}
          placeholder="이메일을 입력해주세요."
        />
        {error.email && <p className={style.error}>{error.email}</p>}
        {isLoginPage ? null : (
          <>
            <p className={style.nickname}>닉네임</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={`${style.nicknameInput} ${!error.nickname ? style.successInput : style.errorInput}`}
              placeholder="닉네임을 입력해주세요."
            />
          </>
        )}
        <p className={style.password}>비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${style.passwordInput} ${error.password ? style.errorInput : style.successInput}`}
          placeholder="비밀번호를 입력해주세요."
        />
        {error.password && <p className={style.error}>{error.password}</p>}
        {isLoginPage ? null : (
          <>
            <p className={style.passwordCheck}>비밀번호 확인</p>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={`${style.passwordCheckInput} ${error.passwordCheck ? style.errorInput : style.successInput}`}
              placeholder="비밀번호를 다시 입력해주세요."
            />
            {error.passwordCheck && <p className={style.error}>{error.passwordCheck}</p>}
          </>
        )}
      </div>
      <button className={style.loginButton} onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>{isLoginPage ? '로그인' : '회원가입'}</button>
      <div className={style.loginGroup}>
        <p className={style.loginGroupTitle}>간편 로그인하기</p>
        <div className={style.loginLogoGroup}>
          <Image className={style.google} src={google} alt="Google" />
          <Image className={style.kakao} src={kakao} alt="Kakao" />
        </div>
      </div>
      {isLoginPage ? (
        <div className={style.signInGroup}>
          <p className={style.signInTitle}>판다마켓이 처음이신가요?</p>
          <Link href="/signin" className={style.signIn}>
            회원가입
          </Link>
        </div>
      ) : (
        <div className={style.signInGroup}>
          <p className={style.signInTitle}>이미 회원이신가요?</p>
          <Link href="/login" className={style.signIn}>
            로그인
          </Link>
        </div>
      )}
    </div>
  );
}
