// <script type="module" src="../src/js/signup.js"></script>
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import SignInput from '@/src/components/SignInput.jsx';
import Link from 'next/link';
import SignLayout from '@/src/layouts/SignLayout';
import Image from 'next/image';

const style = {
  signUp: css`
    padding-bottom: 7rem;
  `,
};

export default function SignupPage() {
  return (
    <SignLayout>
      <div id="signUp" css={style.signUp}>
        <form id="loginField">
          <SignInput label="이메일" type="email" placeholder="이메일을 입력해주세요" />
          <SignInput label="닉네임" type="text" placeholder="닉네임을 입력해주세요" />
          <SignInput label="비밀번호" type="password" placeholder="비밀번호를 입력해주세요" />
          <SignInput label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 한 번 입력해주세요" />
          <button id="signupButton" type="button" className="button" disabled>
            회원가입
          </button>
        </form>

        <section className="sns-login">
          <span>간편 로그인하기</span>
          <div>
            <Link href="https://www.google.com/">
              <Image src="/Image/GoogleBtn.png" alt="구글 버튼" width={42} height={42} />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image src="/Image/KakaoTalkBtn.png" alt="카카오톡 버튼" width={42} height={42} />
            </Link>
          </div>
        </section>

        <section className="footer-link">
          <p>
            이미 회원이신가요? <Link href="/login">로그인</Link>
          </p>
        </section>
        {/* <div className="modal off">
        <div className="modal-content">
          <p>사용 중인 이메일입니다.</p>
          <div className="button">확인</div>
        </div>
      </div> */}
      </div>
    </SignLayout>
  );
}
