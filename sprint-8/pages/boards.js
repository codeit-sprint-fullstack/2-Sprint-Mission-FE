import { getArticles } from '@/apis/articlesService.js';
import Articles from '@/components/Articles.jsx';
import BestArticles from '@/components/BestArticles.jsx';
import styles from '@/styles/Boards.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
	const { list: bestArticles } = await getArticles({ skip: 0, take: 3, sort: 'recent' });
	const { list: articles } = await getArticles({ skip: 0, take: 10, sort: 'recent' });

	return {
		props: {
			bestArticles,
			articles,
		}
	}
}

function Boards({ bestArticles, articles: initialArticles }) {
	const [sort, setSort] = useState('recent');
	const [articles, setArticles] = useState(initialArticles);
	const [keyword, setKeyword] = useState('');

	useEffect(() => {
		const fetchArticles = async () => {
			const data = await getArticles({ skip: 0, take: 10, sort, keyword });
			setArticles(data.list);
		};
		fetchArticles();
	}, [sort, keyword]);

	return (
		<main className={styles.main}>
			<article className={styles.sub}>
				<h2>베스트 게시글</h2>
				<BestArticles articles={bestArticles}/>
			</article>
			<article className={styles.sub}>
				<div className={styles.head}>
					<h2>게시글</h2>
					<a className={styles.button}>글쓰기</a>
				</div>
				<div className={styles.head}>
					<div className={styles.inputWrapper}>
						<input className={styles.input} type="text" placeholder='검색할 상품을 입력해주세요' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
						<div className={styles.searchIconContainer}>
							<Image fill src="/images/ic_search.svg" alt="Search" />
						</div>
					</div>
					<select value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요 순</option>
					</select>
				</div>
				<Articles articles={articles}/>
			</article>
		</main>
	)
}

export default Boards;
