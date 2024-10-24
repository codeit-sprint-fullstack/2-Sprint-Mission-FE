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

export default function FreeBoard() {
  const [articles, setArticles] = useState([]);
  const [bestArticles, setBestArticles] = useState([]);
  const [keyword, setKeyword] = useState('');

  async function fetchBestArticles() {
    const res = await axios.get(`/articles`);
    const data = await res.data;
    setBestArticles(data);
  }

  async function fetchArticles(searchKeyword) {
    const res = await axios.get(`/articles?&search=${searchKeyword}`);
    const data = await res.data;
    setArticles(data);
  }

  useEffect(() => {
    fetchBestArticles();
    fetchArticles(keyword);
  }, [keyword]);

  return (
    <div className={style.body}>
      <Header> 베스트 게시글 </Header>
      <BestPosts data={bestArticles} />
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
