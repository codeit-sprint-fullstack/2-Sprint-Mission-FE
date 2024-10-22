import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import styles from './CommentList.module.css';

export default function CommentList({ articleId }) {
  const articleComments = []; // FIXME: 댓글 불러오기

  // FIXME: 댓글 없을 때 내용 수정
  if (!articleComments || articleComments.length === 0) {
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
    <div>
      <div>
        <p>comment title</p>
        <Image width={24} height={24} src="/ic_kebab.png" alt="kebab" />
      </div>
      <div>
        <Image width={24} height={24} src="/ic_profile.png" alt="profile" />
        <div>
          <p>똑똑한판다</p>
          <p>{formatDate(new Date(article.createdAt))}</p>
        </div>
      </div>
    </div>
  );
}
