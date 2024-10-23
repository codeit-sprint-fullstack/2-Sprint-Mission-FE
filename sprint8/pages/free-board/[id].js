import style from '@/styles/post-detail.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PostDetailInfo from '@/components/PostDetailInfo.js';
import AddComment from '@/components/AddComment.js';
import Comment from '@/components/Comment.js';
import axios from '@/lib/axios.js';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState([]);

  async function fetchArticle(id) {
    const res = await axios.get(`/articles/${id}`);
    const data = await res.data;
    setArticle(data);
  }

  useEffect(() => {
    fetchArticle(id);
  }, [id]);

  return (
    <div className={style.body}>
      <PostDetailInfo data={article} />
      <AddComment />
      <Comment data={article} />
    </div>
  );
}
