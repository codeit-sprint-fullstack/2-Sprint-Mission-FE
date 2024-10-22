import formatDate from '@/lib/formatDate';
import Image from 'next/image';
import styles from '@/styles/article.module.css';
import axios from '@/lib/axios';
import CommentList from '@/components/CommentList';
import createButton from '@/components/Button';

const RegisterButton = createButton({
  style: 'btn_small_40',
});
const BackButton = createButton({
  style: 'btn_medium',
});

export async function getServerSideProps(context) {
  const articleId = context.params['id'];

  const res = await axios.get(`/articles/${articleId}`);
  const article = res.data;

  return {
    props: {
      article,
    },
  };
}

export default function Article({ article }) {
  return (
    <div className={styles.article}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <div className={styles.head_title}>
            <p className={styles.title}>{article.title}</p>
            <Image width={24} height={24} src="/ic_kebab.png" alt="kebab" />
          </div>
          <div className={styles.head_info}>
            <div className={styles.head_profile}>
              <Image
                width={40}
                height={40}
                src="/ic_profile.png"
                alt="profile"
              />
              <p>똑똑한판다</p>
              <p>{formatDate(new Date(article.createdAt))}</p>
            </div>
            <div className={styles.head_favorites}>
              <Image width={32} height={32} src="/ic_heart.png" alt="heart" />
              <p>{article.favorites}</p>
            </div>
          </div>
          <p className={styles.articleContent}>{article.content}</p>
        </div>
        <form className={styles.commentForm}>
          <p className={styles.commentTitle}>댓글달기</p>
          <input
            className={styles.commentInput}
            type="text"
            placeholder="댓글을 입력해주세요."
          />
          <div className={styles.registerButton}>
            <RegisterButton>등록</RegisterButton>
          </div>
        </form>
        <CommentList articleId={article.id} />
      </div>
      <BackButton>
        <div className={styles.buttonContent}>
          <p>목록으로 돌아가기</p>
          <Image width={24} height={24} src="/ic_back.png" alt="back" />
        </div>
      </BackButton>
    </div>
  );
}
