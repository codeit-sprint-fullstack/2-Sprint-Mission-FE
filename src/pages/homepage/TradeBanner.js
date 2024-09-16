import styles from "./TradeBanner.module.css";
import { Link } from "react-router-dom";

import shoppingImage from "./image/shopping_image.png";
function TradeBanner() {
  return (
    <div className={styles.tradeBanner}>
      <div className={styles.containerBox}>
        <div className={styles.text}>
          일상의 모든 물건을
          <br /> 거래해 보세요
        </div>
        <Link to="/items">
          <button className={styles.button}>구경하러 가기</button>
        </Link>
      </div>
      <img className={styles.image} src={shoppingImage} />
    </div>
  );
}
export default TradeBanner;
