import styles from '../css/OrderMenu.module.css';
import arrowDown from '../images/ic_arrow_down.png';
import sortIcon from '../images/ic_sort.png';
import { useState } from 'react';
import { useSort } from '../contexts/SortContext';

const OrderMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sortOrder, setSortOrder } = useSort();

  const options = [
    { value: 'recent', label: '최신 순' }
    // { value: 'favorite', label: '좋아요 순' }
  ];

  const handleOptionClick = (val) => {
    setSortOrder(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === sortOrder)?.label ||
          'Select...'}
      </div>
      <img className={styles.icon} src={arrowDown} />
      <img className={styles.mobile} src={sortIcon} />
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderMenu;
