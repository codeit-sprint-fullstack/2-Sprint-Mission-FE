import styles from '@/styles/ArticleDetail.module.css';
import Image from 'next/image';
import KebabMenu from './KebabMenu';

function Comments({ comments }) {
	let res;
	if (!comments || comments.length === 0) {
		res = (<div className={styles.center}>
			<div className={styles.imgReplyEmptyContainer}><Image fill src="/images/Img_reply_empty.png" alt="댓글 없음" /></div>
			아직 댓글이 없어요.<br />지금 댓글을 달아보세요!
		</div>);
	} else {
		res = (<ul>
			{comments.map((comment) => (
				<li key={comment.id}>
					<div className={styles.head}>
						<div className={styles.commentContent}>{comment.content}</div>
						<KebabMenu onEdit={() => {}} onDelete={() => {}} />
					</div>
					<div className={styles.profileAndNicknameAndTime}>
						<div className={styles.profileContainer}>
							<Image fill src="/images/ic_profile.png" alt="profile" />
						</div>
						<div className={styles.nicknameAndTime}>
							<div className={styles.nickname}>{comment.commenter.nickname}</div>
							<div className={styles.time}>{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</div>
						</div>
					</div>
				</li>
			))}
		</ul>)
	}

	return res;
}

export default Comments;
