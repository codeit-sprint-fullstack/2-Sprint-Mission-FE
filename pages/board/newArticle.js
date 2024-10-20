import createButton from '@/components/Button';
import styles from '@/styles/newArticle.module.css';

const SubmitButton = createButton({
  style: 'btn_small_40',
});

export default function NewArticle() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <div className={styles.header}>
          <p className={styles.title}>게시글 쓰기</p>
          <SubmitButton>등록</SubmitButton>
        </div>
        <div className={styles.inputs}>
          <div className={styles.input}>
            <p className={styles.inputName}>*제목</p>
            <input
              className={styles.titleInput}
              type="text"
              placeholder="제목을 입력해주세요"
              value=""
            />
          </div>

          <div className={styles.input}>
            <p className={styles.inputName}>*내용</p>
            <input
              className={styles.contentInput}
              type="text"
              placeholder="내용을 입력해주세요"
              value=""
            />
          </div>
        </div>
      </form>
    </div>
  );
}
