import style from '@/styles/post-detail.module.css';
import { useRouter } from 'next/router';
import PostDetailInfo from '@/components/PostDetailInfo.js';
import AddComment from '@/components/AddComment.js';
import Comment from '@/components/Comment.js';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={style.body}>
      <PostDetailInfo />
      <AddComment />
      <Comment />
    </div>
  );
}
