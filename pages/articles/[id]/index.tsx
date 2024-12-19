import styles from '@/styles/ArticleDetail.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getArticle,
  getArticleCommentList,
  createArticleLike,
  deleteArticleLike
} from '@/lib/api/ArticleService';
import ArticleCommentAdd from '@/components/ArticleDetail/ArticleCommentAdd';
import ArticleCommentList from '@/components/ArticleDetail/ArticleCommentList';
import formatDate from '@/lib/utils/formatDate';
import ArticleDropdown from '@/components/ArticleDetail/ArticleDropdown';
import Spinner from '@/components/Common/Spinner';
import { Article, Comments } from '@/types/type';

export default function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [articleComments, setArticleComments] = useState<Comments>({
    nextCursor: 0,
    list: []
  });

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  const articleId = router.query['id'];

  useEffect(() => {
    if (!articleId) return;

    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        router.push('/signin');
        return;
      }

      try {
        const articleData = await getArticle(articleId);
        const commentsData = await getArticleCommentList(articleId);

        setArticle(articleData);
        setArticleComments(commentsData || []);
        setLikeCount(articleData.likeCount);
        setIsLiked(articleData.isLiked);
        setLoading(false);
      } catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [articleId]);

  if (loading) return <Spinner />;
  if (!article) return <div>해당 상품을 찾을 수 없습니다.</div>;

  const handleBackList = () => router.push('/articles');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  const handleLikeClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/signin');
      return;
    }

    try {
      if (isLiked) {
        await deleteArticleLike(articleId);
        setLikeCount(likeCount - 1);
      } else {
        await createArticleLike(articleId);
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      setLoading(false);
      console.error('좋아요 처리 중 오류 발생:', err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.article}>
        <div className={styles[`article-header`]}>
          <div className={styles[`article-title`]}>
            <h1>{article.title}</h1>
            <div className={styles.menu}>
              <Image
                src="/images/ic_kebab.png"
                width={24}
                height={24}
                onClick={handleMenuClick}
                alt="메뉴 아이콘"
              />
              {dropdownOpen && (
                <div className={styles.dropdown}>
                  <ArticleDropdown />
                </div>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles[`user-info`]}>
              <Image
                className={styles.image}
                src="/images/size=large.png"
                width={40}
                height={40}
                alt="유저 아이콘"
              />
              <p className={styles.name}>{article.writer.nickname}</p>
              <p className={styles.date}>{formatDate(article.createdAt)}</p>
            </div>
            <div className={styles[`like-wrap`]}>
              <div className={styles.like} onClick={handleLikeClick}>
                <Image
                  src={
                    isLiked
                      ? '/images/ic_heart_active.png'
                      : '/images/ic_heart.png'
                  }
                  width={32}
                  height={32}
                  alt="좋아요 아이콘"
                />
                <p>{likeCount}</p>
              </div>
            </div>
          </div>
        </div>
        <p>{article.content}</p>
      </div>
      <ArticleCommentAdd />
      <ArticleCommentList articleComments={articleComments.list || []} />
      <button className={styles[`back-list`]} onClick={handleBackList}>
        목록으로 돌아가기
        <Image
          src="/images/ic_back.png"
          width={24}
          height={24}
          alt="목록 아이콘"
        />
      </button>
    </div>
  );
}
