import styles from './ArticleHeader.module.css';
import Link from 'next/link';

export default function ArticleHeader() {
  return (
    <div className={styles.wrapper}>
      <h1>게시글</h1>
      <button>
        <Link href="/articles/register">글쓰기</Link>
      </button>
    </div>
  );
}
