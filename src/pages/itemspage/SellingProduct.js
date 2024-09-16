import styles from "./SellingProduct.module.css";
import heart from "./image/heart.png";
import defaultImage from "./image/default_image.png";
function SellingProduct({ product }) {
  const { name, favoriteCount, price } = product;
  return (
    <div id="selling-product" className={styles.product}>
      <img src={defaultImage} className={styles.img} />
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>{price}원</div>
        <div className={styles.favoriteCount}>
          <img className={styles.favoriteCountImg} src={heart} />
          {favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default SellingProduct;
