/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@contexts/AuthProvider';
import { useViewport } from '@contexts/ViewportProvider';
import c from '@utils/constants';

const style = {
  header: css`
    padding: 0 20rem;
    height: 7rem;
    border-bottom: 1px solid #dfdfdf;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      padding-left: 2.4rem;
      padding-right: 2.4rem;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      padding-left: 1.6rem;
      padding-right: 1.6rem;
    }
  `,
  topNav: css`
    flex: 1;
    margin-left: 3.2rem;
    display: flex;
    gap: 3.2rem;
    color: var(--gray-600);
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.148rem;
    text-align: center;

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      margin-left: 1.6rem;
      gap: 0.8rem;
      font-size: 1.6rem;
      line-height: 1.909rem;
    }
  `,
  loginButton: css`
    font-weight: 600;
    border-radius: 8px;
    padding: 1.1rem 2.3rem;
    line-height: 2.6rem;
  `,
};

export default function GNB() {
  const viewport = useViewport();
  const router = useRouter();
  const { logout } = useAuth();
  // NOTE url path의 첫 부분을 받아와서 Nav 바 색상 변경하기 위함.
  const firstPath = router.asPath.split('/')[1] ?? '';

  const handleLoginClick = () => {
    if (!localStorage.getItem('accessToken')) return router.push('/auth/signIn');

    logout();
    router.reload();
  };

  return (
    <header css={style.header}>
      <Link href="/">
        <Image
          src={viewport === c.VIEWPORT.MOBILE ? '/Image/small_logo.png' : '/Image/logo.png'}
          alt="판다마켓 로고"
          width={153}
          height={viewport === c.VIEWPORT.MOBILE ? 75.75 : 51}
        />
      </Link>
      <nav css={style.topNav}>
        <Link href="/articles" style={firstPath === 'articles' ? { color: '#3692ff' } : {}}>
          자유게시판
        </Link>
        <Link href="/items" style={firstPath === 'items' ? { color: '#3692ff' } : {}}>
          중고마켓
        </Link>
      </nav>
      <button onClick={handleLoginClick} css={style.loginButton} className="button">
        {!localStorage.getItem('accessToken') ? '로그인' : '로그아웃'}
      </button>
    </header>
  );
}
