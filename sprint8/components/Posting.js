import Link from 'next/link';
import Header from './Header.js';

export default function Posting() {
  return (
    <>
      <Header> 베스트 게시글 </Header>
      <Header> 게시글 </Header>
      <Link href="/free-board/create-post">글쓰기</Link>
    </>
  );
}
