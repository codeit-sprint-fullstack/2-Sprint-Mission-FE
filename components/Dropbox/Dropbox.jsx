import { useState } from "react";
import styles from "./Dropbox.module.css";

export default function Dropbox() {
  const [sortOption, setSortOption] = useState("recent");

  const handleOptionClick = (e) => {
    setSortOption(e.target.value);
  };
  return (
    <>
      <select
        value={sortOption}
        onClick={handleOptionClick}
        className={styles.sort_dropbox}
      >
        <option value="recent">최신순</option>
        <option value="like">좋아요순</option>
      </select>
    </>
  );
}
