import TradeSection from "@/components/TradeSection.js";
import CommonSection from "@/components/CommonSection.js";
import SafetySection from "@/components/SafetySection.js";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <div
    // className={styles.contents}
    >
      <TradeSection />
      <CommonSection
        name="check"
        // className={styles.checkMarginTop}
      />
      <CommonSection
        name="search"
        //  className={styles.searchRegisterMarginTop}
      />
      <CommonSection
        name="register"
        // className={styles.searchRegisterMarginTop}
      />
      <SafetySection
      // className={styles.safetyMarginTop}
      />
      {/*138px,56px,83px*/}
    </div>
  );
}
