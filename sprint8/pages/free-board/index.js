import Posting from '@/components/Posting.js';
import style from '@/styles/free-board.module.css';
import BestProduct from '@/components/BestProduct';
import Header from '@/components/Header.js';
import SearchBar from '@/components/SearchBar.js';
import Sorting from '@/components/Sorting.js';

export default function FreeBoard() {
  return (
    <div className={style.body}>
      <Header> 베스트 게시글 </Header>
      <BestProduct />
      <Posting />
      <div className={style.searchAndSort}>
        <SearchBar />
        <Sorting />
      </div>
    </div>
  );
}
