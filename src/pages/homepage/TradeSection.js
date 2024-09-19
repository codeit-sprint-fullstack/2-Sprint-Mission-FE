import styles from "./TradeSection.module.css";
import TradeBanner from "./TradeBanner.js";
function TradeSection() {
  return (
    <div className={styles.tradeSection}>
      <TradeBanner />
    </div>
  );
}
export default TradeSection;
