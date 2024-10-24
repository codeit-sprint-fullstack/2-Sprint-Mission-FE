import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/styles/Comment.module.css';
import profileImg from '@/public/assets/img_profile.png';
import DropBox from './DropBox';
import axios from '@/lib/axios.js';

export default function Comment({ comments, onDeleteComment }) {
  const router = useRouter();
  const { id } = router.query;

  async function deleteComment(articleId, commentId) {
    const res = await axios.delete(
      `/articles/${articleId}/comments/${commentId}`
    );
    onDeleteComment(commentId);
  }

  const handleDelete = (commentId) => {
    deleteComment(id, commentId);
  };

  return (
    <>
      {comments.length > 0 ? (
        comments.map((item, index) => (
          <div key={index} className={style.container}>
            <div className={style.titleAndKebab}>
              <h1 className={style.title}>{item.content}</h1>
              <DropBox deleteOnClick={() => handleDelete(item.id)} />
            </div>
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
        <p className={style.noComment}>댓글이 없습니다.</p>
      )}
    </>
  );
}
