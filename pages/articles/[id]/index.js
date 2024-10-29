import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getArticleById } from '@/lib/api/ArticleService';
import ArticleInfo from '@/components/ArticleDetail/ArticleInfo';
import CommentForm from '@/components/ArticleDetail/CommentForm';
import CommentList from '@/components/ArticleDetail/CommentList';
import BackButton from '@/components/ArticleDetail/BackButton';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from '@/components/ArticleDetail/ArticleDetailPage.module.css';

export default function ArticleDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await getArticleById(id);

          // 필요한 추가 정보 설정
          const articleWithExtras = {
            ...data,
            imageUrl: '/images/articles/img_default_article.png', // 기본 이미지 경로
            nickname: generateRandomNickname(), // 랜덤 닉네임 생성
            likes: getRandomInt(0, 20000), // 랜덤 좋아요 수
            formattedDate: formatDate(data.createdAt) // 포맷된 날짜
          };

          setArticle(articleWithExtras);
        } catch (error) {
          setError('게시글을 불러오는 중 오류가 발생했습니다.');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return <div className='content-spacer'><p>로딩 중...</p></div>;
  }
  if (error) return <p>{error}</p>;
  if (!article) return <p>게시글이 존재하지 않습니다.</p>;

  return (
    <div className={styles.container}>
      <ArticleInfo article={article} />                 {/* 게시글 주요 정보 */}
      <CommentForm articleId={id} />                    {/* 댓글 작성 및 등록 */}
      <CommentList comments={article.articleComments} />{/* 댓글 리스트 */}
      <BackButton onClick={() => router.push('/articles')} />
    </div>
  );
}
