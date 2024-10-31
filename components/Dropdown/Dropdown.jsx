import { useState, useRef, useEffect } from "react";
import arrowImg from "@/public/ic_arrow_down.svg";
import styles from "./Dropdown.module.css";
import Image from "next/image";

export default function Dropdown({ options, onSelect }) {
  const [sortOption, setSortOption] = useState(options[0]?.value);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (optionValue) => {
    setSortOption(optionValue);
    setIsOpen(false);
    onSelect(optionValue);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.options}>
        {console.log(options)}
        {options.map((option) => (
          <p
            key={option.value}
            className={`${styles.option} ${option.className} ${
              sortOption === option.value ? styles.selectedOption : ""
            }`}
            style={option.style}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </p>
        ))}
      </div>
    </div>
  );
}
