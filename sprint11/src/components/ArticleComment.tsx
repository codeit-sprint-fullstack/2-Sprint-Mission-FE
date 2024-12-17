import styles from '@/styles/ItemDetailPage.module.css';
import KebabMenu from "./KebabMenu.tsx";
import { useState } from "react";
import PopUp from "./PopUp.tsx";
import { useUser } from '../context/UserProvider.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteArticleComment, patchArticleComment } from '@/apis/articlesService.ts';
import Image from 'next/image';

function ArticleComment({ comment, articleId }: {
	comment: {
		id: string;
		content: string;
		commenter: {
			id: number;
			nickname: string;
		},
		createdAt: Date;
	},
	articleId: string;
}) {
	const [isEditting, setIsEditting] = useState(false);
	const [error, setError] = useState(null);
	const [content, setContent] = useState(comment.content);
	const user = useUser();
	const queryClient = useQueryClient();
	const patchCommentMutation = useMutation({
    mutationFn: ({ commentId, newComment }: {
			commentId: string;
			newComment: string;
		}) => patchArticleComment(commentId, articleId, { content: newComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleComments", articleId],
      });
    },
  });
	const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => deleteArticleComment(commentId, articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articleComments", articleId],
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
					{user && user?.user?.id === comment.commenter.id && <KebabMenu onEdit={() => {setIsEditting(true)}} onDel={async () => {
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
					<Image fill src="/images/ic_unknown.png" alt="profile" />
				</div>
				<div className={styles.nicknameAndTime}>
					<div className={styles.nickname}>{comment.commenter.nickname}</div>
					<div className={styles.time}>{new Date(comment.createdAt).toLocaleDateString("ko-KR")}</div>
				</div>
			</div>
			<PopUp error={error} setError={setError} />
		</>
	);
}

export default ArticleComment;
