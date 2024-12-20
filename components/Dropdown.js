import { useState } from "react";
import styles from "./Dropdown.module.css"; // 스타일링을 위한 CSS 파일

export default function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
  const [selectedOption, setSelectedOption] = useState(options[0]?.label || ""); // 기본 선택된 옵션

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false); // 드롭다운 닫기

    // 각 옵션의 동작을 수행
    if (option.action) {
      option.action(option.id); //id값 동작 수행
    } else {
      option.action && option.action(); //그냥동작수행
    }
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selectedOption}
        <img src="/ic_arrow_down.png" alt="dropDown" />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div
              key={option.label}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
