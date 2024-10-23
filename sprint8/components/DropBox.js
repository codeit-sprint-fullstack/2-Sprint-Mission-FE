import Image from 'next/image';
import kebab from '@/public/assets/ic_kebab.png';
import { useState } from 'react';

export default function DropBox() {
  const [isToggle, setIsToggle] = useState(false);
  const toggleMenuList = () => setIsToggle(!isToggle);

  return (
    <div>
      <Image src={kebab} alt="kebab icon" onClick={toggleMenuList} />
      {isToggle && (
        <div className={style.sortMenuList}>
          <button className={style.sortMenu}>수정하기</button>
          <button className={style.sortMenu}>삭제하기</button>
        </div>
      )}
    </div>
  );
}
