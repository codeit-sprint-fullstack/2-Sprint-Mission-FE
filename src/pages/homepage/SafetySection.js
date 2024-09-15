import styles from "./SafetySection.module.css";
import SafeTradeNoticeBanner from "./SafeTradeNoticeBanner.js";
function SafetySection({ className }) {
  return (
    <div className={`${styles.section} ${className}`}>
      <SafeTradeNoticeBanner />
    </div>
  );
}
export default SafetySection;
