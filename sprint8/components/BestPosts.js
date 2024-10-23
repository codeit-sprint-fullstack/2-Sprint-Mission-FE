import Image from 'next/image';
import style from '@/styles/BestPosts.module.css';
import bestBedge from '@/public/assets/img_badge.png';
import heartIcon from '@/public/assets/ic_heart.png';
import defaultImg from '@/public/assets/img_default.png';
import formatDate from '@/utils/formatDate.js';

export default function BestProduct({ data }) {
  const topThree = data.slice(0, 3);

  return (
    <div className={style.container}>
      {topThree.map((item, index) => (
        <div key={index} className={style.itemBlock}>
          <Image src={bestBedge} alt="best item badge" />
          <div className={style.titleImg}>
            <h1 className={style.title}>{item.title}</h1>
            <Image
              src={defaultImg}
              className={style.productImg}
              alt={item.title}
            />
          </div>
          <div className={style.blockBottom}>
            <div className={style.bottomLeft}>
              <p className={style.bottom}>총명한 판다</p>
              <Image src={heartIcon} alt="heart icon" />
              <p className={style.bottom}>9999+</p>
            </div>
            <p className={style.date}>{formatDate(item.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
