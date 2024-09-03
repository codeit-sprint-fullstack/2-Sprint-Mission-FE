function PageButton({ value, now, onClick }) {
  const handleClick = () => onClick(value);
  const cn = value === now ? 'now' : '';

  return (
    <button onClick={handleClick} className={cn}>
      {value}
    </button>
  );
}

export default PageButton;
