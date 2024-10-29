import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import styles from './Dropdown.module.css';

export default function Dropdown({
  className,
  name,
  value,
  options,
  onChange,
  iconMode = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleInputClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const isInside = inputRef.current?.contains(e.target);
      if (!isInside) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`${iconMode ? styles.iconMode : styles.input} ${isOpen ? styles.opened : ''} ${className}`}
      onClick={handleInputClick}
      ref={inputRef}
    >
      {iconMode ? (
        <Image src="/images/articles/ic_kebab.svg" alt="더보기 메뉴 아이콘" width={24} height={24} />
      ) : (
        <div className={styles.labelWrapper}>
        {options.find((option) => option.value === value)?.label || '선택'}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▲</span> {/* 화살표 추가 */}
        </div>
      )}
      {isOpen && (
        <div className={`${styles.options} ${iconMode ? styles.iconModeOptions : ''}`}>
          {options.map((option) => (
            <div
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => onChange(name, option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
