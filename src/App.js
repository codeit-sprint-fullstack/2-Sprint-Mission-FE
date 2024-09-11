import Footer from "./component/Footer.js";
import PageNav from "./page/PageNav.js";

function App({ children }) {
  return (
    <>
      <PageNav />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default App;
