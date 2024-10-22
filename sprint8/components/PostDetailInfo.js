import Image from 'next/image';
import style from '@/styles/PostDetailInfo.module.css';
import profileImg from '@/public/assets/img_profile.png';
import heartIcon from '@/public/assets/ic_heart.png';

export default function PostDetail() {
  return (
    <>
      <div className={style.container}>
        <div className={style.titleAndKebab}>
          <h1 className={style.title}>
            맥북 16인치 16기가 11테라 정도 사양이면 어쩌고
          </h1>
        </div>
        <div className={style.bottom}>
          <div className={style.profileContainer}>
            <Image src={profileImg} alt="a white panda with grey background" />
            <div className={style.nicknameDataContainer}>
              <p className={style.nickname}>총명한 판다</p>
              <p className={style.date}>2024. 04. 16</p>
            </div>
          </div>
          <hr className={style.line} />
          <div className={style.likeContainer}>
            <Image src={heartIcon} alt="heart icon" />
            <p className={style.likes}>123</p>
          </div>
        </div>
      </div>
      <div className={style.content}>
        맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
      </div>
    </>
  );
}
