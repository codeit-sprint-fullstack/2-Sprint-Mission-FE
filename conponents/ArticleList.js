import styles from "./ArticleList.module.css";
import productImg from "@/public/productImg.png";
import heartIcon from "@/public/ic_heart.png";
import profileIcon from "@/public/ic_profile.png";
import Image from "next/image";

export default function ArticleList() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.articleHeader}>
        <p className={styles.title}>
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </p>
        <Image width={72} height={72} src={productImg} alt="product" />
      </div>
      <div className={styles.articleInfo}>
        <div className={styles.nameDate}>
          <Image width={24} height={24} src={profileIcon} alt="profile" />
          <p className={styles.name}>총명한판다</p>
          <p className={styles.date}>2024. 04. 16</p>
        </div>
        <div className={styles.like}>
          <Image width={24} height={24} src={heartIcon} alt="heart" />
          <p>9999+</p>
        </div>
      </div>
    </div>
  );
}
