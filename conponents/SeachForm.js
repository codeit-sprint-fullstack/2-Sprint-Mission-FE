import styles from "./SeachForm.module.css";
import searchIcon from "@/public/ic_search.svg";
import Image from "next/image";

export default function SearchForm({ setKeyword }) {
  const handleInputChange = (e) => setKeyword(e.target.value);

  return (
    <div className={styles.searchBar}>
      <Image width="24" height="24" src={searchIcon} alt="searchIcon" />
      <input
        id="searchPostInput"
        className={styles.searchInput}
        placeholder="검색할 상퓸을 입력해주세요"
        onChange={handleInputChange}
      />
    </div>
  );
}
