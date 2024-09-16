import styles from "./FooterMenu.module.css";
function FooterMenu({ type, className, children, image }) {
  if (type === "text") {
    return <div className={`${className} ${styles.font}`}>{children}</div>;
  } else if (type === "linkText") {
    return <div className={`${className} ${styles.font}`}>{children}</div>;
  } else if (type === "linkImage") {
    return <img src={image} alt="링크이미지"></img>;
  }
  return <div></div>;
}
export default FooterMenu;
