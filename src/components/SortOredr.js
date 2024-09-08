import { useState } from "react";

export default function SortOrder({ initialOrder='recent', onChange }) {
  const [order, setOrder] = useState(initialOrder);

  const handleValueChange = (e) => {
    setOrder(e.target.value);
    onChange(e.target.value);
  }

  return (
    <select value={order} onChange={handleValueChange}>
      <option key='recent' value='recent'>최신순</option>
      <option key='favorite' value='favorite'>좋아요순</option>
    </select>
  );
}