import { useEffect, useState } from 'react';
import ProductCommentItem from './ProductCommentItem';
import Image from 'next/image';
import styles from './ProductCommentList.module.css';
import ProductCommentForm from './ProductCommentForm';
import { getProductComments } from '@/lib/api/ProductService';

export default function ProductCommentList({ productId }) {
  const [commentList, setCommentList] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 댓글 목록 불러오기
  useEffect(() => {
    const fetchComments = async () => {
      if (!productId) {
        setError('유효하지 않은 제품 ID입니다.');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const { list } = await getProductComments(productId, 10); // limit을 10으로 설정
        //console.log(list, list);
        setCommentList(list);
      } catch (error) {
        setError('댓글을 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [productId]);

  // 댓글 삭제 처리 함수
  const handleDeleteComment = (commentId) => {
    setCommentList((prevComments) => prevComments.filter(comment => comment.id !== commentId));
  };

  // 댓글 수정 모드 진입 함수
  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  // 댓글 수정 완료 처리 함수
  const handleUpdateComment = (updatedComment) => {
    setCommentList((prevComments) => 
      prevComments.map(comment =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setEditingComment(null); // 수정 모드 해제
  };

  if (isLoading) return <p>댓글을 불러오는 중입니다...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {commentList.length === 0 ? (
        <div className={styles.noComments}>
          <div className={styles.iconWrapper}>
            <Image
              src="/images/items/Img_inquiry_empty.svg"
              alt="댓글 없음"
              fill
              sizes="19.6rem"
            />
          </div>
          <p>아직 문의가 없어요.</p>
        </div>
      ) : (
        <div className={styles.hasComments}>
          {commentList.map((comment) => (
            editingComment && editingComment.id === comment.id ? (
              // 수정 중인 댓글에 대해서는 CommentForm을 렌더링
              <ProductCommentForm
                key={comment.id}
                productId={productId}
                initialComment={editingComment}
                onUpdateComment={handleUpdateComment} // 수정 완료 함수 전달
              />
            ) : (
              // 수정 중이 아닌 댓글에 대해서는 CommentItem을 렌더링
              <ProductCommentItem
                key={comment.id}
                comment={comment}
                onDelete={handleDeleteComment}
                onEdit={handleEditComment} // 수정 모드 활성화 함수 전달
              />
            )
          ))}
        </div>
      )}
    </div>
  );
}
