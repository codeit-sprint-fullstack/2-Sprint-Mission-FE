import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleDropdown.module.css';
import { useRouter } from 'next/router';
import { instance } from '@/lib/api';

export default function ArticelDropdown({ articleId }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

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
    { value: 'patch', label: '수정하기' },
    { value: 'delete', label: '삭제하기' }
  ];

  async function deleteArticle(articleId) {
    await instance.delete(`/articles/${articleId}`);
  }

  const handleOptionClick = (value) => {
    setIsOpen(false);

    if (value === 'patch') {
      router.push(`/patchArticle/${articleId}`);
    } else {
      deleteArticle(articleId);
      router.push('/');
    }
  };

  return (
    <div ref={dropdownRef} className={styles.menu}>
      <div className={styles.selected}>
        <Image
          src="/images/ic_kebab.svg"
          alt="게시글 드롭다운"
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
        />
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
