import { useState } from 'react';
import Image from 'next/image';
import style from '@/styles/Sorting.module.css';
import arrowIcon from '@/public/assets/ic_arrow.png';

export default function Sorting({ onOrderChange }) {
  const [isToggle, setIsToggle] = useState(false);
  const [selectOption, setSelectOption] = useState('오래된 순');

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
          <button
            onClick={() => {
              handleSelectSort('최신순');
              onOrderChange('newest');
            }}
            className={style.sortMenu}
          >
            최신순
          </button>
          <button
            onClick={() => {
              handleSelectSort('오래된 순');
              onOrderChange('oldest');
            }}
            className={style.sortMenu}
          >
            오래된 순
          </button>
        </div>
      )}
    </div>
  );
}
