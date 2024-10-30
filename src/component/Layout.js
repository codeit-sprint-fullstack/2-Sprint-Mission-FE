import { Outlet } from "react-router-dom";
import PageNav from "./PageNav.js";
import Footer from "./Footer.js";

export function UserLayout() {
  return (
    <>
      <PageNav />
      <Outlet />
      <Footer />
    </>
  );
}
