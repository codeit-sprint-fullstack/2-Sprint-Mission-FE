import { useState, useEffect } from 'react';
import Image from 'next/image';
import style from '@/src/styles/Sorting.module.css';
import arrowIcon from '@/public/assets/ic_arrow.png';
import mSortBtn from '@/public/assets/btn_sort.png';

export default function Sorting({ onOrderChange }) {
  const [isToggle, setIsToggle] = useState(false);
  const [selectOption, setSelectOption] = useState('오래된 순');
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenuList = () => setIsToggle(!isToggle);
  const handleSelectSort = (option) => {
    setSelectOption(option);
    setIsToggle(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 744);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        <Image
          onClick={toggleMenuList}
          src={mSortBtn}
          alt="a down direction arrow and multiple lines"
        />
      ) : (
        <button onClick={toggleMenuList} className={style.sortButton}>
          {selectOption}
          <Image src={arrowIcon} alt="arrow Icon" className={style.arrowIcon} />
        </button>
      )}
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
