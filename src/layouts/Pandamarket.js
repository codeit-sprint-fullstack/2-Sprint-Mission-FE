import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import { useError } from '../contexts/ErrorContext.js';
import Modal from '../components/Modal.js';
import { useIsLoading } from '../contexts/PendingContext.js';

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
