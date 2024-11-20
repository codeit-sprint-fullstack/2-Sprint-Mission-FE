import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./styles/Auth.module.css";
import pandaLogo from "../public/login/panda.png";
import google from "../public/login/google.png";
import kakao from "../public/login/kakao.png";
import open from '../public/login/btn_visibility_on.png';
import close from '../public/login/btn_visibility_off.png';

export default function Auth({ isLoginPage, email, setEmail, nickname, setNickname, password, setPassword, passwordConfirmation, setPasswordConfirmation, error, isFormValid, onSubmit }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] = useState(false);
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isFormValid) {
      onSubmit();
    }
  };

  return (
    <div className={style.container} onKeyDown={handleKeyDown}>
      <div className={style.body}>
        <Link className={style.logoLink} href="/">
          <div className={style.logoGroup}>
            <Image className={style.logo} src={pandaLogo} alt="Panda Logo" />
            <h1 className={style.logoTitle}>판다마켓</h1>
          </div>
        </Link>
        <div className={style.inputForm}>
          <label htmlFor="email" className={style.email}>이메일</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${style.emailInput} ${email ? error.email ? style.errorInput : style.successInput : style.InputForm}`}
            placeholder="이메일을 입력해주세요."
          />
          {error.email && <p className={style.error}>{error.email}</p>}
          {isLoginPage ? null : (
            <>
              <label htmlFor="nickname" className={style.nickname}>닉네임</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={`${style.nicknameInput} ${nickname ? !error.nickname ? style.successInput : style.errorInput : style.InputForm}`}
                placeholder="닉네임을 입력해주세요."
              />
            </>
          )}
          <label htmlFor="password" className={style.password}>비밀번호</label>
          <div className={style.eye}>
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${style.passwordInput} ${password ? error.password ? style.errorInput : style.successInput : style.InputForm}`}
            placeholder="비밀번호를 입력해주세요."
          />
          <Image onClick={() => setIsPasswordVisible(!isPasswordVisible)} className={style.eyeIcon} src={isPasswordVisible ? open : close} alt="eye" />
          </div>
          {error.password && <p className={style.error}>{error.password}</p>}
          {isLoginPage ? null : (
            <>
              <label htmlFor="passwordConfirmation" className={style.passwordConfirmation}>비밀번호 확인</label>
              <div className={style.eye}>
              <input
                id="passwordConfirmation"
                type={isPasswordConfirmationVisible ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className={`${style.passwordConfirmationInput} ${passwordConfirmation ? error.passwordConfirmation ? style.errorInput : style.successInput : style.InputForm}`}
                placeholder="비밀번호를 다시 입력해주세요."
              />
              <Image onClick={() => setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible)} className={style.eyeIcon} src={isPasswordConfirmationVisible ? open : close} alt="eye" />
              </div>
              {error.passwordConfirmation && <p className={style.error}>{error.passwordConfirmation}</p>}
            </>
          )}
        </div>
        <button className={style.loginButton} onClick={onSubmit} disabled={!isFormValid}>{isLoginPage ? '로그인' : '회원가입'}</button>
        <div className={style.loginGroup}>
          <p className={style.loginGroupTitle}>간편 로그인하기</p>
          <div className={style.loginLogoGroup}>
            <Link className={style.link} href="https://www.google.com"><Image className={style.google} src={google} alt="Google" /></Link>
            <Link className={style.link} href="https://www.kakaocorp.com/page"><Image className={style.kakao} src={kakao} alt="Kakao" /></Link>
          </div>
        </div>
        {isLoginPage ? (
          <div className={style.signInGroup}>
            <p className={style.signInTitle}>판다마켓이 처음이신가요?</p>
            <Link href="/signup" className={style.signIn}>
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
    </div>
  );
}
