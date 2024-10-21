import Link from 'next/link';
import Header from './Header.js';
import style from '@/styles/Posting.module.css';

export default function Posting() {
  return (
    <div className={style.container}>
      <Header> 게시글 </Header>
      <Link href="/free-board/create-post">
        <button className={style.button}>글쓰기</button>
      </Link>
    </div>
  );
}
