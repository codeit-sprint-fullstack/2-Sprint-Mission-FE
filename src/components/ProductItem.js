import priceFunc from "../PriceFunc.js";
import styles from "./ProductItem.module.css";
import defaultImg from "../image/img_default.png";

// 유효한 이미지 확장자 목록
const validExtensions = ["jpg", "jpeg", "png", "gif"];

// 확장자를 확인하는 함수
function isValidImageExtension(url) {
  if (typeof url !== "string") {
    return false;
  }
  const extension = url.split(".").pop().toLowerCase();
  return validExtensions.includes(extension);
}

export default function ProductItem({ item, classNames }) {
  const favoriteCount = `❤️ ${item.favoriteCount || 0}`;

  return (
    <div className={styles[classNames]}>
      <img
        className={styles.itemImg}
        src={
          item.images && isValidImageExtension(item.images[0])
            ? item.images
            : defaultImg
        }
        alt=""
      />
      <div className={styles.textSection}>
        <h2 className={styles.name}>{item.name}</h2>
        <p className={styles.price}>{priceFunc(item.price)}원</p>
        <p className={styles.favoriteCount}>{favoriteCount}</p>
      </div>
    </div>
  );
}
