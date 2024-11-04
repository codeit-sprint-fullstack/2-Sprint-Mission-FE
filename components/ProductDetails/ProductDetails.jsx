import styles from "./ProductDetails.module.css";
import { fetchApi } from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import product_default from "@/images/etc/product_default.svg";
import selectImage from "@/images/board/select_img.svg";
import user from "@/images/board/profile_img.svg";
import heart_img from "@/images/board/heart_img.svg";
import heart_full from "@/images/etc/heart_full.svg";
import EditDeleteModal from "../EditDeleteModal/EditDeleteModal";
import Popup from "../Popup/Popup";

const fetchProductDetail = async (id) => {
  if (id) {
    try {
      const data = await fetchApi(`/products/${id}`, {}, "GET", true);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString("ko-KR", options);

  return formattedDate
    .replace(/\//g, " .")
    .replace(/\s/g, " ")
    .replace(/\.$/, "");
};

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isProductModal, setIsProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const getProductDetail = async () => {
      const productData = await fetchProductDetail(productId);
      setProduct(productData);
    };
    if (productId) {
      getProductDetail();
    }
  }, [productId]);

  const toggleModal = (e, isProduct = false, productId = null) => {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: rect.top + 25, left: rect.left - 130 });
    setIsModalOpen((prev) => !prev);
    setIsProductModal(isProduct);
    setSelectedProductId(productId);
  };

  const handleEditClick = () => {
    setIsModalOpen(false);

    if (isProductModal && selectedProductId) {
      setEditProductId(selectedProductId);
      if (product && product.id === selectedProductId) {
        setEditProduct(product.content);
      }
    } else {
      // router.push(`/products/edit/${id}`);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (isProductModal && selectedProductId) {
        await fetchApi(`/products/${selectedProductId}`, null, "DELETE");
        router.push("/items");
      } else {
        await fetchApi(`/products/${productId}`, null, "DELETE");
        router.push("/items");
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message;
      setPopupMessage(errorMessage);
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFavoriteToggle = async () => {
    if (!product) return;
    const newFavoriteState = !product.isFavorite;
    try {
      if (newFavoriteState) {
        await fetchApi(`/products/${productId}/favorite`, {}, "POST", true);
      } else {
        await fetchApi(`/products/${productId}/favorite`, {}, "DELETE", true);
      }
      setProduct((prev) => ({
        ...prev,
        isFavorite: newFavoriteState,
        favoriteCount: newFavoriteState
          ? prev.favoriteCount + 1
          : prev.favoriteCount - 1,
      }));
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <>
      <div className={styles.product_detail_container}>
        {product ? (
          <>
            <Image src={product_default} alt="상품 기본 이미지" />
            <div className={styles.product_wrapper}>
              <div className={styles.product_title}>
                <h2>{product.name}</h2>
                <div>
                  <Image
                    src={selectImage}
                    alt="선택"
                    onClick={(e) => toggleModal(e, true, product.id)}
                    className={styles.select_button}
                  />
                </div>
              </div>
              <h1>{product.price.toLocaleString()}원</h1>
              <div className={styles.divider_row}> </div>
              <div className={styles.product_inform}>
                <h5>상품소개</h5>
                <p>{product.description}</p>
                <h5>상품 태그</h5>
                <div className={styles.tags_container}>
                  {product.tags.map((tag, index) => (
                    <div key={index} className={styles.tag_box}>
                      #{tag}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.user_inform}>
                <div className={styles.user_inform_wrapper}>
                  <Image src={user} width={40} height={40} alt="유저 이미지" />
                  <div className={styles.user_name}>
                    <h5>{product.ownerNickname}</h5>
                    <p>{formatDate(product.createdAt)}</p>
                  </div>
                </div>

                <div className={styles.like_container}>
                  <div className={styles.divider_col}></div>
                  <div className={styles.like_wrapper}>
                    {product.isFavorite ? (
                      <Image
                        src={heart_full}
                        width={32}
                        height={32}
                        alt="채워진 하트"
                        onClick={handleFavoriteToggle}
                      />
                    ) : (
                      <Image
                        src={heart_img}
                        width={32}
                        height={32}
                        alt="빈 하트"
                        onClick={handleFavoriteToggle}
                      />
                    )}
                    <div className={styles.like_count}>
                      {product.favoriteCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>상품이 없습니다</p>
        )}
      </div>
      {isModalOpen && (
        <EditDeleteModal
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          style={{
            position: "absolute",
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
          }}
        />
      )}
      {isPopupOpen && <Popup message={popupMessage} onClose={closePopup} />}
    </>
  );
}
