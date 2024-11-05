import React, { useState, useEffect } from "react";
import styles from "./RegistrationProduct.module.css";
import { fetchApi } from "@/utils/axiosInstance";
import { useRouter } from "next/router";

export default function RegistrationProduct({ product, onUpdate }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductDescription(product.description);
      setPrice(product.price);
      setTags(product.tags || []);
    }
  }, [product]);

  const handleAddTag = (e) => {
    e.preventDefault();
    const trimmedTag = inputTag.trim();

    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputTag("");
  };

  const handleDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      images: [
        "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
      ],
      tags: tags,
      price: parseFloat(price) || 0,
      description: productDescription,
      name: productName,
    };

    try {
      if (product) {
        await fetchApi(`/products/${product.id}`, productData, "PATCH");
        alert("상품이 성공적으로 수정되었습니다!");
        if (onUpdate) onUpdate(product.id);
      } else {
        await fetchApi("/products", productData, "POST", true);
        alert("상품이 성공적으로 등록되었습니다!");
        router.push("/items");
      }

      setProductName("");
      setProductDescription("");
      setPrice("");
      setTags([]);
    } catch (error) {
      alert("상품 등록/수정에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className={styles.registration_container}>
      <form
        onSubmit={handleSubmit}
        className={styles.product_contents_container}
      >
        <div className={styles.registration_wrapper}>
          <h1 className={styles.registration}>
            {product ? "상품 수정하기" : "상품 등록하기"}
          </h1>
          <button type="submit" className={styles.register_button}>
            {product ? "수정" : "등록"}
          </button>
        </div>

        <div className={styles.product_wrapper}>
          <label className={styles.label}>상품명</label>
          <input
            type="text"
            placeholder="상품명을 입력해주세요"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            className={styles.input}
          />
        </div>
        <div className={styles.product_wrapper}>
          <label className={styles.label}>상품 소개</label>
          <textarea
            placeholder="상품 소개를 입력해주세요"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.product_wrapper}>
          <label className={styles.label}>판매가격</label>
          <input
            type="number"
            placeholder="판매 가격을 입력해주세요"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.product_wrapper}>
          <label className={styles.label}>태그</label>
          <input
            type="text"
            placeholder="태그를 입력해주세요"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTag(e);
            }}
          />
        </div>
        <div className={styles.tag_list}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
              <button
                type="button"
                onClick={() => handleDeleteTag(tag)}
                className={styles.delete_tag_button}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
