import Nav from "./Nav.js";
import Footer from "./Footer.js";

function App({ children }) {
  return (
    <>
      <Nav />
      <div className="Body">{children}</div>
      <Footer />
    </>
  );
}

export default App;
