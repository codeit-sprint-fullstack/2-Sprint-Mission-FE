import Image from "next/image";
import { useState } from "react";
import styles from "../styles/searchBar.module.css";

export default function SearchBar() {
  return (
    <>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="검색할 상품을 입력해주세요"
        />
        <Image
          src="/searchIcon.png"
          alt="searchIcon"
          className={styles.searchIcon}
          width={24}
          height={24}
        />
        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownButton}>
            <div>최신순</div>
            <Image
              src="/toggleArrow.png"
              alt="toggleArrow"
              className={styles.toggleArrow}
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </>
  );
}
