import styles from "./RegisterProductPage.module.css";
import RegisterProductForm from "../components/ProductMain/RegisterProductForm";

function RegisterProductPage() {
  return (
    <div className={styles.registerProductContainer}>
      <RegisterProductForm />
    </div>
  )
}

export default RegisterProductPage;