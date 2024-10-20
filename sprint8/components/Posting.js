import Link from 'next/link';

export default function Posting() {
  return (
    <>
      <h1>게시글</h1>
      <Link href="/free-board/create-post">글쓰기</Link>
    </>
  );
}
