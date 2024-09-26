import Header from "../Header.js";
import Footer from "../Footer.js";
import { Outlet } from "react-router-dom";

function CommonsPage() {
  return (<>
    <Header/>
    <Outlet/>
    <Footer/>
  </>);
}

export default CommonsPage;
