import styles from "./FooterBarMenu.module.css";
function FooterBarMenu({ children, linkType, address, img, fontColor }) {
  const style = {
    color: fontColor,
  };
  if (linkType === "none") {
    return (
      <div className={styles.textMenu} style={style}>
        {children}
      </div>
    );
  } else if (linkType === "html") {
    return (
      <a className={styles.htmlLink} style={style} href={`/${address}`}>
        {children}
      </a>
    );
  } else if (linkType === "web") {
    return (
      <a className={styles.webLink} href={`${address}`} target="_blank">
        <img src={img} />
      </a>
    );
  }
}
export default FooterBarMenu;
