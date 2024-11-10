/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SignInput from '@components/SignInput';
import { useAuth } from '@contexts/AuthProvider';
import useOwnMutation from '@hooks/useOwnMutation';
import SignLayout from '@layouts/SignLayout';
import { signUp } from '@/src/utils/api';

const style = {
  signUp: css`
    padding-bottom: 7rem;
  `,
};

const mockData = {
  email: 'TESTKTY13@email.com',
  nickname: 'TESTKTY13',
  password: 'password',
  passwordConfirmation: 'password',
};

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMsg, setErrorMsg] = useState({});
  const signUpMutation = useOwnMutation({
    mutationFn: data => signUp(data),
    onSuccess: (_, variables) => {
      login({ email: variables.email, password: variables.password });
      router.push('/items');
    },
  });

  const handleSubmit = async () => {
    if (password !== passwordConfirmation) {
      setErrorMsg({ passwordConfirmation: '비밀번호가 일치하지 않아요.' });
      return null;
    }
    setErrorMsg({});

    signUpMutation.mutate(mockData);
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
      <div id="signUp" css={style.signUp}>
        <form id="loginField">
          <SignInput
            label="이메일"
            type="email"
            placeholder="이메일을 입력해주세요"
            initialValue={email}
            onChange={setEmail}
            onKeyDown={handleKeyDown}
          />
          <SignInput
            label="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
            initialValue={nickname}
            onChange={setNickname}
            onKeyDown={handleKeyDown}
          />
          <SignInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            initialValue={password}
            onChange={setPassword}
            onKeyDown={handleKeyDown}
          />
          <SignInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            initialValue={passwordConfirmation}
            onChange={setPasswordConfirmation}
            onKeyDown={handleKeyDown}
            errorMsg={errorMsg.passwordConfirmation}
          />
          <button
            id="signupButton"
            type="button"
            className="button"
            onClick={handleSubmit}
            disabled={!email || !nickname || !password || !passwordConfirmation}
          >
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
            이미 회원이신가요? <Link href="/auth/signIn">로그인</Link>
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
