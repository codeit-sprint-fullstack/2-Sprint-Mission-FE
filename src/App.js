import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Nav from "./nav/Nav.js";
import Footer from "./footer/Footer.js";
function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
