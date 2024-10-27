/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

const style = {
  modal: css`
    background-color: rgba(0, 0, 0, 0.7);

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    &.off {
      display: none;
    }
  `,
  modalContent: css`
    width: 54rem;
    height: 25rem;
    border-radius: 8px;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    p {
      text-align: center;
      font-size: 1.6rem;
      font-weight: 500;
    }

    .button {
      position: absolute;
      right: 2.8rem;
      bottom: 2.8rem;

      padding: 1.2rem 2.3rem;
      border-radius: 8px;
    }
  `,
};

export default function Modal({ message, noButton = false }) {
  const [modalOff, setModalOff] = useState('');
  const handleClick = () => setModalOff('off');

  return (
    <div id="modal" css={style.modal} className={`${modalOff}`}>
      <div id="modalContent" css={style.modalContent}>
        <p>{message}</p>
        {!noButton && (
          <div className="button" onClick={handleClick}>
            확인
          </div>
        )}
      </div>
    </div>
  );
}
