import styles from './ArticleList.module.css';
import Image from 'next/image';
import SearchBar from '@/components/Common/SearchBar';
import Dropdown from '@/components/Common/Dropdown'; // Dropdown 컴포넌트 임포트
import { useState, useEffect, useCallback } from 'react';
import { getArticleList } from '@/lib/api/ArticleService';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import Link from 'next/link';

const ARTICLE_COUNT = 5;

export default function ArticleList({ initialArticles }) {
  const [articles, setArticles] = useState(initialArticles || []);
  const [filteredArticles, setFilteredArticles] = useState(initialArticles || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent'); // Dropdown의 선택 값 상태 추가
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);

  const fetchArticlesData = useCallback(async () => {
    // 이미 초기 데이터를 로드했으면 fetch 생략
    if (hasFetchedInitialData || sortOrder !== 'recent') {
      setLoading(true);
      try {
        const data = await getArticleList({ page: 1, pageSize: ARTICLE_COUNT, orderBy: sortOrder });
        const articlesWithExtras = data.map((article) => ({
          ...article,
          imageUrl: '/images/articles/img_default_article.png',
          nickname: generateRandomNickname(),
          likes: getRandomInt(0, 20000),
          formattedDate: formatDate(article.createdAt),
        }));
        setArticles(articlesWithExtras);
        setFilteredArticles(articlesWithExtras);
      } catch (error) {
        console.error('게시글을 가져오는데 실패했습니다:', error);
        setError('게시글을 불러오는 데 문제가 발생했습니다.');
      } finally {
        setLoading(false);
        setHasFetchedInitialData(true); // 초기 데이터를 로드했음을 설정
      }
    }
  }, [sortOrder, hasFetchedInitialData]);

  useEffect(()=> {
    fetchArticlesData();
  }, [fetchArticlesData]);
  
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

  const handleDropdownChange = (name, value) => {
    setSortOrder(value); // Dropdown에서 선택한 값을 상태로 설정
  };

  if (loading) {
    return <div className='content-spacer'><p>로딩 중...</p></div>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={`${styles.articleContainer} ${filteredArticles.length === 0 ? styles.noArticles : ''}`}>
      <div className={styles.controls}> {/* SearchBar와 Dropdown을 감싸는 div */}
        <SearchBar initialValue="" onSearch={handleSearch} />
        <Dropdown
          className={styles.dropdown}        
          name="sortOrder"
          value={sortOrder}
          options={[
            { label: '최신순', value: 'recent' },
            { label: '생성순', value: 'oldest' },
          ]}
          onChange={handleDropdownChange}
        />
      </div>

      <ul className={styles.articleList}>
        {filteredArticles.map((article) => (
          <li key={article.id} className={styles.articleItem}>
            <div className={styles.articleWrapper}>

              <div className={styles.articleTop}>
                <Link href={`/articles/${article.id}`} passHref>
                  <h3 className={styles.articleTitle}>{article.title}</h3>
                </Link>
                <Link href={`/articles/${article.id}`} passHref>
                  <div className={styles.articleImageWrapper}>
                    <Image
                      src={article.imageUrl}
                      alt="게시글 이미지"
                      fill
                      sizes="8rem"
                      className={styles.articleImage}
                    />
                  </div>
                </Link>
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
                      src="/images/articles/ic_heart.svg"
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
