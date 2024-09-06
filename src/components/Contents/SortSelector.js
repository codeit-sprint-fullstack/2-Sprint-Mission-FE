import "./style/SortSelector.css";
function SortSelector() {
  return (
    <div id="sort-selector">
      <label for="options" />
      <select id="sort-selector">
        <option value="option1">최신순</option>
        <option value="option2">좋아요순</option>
      </select>
    </div>
  );
}
export default SortSelector;
