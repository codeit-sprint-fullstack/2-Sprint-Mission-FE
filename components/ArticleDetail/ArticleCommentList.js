import styles from './ArticleCommentList.module.css';
import Image from 'next/image';

export default function ArticleCommentList({ articleComments }) {
  return (
    <div>
      {articleComments && articleComments.length > 0 ? (
        <ul className={styles[`comment-list`]}>
          {articleComments.map((comment) => (
            <li className={styles.container} key={comment.id}>
              <div className={styles.content}>
                <p>{comment.content}</p>
                <Image
                  src="/images/ic_kebab.png"
                  width={24}
                  height={24}
                  alt="메뉴 아이콘"
                />
              </div>
              <div className={styles.info}>
                <Image
                  src="/images/size=large.png"
                  width={32}
                  height={32}
                  alt="유저 아이콘"
                />
                <div className={styles.user}>
                  <p>귀여운판다</p>
                  <p>{comment.createdAt}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.null}>
          <Image
            src="/images/Img_reply_empty.png"
            width={140}
            height={140}
            alt="댓글 없을 때 아이콘"
          />
          <p>
            아직 댓글이 없어요,
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      )}
    </div>
  );
}
