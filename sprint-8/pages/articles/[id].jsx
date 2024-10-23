import styles from '@/styles/ArticleDetail.module.css';
import { getArticleWithId, postArticleComment } from "@/apis/articlesService";
import Image from "next/image";
import { useState } from 'react';
import Comments from '@/components/Comments.jsx';
import Link from 'next/link';
import PopUp from '@/components/PopUp.jsx';
import KebabMenu from '@/components/KebabMenu';

export async function getServerSideProps(context) {
	const { id } = context.params;
	const article = await getArticleWithId(id);
	return {
		props: {
			article
		}
	};
}

function ArticleDetail({ article }) {
	const [comment, setComment] = useState("");
	const [articleComments, setArticleComments] = useState(article.articleComments);
	const [error, setError] = useState(null);

	const handleWriteComment = async () => {
		const res = await postArticleComment(article.id, { content: comment, commenterId: "86f32cda-cc20-49e5-a1c8-a69ff98e5ebf" });
		if (res?.id) {
			setArticleComments([res, ...articleComments]);
			setComment("");
		} else {
			setError(res);
		}
	};

	const toggleEditOrDel = (e) => {

	};

	return (
		<main className={styles.main}>
			<article className={styles.sub}>
				<div className={styles.head}>
					<h2>{article.title}</h2>
					<KebabMenu onEdit={() => {}} onDel={() => {}}/>
				</div>
				<div className={styles.profileAndLikes}>
					<div className={styles.authorAndDate}>
						<div className={styles.profileContainer}>
							<Image fill src="/images/ic_profile.png" alt="profile" />
						</div>
						<div className={styles.author}>{article.author.nickname}</div>
						<div className={styles.date}>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</div>
					</div>
					<div className={styles.likes}>
						<div className={styles.heartContainer}>
							<Image fill src="/images/ic_heart.png" alt="heart" />
						</div>
						{article.favoriteCount}
					</div>
				</div>
				<div className={styles.content}>{article.content}</div>
			</article>
			<div className={styles.sub}>
				<h3>댓글달기</h3>
				<textarea className={styles.comment} placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
				<button type="button" className={styles.a_button} onClick={handleWriteComment}>등록</button>
				<div className={`${styles.cBoth} ${styles.noFloat}`}></div>
			</div>
			<div className={styles.sub}>
				<div className={styles.comments}>
					<Comments comments={articleComments} />
				</div>
			</div>
			<div className={styles.sub}>
				<Link href="/boards"><button type="button" className={styles.backToBoards}>목록으로 돌아가기 <div className={styles.imgBack}><Image fill src="/images/ic_back.png" alt="돌아가기" /></div></button></Link>
			</div>
			<PopUp error={error} setError={setError} />
		</main>
	);
}

export default ArticleDetail;
