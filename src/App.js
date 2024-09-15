import styles from "./App.module.css";
import Nav from "./nav/Nav.js";
import Contents from "./contents/Contents.js";
import Footer from "./footer/Footer.js";
function App() {
  return (
    <>
      <Nav className={styles.nav} />
      <Contents />
      <Footer />
    </>
  );
}

export default App;
