import styles from './ProductTags.module.css';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

interface ProductTagsProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductTags({ tags, setTags }: ProductTagsProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 5) {
      setErrorMessage('5글자 이내로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleTagRemove = (index: number) => {
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
        id="tags"
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
