import { useState } from 'react';
import Image from 'next/image';
import style from '@/styles/Sorting.module.css';
import arrowIcon from '@/public/assets/ic_arrow.png';

export default function Sorting() {
  const [isToggle, setIsToggle] = useState(false);
  const [selectOption, setSelectOption] = useState('최신순');

  const toggleMenuList = () => setIsToggle(!isToggle);
  const handleSelectSort = (option) => {
    setSelectOption(option);
    setIsToggle(false);
  };

  return (
    <div>
      <button onClick={toggleMenuList} className={style.sortButton}>
        {selectOption}{' '}
        <Image src={arrowIcon} alt="arrow Icon" className={style.arrowIcon} />
      </button>
      {isToggle && (
        <div className={style.sortMenuList}>
          {/*api 연결 시 로직 수정 예정*/}
          <button
            onClick={() => handleSelectSort('최신순')}
            className={style.sortMenu}
          >
            최신순
          </button>
          <button
            onClick={() => handleSelectSort('좋아요순')}
            className={style.sortMenu}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}
