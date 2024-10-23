import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { Outlet } from "react-router-dom";

function CommonsPage() {
  return (<>
    <Header/>
    <Outlet/>
    <Footer/>
  </>);
}

export default CommonsPage;
