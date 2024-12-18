import { useEffect, useState } from 'react';
import { getArticles } from '@/apis/articlesService.ts';
import Articles from '@/components/Articles.tsx';
import BestArticles from '@/components/BestArticles.tsx';
import styles from '@/styles/Boards.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TArticle } from '@/types/types';

// export async function getServerSideProps() {
// 	const { list: bestArticles } = await getArticles({ page: 1, pageSize: 3, sort: 'recent' });
// 	const { list: articles } = await getArticles({ page: 1, pageSize: 10, sort: 'recent' });

// 	return {
// 		props: {
// 			bestArticles,
// 			articles,
// 		}
// 	}
// }

function Boards() {
	const [sort, setSort] = useState('recent');
	const [bestArticles, setBestArticles] = useState([]);
	const [keyword, setKeyword] = useState('');
	const {
		data: articlesData,
		isPending,
		isError,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ['articles', sort, keyword],
		queryFn: ({ pageParam }) => getArticles({ page: pageParam, pageSize: 10, sort, keyword }),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) =>
			lastPageParam < Math.ceil(lastPage.totalCount/10) ? lastPageParam + 1 : undefined,
	});

	useEffect(() => {
		const fetchBestArticles = async () => {
			const data = await getArticles({ page: 1, pageSize: 3, sort: 'recent', keyword: '' });
			setBestArticles(data.list);
		};
		fetchBestArticles();
	}, []);

	// useEffect(() => {
	// 	const fetchArticles = async () => {
	// 		const data = await getArticles({ page: 1, pageSize: 10, sort, keyword });
	// 		setArticles(data.list);
	// 	};
	// 	fetchArticles();
	// }, [sort, keyword]);

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error fetching data</div>;
	}

	return (
		<main className={styles.main}>
			<article className={styles.sub}>
				<h2>베스트 게시글</h2>
				<BestArticles articles={bestArticles}/>
			</article>
			<article className={styles.sub}>
				<div className={styles.head}>
					<h2>게시글</h2>
					<Link href="/boards/write" className={styles.a_button}>글쓰기</Link>
				</div>
				<div className={styles.head}>
					<div className={styles.inputWrapper}>
						<input className={styles.input} type="text" placeholder='검색할 상품을 입력해주세요' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
						<div className={styles.searchIconContainer}>
							<Image fill src="/images/ic_search.svg" alt="Search" />
						</div>
					</div>
					<select className={styles.sort} value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value="recent">최신순</option>
						<option value="favorite">좋아요 순</option>
					</select>
				</div>
				<Articles articles={articlesData as { pages: Array<{list: TArticle[]; totalCount: string}> }}/>
				{hasNextPage && <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>더 불러오기</button>}
			</article>
		</main>
	)
}

export default Boards;
