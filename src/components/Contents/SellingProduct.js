import "./style/SellingProduct.css";
import heart from "../../img/heart.png";
function SellingProduct({ product }) {
  const { images, name, favoriteCount, price } = product;
  return (
    <div id="selling-product">
      <img src={images} className="selling-product-img" />
      <div className="selling-product-info">
        <div className="selling-product-Title">{name}</div>
        <div className="selling-product-price">{price}원</div>
        <div className="selling-favorites-count">
          <img className="heart-img" src={heart} />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}
// title,price,count css는 bestproduct에 있음
export default SellingProduct;
