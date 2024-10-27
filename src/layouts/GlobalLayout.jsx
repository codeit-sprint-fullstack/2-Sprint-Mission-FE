import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useIsLoading } from '../contexts/PendingContext';
import { useError } from '../contexts/ErrorContext';
import Modal from '../components/Modal';

export default function GlobalLayout({ children }) {
  const isLoading = useIsLoading();
  const err = useError();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {isLoading && <Modal message="로딩 중입니다." noButton />}
      {err && <Modal message={err.message} />}
    </>
  );
}
