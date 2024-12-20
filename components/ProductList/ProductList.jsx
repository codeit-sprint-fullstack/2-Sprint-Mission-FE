import React, { useEffect, useState } from "react";
import { fetchApi } from "@/utils/axiosInstance";
import img_default from "../../images/etc/img_default.svg";
import likeButton from "../../images/etc/likeButton.svg";
import styles from "./ProductList.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent"); // 좋아요 순 필요 없어서 useState를 사용해야하나..?
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [currentPage, search, sort]);

  const fetchProducts = async () => {
    try {
      const response = await fetchApi("/products", {
        page: currentPage,
        pageSize: limit,
        orderBy: sort,
        keyword: search,
      });
      setProducts(response.list);
      setTotalPages(response.totalCount);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = (e) => {
    //검색
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleRegisterClick = () => {
    router.push("/registration");
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  // 페이지네이션 처리
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleProductClick = (productId) => {
    router.push(`/items/${productId}`);
  };
  return (
    <>
      <div className={styles.product_list_wrapper}>
        <div className={styles.product_control_panel}>
          <div className={styles.section_title}>
            <h1>판매 중인 상품</h1>
          </div>
          <div className={styles.search_sort_bar}>
            <div className={styles.search_bar_wrapper}>
              <input
                className={styles.search_bar_input}
                type="text"
                value={search}
                placeholder="검색할 상품을 입력해주세요"
                onChange={handleSearch}
              />
            </div>
            <button
              className={styles.create_item_button}
              onClick={handleRegisterClick}
            >
              상품 등록하기
            </button>
            <select
              className={styles.sort_dropdown}
              value={sort}
              onChange={handleSortChange}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요 순</option>
            </select>
          </div>
        </div>
        <div className={styles.product_list}>
          {products.map((product) => (
            <div
              key={product._id}
              className={styles.item_card}
              onClick={() => handleProductClick(product.id)}
            >
              <Image src={img_default} alt="이미지 없음" />
              <h3 className={styles.item_name}>{product.name}</h3>
              <p className={styles.item_price}>
                {product.price.toLocaleString()}원
              </p>
              <div className={styles.favorite_count}>
                <Image src={likeButton} alt="좋아요 버튼" />
                <p>{product.favoriteCount}</p>
                {/* 좋아요가 api에 없으므로 하드코딩 */}
              </div>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <div className={styles.pagination_bar_wrapper}>
          <button onClick={handlePrevious} disabled={currentPage === 1}>
            &lt;
          </button>
          {[...Array(5)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductList;
