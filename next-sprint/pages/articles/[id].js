import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';
import { instance } from '@/lib/api';

export default function Article() {
  const [article, setArticle] = useState(null);
  const router = useRouter();
  const id = router.query['id'];

  async function getArticle(articleId) {
    if (!articleId) return;
    const res = await instance.get(`articles/${articleId}`);
    const article = await res.data;
    setArticle(article);
  }

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [id]);

  if (!article) return;

  return <ArticleDetail article={article} id={id} />;
}
