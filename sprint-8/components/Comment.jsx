import styles from '@/styles/ArticleDetail.module.css';
import Image from "next/image";
import KebabMenu from "./KebabMenu.jsx";
import { useState } from "react";
import { deleteArticleComment, patchArticleComment } from "@/apis/articlesService.js";
import PopUp from "./PopUp.jsx";

function Comment({ comment, articleId }) {
	const [isEditting, setIsEditting] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [error, setError] = useState(null);
	const [content, setContent] = useState(comment.content);

	if (isDeleted) return null;

	return (
		<>
			<div className={styles.head}>
				{isEditting
				? (<input value={content} onChange={(e) => setContent(e.target.value)} />)
				: (
				<>
					<div className={styles.commentContent}>{comment.content}</div>
					<KebabMenu onEdit={() => {setIsEditting(true)}} onDel={async () => {
						const res = await deleteArticleComment(articleId, comment.id);
						if (res?.message) {
							setError(res);
						} else {
							setIsDeleted(true);
						}
					}} />
				</>)}
			</div>
			<div className={styles.profileAndNicknameAndTime}>
				<div className={styles.profileContainer}>
					<Image fill src="/images/ic_profile.png" alt="profile" />
				</div>
				<div className={styles.nicknameAndTime}>
					<div className={styles.nickname}>{comment.commenter.nickname}</div>
					<div className={styles.time}>{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</div>
				</div>
				{isEditting && (
				<>
					<button className={styles.editButton} onClick={async () => {
						const res = await patchArticleComment(articleId, comment.id, { content, commenterId: "86f32cda-cc20-49e5-a1c8-a69ff98e5ebf" });
						if (res?.message) {
							setError(res);
						} else {
							comment.content = content;
							setIsEditting(false);
						}
					}}>수정 완료</button>
					<button className={styles.cancelButton} onClick={() => {setIsEditting(false); setContent(comment.content);}}>취소</button>
				</>)}
			</div>
			<PopUp error={error} setError={setError} />
		</>
	);
}

export default Comment;
