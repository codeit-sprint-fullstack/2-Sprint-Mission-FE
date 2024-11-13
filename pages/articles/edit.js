import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticleForm from '@/components/Articles/ArticleForm';
import { getArticleById, updateArticle } from '@/lib/api/ArticleService';

export default function ArticleEditPage() {
  const router = useRouter();
  const { id } = router.query; // URL의 id 파라미터로부터 게시글 ID를 가져옴
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [loading, setLoading] = useState(true);

  // 기존 게시글 데이터를 불러오는 함수
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const article = await getArticleById(id);
          setInitialTitle(article.title);
          setInitialContent(article.content);
        } catch (error) {
          console.error(error);
          alert('게시글 정보를 불러오는데 실패했습니다.');
          router.push('/articles');
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id, router]);

  // 게시글 수정 처리 함수
  const handleUpdateArticle = async (articleData) => {
    try {
      await updateArticle(id, articleData);
      router.push(`/articles/${id}`); // 수정된 게시글 상세 페이지로 이동
    } catch (error) {
      console.error(error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (loading) return <p>로딩 중...</p>;

  return (
    <ArticleForm
      initialTitle={initialTitle}
      initialContent={initialContent}
      onSubmit={handleUpdateArticle}
      isEdit={true}
    />
  );
}
