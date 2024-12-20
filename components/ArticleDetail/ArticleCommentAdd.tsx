import styles from './ArticleCommentAdd.module.css';
import { createArticleComment } from '@/lib/api/ArticleService';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export default function ArticleCommentAdd() {
  const [content, setContent] = useState<string>('');

  const router = useRouter();
  const articleId = parseInt(router.query['id'] as string, 10);

  const isInputEmpty = (): boolean => {
    return content.trim() !== '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isInputEmpty()) {
      return;
    }

    try {
      await createArticleComment(articleId, { content });
      window.location.reload();
    } catch (err) {
      console.error('댓글 등록에 실패하였습니다.');
    }
  };
  return (
    <div>
      <form className={styles.comment} onSubmit={handleSubmit}>
        <label htmlFor="content">댓글달기</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요."
        />
        <button type="submit" disabled={!isInputEmpty()}>
          등록
        </button>
      </form>
    </div>
  );
}
