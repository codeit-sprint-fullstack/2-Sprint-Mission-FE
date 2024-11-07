/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import c from '@utils/constants';
import { priceFunc } from '@utils/utils';
import Image from 'next/image';

const style = {
  card: css`
    display: grid;
    gap: 1.6rem;
    grid-template-rows: 1fr auto;

    .imageWrapper {
      width: 22.1rem;
      aspect-ratio: 1/1;
      position: relative;

      border-radius: 16px;

      @media (max-width: ${c.BREAKPOINTS.TABLET}px) {
        &.best {
          width: 343px;
          border-radius: 19.46px;
        }
      }

      @media (max-width: ${c.BREAKPOINTS.MOBILE}px) {
        width: 16.8rem;
        border-radius: 12px;
      }
    }
  `,
  info: css`
    height: 8rem;

    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  `,
  title: css`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.4rem;
    color: var(--gray-800);
  `,
  price: css`
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 2.6rem;
    color: var(--gray-800);
  `,
  like: css`
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: var(--gray-600);
  `,
};

export default function ProductCard({ item, best = false }) {
  const { likeCount, price, name, images } = item;
  const imgUrl = images?.[0] || '/Image/img_default.png';
  const priceString = priceFunc(price);

  return (
    <div id="productCard" css={style.card}>
      <div className="imageWrapper">
        <Image fill src={imgUrl} alt={name} className={best ? 'best' : ''} />
      </div>
      <div css={style.info}>
        <h5 css={style.title}>{name}</h5>
        <p css={style.price}>{priceString}원</p>
        <p css={style.like}>
          <Image src="/Image/ic_heart.png" alt="favorite heart" width={16} height={16} /> {likeCount}
        </p>
      </div>
    </div>
  );
}
