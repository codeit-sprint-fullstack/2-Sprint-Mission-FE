import styles from '@/styles/ItemDetailPage.module.css';
import ArticleComment from './ArticleComment.tsx';
import Image from 'next/image';

function ArticleComments({ comments, articleId }: {
	comments: {
		id: string;
		content: string;
		commenter: {
			id: number;
			nickname: string;
		},
		createdAt: Date;
	}[];
	articleId: string;
}) {
	let res;
	if (!comments || comments.length === 0) {
		res = (<div className={styles.center}>
			<div className={styles.imgReplyEmptyContainer}><Image fill src="/images/Img_reply_empty.png" alt="댓글 없음" /></div><br />
			아직 댓글이 없어요.<br />
			지금 댓글을 달아보세요!
		</div>);
	} else {
		res = (<ul>
			{comments?.map((comment) => (
				<li key={comment.id}>
					<ArticleComment comment={comment} articleId={articleId} />
				</li>
			))}
		</ul>)
	}

	return res;
}

export default ArticleComments;
