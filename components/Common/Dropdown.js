import styles from './Dropdown.module.css';
import Image from 'next/image';
import { useState } from 'react';

export default function Dropdown({ sortOrder, setSortOrder, type }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'recent', label: '최신 순' },
    { value: type === 'product' ? 'favorite' : 'like', label: '좋아요 순' }
  ];

  const handleOptionClick = (val) => {
    setSortOrder(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.label}>
          {options.find((option) => option.value === sortOrder)?.label ||
            'Select...'}
        </span>
        <Image
          className={styles.icon}
          src="/images/ic_arrow_down.png"
          width={20}
          height={20}
          alt="정렬 아이콘"
        />
        <Image
          className={styles.mobile}
          src="/images/ic_sort.png"
          width={24}
          height={24}
          alt="모바일 정렬 아이콘"
        />
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
