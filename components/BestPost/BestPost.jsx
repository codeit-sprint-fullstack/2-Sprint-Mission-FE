import Image from "next/image";
import styles from "./BestPost.module.css";
import badge from "../../images/board/best_badge.svg";
import laptop from "../../images/board/laptop_img.svg";
import heart from "../../images/board/heart_img.svg";

export default function BestPost() {
  return (
    <>
      <div className={styles.best_container}>
        <div className={styles.best_wrapper}>
          <Image src={badge} />
          <div className={styles.title_img}>
            <h3>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h3>
            <Image src={laptop} />
          </div>
          <div className={styles.user_wrapper}>
            <div className={styles.user_stats}>
              <p>총명</p>
              <Image src={heart} />
              <p>9999+</p>
            </div>
            <div className={styles.create_at}>2024. 04. 16</div>
          </div>
        </div>
        <div className={styles.best_wrapper}>
          <Image src={badge} />
          <div className={styles.title_img}>
            <h3>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h3>
            <Image src={laptop} />
          </div>
          <div className={styles.user_wrapper}>
            <div className={styles.user_stats}>
              <p>총명한판다</p>
              <Image src={heart} />
              <p>9999+</p>
            </div>
            <div className={styles.create_at}>2024. 04. 16</div>
          </div>
        </div>
        <div className={styles.best_wrapper}>
          <Image src={badge} />
          <div className={styles.title_img}>
            <h3>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h3>
            <Image src={laptop} />
          </div>
          <div className={styles.user_wrapper}>
            <div className={styles.user_stats}>
              <p>총명한판다</p>
              <Image src={heart} />
              <p>9999+</p>
            </div>
            <div className={styles.create_at}>2024. 04. 16</div>
          </div>
        </div>
      </div>
    </>
  );
}
