import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown({ setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOprtion] = useState('old');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const options = [
    { value: 'old', label: '기본' },
    { value: 'recent', label: '최신순' }
  ];

  const handleOptionClick = (value) => {
    setSelectedOprtion(value);
    setSortOption(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.menu}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === selectedOption).label}
        <div className={styles.arrow}>
          <Image fill src="/images/ic_arrow_down.svg" alt="드롭다운 화살표" />
        </div>
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
