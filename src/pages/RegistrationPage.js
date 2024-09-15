import styles from './RegistrationPage.module.css'
import tagDeletIcon from '../image/ic_X.png'

export default function RegistrationPage() {
  return (
    <div className={styles.regContainer}>
      <div className={styles.regSection}>
        <form className={styles.regTitle}>
          <label>상품 등록하기</label>
          <button className={styles.regBtn}>등록</button>
        </form>
        <form className={styles.regName}>
          <label>상품명</label>
          <input placeholder="상품명을 입력해주세요" />
        </form>
        <form className={styles.regIntroduction}>
          <label>상품 소개</label>
          <textarea placeholder="상품 소개를 입력해주세요" />
        </form>
        <form className={styles.regPrice}>
          <label>판매가격</label>
          <input placeholder="판매 가격을 입력해주세요" />
        </form>
        <form className={styles.regTag}>
          <label>태그</label>
          <div className={styles.inputTag}>
            <input placeholder="태그를 입력해주세요" />
            <div className={styles.tag}>
              <p>#티셔츠</p>
              <img src={tagDeletIcon} alt='tagDeletIcon' />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}