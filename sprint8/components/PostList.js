import Image from 'next/image';
import Link from 'next/link';
import profileImg from '@/public/assets/img_profile.png';
import heartIcon from '@/public/assets/ic_heart.png';
import style from '@/styles/PostList.module.css';
import formatDate from '@/utils/formatDate.js';
import defaultImg from '@/public/assets/img_default.png';

export default function PostList({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <Link key={index} href={`/free-board/${item.id}`}>
          <div key={index} className={style.container}>
            <div className={style.titleAndImage}>
              <h1 className={style.title}>{item.title}</h1>
              <Image
                src={defaultImg}
                alt={item.title}
                className={style.postImage}
              />
            </div>
            <div className={style.bottom}>
              <div className={style.bottomSection}>
                <Image
                  src={profileImg}
                  alt="a white panda with grey background"
                  className={style.profileImg}
                />
                <p className={style.nickname}>총명한 판다</p>
                <p className={style.date}>{formatDate(item.createdAt)}</p>
              </div>
              <div className={style.bottomSection}>
                <Image src={heartIcon} alt="heart icon" />
                <p className={style.likes}>9999+</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
