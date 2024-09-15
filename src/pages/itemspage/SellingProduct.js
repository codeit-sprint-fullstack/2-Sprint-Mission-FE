import styles from "./SellingProduct.module.css";
import heart from "./image/heart.png";
function SellingProduct({ product }) {
  const { images, name, favoriteCount, price, id } = product;
  return (
    <div id="selling-product" className={styles.product}>
      <img src={images} className={styles.img} />
      <div className={styles.info}>
        <div className={styles.title}>{name}</div>
        <div className={styles.price}>{price}원</div>
        <div className={styles.favoriteCount}>
          <img className={styles.favoriteCountImg} src={heart} />
          {favoriteCount} id:{id}
        </div>
      </div>
    </div>
  );
}

export default SellingProduct;
