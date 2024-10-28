import ArticlePost from '@/src/components/article/ArticlePost';
import { useRouter } from 'next/router';

export default function ArticlePatchPage() {
  const router = useRouter();
  const { articleId } = router.query;
  return <ArticlePost articleId={articleId} />;
}
