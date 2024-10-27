/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '../utils/constants.js';

const style = {
  signLayout: css`
    padding-top: 4rem;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 64rem;
      margin: 0 auto;
    }

    #loginField {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;

      button {
        width: 100%;
        height: 5.6rem;
        border: 0;
        border-radius: 40px;
        font-size: 2rem;
        line-height: 2.4rem;
        font-weight: 600;
      }
    }

    .sns-login {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      background-color: #e6f2ff;
      width: 100%;
      height: 7.4rem;
      margin: 2.4rem auto;
      padding: 2.5rem 2.3rem;

      > div {
        display: flex;
        gap: 1.6rem;
      }
    }

    .footer-link {
      text-align: center;
      width: 64rem;
      margin: 0 auto;

      p {
        font-size: 1.5rem;
        line-height: 1.78992rem;
        font-weight: 500;
        color: var(--gray-800);
      }

      a {
        color: #3182f6;
      }

      @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
        main {
          width: 100%;
          padding-left: 1.6rem;
          padding-right: 1.6rem;
        }

        body {
          * {
            max-width: 432px;
          }
        }
      }
    }
  `,
};

export default function SignLayout({ children }) {
  return (
    <div id="SignLayout" css={style.signLayout}>
      {children}
    </div>
  );
}
