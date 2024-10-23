import styles from "@/styles/FreeBoard.module.css";
import ArticleList from "@/conponents/ArticleList";
import BestArticle from "@/conponents/BestArticle";
import Header from "@/conponents/Header";

export default function FreeBoard() {
  return (
    <div className={styles.body}>
      <div className={styles.section}>
        <Header>베스트 게시글</Header>
        <BestArticle />
      </div>
      <div className={styles.section}>
        <div className={styles.articleListTitle}>
          <Header>게시글</Header>
          <button className={styles.postBnt}>글쓰기</button>
        </div>
        <ArticleList />
      </div>
    </div>
  );
}
