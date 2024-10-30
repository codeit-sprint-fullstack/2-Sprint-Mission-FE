import Link from 'next/link';
import style from '@/src/styles/free-board.module.css';
import { useEffect, useState } from 'react';
import BestPosts from '@/src/components/BestPosts';
import Header from '@/src/components/Header.js';
import Button from '@/src/components/Button';
import SearchBar from '@/src/components/SearchBar.js';
import Sorting from '@/src/components/Sorting.js';
import PostList from '@/src/components/PostList.js';
import { getArticles } from '@/src/api/articleServices.js';

export default function FreeBoard({ initialBestArticles }) {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [order, setOrder] = useState('');

  async function fetchArticles() {
    const data = await getArticles({ order, searchKeyword: keyword });
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles(order, keyword);
  }, [order, keyword]);

  return (
    <div className={style.body}>
      <Header> 베스트 게시글 </Header>
      <BestPosts data={initialBestArticles} />
      <div className={style.headerAndButton}>
        <Header> 게시글 </Header>
        <Link href="/free-board/create-post">
          <Button status={true}>글쓰기</Button>
        </Link>
      </div>
      <div className={style.headerAndButton}>
        <SearchBar onKeywordChange={setKeyword} />
        <Sorting onOrderChange={setOrder} />
      </div>
      <PostList data={articles} />
    </div>
  );
}

//NOTE: Best 게시글은 고정된 값이니까 서버에서 받아올 수 있지 않을까? 싶어서 시도
export async function getServerSideProps() {
  try {
    const data = await getArticles();

    return {
      props: {
        initialBestArticles: data
      }
    };
  } catch (error) {
    console.error('Failed to get Best Articles:', error);
    throw Error;
  }
}
