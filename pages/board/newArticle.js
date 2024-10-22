import createButton from '@/components/Button';
import styles from '@/styles/newArticle.module.css';

const SubmitButton = createButton({
  style: 'btn_small_40',
});

export default function NewArticle() {

	async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      ...formValue, // FIXME
    };
    const res = await axios.post('/articles/', data);
    const addedArticle = res.data;
		console.log(addedArticle);
  }
// FIXME: submit 후 페이지 이동 추가

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
            />
          </div>

          <div className={styles.input}>
            <p className={styles.inputName}>*내용</p>
            <input
              className={styles.contentInput}
              type="text"
              placeholder="내용을 입력해주세요"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
