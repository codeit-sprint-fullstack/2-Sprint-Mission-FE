import styles from "./CategoryTitle.module.css";

function CategoryTitle({ children, className }) {
  return (
    <div className={`${className} ${styles.categoryTitle}`}>{children}</div>
  );
}
export default CategoryTitle;
