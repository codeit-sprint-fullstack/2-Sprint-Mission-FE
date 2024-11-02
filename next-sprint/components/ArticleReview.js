import styles from './ArticleReview.module.css';
import Image from 'next/image';
import ArticelReviewDropdown from './ArticleReviewDropdown';
import { useState, useEffect } from 'react';
import { instance } from '@/lib/api';
import formatDate from '@/lib/formatDate';

export default function ArticleReview({ reviews: initialReviews, articleId }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    async function getArticleReview(articleId) {
      const res = await instance.get(`/articleComments/${articleId}`);
      const review = await res.data;
      setReviews(review);
    }
    getArticleReview(articleId);
  }, [articleId, reviews]);

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditValue(review.content);
  };

  const handleSaveClick = async (reviewId) => {
    const res = await instance.patch(`/articleComments/${reviewId}`, {
      content: editValue
    });

    if (res.status === 201 || res.status === 200) {
      await res.data;
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, content: editValue } : review
        )
      );
      setEditingReviewId(null);
      setEditValue('');
    }
  };

  const handleRemoveClick = async (reviewId) => {
    const res = await instance.delete(`/articleComments/${reviewId}`);

    if (res.status === 201 || res.status === 200) {
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    }
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.noneSection}>
        <Image
          width={140}
          height={140}
          src="/images/Img_reply_empty.svg"
          alt="빈 이미지"
        />
        <span>
          아직 댓글이 없어요.
          <br />
          지금 댓글을 달아보세요.
        </span>
      </div>
    );
  }

  return (
    <ul className={styles.ul}>
      {reviews.map((review) => {
        const formattedDate = formatDate(review.createdAt);

        return (
          <li key={review.id} className={styles.li}>
            <div className={styles.sectionHeader}>
              {editingReviewId === review.id ? (
                <textarea
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className={styles.editInput}
                ></textarea>
              ) : (
                <h3 className={styles.content}>{review.content}</h3>
              )}
              <ArticelReviewDropdown
                onEditClick={() => handleEditClick(review)}
                onDeleteClick={() => handleRemoveClick(review.id)}
              />
            </div>
            <div className={styles.sectionFooter}>
              <div className={styles.profile}>
                <Image fill src="/images/ic_profile.svg" alt="프로필 이미지" />
              </div>
              <div className={styles.userTxt}>
                <h3>총명한 판다</h3>
                <h3>{formattedDate}</h3>
              </div>
            </div>
            {editingReviewId === review.id && (
              <button
                className={styles.saveBtn}
                onClick={() => handleSaveClick(review.id)}
              >
                저장하기
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
