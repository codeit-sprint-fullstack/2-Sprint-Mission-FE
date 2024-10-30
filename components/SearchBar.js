import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../styles/searchBar.module.css";

export default function SearchBar({ searchPosts }) {
  const [smallSize, setSmallSize] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  //크기에 따른 정렬버튼 이미지
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 743 && windowWidth >= 375) {
      setSmallSize(true);
      return;
    }
    setSmallSize(false);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //검색어에 따른 postList
  function handleChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
      return router.push("/community");
    }
    return router.push(`/search?q=${searchQuery}`);
  }

  return (
    <>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit} className={styles.searchForm}>
          <Image
            src="/searchIcon.png"
            alt="searchIcon"
            className={styles.searchIcon}
            width={24}
            height={24}
          />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색할 상품을 입력해주세요"
            name="q"
            value={searchQuery}
            onChange={handleChange}
          />
        </form>
        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownButton}>
            {!smallSize && (
              <>
                <div>최신순</div>
                <Image
                  src="/toggleArrow.png"
                  alt="toggleArrow"
                  className={styles.toggleArrow}
                  width={24}
                  height={24}
                />
              </>
            )}
            {smallSize && (
              <Image
                src="/smallArrow.png"
                alt="smallArrow"
                className={styles.smallArrow}
                width={24}
                height={24}
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
