import heartIcon from '../../assets/images/icon/ic_heart.png';
import defaultProductImg from '../../assets/images/img_default_product.png';
import './ProductItem.css';

function ProductItem({ product, type }) {
  return (
    <div className={`product-item ${type}`}>
      <img
        src={defaultProductImg}
        alt={product.name}
        className="product-image"
      />
      <p className="product-title">{product.name}</p>
      <p className="product-price">{product.price.toLocaleString()}원</p>
      <p className="product-favorite">
        <img src={heartIcon} className="heart-icon" alt="좋아요" /> {product.favoriteCount}
      </p>
    </div>
  );
}

export default ProductItem;
