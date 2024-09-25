import createButton from '../components/Button';
import styles from './RegistrationPage.module.css';
import xIcon from '../assets/x-icon.png';
import useRegisterValidation from '../hook/useRegisterValidation'
import { createProduct } from '../api';
import { useNavigate } from 'react-router-dom';

const RegistrationButton = createButton({
  style: "btn_small_40"
})

function Registration() {
  const navigate = useNavigate();
  const {
    name, setName, nameError, validateName, description, setDescription, descriptionError, validateDescription, price, setPrice, priceError, validatePrice, tag, tags, setTag, handleKeyUp, removeTag, tagError, isFormValid
  } = useRegisterValidation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      "name": name, 
      "description": description, 
      "price": Number(price), 
      "tags": tags.join(",")
    }

    const result = await createProduct(productData);
    if (!result) {
      return;
    } else {
      navigate("/details")
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <form className={styles.registrationForm} onSubmit={handleSubmit}>
        <div className={styles.titles}>
          <p className={styles.title}>상품 등록하기</p>
          <RegistrationButton className={styles.registrationButton} disabled={!isFormValid()}>등록</RegistrationButton>
        </div>

        <p className={styles.inputTitle}>상품명</p>
        <input 
          className={`${styles.nameInput} ${nameError ? styles.error : ''}`} 
          type='text' 
          placeholder='상품명을 입력해주세요' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          onBlur={validateName} 
        />
        {nameError && <p className={styles.errorMessage}>{nameError}</p>}

        <p className={styles.inputTitle}>상품 소개</p>
        <textarea 
          className={`${styles.descriptionInput} ${descriptionError ? styles.error : ''}`} 
          type='text' 
          placeholder='상품 소개를 입력해주세요' 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          onBlur={validateDescription} 
        />
        {descriptionError && <p className={styles.errorMessage}>{descriptionError}</p>}

        <p className={styles.inputTitle}>판매가격</p>
        <input 
          className={`${styles.priceInput} ${priceError ? styles.error : ''}`} 
          type='text' placeholder='판매 가격을 입력해주세요' 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          onBlur={validatePrice} 
        />
        {priceError && <p className={styles.errorMessage}>{priceError}</p>}

        <p className={styles.inputTitle}>태그</p>
        <div>
          <input 
            className={`${styles.tagInput} ${tagError ? styles.error : ''}`} 
            type='text' 
            placeholder='태그를 입력해주세요' 
            onKeyUp={handleKeyUp} 
            value={tag} 
            onChange={(e) => setTag(e.target.value)} 
          />
          {tagError && <p className={styles.errorMessage}>{tagError}</p>}
          <div className={styles.tagWrapper}>
            {tags.map((tag, idx) => (
            <div className={styles.tags} key={idx}>
              <span className={styles.tag}>#{tag}</span>
              <img className={styles.tagRemover} onClick={() => removeTag(idx)} src={xIcon} alt="X" />
            </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}

export default Registration;