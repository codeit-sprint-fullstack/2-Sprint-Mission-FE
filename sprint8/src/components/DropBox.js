import Image from 'next/image';
import kebab from '@/public/assets/ic_kebab.png';
import style from '@/src/styles/DropBox.module.css';
import { useState } from 'react';

export default function DropBox({ editOnClick, deleteOnClick }) {
  const [isToggle, setIsToggle] = useState(false);
  const toggleMenuList = () => setIsToggle(!isToggle);

  return (
    <div className={style.container}>
      <Image src={kebab} alt="kebab icon" onClick={toggleMenuList} />
      {isToggle && (
        <div className={style.optionList}>
          <button className={style.option} onClick={editOnClick}>
            수정하기
          </button>
          <button className={style.option} onClick={deleteOnClick}>
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}
