import Image from 'next/image';
import style from '@/styles/Comment.module.css';
import profileImg from '@/public/assets/img_profile.png';

export default function Comment({ comments }) {
  console.log('Comments:', comments);
  return (
    <>
      {comments.length > 0 ? (
        comments.map((item, index) => (
          <div key={index} className={style.container}>
            <div>
              <h1 className={style.title}>{item.content}</h1>
            </div>
            <div className={style.profile}>
              <Image
                src={profileImg}
                alt="a white panda with grey background"
              />
              <div className={style.texts}>
                <p className={style.nickname}>똑똑한 판다</p>
                <p className={style.date}>1시간 전</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>댓글이 없습니다.</p>
      )}
    </>
  );
}
