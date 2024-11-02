import styles from '../pages/ItemDetailPage.module.css';
import KebabMenu from "./KebabMenu.jsx";
import { useState } from "react";
import { deleteComment, patchComment } from "../apis/itemsService.js";
import PopUp from "./PopUp.jsx";
import { useUser } from '../context/UserProvider.jsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function Comment({ comment, productId }) {
	const [isEditting, setIsEditting] = useState(false);
	const [error, setError] = useState(null);
	const [content, setContent] = useState(comment.content);
	const user = useUser();
	const queryClient = useQueryClient();
	const patchCommentMutation = useMutation({
    mutationFn: ({ commentId, newComment }) => patchComment(commentId, { content: newComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", productId],
      });
    },
  });
	const deleteCommentMutation = useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", productId],
      });
    },
  });

	return (
		<>
			<div className={styles.head}>
				{isEditting
				? (<input value={content} onChange={(e) => setContent(e.target.value)} />)
				: (
				<>
					<div className={styles.commentContent}>{comment.content}</div>
					{user && user.user.id === comment.writer.id && <KebabMenu onEdit={() => {setIsEditting(true)}} onDel={async () => {
						deleteCommentMutation.mutate(comment.id);
					}} />}
				</>)}
			</div>
			{isEditting && (
			<>
				<button className={styles.editButton} onClick={async () => {
					patchCommentMutation.mutate({ commentId: comment.id, newComment: content });
					setIsEditting(false);
				}} disabled={patchCommentMutation.isPending}>수정 완료</button>
				<button className={styles.cancelButton} onClick={() => {setIsEditting(false); setContent(comment.content);}}>취소</button>
			</>)}
			<div className={styles.profileAndNicknameAndTime}>
				<div className={styles.profileContainer}>
					<img src="/images/ic_unknown.png" alt="profile" />
				</div>
				<div className={styles.nicknameAndTime}>
					<div className={styles.nickname}>{comment.writer.nickname}</div>
					<div className={styles.time}>{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</div>
				</div>
			</div>
			<PopUp error={error} setError={setError} />
		</>
	);
}

export default Comment;
