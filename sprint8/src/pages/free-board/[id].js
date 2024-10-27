import style from '@/src/styles/post-detail.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostDetailInfo from '@/src/components/PostDetailInfo.js';
import AddComment from '@/src/components/AddComment.js';
import CommentList from '@/src/components/CommentList.js';
import { getArticle } from '@/src/api/articleServices.js';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);

  async function fetchArticle(id) {
    const data = await getArticle(id);
    setArticle(data);
    setComments(data.comments || []);
  }

  useEffect(() => {
    fetchArticle(id);
  }, [id]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  const handleUpdatedComment = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
  };

  return (
    <div className={style.body}>
      <PostDetailInfo data={article} />
      <AddComment id={id} onNewComment={handleNewComment} />
      <CommentList
        comments={comments}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdatedComment}
      />
    </div>
  );
}
