import styles from "./SellingProduct.module.css";
import heart from "./image/heart.png";
import defaultImage from "./image/default_image.png";
function SellingProduct({ product }) {
  const { name, favoriteCount, price } = product;
  return (
    <div id="selling-product" className={styles.product}>
      <img src={defaultImage} className={styles.img} alt="기본 상품 이미지" />
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>{price}원</div>
        <div className={styles.favoriteCount}>
          <img
            className={styles.favoriteCountImg}
            src={heart}
            alt="좋아요 이미지"
          />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default SellingProduct;
