import { useRouter } from 'next/router';
import { createArticle } from '@/lib/api/ArticleService';
import ArticleForm from '@/components/Articles/ArticleForm'; // ArticleForm 임포트

export default function WritePage() {
  const router = useRouter();

  // 폼 제출 시 호출되는 함수
  const handleCreateArticle = async (articleData) => {
    try {
      // 게시글 생성 API 호출
      const createdArticle = await createArticle(articleData);

      // 게시글 등록 후, 생성된 게시글의 상세 페이지로 이동
      router.push(`/articles/${createdArticle.id}`);
    } catch (error) {
      console.error(error);
      alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <ArticleForm onSubmit={handleCreateArticle} />
  );
}
