import { useViewport } from '@/context/ViewportProvider';
import styles from '@/styles/Boards.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';

function BestArticles({ articles: initialArticles }) {
	const [articles, setArticles] = useState(initialArticles);
	const viewport = useViewport();

	useEffect(() => {
		let maxLength;
		if (viewport === 'PC') {
			maxLength = 3;
		} else if (viewport === 'tablet') {
			maxLength = 2;
		} else {
			maxLength = 1;
		}
		setArticles(initialArticles.slice(0, maxLength));
	}, [viewport, initialArticles]);

	return (<div>
		<ul className={styles.bestArticles}>
			{articles.map((article) => (
				<li key={article.id}>
					<div className={styles.bestImageWrapper}>
						<Image fill src="/images/img_badge.png" alt="Best" />
					</div>
					<div className={styles.titleWrapper}>
						<div className={styles.title}><Link href={`/articles/${article.id}`}>{article.title}</Link></div>
						<div className={styles.imageWrapper}>
							<Image fill src="/images/def-img.png" alt="상품 이미지" />
						</div>
					</div>
					<div className={styles.infos}>
						<div className={styles.authorAndLikes}>
							{article.author.nickname} &nbsp; ♡ {article.favoriteCount}
						</div>
						<div className={styles.date}>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</div>
					</div>
				</li>
			))}
		</ul>
	</div>);
}

export default BestArticles;
