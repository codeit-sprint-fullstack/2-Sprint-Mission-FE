import BestPost from "../../components/BestPost/BestPost";
import Dropbox from "../../components/Dropbox/Dropbox";
import SearchForm from "../../components/SearchForm/SearchForm";
import styles from "./board.module.css";
import Image from "next/image";

import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";
import user from "../../images/board/profile_img.svg";

export default function Board() {
  return (
    <>
      <h2>베스트 게시글</h2>
      <BestPost />
      <div className={styles.post_wrapper}>
        <h2>게시글</h2>
        <button className={styles.post_button}>글쓰기</button>
      </div>
      <div className={styles.option_form}>
        <SearchForm />
        <Dropbox />
      </div>
      <div className={styles.post_content}>
        <div className={styles.post_title}>
          <h3>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h3>
          <Image src={laptop} />
        </div>
        <div className={styles.user_wrapper}>
          <div className={styles.user_stats}>
            <Image src={user} />
            <p>총명한판다</p>
            <div>2024. 04. 16</div>
          </div>
          <div className={styles.like}>
            <Image src={heart} />
            <p>9999+</p>
          </div>
        </div>
      </div>
    </>
  );
}
