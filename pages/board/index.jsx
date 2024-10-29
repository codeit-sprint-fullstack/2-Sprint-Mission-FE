import BestPost from "@/components/BestPost/BestPost";
import styles from "@/styles/board.module.css";

export default function Home() {
  return (
    <>
      <p className={styles.best_post}>베스트 게시글</p>
      <BestPost />
    </>
  );
}
