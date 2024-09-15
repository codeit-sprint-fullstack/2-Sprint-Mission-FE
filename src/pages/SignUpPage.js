import styles from './SignUpPage.module.css'
import loginLogo from '../image/loginpage-logo.png'
import openEyes from '../image/open-eyes.png'
import googleIcon from '../image/ic_google.png'
import kakaoIcon from '../image/ic_kakao.png'

export default function SignUpPage() {
  return (
    <div className={styles.signupPage}>
      <header className={styles.signupHeader}>
        <a href="/"><img className={styles.logo} src={loginLogo} alt='logo' /></a>
      </header>
    
      <main className={styles.signupMain}>  
        <form className={styles.signupForm}>
    
          <div className={styles.signupWrapper}>
            <label for="email">이메일</label>
            <div>
              <input className={styles.email} name="email" placeholder="이메일을 입력해주세요" autocomplete="on" required />
              <div className={`${styles.emptyEmailError} ${styles.hide}`} >이메일을 입력해주세요.</div>
              <div className={`${styles.emailError} ${styles.hide}`} >잘못된 이메일 형식입니다.</div>
            </div>
          </div>
    
          <div className={styles.signupWrapper}>
            <label for="nickname">닉네임</label>
            <div>
              <input className={styles.nickname} name="nickname" placeholder="닉네임을 입력해주세요" autocomplete="on" required />
              <div className={`${styles.emptyNicknameError} ${styles.hide}`} >닉네임을 입력해주세요.</div>
            </div>
          </div>
    
          <div className={styles.signupWrapper}>
            <label for="password">비밀번호</label>
            <div>
              <div className={styles.pwContainer}>
                <input className={styles.password} name="password" type="password" placeholder="비밀번호를 입력해주세요" required />
                <img className={styles.togglePassword} src={openEyes} alt='openEyes' />
              </div>
              <div className={`${styles.emptyPasswordError} ${styles.hide}`} >비밀번호를 입력해주세요.</div>
              <div className={`${styles.passwordError} ${styles.hide}`} >비밀번호 8자 이상 입력해주세요.</div>
            </div>
          </div>
          
          <div className={styles.signupWrapper}>
            <label for="confirmPassword">비밀번호 확인</label>
            <div>
              <div className={styles.pwContainer}>
                <input className={styles.confirmPassword} name="confirmPassword" type="password" placeholder="비밀번호를 다시 한 번 입력해주세요" required />
                <img className={styles.togglePassword} src={openEyes} alt='openEyes' />
              </div>
              <div className={`${styles.emptyConfirmPasswordError} ${styles.hide}`} >비밀번호를 다시 한 번 입력해주세요.</div>
              <div className={`${styles.confirmPasswordError} ${styles.hide}`} >비밀번호가 일치하지 않습니다.</div>
            </div>
          </div>
          
          <button className={styles.signupButton} type="button" disabled>회원가입</button>
    
        </form>
    
        <section className={styles.easyLogin}>
          <p className={styles.easyLoginText}>간편 로그인하기</p>
          <div className={styles.snsIc}>
            <a className={styles.icImg} href="https://www.google.com/"><img className={styles.icLink} src={googleIcon} alt='googleIcon' /></a>
            <a className={styles.icImg} href="https://www.kakaocorp.com/page/"><img className={styles.icLink} src={kakaoIcon} alt='kakaoIcon' /></a>
          </div>
        </section>
    
        <section className={styles.login}>
          <span className={styles.loginText}>이미 회원이신가요?</span>
          <a className={styles.loginLink} href="../login">로그인</a>
        </section>
    
      </main>
    </div>
  );
}