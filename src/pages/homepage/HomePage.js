import styles from "./HomePage.module.css";
import TradeSection from "./TradeSection.js";
import CommonSection from "./CommonSection.js";
import SafetySection from "./SafetySection.js";
function Contents() {
  return (
    <div className={styles.contents}>
      <TradeSection />
      <CommonSection name="check" className={styles.checkMarginTop} />
      <CommonSection name="search" className={styles.searchRegisterMarginTop} />
      <CommonSection
        name="register"
        className={styles.searchRegisterMarginTop}
      />
      <SafetySection className={styles.safetyMarginTop} />
      {/*138px,56px,83px*/}
    </div>
  );
}
export default Contents;
