import Header from "./Header.js";
import HomeMain from "./HomeMain.js";
import Footer from "./Footer.js";
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
    <HomeMain/>
    <Footer/>
  </>);
}

export default App;
