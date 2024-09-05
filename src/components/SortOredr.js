export default function SortOrder(initialOrder= recent, onChange) {

  return (
    <select>
      <option>최신순</option>
      <option>좋아요순</option>
    </select>
  );
}