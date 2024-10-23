import Image from 'next/image';
import style from '@/styles/PostDetailInfo.module.css';
import profileImg from '@/public/assets/img_profile.png';
import heartIcon from '@/public/assets/ic_heart.png';
import formatDate from '@/utils/formatDate.js';

export default function PostDetail({ data }) {
  return (
    <>
      <div className={style.container}>
        <div className={style.titleAndKebab}>
          <h1 className={style.title}>{data.title}</h1>
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
