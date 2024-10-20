import Posting from '@/components/Posting.js';
import BestProduct from '@/components/BestProduct';
import Header from '@/components/Header.js';

export default function FreeBoard() {
  return (
    <>
      <Header> 베스트 게시글 </Header>
      <BestProduct />
      <Posting />
    </>
  );
}
