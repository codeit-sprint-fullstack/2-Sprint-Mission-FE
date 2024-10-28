import { useState } from 'react';
import styles from './KebabMenu.module.css';
import Image from 'next/image';

export default function KebabMenu({ onEditClick, onDeleteClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Image
				className={styles.button}
        width={24}
        height={24}
        src="/ic_kebab.png"
        alt="kebab"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <ul className={styles.menu}>
          <li onClick={onEditClick}>수정하기</li>
          <li onClick={onDeleteClick}>삭제하기</li>
        </ul>
      )}
    </div>
  );
}
