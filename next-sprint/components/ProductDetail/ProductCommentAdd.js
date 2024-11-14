import styles from './ProductCommentAdd.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductCommentAdd() {
  const [content, setContent] = useState('');

  const router = useRouter();
  const productId = router.query['id'];

  const isInputEmpty = () => {
    return content.trim() !== '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isInputEmpty()) {
      return;
    }

    try {
      await createProductComment(productId, { content });
      window.location.reload();
    } catch (err) {
      console.error('댓글 등록에 실패하였습니다.');
    }
  };
  return (
    <div>
      <form className={styles.comment} onSubmit={handleSubmit}>
        <label htmlFor="content">문의하기</label>
        <textarea
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
        />
        <button type="submit" disabled={!isInputEmpty()}>
          등록
        </button>
      </form>
    </div>
  );
}
