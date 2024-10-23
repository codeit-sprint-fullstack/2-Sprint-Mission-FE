import styles from './ArticleDetail.module.css';
import Image from 'next/image';

export default function ArticleDetail({ article }) {
  const formattedDate = new Date(article.createdAt)
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .replace(/\s/g, '')
    .replace(/\./g, '.')
    .slice(0, -1);

  return (
    <ul>
      <li key={article.id}>
        <header>
          <div>
            <h3>{article.title}</h3>
          </div>
          <div>
            <div>
              <div className={styles.profile}>
                <Image fill src="/images/ic_profile.svg" alt="프로필 이미지" />
              </div>
              <h3>총명한 판다</h3>
              <h3>{formattedDate}</h3>
            </div>
            <div>
              <div className={styles.heart}>
                <Image fill src="/images/ic_heart.svg" alt="좋아요 이미지" />
              </div>
              <h3>9999+</h3>
            </div>
          </div>
        </header>
        <main>
          <h4>{article.content}</h4>
          <form>
            <h4>댓글 달기</h4>
            <input placeholder="댓글을 입력하세요" />
            <button type="submit">등록</button>
          </form>
        </main>
        <footer></footer>
      </li>
    </ul>
  );
}
