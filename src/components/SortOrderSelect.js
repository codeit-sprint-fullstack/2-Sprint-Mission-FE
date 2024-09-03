import { useState } from 'react';
import '../css/SortOrderSelect.css';

export const SORT_ORDER = Object.freeze({
  RECENT: 'recent',
  FAVORITE: 'favorite'
});

const SORT_ORDER_MSG = Object.freeze({
  [SORT_ORDER.RECENT]: '최신순',
  [SORT_ORDER.FAVORITE]: '좋아요순'
});

function SortOrderSelect({ initialSortOrder = SORT_ORDER.RECENT, onChange }) {
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  const handleValueChange = (e) => {
    setSortOrder(e.target.value);
    onChange(e.target.value);
  };

  return (
    <select
      className="sort-order"
      value={sortOrder}
      onChange={handleValueChange}
    >
      {Object.entries(SORT_ORDER).map(([key, val]) => (
        <option value={val} key={key}>
          {SORT_ORDER_MSG[val]}
        </option>
      ))}
    </select>
  );
}

export default SortOrderSelect;
