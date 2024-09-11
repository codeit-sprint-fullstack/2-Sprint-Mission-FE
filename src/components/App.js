import Footer from "./Footer";
import Nav from "./Nav";
import styles from "./App.module.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer className={styles.footer} />
    </>
  );
}

export default App;
