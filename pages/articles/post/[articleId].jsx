import { useRouter } from 'next/router';
import ArticlePost from '@components/article/ArticlePost';

export default function ArticlePatchPage() {
  const router = useRouter();
  const { articleId } = router.query;
  return <ArticlePost articleId={articleId} />;
}
