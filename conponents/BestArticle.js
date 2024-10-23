import Image from "next/image";
import styles from "./BestArticle.module.css";
import bestBedge from "@/public/img_badge.png";
import productImg from "@/public/productImg.png";
import heartIcon from "@/public/ic_heart.png";

export default function BestArticle() {
  return (
    <div className={styles.wrapper}>
      <Image src={bestBedge} alt="bestBedge" />
      <div className={styles.title}>
        <h1>맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?</h1>
        <Image
          className={styles.productImg}
          width="72"
          height="72"
          src={productImg}
          alt="productImg"
        />
      </div>
      <div className={styles.articleInfo}>
        <div className={styles.authorLikes}>
          <p className={styles.name}>총명한판다</p>
          <div className={styles.like}>
            <Image width="16" height="16" src={heartIcon} alt="heart" />
            <p className={styles.likeCount}>9999+</p>
          </div>
        </div>
        <p className={styles.date}>2024. 04. 16</p>
      </div>
    </div>
  );
}
