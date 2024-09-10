import styles from "./SortSelector.module.css";
function SortSelector({ onChangeOrder, className }) {
  const handleSelect = (e) => onChangeOrder(e.target.value);

  return (
    <div className={`${styles.frame} ${className}`}>
      <label for="options" />
      <select className={styles.sortSelector} onChange={handleSelect}>
        <option value="recent">최신순</option>
        <option value="favorite">좋아요순</option>
      </select>
    </div>
  );
}
export default SortSelector;
