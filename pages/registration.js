import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import style from "../styles/Register.module.css";
import { initialProductData, submitProductData } from "../utils/Register";
import X from "@/public/ic_X.png";
import { useValidation } from "../hooks/useValidation";
import { patchProduct } from "./api/ProductService";
import Image from "next/image";

export default function RegisterPage() {
  const [productData, setProductData] = useState(initialProductData);
  // const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");
  const navigate = useRouter();
  const { errors, validateField, validationCheck } = useValidation();
  const {
    id,
    name: initialName,
    description: initialDescription,
    price: initialPrice,
    tags: initialTags,
    images: initialImages
  } = navigate.query;

  const isEditing = !!id;

  useEffect(() => {
    if (initialName)
      setProductData((prevData) => ({ ...prevData, name: initialName }));
    if (initialDescription)
      setProductData((prevData) => ({
        ...prevData,
        description: initialDescription
      }));
    if (initialPrice)
      setProductData((prevData) => ({ ...prevData, price: initialPrice }));
    if (initialTags)
      setProductData((prevData) => ({
        ...prevData,
        tags: JSON.parse(initialTags)
      }));
    if (initialImages)
      setProductData((prevData) => ({
        ...prevData,
        images: JSON.parse(initialImages)
      }));
  }, [
    initialName,
    initialDescription,
    initialPrice,
    initialTags,
    initialImages
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value, productData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validationCheck(productData);
    console.log("Validation Errors:", validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const response = await submitProductData(id, isEditing, productData);
      alert("상품이 등록되었습니다.");
      setProductData(initialProductData);
      navigate.push(`/items/${response.id}`);
      console.log(response);
    } catch (e) {
      alert("상품 등록에 실패했습니다.");
      console.log(e);
    }
  };

  const handleTagChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setProductData((prevData) => ({
        ...prevData,
        tags: [...(prevData.tags || []), tagInput.trim()]
      }));
      validateField("tags", tagInput.trim(), {
        ...productData,
        tags: [...(productData.tags || []), tagInput.trim()]
      });
      setTagInput("");
    }
  };

  const handleTagRemove = (index) => {
    const updatedTags = productData.tags.filter((_, i) => i !== index);
    setProductData((prevData) => ({
      ...prevData,
      tags: updatedTags
    }));
    validateField("tags", "", { ...productData, tags: updatedTags });
  };

  return (
    <div className={style.registerBody}>
      <div className={style.registrationTop}>
        <p className={style.registrationTopTitle}>상품 등록하기</p>
        <button
          className={style.registrationTopButton}
          onClick={handleSubmit}
          disabled={
            Object.keys(errors).length > 0 ||
            !productData.name ||
            !productData.description ||
            !productData.price
          }
        >
          등록
        </button>
      </div>
      <div className={style.registerForm}>
        <div className={style.formSection}>
          <label htmlFor="product-name" className={style.registrationTitle}>
            상품명
          </label>
          <input
            name="name"
            className={`${style.registerInputForm} ${
              errors.name ? "error" : ""
            }`}
            placeholder="상품명을 입력해주세요"
            id="product-name"
            value={productData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.name && <p className={style.formError}>{errors.name}</p>}
        </div>
        <div className={style.formSection}>
          <label
            htmlFor="product-description"
            className={style.registrationTitle}
          >
            상품 소개
          </label>
          <textarea
            name="description"
            className={`${style.registerDescriptionInput} ${
              errors.description ? "error" : ""
            }`}
            placeholder="상품 소개를 입력해주세요"
            id="product-description"
            value={productData.description}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.description && (
            <p className={style.formError}>{errors.description}</p>
          )}
        </div>
        <div className={style.formSection}>
          <label htmlFor="product-price" className={style.registrationTitle}>
            판매 가격
          </label>
          <input
            name="price"
            className={`${style.registerInputForm} ${
              errors.price ? style.error : ""
            }`}
            placeholder="판매 가격을 입력해주세요"
            id="product-price"
            value={productData.price}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.price && <p className={style.formError}>{errors.price}</p>}
        </div>
        <div className={style.formSection}>
          <label htmlFor="product-tags" className={style.registrationTitle}>
            태그
          </label>
          <div className={style.tagsInput}>
            <input
              name="tags"
              className={`${style.registerInputForm} ${
                errors.tags ? style.error : ""
              }`}
              placeholder="태그를 입력해주세요"
              id="product-tags"
              value={tagInput}
              onChange={handleTagChange}
              onKeyDown={handleTagKeyDown}
            />
            <div className={style.tagsContainer}>
              {(productData.tags || []).map((tag, index) => (
                <div key={index} className={style.tagChip}>
                  # {tag}
                  <Image
                    className={style.tagRemove}
                    onClick={() => handleTagRemove(index)}
                    src={X}
                    alt="delete"
                  />
                </div>
              ))}
            </div>
          </div>
          {errors.tags && <p className={style.formError}>{errors.tags}</p>}
        </div>
      </div>
    </div>
  );
}
