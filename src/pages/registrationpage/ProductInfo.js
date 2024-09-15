import styles from "./ProductInfo.module.css";
import RegisterProductName from "./RegisterProductName.js";
import RegisterProductDescription from "./RegisterProductDescription.js";
import RegisterProductPrice from "./RegisterProductPrice.js";
import RegisterProductTag from "./RegisterProductTag.js";
function ProductInfo({ onChange }) {
  return (
    <div className={styles.info}>
      <RegisterProductName
        onChange={onChange.name}
        labelFont={styles.labelFont}
        inputFont={styles.inputFont}
      />
      <RegisterProductDescription
        onChange={onChange.description}
        labelFont={styles.labelFont}
        inputFont={styles.inputFont}
      />
      <RegisterProductPrice
        onChange={onChange.price}
        labelFont={styles.labelFont}
        inputFont={styles.inputFont}
      />
      <RegisterProductTag
        onChange={onChange.tags}
        labelFont={styles.labelFont}
        inputFont={styles.inputFont}
      />
    </div>
  );
}
export default ProductInfo;
