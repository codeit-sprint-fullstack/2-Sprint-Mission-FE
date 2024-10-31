import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProductWithId } from "../apis/itemsService.js";
import mainStyles from './HomePage.module.css';
import styles from './ItemDetailPage.module.css';

function ItemDetailPage() {
	const { productId } = useParams();
	const { data, isPending, isError } = useQuery({
		queryKey: ["products", productId],
		queryFn: () => getProductWithId(productId),
	});

	if (isPending) return "Loading...";

	if (isError) return "Error...";

	console.log(data);

	return (<main className={mainStyles.main}>
		<div className={mainStyles.sub}>
			<div className={styles.imageContainer}>
				<img src={data.images.length ? data.images[0] : '/images/no_image.png'} alt={data.title} />
			</div>
			<div className={styles.info}>
				<h2>{data.title}</h2>
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
						<div className={styles.nickname}>{data.ownerNickname}</div>
					</div>
					<div className={styles.likes}>
						<span className={styles.heart}>A</span> {data.favoriteCount}
					</div>
				</div>
			</div>
		</div>
	</main>);
}

export default ItemDetailPage;
