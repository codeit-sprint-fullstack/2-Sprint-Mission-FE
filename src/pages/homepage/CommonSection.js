import styles from "./CommonSection.module.css";
import CommonBanner from "./CommonBanner.js";
function CommonSection({ name, className }) {
  return (
    <div className={`${styles.section} ${className}`}>
      <CommonBanner name={name} />
    </div>
  );
}
export default CommonSection;
