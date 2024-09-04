import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const logo = document.querySelector("img.logo");
    window.addEventListener("resize", function (event) {
      if (window.innerWidth < 744) {
        logo.setAttribute("src", "/images/logo-text-only.png");
      }
      else {
        logo.setAttribute("src", "/images/Property-1=lg.png");
      }
    });
    window.dispatchEvent(new Event('resize'));
  }, []);

  return (<>
    <Header/>
    <Main/>
    <Footer/>
  </>);
}

export default App;
