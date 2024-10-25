import Image from "next/image";
import styles from "./BestArticle.module.css";
import bestBedge from "@/public/img_badge.svg";
import productImg from "@/public/productImg.svg";
import heartIcon from "@/public/ic_heart.svg";
import formatDate from "@/lib/formatDate";
import Link from "next/link";

export default function BestArticle({ bestArticles }) {
  return (
    <ul className={styles.wrapper}>
      {bestArticles.map((article) => (
        <li key={article.id}>
          <div className={styles.articleList}>
            <Image src={bestBedge} alt="bestBedge" />
            <Link
              className={styles.linkTitle}
              href={`/freeBoard/articles/${article.id}`}
            >
              <div className={styles.title}>
                <h1>{article.title}</h1>
                <Image
                  className={styles.productImg}
                  width="72"
                  height="72"
                  src={productImg}
                  alt="productImg"
                />
              </div>
            </Link>
            <div className={styles.articleInfo}>
              <div className={styles.authorLikes}>
                <p className={styles.name}>총명한판다</p>
                <div className={styles.like}>
                  <Image width="16" height="16" src={heartIcon} alt="heart" />
                  <p className={styles.likeCount}>9999+</p>
                </div>
              </div>
              <p className={styles.date}>{formatDate(article.createdAt)}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
