import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticleDetail from '@/components/ArticleDetail';

export default function Article() {
  const [article, setArticle] = useState(null);
  const router = useRouter();
  const id = router.query['id'];

  async function getArticle(articleId) {
    if (!articleId) return;
    const res = await fetch(`http://localhost:5000/articles/${articleId}`);
    const article = await res.json();
    setArticle(article);
  }

  async function patchArticle(articleId) {
    if (!articleId) return;
    const res = await fetch(`http://localhost:5000/articles/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: titleValue,
        content: contentValue
      })
    });
  }

  useEffect(() => {
    if (id) {
      getArticle(id);
    }
  }, [id]);

  if (!article) return;

  return <ArticleDetail article={article} id={id} />;
}
