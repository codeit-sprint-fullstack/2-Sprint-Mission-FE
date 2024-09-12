import heartIcon from '../../assets/images/icon/ic_heart.png';
import './ProductItem.css';

function ProductItem({ product, type }) {
  return (
    <div className={`product-item ${type}`}>
      <img
        src={product.images[0]}
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
