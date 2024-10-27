import { useRouter } from 'next/router';
import Image from 'next/image';
import style from '@/src/styles/PostDetailInfo.module.css';
import profileImg from '@/public/assets/img_profile.png';
import heartIcon from '@/public/assets/ic_heart.png';
import formatDate from '@/src/utils/formatDate.js';
import DropBox from './DropBox.js';
import { deleteArticle } from '@/src/api/articleServices';

export default function PostDetail({ data }) {
  const router = useRouter();
  const { id } = router.query;

  async function removeArticle() {
    return await deleteArticle(id);
  }

  const handleEdit = () => {
    router.push(`/free-board/edit-post/${id}`);
  };

  const handleDelete = () => {
    removeArticle(id).then(() => {
      router.push('/free-board');
    });
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.titleAndKebab}>
          <h1 className={style.title}>{data.title}</h1>
          <DropBox editOnClick={handleEdit} deleteOnClick={handleDelete} />
        </div>
        <div className={style.bottom}>
          <div className={style.profileContainer}>
            <Image src={profileImg} alt="a white panda with grey background" />
            <div className={style.nicknameDataContainer}>
              <p className={style.nickname}>총명한 판다</p>
              <p className={style.date}>{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <hr className={style.line} />
          <div className={style.likeContainer}>
            <Image src={heartIcon} alt="heart icon" />
            <p className={style.likes}>123</p>
          </div>
        </div>
        <div className={style.content}>{data.content}</div>
      </div>
    </>
  );
}
