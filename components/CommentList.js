import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData, } from '@tanstack/react-query';
import Comment from './Comment';
import CommentForm from './commentForm';
import Button from './Button';
import { COMMENTS_PAGE_LIMIT, QUERY_KEYS } from '../values'
import { addComment, getCommentsByproductId } from '../api';
import styles from './CommentList.module.css';

function CommentList({ currentUserInfo, productId }) {
    const [page, setPage] = useState(0);
    const queryClient = useQueryClient();

    const { data: commentsData,
        isPending,
        isPlaceholderData,
    } = useQuery({
        queryKey: [QUERY_KEYS.COMMENTS, productId, page],
        queryFn: () => getCommentsByproductId(productId, page, COMMENTS_PAGE_LIMIT),
        isPlaceholderData: keepPreviousData,
    });

    const addCommentMutation = useMutation({
        mutationFn: (newComment) => addComment(productId, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.COMMENTS, productId],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEYS.COMMENT_COUNT, productId],
            })
        },
    });

    const handleAddComment = (newComment) => {
        setPage(0);
        addCommentMutation.mutate(newComment);
    };

    useEffect(() => {
        if (!isPlaceholderData && commentsData?.hasMore)
            queryClient.prefetchQuery({
                queryKey: [QUERY_KEYS.COMMENTS, productId, page + 1],
                queryFn: () =>
                  getCommentsByPostId(postId, page + 1, COMMENTS_PAGE_LIMIT),
              });
          }, [isPlaceholderData, commentsData, queryClient, productId, page]);
        
          if (isPending) return <Loading description="로딩 중입니다..." />;
        
          const comments = commentsData?.results ?? [];
        
          const paginationButtons = (
            <div className={styles.pagination}>
              <Button
                disabled={page === 0}
                onClick={() => setPage((old) => Math.max(old - 1, 0))}
              >
                &lt;
              </Button>
              <Button
                disabled={isPlaceholderData || !commentsData?.hasMore}
                onClick={() => setPage((old) => old + 1)}
              >
                &gt;
              </Button>
            </div>
          );
        
          return (
            <div className={styles.commentList}>
              <div>
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
                {comments.length > 0 ? paginationButtons : ''}
              </div>
              <CommentForm
                currentUserInfo={currentUserInfo}
                onSubmit={handleAddComment}
                buttonDisabled={addCommentMutation.isLoading}
              />
            </div>
          );
        }
        
        export default CommentList;