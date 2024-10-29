import BestPost from "@/components/BestPost/BestPost";
import Dropdown from "@/components/Dropdown/Dropdown";
import SearchBar from "@/components/SearchBar/SearchBar";
import styles from "@/styles/board.module.css";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = (word) => {
    setSearch(word);
  };

  return (
    <>
      <p className={styles.best_post}>베스트 게시글</p>
      <BestPost />
      <div className={styles.post_wrapper}>
        <p className={styles.post}>게시글</p>
        <button className={styles.writing_button}>
          <Link href="/board/register" className={styles.writing}>
            글쓰기
          </Link>
        </button>
      </div>
      <div className={styles.search_form}>
        <SearchBar initialValue={handleSearch} />
        <Dropdown />
      </div>
    </>
  );
}
