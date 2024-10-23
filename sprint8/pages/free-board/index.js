import Link from 'next/link';
import style from '@/styles/free-board.module.css';
import { useEffect, useState } from 'react';
import BestProduct from '@/components/BestProduct';
import Header from '@/components/Header.js';
import Button from '@/components/Button';
import SearchBar from '@/components/SearchBar.js';
import Sorting from '@/components/Sorting.js';
import PostList from '@/components/PostList.js';
import axios from '@/lib/axios.js';

export default function FreeBoard() {
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const res = await axios.get('/articles');
    const data = await res.data;
    setArticles(data);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={style.body}>
      <Header> 베스트 게시글 </Header>
      <BestProduct />
      <div className={style.headerAndButton}>
        <Header> 게시글 </Header>
        <Link href="/free-board/create-post">
          <Button className={style.button}>글쓰기</Button>
        </Link>
      </div>
      <div className={style.headerAndButton}>
        <SearchBar />
        <Sorting />
      </div>
      <PostList data={articles} />
    </div>
  );
}
