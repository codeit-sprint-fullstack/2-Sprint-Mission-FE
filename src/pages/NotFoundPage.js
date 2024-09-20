import Warn from '../components/Warn';

function NotFoundPage() {
  return (
    <>
    <Warn
      variant="big"
      title="존재하지 않는 페이지에요."
      description="올바른 주소가 맞는지 다시 한 번 확인해 주세요."
    />
    </>


  );
}

export default NotFoundPage;
