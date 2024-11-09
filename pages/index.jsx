/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useViewport } from '@contexts/ViewportProvider';
import c from '@utils/constants';

const style = {
  h1: css`
    font-size: 4rem;
    line-height: 5.6rem;
    font-weight: 700;
  `,
  banner: css`
    background-color: #cfe5ff;
    display: flex;
    align-items: center;
    background-repeat: no-repeat;
    background-position: 80% bottom;
    background-size: 55%;
    height: 54rem;

    &#topBanner {
      background-image: url('/Image/Img_home_top.png');
    }

    &#bottomBanner {
      background-image: url('/Image/Img_home_bottom.png');
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      height: 77.1rem;
      background-position: bottom;
      background-size: 120%;
      position: relative;
      align-items: baseline;
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      height: 54rem;
    }
  `,
  mBody: css`
    max-width: 120rem;
    margin: 0 auto;
    width: 100%;

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      &.banner {
        text-align: center;
        position: relative;
        top: 18%;
      }
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      &.banner {
        top: 8%;
      }
    }
  `,
  longButton: css`
    font-size: 2rem;
    font-weight: 700;
    border-radius: 100rem;
    padding: 1.6rem 12.4rem;
    margin-top: 3.2rem;
  `,
  card: css`
    padding: 13.8rem 0;
    display: flex;
    align-items: center;
    gap: 5%;
    margin: 0 auto;

    &.reverse {
      flex-direction: row-reverse;
      text-align: right;
    }

    .imageWrapper {
      position: relative;
      width: 588px;
      height: 444px;

      img {
        object-fit: cover;
      }
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      padding: 4rem 2.4rem;
      flex-direction: column;

      &.reverse {
        flex-direction: column;
      }

      .imageWrapper {
        width: 696px;
      }
    }

    @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
      padding: 3.2rem 1.6rem;

      .imageWrapper {
        width: 100%;
      }
    }
  `,
  cardText: css`
    flex: 1;

    h2 {
      color: var(--Primary-100);
      font-size: 1.8rem;
      line-height: 2.6rem;
      font-weight: 700;
      margin-bottom: 1.2rem;
    }

    p {
      font-size: 2.4rem;
      font-weight: 500;
      line-height: 3.2rem;
      margin-top: 2.4rem;
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      text-align: left;
      width: 696px;
      margin-top: 1.6rem;

      .reverse & {
        text-align: right;
      }
    }

    @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
      width: 100%;
      margin-top: 0.8rem;
    }
  `,
};

export default function LandingPage() {
  const viewport = useViewport();

  return (
    <div id="landingPage">
      <section css={style.banner} id={'topBanner'}>
        <div css={style.mBody} className="banner">
          <h1 css={style.h1}>
            일상의 모든 물건을 {viewport !== c.VIEWPORT.TABLET && <br />}
            거래해 보세요
          </h1>
          <Link css={style.longButton} className="button" href="/items/">
            구경하러 가기
          </Link>
        </div>
      </section>

      <section css={style.mBody}>
        <div css={style.card}>
          <div className="imageWrapper">
            <Image fill src="/Image/Img_home_01.png" alt="Hot Item" sizes="588px, 444px" />
          </div>
          <div className="card-text" css={style.cardText}>
            <h2>Hot item</h2>
            <h1 css={style.h1}>
              인기 상품을
              <br />
              확인해 보세요
            </h1>
            <p>
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </p>
          </div>
        </div>

        <div css={style.card} className="reverse">
          <div className="imageWrapper">
            <Image fill src="/Image/Img_home_02.png" alt="Search" sizes="588px, 444px" />
          </div>
          <div className="card-text" css={style.cardText}>
            <h2>Search</h2>
            <h1 css={style.h1}>
              구매를 원하는
              <br />
              상품을 검색하세요
            </h1>
            <p>
              구매하고 싶은 물품은 검색해서
              <br />
              쉽게 찾아보세요
            </p>
          </div>
        </div>

        <div css={style.card}>
          <div className="imageWrapper">
            <Image fill src="/Image/Img_home_03.png" alt="Register" sizes="588px, 444px" />
          </div>
          <div className="card-text" css={style.cardText}>
            <h2>Register</h2>
            <h1 css={style.h1}>
              판매를 원하는
              <br />
              상품을 등록하세요
            </h1>
            <p>
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      <section css={style.banner} id={'bottomBanner'}>
        <div css={style.mBody} className="banner">
          <h1 css={style.h1}>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </div>
  );
}
