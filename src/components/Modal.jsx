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

    #buttonsWrapper {
      position: absolute;
      right: 2.8rem;
      bottom: 2.8rem;

      .button {
        padding: 1.2rem 2.3rem;
        border-radius: 8px;
        margin-left: 1rem;
      }
    }
  `,
};

export default function Modal({ children, buttons = [] }) {
  const [modalOff, setModalOff] = useState('');

  return (
    <div id="modal" css={style.modal} className={`${modalOff}`}>
      <div id="modalContent" css={style.modalContent}>
        {children}
        <div id="buttonsWrapper">
          {buttons.map(button => {
            if (typeof button === 'string') {
              return (
                <button type="button" className="button" onClick={() => setModalOff('off')} key={button}>
                  {button}
                </button>
              );
            } else if (button && typeof button === 'object') {
              return (
                <button
                  type="button"
                  className="button"
                  onClick={() => {
                    setModalOff('off');
                    button.onClick();
                  }}
                  key={button.Msg}
                >
                  {button.Msg}
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
