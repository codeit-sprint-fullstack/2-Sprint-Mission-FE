import { useState } from "react";
import { useRouter } from "next/router";
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

  const isLoginPage = currentPath === "/login";

  return (
    <div className={style.container}>
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
          className={style.emailInput}
          placeholder="이메일을 입력해주세요."
        />
        {isLoginPage ? null : (
          <>
            <p className={style.nickname}>닉네임</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className={style.nicknameInput}
              placeholder="닉네임을 입력해주세요."
            />
          </>
        )}
        <p className={style.password}>비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.passwordInput}
          placeholder="비밀번호를 입력해주세요."
        />
        {isLoginPage ? null : (
          <>
            <p className={style.passwordCheck}>비밀번호 확인</p>
            <input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={style.passwordCheckInput}
              placeholder="비밀번호를 다시 입력해주세요."
            />
          </>
        )}
      </div>
      <button className={style.loginButton}>{isLoginPage ? '로그인' : '회원가입'}</button>
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
