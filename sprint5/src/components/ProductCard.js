import defaultImg from '../images/img_default.png';
import styles from '../css/ProductCard.module.css';

function formatPrice(price) {
  return new Intl.NumberFormat().format(price);
}

export default function ProductCard({ item }) {
  const { name, price, favoriteCount } = item;

  return (
    <div className={styles.product}>
      <img className={styles.img} src={defaultImg} alt={name} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.price}>{formatPrice(price)}원</span>
        <span className={styles.favoriteCount}>♡ {favoriteCount}</span>
      </div>
    </div>
  );
}
