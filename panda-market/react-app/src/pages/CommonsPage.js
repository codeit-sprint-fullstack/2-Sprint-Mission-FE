import Header from "../Header.js";
import Footer from "../Footer.js";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function CommonsPage() {
  useEffect(() => {
    const logo = document.querySelector('img[class^="CommonsPage_logo"]');
    if (logo) {
      window.addEventListener("resize", function (event) {
        if (window.innerWidth < 744) {
          logo.setAttribute("src", "/images/logo-text-only.png");
        }
        else {
          logo.setAttribute("src", "/images/Property-1=lg.png");
        }
      });
      window.dispatchEvent(new Event('resize'));
    }
  }, []);

  return (<>
    <Header/>
    <Outlet/>
    <Footer/>
  </>);
}

export default CommonsPage;
