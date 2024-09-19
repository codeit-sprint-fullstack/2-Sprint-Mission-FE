import styles from "./FooterBarMenu.module.css";
function FooterBarMenu({
  children,
  linkType,
  address,
  img,
  fontColor,
  className,
}) {
  const style = {
    color: fontColor,
  };
  if (linkType === "none") {
    return (
      <div className={`${className} ${styles.textMenu}`} style={style}>
        {children}
      </div>
    );
  } else if (linkType === "html") {
    return (
      <a className={`${className} ${styles.htmlLink}`} style={style} href={`/`}>
        {children}
      </a>
    );
  } else if (linkType === "web") {
    return (
      <a
        className={`${className} ${styles.webLink}`}
        href={`${address}`}
        target="_blank"
      >
        <img src={img} />
      </a>
    );
  }
}
export default FooterBarMenu;
