import Link from "next/link";
import styles from "./ArticleList.module.css";
import formatDate from "@/lib/formatDate";

export default function ArticleList({ articlesAllData }) {
  return (
    <ul className={styles.container}>
      {articlesAllData.map((article) => (
        <li key={article.id} className={styles.elementList}>
          <Link href={`/articles/${article.id}`} className={styles.linkStyle}>
          <div className={styles.contentTable}>
            <div className={styles.titleFont}>{article.title}</div>
            <img src="/defaultimg.png" alt="defalutimg" />
          </div>
          <div className={styles.bottomTable}>
            <div className={styles.author}>
              <img src="/ic_profile.png" alt="profile" />
              <p className={styles.nickNames}>총명한 판다</p>
              <p className={styles.date}>
                {formatDate(new Date(article.createdAt))}
              </p>
            </div>
            <p className={styles.like}>❤️ 999+</p>
          </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
