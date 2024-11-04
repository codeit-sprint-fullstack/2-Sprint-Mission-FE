import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProductWithId, getProductWithIdComments, likeProductWithId, postProductWithIdComment, unlikeProductWithId } from "../apis/itemsService.js";
import mainStyles from './HomePage.module.css';
import styles from './ItemDetailPage.module.css';
import Comments from "../components/Comments.jsx";
import { useState } from 'react';
import KebabMenu from "../components/KebabMenu.jsx";
import { useUser } from "../context/UserProvider.jsx";

function ItemDetailPage() {
	const [comment, setComment] = useState('');
	const user = useUser();
	const navigate = useNavigate();
	const { productId } = useParams();
	const queryClient = useQueryClient();
	const { data, isPending, isError } = useQuery({
		queryKey: ["products", productId],
		queryFn: () => getProductWithId(productId),
	});
	const { data: comments, isPending: isPendingComments, isError: isErrorComments } = useQuery({
		queryKey: ["comments", productId],
		queryFn: () => getProductWithIdComments(productId),
	});
	const addCommentMutation = useMutation({
		mutationFn: (newComment) => postProductWithIdComment(productId, { content: newComment }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["comments", productId],
			});
		},
	});
	const likeMutation = useMutation({
		mutationFn: async ({ userAction }) => {
			if (userAction === "like") {
				console.log("like");
				await likeProductWithId(productId);
			} else {
				console.log("unlike");
				await unlikeProductWithId(productId);
			}
		},
		// onMutate: async ({ userAction }) => {
		// 	await queryClient.cancelQueries({
		// 		queryKey: ["products", productId],
		// 	});

		// 	const { data: { isFavorite, favoriteCount } } = queryClient.getQueryData(["products", productId]);

		// 	queryClient.setQueryData(
		// 		["products", productId],
		// 		(data) => {
		// 			return { ...data, isFavorite: (userAction === "like"), favoriteCount: (userAction === "like") ? data.favoriteCount + 1 : data.favoriteCount - 1 };
		// 		}
		// 	);

		// 	return { isFavorite, favoriteCount };
		// },
		// onError: (err, { productId }, context) => {
		// 	queryClient.setQueryData(
		// 		["products", productId],
		// 		(data) => {
		// 			data.isFavorite = context.isFavorite;
		// 			data.favoriteCount = context.favoriteCount;
		// 		}
		// 	);
		// },
		onSuccess: (data, err) => {
			queryClient.invalidateQueries({
				queryKey: ["products", productId],
			});
		},
	});

	const handleWriteComment = () => {
		addCommentMutation.mutate(comment);
		setComment('');
	}

	if (isPending || isPendingComments) return "Loading...";

	if (isError || isErrorComments) return "Error...";

	console.log(data);
	console.log(comments);

	return (<main className={mainStyles.main}>
		<div className={styles.subTop}>
			<div className={styles.imageContainer}>
				<img src={data.images.length ? data.images[0] : '/images/no_image.png'} alt={data.name} />
			</div>
			<div className={styles.info}>
				<div className={styles.head}>
					<h2>{data.name}</h2>
					{user && user?.user?.id === data.ownerId && <KebabMenu onEdit={() => {navigate(`/registration/${productId}`)}} onDel={() => {}} />}
				</div>
				<div className={styles.price}>{data.price.toLocaleString()}원</div>
				<h3>상품 소개</h3>
				<div className={styles.description}>{data.description}</div>
				<h3>상품 태그</h3>
				<div className={styles.tags}>
					{data.tags.map((tag, index) => (
						<span key={index} className={styles.tag}>#{tag}</span>
					))}
				</div>
				<div className={styles.ownerAndLikes}>
					<div className={styles.owner}>
						<img src="/images/ic_unknown.png" alt={data.ownerNickname} />
						<div className={styles.nicknameAndDate}>
							<div className={styles.nickname}>{data.ownerNickname}</div>
							<div className={styles.date}>{new Date(data.createdAt).toLocaleDateString("ko-KR")}</div>
						</div>
					</div>
					<div className={styles.likes} onClick={() => {
						likeMutation.mutate({
							productId: data.id,
							userAction: data.isFavorite ? "unlike" : "like",
						});
					}}>
						<img src={data.isFavorite ? '/images/ic_heart.png' : '/images/ic_empty_heart.png'} alt="like/unlike" className={styles.heart} /> {data.favoriteCount}
					</div>
				</div>
			</div>
		</div>
		<div className={styles.sub}>
			<h3>댓글달기</h3>
			<textarea className={styles.comment} placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
			<button type="button" className={styles.a_button} onClick={handleWriteComment} disabled={addCommentMutation.isPending || !comment}>등록</button>
			<div className={`${styles.cBoth} ${styles.noFloat}`}></div>
		</div>
		<div className={styles.sub}>
			<div className={styles.comments}>
				<Comments comments={comments.list} productId={productId} />
			</div>
		</div>
		<div className={styles.backToItems}>
			<button className={styles.a_button} onClick={() => navigate('/items')}>목록으로 돌아가기 <img src="/images/ic_back.png" alt="back" /></button>
		</div>
	</main>);
}

export default ItemDetailPage;
