import Posting from '@/components/Posting.js';
import BestProduct from '@/components/BestProduct';
import Header from '@/components/Header.js';
import style from '@/styles/free-board.module.css';

export default function FreeBoard() {
  return (
    <div className={style.body}>
      <Header> 베스트 게시글 </Header>
      <BestProduct />
      <Posting />
    </div>
  );
}
