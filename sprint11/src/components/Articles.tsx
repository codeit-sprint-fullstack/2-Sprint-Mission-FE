import instance from '@/apis/instance';
import styles from '@/styles/Boards.module.css';
import { TArticle } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

function Articles({ articles }:
	{ articles: { pages: Array<{list: TArticle[]; totalCount: string}> } }
) {
	return (<div>
		<ul className={styles.articles}>
			{articles.pages.map((page: {list: TArticle[]; totalCount: string}) => page.list.map((article) => (
				<li key={article.id}>
					<div className={styles.titleWrapper}>
						<div className={styles.title}><Link href={`/articles/${article.id}`}>{article.title}</Link></div>
						<div className={styles.imageWrapper}>
							<Image fill src={!article?.images?.length ? "/images/no_image.png" : article.images[0].startsWith('http') ? article.images[0] : `${instance.defaults.baseURL}${article.images[0]}`} alt="상품" />
						</div>
					</div>
					<div className={styles.infos}>
						<div className={styles.authorAndDate}>
							<div className={styles.profile}>
								<Image fill src="/images/ic_profile.png" alt="프로필" />
							</div>
							{article?.author?.nickname} &nbsp;{new Date(article.createdAt).toLocaleDateString("ko-KR")}
						</div>
						<div className={styles.likes}>♡ {article.favoriteCount}</div>
					</div>
				</li>
			)))}
		</ul>
	</div>);
}

export default Articles;
