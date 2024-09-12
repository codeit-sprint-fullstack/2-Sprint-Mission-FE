import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Modal from "../components/Modal.jsx";
import { useError } from "../contexts/ErrorContext.jsx";
import { useIsLoading } from "../contexts/PendingContext.jsx";

function Pandamarket() {
  const isLoading = useIsLoading();
  const err = useError();

  return (
    <>
      <Header />
      <Outlet />
      {isLoading && <Modal message="로딩 중입니다." noButton />}
      {err && <Modal message={err.message} />}
      <Footer />
    </>
  );
}

export default Pandamarket;
