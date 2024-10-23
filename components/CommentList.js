import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import styles from './CommentList.module.css';
import KebabMenu from './KebabMenu';
import { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';

export default function CommentList({ comments }) {
  const router = useRouter();

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`/article/comments/${id}`);
      router.reload();
    } catch (e) {
      console.log('삭제에 실패했습니다.');
    }
  }

  if (!comments || comments.length === 0) {
    return (
      <div className={styles.empty}>
        <Image width={140} height={140} src={'/reply_empty.png'} alt="empty" />
        아직 댓글이 없어요,
        <br />
        지금 댓글을 달아보세요!
      </div>
    );
  }

  return (
    <div className={styles.comments}>
      {comments.map((comment) => (
        <div className={styles.wrapper} key={comment.id}>
          <div className={styles.commentContent}>
            <p>{comment.content}</p>
            <KebabMenu
              onDeleteClick={() => handleDelete(comment.id)}
            />
          </div>
          <div className={styles.profile}>
            <Image width={24} height={24} src="/ic_profile.png" alt="profile" />
            <div className={styles.profile_info}>
              <p>즐거운판다</p>
              <p className={styles.date}>
                {formatDate(new Date(comment.createdAt))}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
