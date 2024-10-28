import { useState } from "react";
import styles from "./Search.module.css";

const Search = ({ articlesAllData, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const filtered = articlesAllData.filter((article) =>
      article.title.includes(searchTerm)
    );
    onSearch(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.inputBox}>
      <img
        src="/ic_search.png"
        alt="searchIc"
        className={styles.searchIcon}
        onClick={handleSearch}
      />
      <input
        className={styles.searchInput}
        placeholder="검색할 상품을 입력해주세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
