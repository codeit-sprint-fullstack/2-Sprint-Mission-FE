import "./style/SortSelector.css";
function SortSelector({ onChangeOrder }) {
  const handleSelect = (e) => onChangeOrder(e.target.value);
  return (
    <div id="sort-selector">
      <label for="options" />
      <select id="sort-selector" onChange={handleSelect}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
}
export default SortSelector;
