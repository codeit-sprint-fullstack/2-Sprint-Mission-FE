import { useState } from "react";
import styles from './SortOrder.module.css'
import dropdownArrowImg from '../image/ic_arrow_down.png'
import sortBtn from '../image/btn_sort.png'

export default function SortOrder({ initialOrder='recent', onChange }) {
  const [order, setOrder] = useState(initialOrder);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = window.innerWidth <= 743;

  const handleValueChange = (v) => {
    setOrder(v);
    onChange(v);
    setDropdownOpen(false);
  }
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className={styles.sortOder} onClick={toggleDropdown}>
      <div className={styles.customDropdownSelected}>
            {!isMobile && (order === 'recent' ? '최신순' : '좋아요순')}
            <img src={isMobile ? sortBtn : dropdownArrowImg} alt="Dropdown" className={styles.dropdownArrow} />
          </div>
          {dropdownOpen && (
            <ul className={styles.customDropdownList}>
              <li className={styles.itemRecent} onClick={() => handleValueChange('recent')}>최신순</li>
              <li className={styles.itemFavorite} onClick={() => handleValueChange('favorite')}>좋아요순</li>
            </ul>
          )}
    </div>
  );
}