import { useRouter } from 'next/router';
import PostDetailInfo from '@/components/PostDetailInfo.js';

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <PostDetailInfo />
    </>
  );
}
