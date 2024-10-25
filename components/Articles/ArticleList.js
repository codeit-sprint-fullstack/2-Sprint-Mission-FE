import styles from './ArticleList.module.css';
import Image from 'next/image';
import SearchBar from '@/components/Common/SearchBar'; // 검색 폼 컴포넌트 임포트
import { useState } from 'react';

export default function ArticleList({ articles }) {
  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredArticles(articles); // 검색어가 없으면 전체 게시글로 리셋
    } else {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  };

  return (
    <div className={`${styles.articleContainer} ${filteredArticles.length === 0 ? styles.noArticles : ''}`}>
      <SearchBar initialValue="" onSearch={handleSearch} />
      
      <ul className={styles.articleList}>
        {filteredArticles.map((article) => (
          <li key={article.id} className={styles.articleItem}>
            <div className={styles.articleWrapper}>
              <div className={styles.articleTop}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <div className={styles.articleImageWrapper}>
                  <Image
                    src={article.imageUrl}
                    alt="게시글 이미지"
                    fill
                    sizes="8rem"
                    className={styles.articleImage}
                  />
                </div>
              </div>

              <div className={styles.articleBottom}>
                <div className={styles.articleInfo}>
                  <div className={styles.nicknameWrapper}>
                    <div className={styles.profileIcon}>
                      <Image
                        src="/images/user_profile.png"
                        alt="프로필 이미지"
                        fill
                        sizes="2.4rem"
                      />
                    </div>
                    <span className={styles.nickname}>{article.nickname}</span>
                  </div>
                  <span className={styles.date}>{article.formattedDate}</span>
                </div>
                <div className={styles.likes}>
                  <div className={styles.likesIcon}>
                    <Image
                      src="/images/articles/ic_heart.png"
                      alt="좋아요 아이콘"
                      fill
                      sizes="2.4rem"
                    />
                  </div>
                  {article.likes > 9999 ? '9999+' : article.likes}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
