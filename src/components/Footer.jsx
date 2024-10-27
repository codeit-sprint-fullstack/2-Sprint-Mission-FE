/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '../utils/constants.js';
import Link from 'next/link';
import Image from 'next/image';

const style = {
  footer: css`
    height: 16rem;
    background-color: var(--gray-900);
    padding: 3.2rem 20rem 10.8rem 20rem;
    color: var(--gray-400);

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      padding-left: 2.4rem;
      padding-right: 2.4rem;
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      padding-left: 1.6rem;
      padding-right: 1.6rem;
    }
  `,
  footerLink: css`
    display: flex;
    gap: 3rem;
    color: var(--gray-200);
  `,
  snsLink: css`
    display: flex;
    gap: 1.2rem;
  `,
};

export default function Footer() {
  return (
    <footer css={style.footer}>
      <div>
        <p>©codeit - 2024</p>
      </div>
      <div id="footerLink" css={style.footerLink}>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div id="snsLink" css={style.snsLink}>
        <Link href="https://www.facebook.com/">
          <Image src="/Image/ic_facebook.png" alt="facebook" width={20} height={20} />
        </Link>
        <Link href="https://twitter.com/home">
          <Image src="/Image/ic_twitter.png" alt="twitter" width={20} height={20} />
        </Link>
        <Link href="https://www.youtube.com/">
          <Image src="/Image/ic_youtube.png" alt="youtube" width={20} height={20} />
        </Link>
        <Link href="https://www.instagram.com/">
          <Image src="/Image/ic_instagram.png" alt="instagram" width={20} height={20} />
        </Link>
      </div>
    </footer>
  );
}
