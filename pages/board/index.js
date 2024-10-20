import createButton from '@/components/Button';
import styles from '@/styles/board.module.css';

const WriteButton = createButton({
  style: 'btn_small_40',
});

export default function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.wrapper}>
        <div>
          <p className={styles.title}>베스트 게시글</p>
          <di className={styles.bestArticles}>
            <h1>최신 게시글</h1>
            <h1>최신 게시글</h1>
            <h1>최신 게시글</h1>
          </di>
        </div>
        <div>
          <div className={styles.header}>
            <p className={styles.title}>게시글</p>
            <WriteButton>글쓰기</WriteButton>
          </div>
          <div className={styles.header}>
            <input
              className={styles.searchInput}
              placeholder="검색할 상품을 입력해주세요"
            />
            <select>
              <option>최신 순</option>
              <option>좋아요 순</option>
            </select>
          </div>
          <div className={styles.allArticles}>
            <h1>게시글 목록 조회 데이터</h1>
            <h1>게시글 목록 조회 데이터</h1>
            <h1>게시글 목록 조회 데이터</h1>
            <h1>게시글 목록 조회 데이터</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
