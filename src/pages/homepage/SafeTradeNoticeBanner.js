import styles from "./SafeTradeNoticeBanner.module.css";
import tradeImage from "./image/trade_image.png";
function SafeTradeNoticeBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.text}>
        믿을 수 잇는
        <br />
        판다마켓 중고 거래
      </div>
      <img className={styles.image} src={tradeImage} alt="거래하는이미지" />
    </div>
  );
}
export default SafeTradeNoticeBanner;
