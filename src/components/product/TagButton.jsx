/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

const style = {
  tagButton: css`
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

export default function TagButton({ name, onClick }) {
  const handleClick = () => onClick(name);

  return (
    <button id="tagButton" css={style.tagButton} type="button" onClick={handleClick}>
      {`#${name}`}
      <Image src="/Image/ic_X.png" alt="X" width={22} height={24} />
    </button>
  );
}
