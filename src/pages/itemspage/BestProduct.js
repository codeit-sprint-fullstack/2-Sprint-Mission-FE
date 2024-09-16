import styles from "./BestProduct.module.css";
import heart from "./image/heart.png";
function BestProduct({ name, price, image, favoriteCount, description }) {
  return (
    <div className={styles.bestProduct}>
      <img className={styles.productImg} src={image} alt="상품이미지" />

      <div className={styles.productInfo}>
        <div className={styles.productTitle}>{name}</div>
        <div className={styles.productPrice}>{price}원</div>
        <div className={styles.favoriteCount}>
          <img className={styles.favoriteImg} src={heart} alt="좋아요하트" />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}
export default BestProduct;
