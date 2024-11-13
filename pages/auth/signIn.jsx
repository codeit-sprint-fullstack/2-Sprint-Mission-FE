/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SignInput from '@components/SignInput';
import { useAuth } from '@contexts/AuthProvider';
import SignLayout from '@layouts/SignLayout';

const style = {
  login: css``,
};

export default function SignInPage() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState({});

  const handleSubmit = async () => {
    if (Object.keys(errorMsg).length === 0) {
      setErrorMsg({ email: '이메일을 확인해 주세요.', password: '비밀번호를 확인해 주세요.' });
      return null;
    }

    setErrorMsg({});
    const user = await auth.login({ email: 'TESTKTY@email.com', password: 'password' });
    if (user) router.push('/items');
  };
  const handleKeyDown = e => {
    // NOTE Enter Key
    if (e.keyCode === 13) handleSubmit();
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.push('/items');
  }, []);

  return (
    <SignLayout>
      <div id="login" css={style.login}>
        <form id="loginField">
          <div>
            <SignInput
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              initialValue={email}
              onChange={setEmail}
              onKeyDown={handleKeyDown}
              errorMsg={errorMsg.email}
            />
          </div>
          <div>
            <SignInput
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              initialValue={password}
              onChange={setPassword}
              onKeyDown={handleKeyDown}
              errorMsg={errorMsg.password}
            />
          </div>
          <button id="loginButton" type="button" className="button" onClick={handleSubmit} disabled={!email || !password}>
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
            판다마켓이 처음이신가요? <Link href="/auth/signUp">회원가입</Link>
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
