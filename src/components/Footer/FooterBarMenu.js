import "./style/FooterBarMenu.css";
function FooterBarMenu({ children, linkType, address, img, fontColor }) {
  const style = {
    color: fontColor,
  };
  if (linkType === "none") {
    return (
      <div className="footer-bar-menu-text" style={style}>
        {children}
      </div>
    );
  } else if (linkType === "html") {
    return (
      <a className="footer-bar-menu-html" style={style} href={`/${address}`}>
        {children}
      </a>
    );
  } else if (linkType === "web") {
    return (
      <a className="footer-bar-menu-img" href={`${address}`} target="_blank">
        <img src={img} />
      </a>
    );
  }
}
export default FooterBarMenu;
