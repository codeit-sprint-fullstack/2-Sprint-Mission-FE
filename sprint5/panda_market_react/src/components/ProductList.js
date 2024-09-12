import { getProducts } from "../api/products.js";
import { useState, useEffect } from "react";
import favoriteIcon from "../assets/img/favoriteIcon.png";

const LIMIT = 10;

function ProductList({ products }) {
  const [order, setOrder] = useState("createdAt");
  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("favoriteCount");

  const handleGetProductList = async (options) => {
    try {
      await getProducts(options);
    } catch (error) {
      console.log(error);
    }
  };
  // 상태 관리를 하는 이유? 변화가 없는 set이 있을 수 있다
  useEffect(() => {
    handleGetProductList({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <>
      <div className="head">
        <p>판매 중인 상품</p>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>좋아요순</button>
      </div>
      <div className="productListItem">
        <img
          className="productListItem-img"
          src={products.images}
          alt={products.name}
        />
        <div>
          <h1>{products.name}</h1>
          <p>{products.price}"원"</p>
          <p>
            <img src={favoriteIcon} alt="favoriteIcon"></img>
            {products.favoriteCount}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProductList;
