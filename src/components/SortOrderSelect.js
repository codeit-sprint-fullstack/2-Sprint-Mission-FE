import '../css/SortOrderSelect.css';
import { useState } from 'react';
import { useViewport, VIEWPORT } from '../contexts/ViewportContext';
import sortIcon from '../Image/ic_sort.svg';
import arrowDown from '../Image/ic_arrow_down.svg';

export const SORT_ORDER = Object.freeze({
  RECENT: 'recent',
  FAVORITE: 'favorite'
});

const SORT_ORDER_MSG = Object.freeze({
  [SORT_ORDER.RECENT]: '최신순',
  [SORT_ORDER.FAVORITE]: '좋아요순'
});

function SortOrderSelect({ initialSortOrder = SORT_ORDER.RECENT, onChange }) {
  const viewport = useViewport();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const handleOrderChange = (o) => {
    setSortOrder(o);
    onChange(o);
    setDropdownOpen(false);
  };
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="sort-order-wrapper">
      <div className="sort-order" onClick={toggleDropdown}>
        {viewport !== VIEWPORT.MOBILE && SORT_ORDER_MSG[sortOrder]}
        <img
          src={viewport !== VIEWPORT.MOBILE ? arrowDown : sortIcon}
          alt="sortOrderImg"
        />
      </div>
      {dropdownOpen && (
        <ul className="sort-order-list">
          {Object.values(SORT_ORDER).map((o) => {
            return (
              <li onClick={() => handleOrderChange(o)} key={o}>
                {SORT_ORDER_MSG[o]}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default SortOrderSelect;
