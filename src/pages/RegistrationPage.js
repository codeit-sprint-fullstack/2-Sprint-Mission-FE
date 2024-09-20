import styles from "./RegistrationPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "../hooks/useValidation.js";
import { createProduct } from "../api.js";
import Tags from "../components/Tags.js";

export default function RegistrationPage() {
  const { values, errors, handleChange, validate } = useValidation({
    name: "",
    description: "",
    price: "",
  });

  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isInputEmpty = () => {
    return (
      values.name.trim() !== "" &&
      values.description.trim() !== "" &&
      values.price.trim() !== ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      const product = { ...values, tags };
      const response = await createProduct(product);

      const productID = response.id;
      if (productID) {
        navigate(`/items/${productID}`);
      } else {
        setError("상품 ID를 얻는 데 실패했습니다.");
      }
    } catch (error) {
      setError("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className={styles.regContainer}>
      <form className={styles.regSection} onSubmit={handleSubmit}>
        <div className={styles.regTitle}>
          <label>상품 등록하기</label>
          <button
            className={styles.regBtn}
            type="submit"
            disabled={!isInputEmpty()}
          >
            등록
          </button>
        </div>

        <div className={styles.regName}>
          <label>상품명</label>
          <input
            type="text"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="상품명을 입력해주세요"
            style={{ border: errors.name ? "1px solid red" : "none" }}
          />
          {errors.name && <div className={styles.error}>{errors.name}</div>}
        </div>

        <div className={styles.regIntroduction}>
          <label>상품 소개</label>
          <textarea
            id="description"
            value={values.description}
            onChange={handleChange}
            placeholder="상품 소개를 입력해주세요"
            style={{ border: errors.description ? "1px solid red" : "none" }}
          />
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </div>

        <div className={styles.regPrice}>
          <label>판매가격</label>
          <input
            type="text"
            id="price"
            value={values.price}
            onChange={handleChange}
            placeholder="판매 가격을 입력해주세요"
            style={{ border: errors.price ? "1px solid red" : "none" }}
          />
          {errors.price && <div className={styles.error}>{errors.price}</div>}
        </div>

        <div className={styles.regTag}>
          <label>태그</label>
          <Tags tags={tags} setTags={setTags} />
          {errors.tags && <div className={styles.error}>{errors.tags}</div>}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
