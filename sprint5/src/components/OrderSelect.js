export default function OrderSelect({ value, onChange }) {
  const handleChange = (e) => onChange(e.target.value);

  return (
    <select value={value} onChange={handleChange}>
      <option value="recent">최신 순</option>
      <option value="favorite">좋아요 순</option>
    </select>
  );
}
