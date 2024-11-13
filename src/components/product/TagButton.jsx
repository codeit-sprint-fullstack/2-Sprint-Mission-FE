/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

export default function TagButton({ name, onClick }) {
  const style = {
    tagButton: css`
      cursor: ${onClick ? 'pointer' : 'default'};
      background-color: var(--gray-100);
      display: inline-flex;
      align-items: center;
      justify-content: center;

      padding: 0.6rem 1.2rem 0.6rem 1.6rem;
      border-radius: 26px;

      height: 3.6rem;

      img {
        margin-left: 0.8rem;
      }
    `,
  };

  const handleClick = onClick ? () => onClick(name) : null;

  return (
    <button id="tagButton" css={style.tagButton} type="button" onClick={handleClick}>
      {`#${name}`}
      {onClick && <Image src="/Image/ic_X.png" alt="X" width={22} height={24} />}
    </button>
  );
}
