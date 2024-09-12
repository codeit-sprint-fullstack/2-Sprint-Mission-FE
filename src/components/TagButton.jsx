import style from './css/TagButton.module.css';
import xIcon from '../Image/ic_X.png';

function TagButton({ name, onClick }) {
  const handleClick = () => onClick(name);

  return (
    <button
      className={`${style['tag-button']}`}
      type="button"
      onClick={handleClick}
    >
      {`#${name}`}
      <img src={xIcon} alt="X" />
    </button>
  );
}

export default TagButton;
