import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import styles from './CommentList.module.css';
import KebabMenu from './KebabMenu';
import axios from '@/lib/axios';
import { useRouter } from 'next/router';
import createButton from './Button';
import { useState } from 'react';

const CancelButton = createButton({
  style: 'btn_small_40_noBackground',
});
const SubmitButton = createButton({
  style: 'btn_small_40',
});

export default function CommentList({ comments }) {
  const router = useRouter();
  const [editComment, setEditComment] = useState();
  const [editedComment, setEditedComment] = useState('');

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`/article/comments/${id}`);
      router.reload();
    } catch (e) {
      alert('댓글 삭제에 실패했습니다.');
    }
  }

  async function handleEdit(id) {
    const data = { content: editedComment };
    try {
      const res = await axios.patch(`/article/comments/${id}`, data);
      router.reload();
    } catch (e) {
      alert('댓글 수정에 실패했습니다.');
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
          {comment.id === editComment ? (
            <input
              className={styles.commentInput}
              type="text"
              name="content"
              value={editedComment}
              placeholder="댓글을 입력해주세요."
              onChange={(e) => setEditedComment(e.target.value)}
            />
          ) : (
            <div className={styles.commentContent}>
              <p>{comment.content}</p>
              <KebabMenu
                onEditClick={() => {
                  setEditComment(comment.id);
                  setEditedComment(comment.content);
                }}
                onDeleteClick={() => handleDelete(comment.id)}
              />
            </div>
          )}

          <div className={styles.commentMenu}>
            <div className={styles.profile}>
              <Image
                width={24}
                height={24}
                src="/ic_profile.png"
                alt="profile"
              />
              <div className={styles.profile_info}>
                <p>즐거운판다</p>
                <p className={styles.date}>
                  {formatDate(new Date(comment.createdAt))}
                </p>
              </div>
            </div>
            {comment.id === editComment && (
              <div>
                <CancelButton onClick={() => setEditComment()}>
                  취소
                </CancelButton>
                <SubmitButton onClick={() => handleEdit(comment.id)}>
                  수정 완료
                </SubmitButton>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
