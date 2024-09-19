import { useState } from "react";
import styles from './SortOrder.module.css'
import dropdownArrowImg from '../image/ic_arrow_down.png'
import sortBtn from '../image/btn_sort.png'

const SORT_ORDER_RECENT = 'recent'
const SORT_ORDER_FAVORITE = 'favorite'

export default function SortOrder({ initialOrder=SORT_ORDER_RECENT, onChange }) {
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
            {!isMobile && (order === SORT_ORDER_RECENT ? '최신순' : '좋아요순')}
            <img src={isMobile ? sortBtn : dropdownArrowImg} alt="Dropdown" className={styles.dropdownArrow} />
          </div>
          {dropdownOpen && (
            <ul className={styles.customDropdownList}>
              <li className={styles.itemRecent} onClick={() => handleValueChange(SORT_ORDER_RECENT)}>최신순</li>
              <li className={styles.itemFavorite} onClick={() => handleValueChange(SORT_ORDER_FAVORITE)}>좋아요순</li>
            </ul>
          )}
    </div>
  );
}