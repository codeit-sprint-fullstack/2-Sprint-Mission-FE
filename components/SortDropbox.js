import styles from "./SortDropbox.module.css";
import Image from "next/image";
import arrowDownIcon from "@/public/ic_arrow_down.svg";
import sortBtnIcon from "@/public/btn_sort.svg";
import { useEffect, useState } from "react";

export default function SortDropbox({ setOrder }) {
  const [isToggle, setIsToggle] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sortOption, setSortOption] = useState("recent");

  const handleOpenToggle = () => setIsToggle(!isToggle);

  useEffect(() => {
    // 화면 너비 체크 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 744);
    };

    // 초기화 및 이벤트 리스너 추가
    handleResize(); // 초기화 (첫 렌더링 시 실행)
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 정렬 옵션 변경 핸들러
  const handleSortOptionChange = (event) => {
    setOrder(event.target.value);
    setSortOption(event.target.value);
    setIsToggle(false);
  };

  // sortOption을 한글로 변환하여 표시
  const getSortOptionLabel = (option) => {
    if (option === "recent") return "최신순";
    if (option === "likeCount") return "좋아요순";
    return "";
  };

  return (
    <div className={styles.wrapper}>
      {!isMobile ? (
        <button className={styles.sortButton} onClick={handleOpenToggle}>
          <p>{getSortOptionLabel(sortOption)}</p>
          <Image
            className={styles.arrowDownIcon}
            width="24"
            height="24"
            src={arrowDownIcon}
            alt="arrowDownIcon"
          />
        </button>
      ) : (
        <Image
          width="42"
          height="42"
          src={sortBtnIcon}
          alt="sortBtnIcon"
          onClick={handleOpenToggle}
        />
      )}
      {isToggle && (
        <div className={styles.sortMenu}>
          <button
            className={styles.sortOption}
            value="recent"
            onClick={handleSortOptionChange}
          >
            최신순
          </button>
          <button
            className={styles.sortOption}
            value="likeCount"
            onClick={handleSortOptionChange}
          >
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}
