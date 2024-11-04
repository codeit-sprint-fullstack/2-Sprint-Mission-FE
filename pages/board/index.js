import createButton from '@/components/Button';
import axios from '@/lib/axios';
import { useState } from 'react';
import BestArticle from '@/components/BestArticle';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/board.module.css';

const WriteButton = createButton({
  style: 'btn_small_40',
});

export async function getServerSideProps(context) {
  const sort = context.query['orderBy'] || '';
  const search = context.query['keyword'] || '';

	let articles = [];
	let bestArticles = [];
	
	try {
		const resAll = await axios.get(`/articles?orderBy=${sort}&keyword=${search}`);
		const articles = resAll.data.list || [];
	} catch (error) {
		console.error(error);
	}

	try {
		const resBest = await axios.get(`/articles?pageSize=3`);
		const bestArticles = resBest.data.list || [];
	} catch (error) {
		console.error(error);
	}

  return {
    props: {
      articles,
      bestArticles,
    },
  };
}

export default function Board({ articles, bestArticles }) {
  const router = useRouter();
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  const handleSelect = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    router.push(`/board?orderBy=${sort}&keyword=${search}`);
  };

  const handleChange = (e) => {
    const newSearch = e.target.value.trim();

    if (!newSearch) {
      setSearch('');
      router.push(`/board?orderBy=${sort}`);
      return;
    }
    setSearch(newSearch);
    router.push(`/board?orderBy=${sort}&keyword=${newSearch}`);
  };

  return (
    <div className={styles.board}>
      <div className={styles.wrapper}>
        <div className={styles.bestWrapper}>
          <p className={styles.title}>베스트 게시글</p>
          <div className={styles.bestArticles}>
            {bestArticles && bestArticles?.map((article) => (
              <BestArticle key={article.id} article={article} />
            ))}
          </div>
        </div>
        <div>
          <div className={styles.header}>
            <p className={styles.title}>게시글</p>
            <Link href={'/board/newArticle'}>
              <WriteButton>글쓰기</WriteButton>
            </Link>
          </div>
          <div className={styles.header}>
            <input
              className={styles.searchInput}
              placeholder="검색할 상품을 입력해주세요"
              onChange={handleChange}
            />
            <select className={styles.selectBox} onChange={handleSelect}>
              <option value="recent">최신 순</option>
              <option value="popular">좋아요 순</option>
            </select>
          </div>
          <div className={styles.allArticles}>
            {articles && articles?.map((article) => (
              <ArticleList key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
