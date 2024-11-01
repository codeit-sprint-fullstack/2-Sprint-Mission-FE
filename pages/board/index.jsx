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
import arrowImg from "@/public/ic_arrow_down.svg";
import styles from "@/styles/board.module.css";

export default function Home() {
  const options = [
    {
      value: "recent",
      label: "최신순",
      style: {
        width: "130px",
        height: "42px",
        border: "1px solid #e5e7eb",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "26px",
        color: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px 12px 0 0",
        boxSizing: "border-box",
      },
    },
    {
      value: "like",
      label: "좋아요순",
      style: {
        width: "130px",
        height: "42px",
        border: "1px solid #e5e7eb",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "26px",
        color: "#1f2937",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0 0 12px 12px",
        boxSizing: "border-box",
      },
    },
  ];

  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState(options[0]?.value);
  const [orderBy, setOrderBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [keyword, setKeyword] = useState("");

  async function getPosts({ orderBy, page, pageSize, keyword }) {
    try {
      const res = await axios.get("/articles", {
        params: { orderBy, page, pageSize, keyword },
      });
      const articles = res.data.list;
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
    setKeyword(word);
  };

  const toggleModal = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (optionValue) => {
    setSortOption(optionValue);
    setOrderBy(optionValue);
    setIsDropdownOpen(false);
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
        <div className={styles.search_form_wrapper}>
          <SearchBar onSearch={handleSearch} />
          <div className={styles.selected_wrapper} onClick={toggleModal}>
            <p className={styles.selected}>
              {options.find((option) => option.value === sortOption)?.label}
            </p>
            <Image src={arrowImg} alt="화살표" />
          </div>
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdown_wrapper}>
            <Dropdown options={options} onSelect={handleOptionSelect} />
          </div>
        )}
      </div>
      <div className={styles.post_wrapper}>
        {posts.map((article) => (
          <div key={article.id} className={styles.post_body_wrapper}>
            <Link href={`/board/${article.id}`} className={styles.link}>
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
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
