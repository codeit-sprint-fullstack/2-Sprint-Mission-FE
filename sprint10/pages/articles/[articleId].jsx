import styles from '@/styles/ArticleDetail.module.css';
import { deleteArticleWithId, getArticleWithId, getArticleWithIdComments, likeArticleWithId, postArticleComment, postArticleWithIdComment, unlikeArticleWithId } from '@/apis/articlesService.js';
import Image from 'next/image';
import React, { useState } from 'react';
import ArticleComments from '@/components/ArticleComments.jsx';
import Link from 'next/link';
import PopUp from '@/components/PopUp.jsx';
import KebabMenu from '@/components/KebabMenu';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/context/UserProvider';
import instance from '@/apis/instance';

// export async function getServerSideProps(context) {
// 	const { id } = context.params;
// 	const article = await getArticleWithId(id);
// 	return {
// 		props: {
// 			article
// 		}
// 	};
// }

function ArticleDetail() {
	const [comment, setComment] = useState("");
	const [error, setError] = useState(null);
	const router = useRouter();
	const queryClient = useQueryClient();
	const user = useUser();
	const { articleId } = router.query;
	const { data: article, isPending, isError } = useQuery({
		queryKey: ["articles", articleId],
		queryFn: () => getArticleWithId(articleId),
	});
	const { data: articleComments, isPendingComments, isErrorComments } = useQuery({
		queryKey: ["articleComments", articleId],
		queryFn: () => getArticleWithIdComments(articleId),
	});
	const addCommentMutation = useMutation({
		mutationFn: (newComment) => postArticleWithIdComment(articleId, { content: newComment }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["articleComments", articleId],
			});
		},
	});
	const likeMutation = useMutation({
		mutationFn: async ({ userAction }) => {
			if (userAction === "like") {
				console.log("like");
				await likeArticleWithId(articleId);
			} else {
				console.log("unlike");
				await unlikeArticleWithId(articleId);
			}
		},
		onSuccess: (data, err) => {
			queryClient.invalidateQueries({
				queryKey: ["articles", articleId],
			});
		},
	});

	const handleWriteComment = async () => {
		addCommentMutation.mutate(comment);
		setComment("");
	};

	if (isPending || isPendingComments) return "Loading...";

	if (isError || isErrorComments) return "Error...";

	return (
		<main className={styles.main}>
			<article className={styles.sub}>
				<div className={styles.head}>
					<h2>{article.title}</h2>
					{user && user.user.id === article.author?.id && <KebabMenu
					onEdit={() => {
						router.push(`/boards/write?id=${article.id}`);
					}}
					onDel={async () => {
						const res = await deleteArticleWithId(article.id);
						if (res?.message) {
							setError(res);
						} else {
							router.push("/boards");
						}
					}}/>}
				</div>
				<div className={styles.articleImage}>
					<Image fill src={!article?.images?.length ? "/images/no_image.png" : article.images[0].startsWith('http') ? article.images[0] : `${instance.defaults.baseURL}${article.images[0]}`} alt={article.title} />
				</div>
				<div className={styles.profileAndLikes}>
					<div className={styles.authorAndDate}>
						<div className={styles.profileContainer}>
							<Image fill src="/images/ic_profile.png" alt="profile" />
						</div>
						<div className={styles.author}>{article?.author?.nickname}</div>
						<div className={styles.date}>{new Date(article.createdAt).toLocaleDateString("ko-KR")}</div>
					</div>
					<div className={styles.likes} onClick={() => {
						likeMutation.mutate({
							userAction: article.isFavorite ? "unlike" : "like",
						});
					}}>
						<div className={styles.heartContainer}>
							<Image fill src={article.isFavorite ? "/images/ic_heart.png" : "/images/ic_empty_heart.png"} alt="heart" />
						</div>
						{article.favoriteCount}
					</div>
				</div>
				<div className={styles.content}>{article?.content?.split('\n').map((line, index) => (<React.Fragment key={index}>{line}<br /></React.Fragment>))}</div>
			</article>
			<div className={styles.sub}>
				<h3>댓글달기</h3>
				<textarea className={styles.comment} placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
				<button type="button" className={styles.a_button} onClick={handleWriteComment} disabled={!comment}>등록</button>
				<div className={`${styles.cBoth} ${styles.noFloat}`}></div>
			</div>
			<div className={styles.sub}>
				<div className={styles.comments}>
					<ArticleComments comments={articleComments} articleId={article.id} />
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
