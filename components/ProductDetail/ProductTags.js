import styles from './ProductTags.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function ProductTags({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 5) {
      setErrorMessage('5글자 이내로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() && !isComposing) {
      e.preventDefault();
      if (inputValue.length <= 5) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
        setErrorMessage('');
      } else {
        setErrorMessage('5글자 이내로 입력해주세요');
      }
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div className={styles.tags}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="태그를 입력하고 엔터를 누르세요"
        style={{ border: errorMessage ? '1px solid red' : 'none' }}
      />
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      <div>
        {tags.map((tag, index) => (
          <div key={index} className={styles.chip}>
            #{tag}
            <button
              onClick={() => handleTagRemove(index)}
              className={styles.remove}
            >
              <Image src="/images/ic_X.png" width={20} height={20} alt="X" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
