/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

const style = {
  signInput: css`
    label {
      line-height: 2.148rem;
    }

    p {
      font-size: 1.5rem;
      line-height: 1.79rem;
      font-weight: 600;
      color: var(--error-red);
      margin-top: 0.8rem;
      margin-left: 1.6rem;
    }

    .input-wrap {
      position: relative;

      img {
        position: absolute;
        right: 2.4rem;
        bottom: 1.6rem;
      }
    }

    input {
      margin-top: 1.6rem;
    }
  `,
};

export default function SignInput({ label, type: initialType, placeholder, initialValue, onChange, onKeyDown, errorMsg }) {
  const [value, setValue] = useState(initialValue);
  const [type, setType] = useState(initialType);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const eyeSrc = useRef('/Image/btn_visibility_off_24px.png');

  const handleValueChange = e => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const handleEyeClick = () => {
    // NOTE 현상태의 반대로 변경
    eyeSrc.current = isPasswordShown ? '/Image/btn_visibility_off_24px.png' : '/Image/btn_visibility_on_24px.png';
    type === 'password' ? setType('text') : setType('password');
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div id="signInput" css={style.signInput}>
      <label htmlFor={`for_${initialType}`} className="label">
        {label}
      </label>
      <div className="input-wrap">
        <input
          id={`for_${initialType}`}
          type={type}
          placeholder={placeholder}
          className={`input ${!!errorMsg && 'error'}`}
          value={value}
          onChange={handleValueChange}
          onKeyDown={onKeyDown}
        />
        {initialType === 'password' && (
          <Image src={eyeSrc.current} width={24} height={24} alt="비밀번호 표시" onClick={handleEyeClick} />
        )}
      </div>
      <p>{errorMsg}</p>
    </div>
  );
}
