/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '@/src/components/Header';
import Footer from '@/src/components/Footer';
import { useIsLoading } from '../contexts/PendingContext';
import { useError } from '../contexts/ErrorContext';
import Modal from '../components/Modal';

const style = {
  message: css`
    text-align: center;
    font-size: 1.6rem;
    font-weight: 500;
  `,
};

export default function GlobalLayout({ children }) {
  const isLoading = useIsLoading();
  const err = useError();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* {isLoading && <Modal message="로딩 중입니다." noButton />} */}
      {isLoading && (
        <Modal>
          <p css={style.message}>로딩 중입니다.</p>
        </Modal>
      )}
      {err && (
        <Modal buttons={['확인']}>
          <p css={style.message}>{err.message}</p>
        </Modal>
      )}
    </>
  );
}
