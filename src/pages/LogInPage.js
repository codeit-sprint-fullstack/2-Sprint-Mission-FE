import { Link } from 'react-router-dom'
import loginLogo from '../image/loginpage-logo.png'
import openEyes from '../image/open-eyes.png'
import googleIcon from '../image/ic_google.png'
import kakaoIcon from '../image/ic_kakao.png'
import styles from './LogInPage.module.css'

export default function LogInPage() {
  return (
    <div className={styles.loginPage}>
      <header className={styles.loginHeader}>
        <Link to="/"><img className={styles.logo} src={loginLogo} alt='logo'/></Link>
      </header>
    
      <main className={styles.loginMain}>  
        <form className={styles.loginForm}>
    
          <div className={styles.loginWrapper}>
            <label for="email">이메일</label>
            <div>
              <input className={styles.email} name="email" placeholder="이메일을 입력해주세요" autocomplete="on" required />
              <div className={`${styles.emptyEmailError} ${styles.hide}`}>이메일을 입력해주세요.</div>
              <div className={`${styles.emailError} ${styles.hide}`}>잘못된 이메일 형식입니다.</div>
            </div>
          </div>
    
          <div className={styles.loginWrapper}>
            <label for="password">비밀번호</label>
            <div>
              <div className={styles.pwContainer}>
                <input className={styles.password} name="password" type="password" placeholder="비밀번호를 입력해주세요" />
                <img className={styles.togglePassword} src={openEyes} alt='togglepassword' />
              </div>
              <div className={`${styles.emptyPasswordError} ${styles.hide}`}>비밀번호를 입력해주세요.</div>
              <div className={`${styles.passwordError} ${styles.hide}`}>비밀번호 8자 이상 입력해주세요.</div>
            </div>
          </div>
    
          <button className={styles.loginButton} type="button" disabled>로그인</button>
    
        </form>
  
        <section className={styles.easyLogin}>
          <p className={styles.easyLoginText}>간편 로그인하기</p>
          <div className={styles.snsIc}>
            <Link className={styles.icImg} to="https://www.google.com/" rel="noopener noreferrer"><img className={styles.icLink} src={googleIcon} alt='googleIcon'/></Link>
            <Link className={styles.icImg} to="https://www.kakaocorp.com/page/" rel="noopener noreferrer"><img className={styles.icLink} src={kakaoIcon} alt='kakaoIcon' /></Link>
          </div>
        </section>
    
        <section className={styles.signup}>
          <span className={styles.signupText}>판다마켓이 처음이신가요?</span>
          <Link className={styles.signupLink} to="/signup">회원가입</Link>
        </section>
    
      </main>
    </div>
  )
}