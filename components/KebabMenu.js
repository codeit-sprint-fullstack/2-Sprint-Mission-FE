import { useState } from 'react';
import style from './KebabMenu.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function KebabMenu({ onEditClick, onDeleteClick }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Image
        width={24}
        height={24}
        src="/ic_kebab.png"
        alt="kebab"
        onClick={() => setMenuOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {menuOpen && (
        <ul>
          <li onClick={onEditClick}>수정하기</li>
          <li onClick={onDeleteClick}>삭제하기</li>
        </ul>
      )}
    </>
  );
}
