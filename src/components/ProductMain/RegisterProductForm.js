import styles from "./RegisterProductForm.module.css"
import { createProduct } from "../../api/ProductService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import closeIcon from "../../assets/images/icon/ic_X.png";

function RegisterProductForm() {
  const [productData, setProductData] = useState ({
    name: "",
    descript: "",
    price: "",
    tags: [],
  })
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // 등록버튼 클릭 후 비활성화

    try {
      const newProduct =  await createProduct(productData);
      if (newProduct) {
        alert('상품이 등록되었습니다.');
        navigate(`/items/${newProduct._id}`);
      } else {
        throw new Error('상품 등록에 실패했습니다.');   // 오류메시지를 설정할 필요가 없는 듯
      }

    } catch (error) {
      alert(`상품 등록에 실패했습니다: ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  }

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setProductData( {
        ...productData,
        tags: [...productData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  }

  const handleRemoveTag = (index) => {
    const newTags = [...productData.tags];
    newTags.splice(index, 1);
    setProductData({ ...productData, tags: newTags});
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <div className={styles.title}>상품 등록하기</div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록" : "등록"}
        </button>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품명</label>
        <input type="text" 
          className={styles.input}
          placeholder="상품명을 입력해 주세요"
          value={productData.name}
          onChange={(e) => setProductData({...productData, name:e.target.value})}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>상품 소개</label>
        <textarea
          className={styles.textarea}
          placeholder="상품 소개를 입력해 주세요"
          value={productData.description}
          onChange={(e) => setProductData({...productData, description: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>판매가격</label>
        <input
          type="text"
          className={styles.input}
          placeholder="판매 가격을 입력해 주세요"
          value={productData.price}
          onChange={(e) => setProductData({...productData, price: e.target.value})}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>태그</label>
        <input
          type="text"
          className={styles.input}
          placeholder="태그를 입력해 주세요"
          value={tagInput}
          onChange={handleTagInputChange}
          onKeyDown={handleTagInputKeyDown}
        />
        <div className={styles.tags}>
          {productData.tags.map((tag, index) => (
            <div key={index} className={styles.tag}>
              {tag}
              <img src={closeIcon}
                alt="Remove Tag"
                className={styles.removeTagButton}
                onClick={() => handleRemoveTag(index)}
              />
            </div>
          ))}

        </div>
      </div>
    </form>
  )
}

export default RegisterProductForm;