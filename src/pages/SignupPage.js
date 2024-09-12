// <script type="module" src="../src/js/signup.js"></script>
import style from './css/SignupPage.module.css';
import { Link } from 'react-router-dom';
import googleBtn from '../Image/GoogleBtn.png';
import kakaoTalkBtn from '../Image/KakaoTalkBtn.png';
import SignInput from '../components/SignInput.js';

function SignupPage() {
  return (
    <main id={`${style.signup}`}>
      <form id="loginField">
        <SignInput
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
        />
        <SignInput
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해주세요"
        />
        <SignInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <SignInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        />
        <button id="signupButton" type="button" disabled>
          회원가입
        </button>
      </form>
      <section className="sns-login">
        <span>간편 로그인하기</span>
        <div>
          <Link to="https://www.google.com/">
            <img src={googleBtn} alt="구글 버튼" />
          </Link>
          <Link to="https://www.kakaocorp.com/page/">
            <img src={kakaoTalkBtn} alt="카카오톡 버튼" />
          </Link>
        </div>
      </section>
      <section className="footer-link">
        <p>
          이미 회원이신가요? <Link to="/sign/login">로그인</Link>
        </p>
      </section>
      {/* <div className="modal off">
        <div className="modal-content">
          <p>사용 중인 이메일입니다.</p>
          <div className="button">확인</div>
        </div>
      </div> */}
    </main>
  );
}

export default SignupPage;
