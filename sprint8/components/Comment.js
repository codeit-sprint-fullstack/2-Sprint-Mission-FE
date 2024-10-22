import Image from 'next/image';
import style from '@/styles/Comment.module.css';
import profileImg from '@/public/assets/img_profile.png';

export default function Comment() {
  return (
    <div className={style.container}>
      <div>
        <h1 className={style.title}>혹시 사용기간이 어떻게 되실까요?</h1>
      </div>
      <div className={style.profile}>
        <Image src={profileImg} alt="a white panda with grey background" />
        <div className={style.texts}>
          <p className={style.nickname}>똑똑한 판다</p>
          <p className={style.date}>1시간 전</p>
        </div>
      </div>
    </div>
  );
}
