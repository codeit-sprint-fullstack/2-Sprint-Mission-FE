import styles from "./ArticleList.module.css";
import productImg from "@/public/productImg.png";
import heartIcon from "@/public/ic_heart.png";
import profileIcon from "@/public/ic_profile.png";
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import Link from "next/link";

export default function ArticleList({ articles }) {
  return (
    <ul className={styles.wrapper}>
      {articles.map((article) => (
        <li key={article.id}>
          <div className={styles.articleList}>
            <Link
              className={styles.linkTitle}
              href={`/freeBoard/articles/${article.id}`}
            >
              <div className={styles.articleHeader}>
                <p className={styles.title}>{article.title}</p>
                <Image width={72} height={72} src={productImg} alt="product" />
              </div>
            </Link>
            <div className={styles.articleInfo}>
              <div className={styles.nameDate}>
                <Image width={24} height={24} src={profileIcon} alt="profile" />
                <p className={styles.name}>총명한판다</p>
                <p className={styles.date}>{formatDate(article.createdAt)}</p>
              </div>
              <div className={styles.like}>
                <Image width={24} height={24} src={heartIcon} alt="heart" />
                <p>9999+</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
