import styles from "./SeachForm.module.css";
import searchIcon from "@/public/ic_search.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SearchForm({ setKeyword }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    // 300ms 후에 setKeyword 실행
    const timer = setTimeout(() => {
      setKeyword(inputValue);
    }, 300);

    // 컴포넌트가 언마운트되거나 inputValue가 변경될 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [inputValue, setKeyword]);

  return (
    <div className={styles.searchBar}>
      <Image width="24" height="24" src={searchIcon} alt="searchIcon" />
      <input
        id="searchPostInput"
        className={styles.searchInput}
        placeholder="검색할 상품을 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
}
