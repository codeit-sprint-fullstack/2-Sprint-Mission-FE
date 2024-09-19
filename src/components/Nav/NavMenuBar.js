import React from "react";
import NavMenu from "./NavMenu.js";
import styles from "./NavMenuBar.module.css";

function NavMenuBar({ children, className }) {
  return (
    <div id="NavMenuBar" className={`${styles.menuBar} ${className}`}>
      {children.map((child, index) => (
        <NavMenu key={index} name={child} />
      ))}
    </div>
  );
}
export default NavMenuBar;
