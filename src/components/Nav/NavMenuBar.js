import React from "react";
import "./style/NavMenuBar.css";
import NavMenu from "./NavMenu.js";

function NavMenuBar({ children }) {
  return (
    <div id="NavMenuBar">
      {children.map((child, index) => (
        <NavMenu key={index} name={child} />
      ))}
    </div>
  );
}
export default NavMenuBar;
