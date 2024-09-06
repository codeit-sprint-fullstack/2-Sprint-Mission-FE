import "./style/BestProduct.css";
import heart from "../../img/heart.png";
function BestProduct({ name, price, image, favoriteCount, description }) {
  return (
    <div className="best-product">
      <img
        className="best-product-img"
        src={image}
      />

      <div className="best-product-info">
        <div className="best-product-title">{name}</div>
        <div className="best-product-price">{price}원</div>
        <div className="best-favorites-count">
          <img className="heart-img" src={heart} alt="좋아요하트" />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}
export default BestProduct;
