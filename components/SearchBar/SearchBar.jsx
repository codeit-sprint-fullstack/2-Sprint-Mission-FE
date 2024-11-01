import { useRouter } from "next/router";
import { useState } from "react";
import searchIcon from "@/public/ic_search.svg";
import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar({ onSearch }) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      router.push("/board");
      return;
    }
    onSearch(value);
  };

  return (
    <form className={styles.search_bar} onSubmit={handleSubmit}>
      <Image src={searchIcon} alt="돋보기" />
      <input
        className={styles.search_input}
        value={value}
        placeholder="검색할 상품을 입력해주세요"
        onChange={handleChange}
      />
    </form>
  );
}
