//     <script type="module" src="../src/js/login.js"></script>
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from 'next/link';
import SignInput from '@/src/components/SignInput.jsx';
import SignLayout from '@/src/layouts/SignLayout';
import Image from 'next/image';

const style = {
  login: css``,
};

export default function LoginPage() {
  return (
    <SignLayout>
      <div id="login" css={style.login}>
        <form id="loginField">
          <SignInput label="이메일" type="email" placeholder="이메일을 입력해주세요" />
          <SignInput label="비밀번호" type="password" placeholder="비밀번호를 입력해주세요" />
          <button id="loginButton" type="button" className="button" disabled>
            로그인
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
            판다마켓이 처음이신가요? <Link href="/signup">회원가입</Link>
          </p>
        </section>
        {/* <div class="modal off">
        <div class="modal-content">
          <p>비밀번호가 일치하지 않습니다.</p>
          <div class="button">확인</div>
        </div>
      </div> */}
      </div>
    </SignLayout>
  );
}
