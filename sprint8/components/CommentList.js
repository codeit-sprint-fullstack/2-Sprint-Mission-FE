import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/styles/Comment.module.css';
import profileImg from '@/public/assets/img_profile.png';
import DropBox from './DropBox';
import EditComment from './EditComment.js';
import axios from '@/lib/axios.js';
import { useState } from 'react';

export default function CommentList({
  comments,
  onDeleteComment,
  onUpdateComment
}) {
  const router = useRouter();
  const { id } = router.query;
  const [editingCommentId, setEditingCommentId] = useState(null);

  async function updateComment(articleId, commentId, data) {
    try {
      if (data) {
        const res = await axios.patch(
          `/articles/${articleId}/comments/${commentId}`,
          data
        );
        onUpdateComment(res.data);
      }
    } catch (error) {
      console.error('Error patching comment:', error);
    }
  }

  async function deleteComment(articleId, commentId) {
    const res = await axios.delete(
      `/articles/${articleId}/comments/${commentId}`
    );
    onDeleteComment(commentId);
  }

  const handleDelete = (commentId) => {
    deleteComment(id, commentId);
  };

  const handleEditClick = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const submitEdit = (commentId, newComment) => {
    updateComment(id, commentId, { content: newComment });
    setEditingCommentId(null);
  };

  return (
    <>
      {comments.length > 0 ? (
        comments.map((item) => (
          <div key={item.id} className={style.container}>
            {editingCommentId === item.id ? (
              <EditComment
                comment={item.content}
                onCancelClick={handleCancelEdit}
                onEditClick={(newComment) => submitEdit(item.id, newComment)}
              />
            ) : (
              <div className={style.titleAndKebab}>
                <h1 className={style.title}>{item.content}</h1>
                <DropBox
                  editOnClick={() => handleEditClick(item.id)}
                  deleteOnClick={() => handleDelete(item.id)}
                />
              </div>
            )}
            <div className={style.profile}>
              <Image
                src={profileImg}
                alt="a white panda with grey background"
              />
              <div className={style.texts}>
                <p className={style.nickname}>똑똑한 판다</p>
                <p className={style.date}>1시간 전</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className={style.noComment}>아직 댓글이 없습니다.</p>
      )}
    </>
  );
}
