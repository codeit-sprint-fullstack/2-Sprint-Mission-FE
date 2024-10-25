import formatDate from "@/lib/formatDate";
import styles from "./ArticleBestList.module.css";
import Link from "next/link";

export default function ArticleBestList({ articles }) {
  return (
    <ul className={styles.container}>
      {articles.map((article) => (
        <li key={article.id} className={styles.elementList}>
          <Link href={`/articles/${article.id}`} className={styles.linkStyle}>
            <div className={styles.bestMark}>
              <img src="/ic_medal.png" alt="best_medal" />
              <p>Best</p>
            </div>
            <div className={styles.contentTable}>
              <div className={styles.titleFont}>{article.title}</div>
              <img src="/defaultimg.png" alt="defalutimg" />
            </div>
            <div className={styles.bottomTable}>
              <div className={styles.author}>
                <p className={styles.nickNames}>총명한 판다</p>
                <p className={styles.like}>❤️ 999+</p>
              </div>
              <p className={styles.date}>
                {formatDate(new Date(article.createdAt))}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
