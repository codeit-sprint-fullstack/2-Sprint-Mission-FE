import { getArticleById } from '@/lib/api/ArticleService';
import ArticleInfo from '@/components/ArticleDetail/ArticleInfo';
import BackButton from '@/components/Common/BackButton';
import { generateRandomNickname, getRandomInt } from '@/lib/utils';
import formatDate from '@/lib/formatDate';
import styles from '@/styles/ArticleDetailPage.module.css';
import { useRouter } from 'next/router';
import ArticleCommentForm from '@/components/ArticleDetail/ArticleCommentForm';
import ArticleCommentList from '@/components/ArticleDetail/ArticleCommentList';

export async function getServerSideProps(context) {
  const id = context.query['id'];
  const data = await getArticleById(id);
  // 필요한 추가 정보 설정
  const articleWithExtras = {
    ...data,
    imageUrl: '/images/articles/img_default_article.png', // 기본 이미지 경로
    nickname: generateRandomNickname(), // 랜덤 닉네임 생성
    likes: getRandomInt(0, 20000), // 랜덤 좋아요 수
    formattedDate: formatDate(data.createdAt) // 포맷된 날짜
  };

  return {
    props: {
      articleWithExtras, 
      id,
    },
  }
}

export default function ArticleDetailPage({id, articleWithExtras : article }) {
  const router = useRouter();
  if (!article) return <p>게시글이 존재하지 않습니다.</p>;

  return (
    <div className={styles.container}>
      <ArticleInfo article={article} />                 {/* 게시글 주요 정보 */}
      <ArticleCommentForm articleId={id} />                    {/* 댓글 작성 및 등록 */}
      <ArticleCommentList comments={article.articleComments} />{/* 댓글 리스트 */}
      <BackButton onClick={() => router.push('/articles')} />
    </div>
  );
}
