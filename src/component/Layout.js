import { Outlet } from "react-router-dom";
import PublicNav from "./PageNav.js";
import Footer from "./Footer.js";

export function UserLayout() {
  return (
    <>
      <PublicNav />
      <Outlet />
      <Footer />
    </>
  );
}
