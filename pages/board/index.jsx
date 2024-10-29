import axios from "@/lib/axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import BestPost from "@/components/BestPost/BestPost";
import Dropdown from "@/components/Dropdown/Dropdown";
import SearchBar from "@/components/SearchBar/SearchBar";
import defaultImg from "@/public/img_default.svg";
import profile from "@/public/ic_profile.svg";
import heart from "@/public/ic_heart.svg";
import styles from "@/styles/board.module.css";

export default function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [keyword, setKeyword] = useState("");

  async function getPosts({ orderBy, page, pageSize, keyword }) {
    try {
      const res = await axios.get("/articles", {
        params: { orderBy, page, pageSize, keyword },
      });
      const articles = res.data;
      setPosts(articles);
    } catch (error) {
      console.error(
        "API 요청 오류:",
        error.response ? error.response.data : error.message
      );
    }
  }

  useEffect(() => {
    getPosts({ orderBy, page, pageSize, keyword });
  }, [orderBy, page, pageSize, keyword]);

  const handleSearch = (word) => {
    setSearch(word);
  };

  return (
    <>
      <p className={styles.best_post}>베스트 게시글</p>
      <BestPost />
      <div className={styles.post_header_wrapper}>
        <p className={styles.post_text}>게시글</p>
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
      <div className={styles.post_wrapper}>
        {posts.map((article) => (
          <div key={article.id} className={styles.post_body_wrapper}>
            <div className={styles.title_header}>
              <p className={styles.post_title}>{article.title}</p>
              <Image src={defaultImg} alt="노트북 이미지" />
            </div>
            <div className={styles.user_info}>
              <div className={styles.user_info_left}>
                <Image src={profile} alt="프로필 사진" />
                <p className={styles.panda}>총명한 판다</p>
                <p className={styles.date}>2024.04.16</p>
              </div>
              <div className={styles.user_info_right}>
                <Image src={heart} alt="하트" />
                <p className={styles.heart}>9999+</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
