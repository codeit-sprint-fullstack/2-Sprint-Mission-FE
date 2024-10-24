import Link from 'next/link';
import style from '@/styles/free-board.module.css';
import { useEffect, useState } from 'react';
import BestPosts from '@/components/BestPosts';
import Header from '@/components/Header.js';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar.js';
import Sorting from '@/components/Sorting.js';
import PostList from '@/components/PostList.js';
import axios from '@/lib/axios.js';

export default function FreeBoard({ initialBestArticles }) {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');

  async function fetchArticles(searchKeyword) {
    const res = await axios.get(`/articles?&search=${searchKeyword}`);
    const data = await res.data;
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles(keyword);
  }, [keyword]);

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
        <Sorting />
      </div>
      <PostList data={articles} />
    </div>
  );
}

//Best 게시글은 고정된 값이니까 서버에서 받아올 수 있지 않을까? 싶어서 시도
export async function getServerSideProps() {
  try {
    const res = await axios.get(`/articles`);
    const data = await res.data;

    return {
      props: {
        initialBestArticles: data
      }
    };
  } catch (error) {
    console.error('Failed to get Best Articles:', error);
    return {
      props: {
        initialBestArticles: []
      }
    };
  }
}
