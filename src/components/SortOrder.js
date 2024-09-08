import { useState } from "react";
import '../css/SortOrder.css'
import dropdownArrowImg from '../image/ic_arrow_down.png'

export default function SortOrder({ initialOrder='recent', onChange }) {
  const [order, setOrder] = useState(initialOrder);

  const handleValueChange = (e) => {
    setOrder(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className="sortOder">
      <select value={order} onChange={handleValueChange}>
        <option className="optionText" key='recent' value='recent'>최신순</option>
        <option className="optionText" key='favorite' value='favorite'>좋아요순</option>
      </select>
      <img src={dropdownArrowImg} className="dropdownArrowImg" />
    </div>
  );
}