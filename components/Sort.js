import Image from "next/image";
import style from './styles/Sort.module.css';
import ic_sort from "@/public/ic_sort.png";
import ic_arrow_down from "@/public/ic_arrow_down.png";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Sort({ pageSize, order, setOrder, setCurrentPage }) {
  const [isToggle, setIsToggle] = useState(false); // 토글 상태를 저장
  const router = useRouter();
  const isItem = router.pathname === '/items';

  let MOBILE_PAGE_SIZE;
  if (isItem) MOBILE_PAGE_SIZE = 4;
  else MOBILE_PAGE_SIZE = 1;

  const toggleSortMenu = () => {
    setIsToggle((prev) => !prev);  // 토글 상태를 변경
  };

  const handleNewestClick = () => {
    setOrder("recent");   // 최신순으로 정렬
    setIsToggle(false);   // 토글 닫기
    setCurrentPage(1);    // 페이지 초기화
  };

  const handleBestClick = () => {
    setOrder("favorite"); // 좋아요순으로 정렬
    setIsToggle(false);   // 토글 닫기
    setCurrentPage(1);    // 페이지 초기화
  };

    return (
    <div className={style.sortMenu}>
      <button className={style.sortToggle} onClick={toggleSortMenu}>
        {pageSize === MOBILE_PAGE_SIZE ? (
          <Image src={ic_sort} alt="ic_sort" />
        ) : (
          <div className={style.sortContext}>
            {order === "favorite" ? <p>좋아요순</p> : <p>최신순</p>}
            <Image
              className={style.arrow}
              src={ic_arrow_down}
              alt="ic_arrow_down"
            />
          </div>
        )}
      </button>
      {isToggle && (
        <div className={style.sortOptions}>
          <button className={style.sortButton} onClick={handleNewestClick}>
            최신순
          </button>
          <span />
          <button className={style.sortButton} onClick={handleBestClick}>
            좋아요순
          </button>
        </div>
      )}
    </div>
  );
}
