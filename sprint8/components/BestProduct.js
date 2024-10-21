import Image from 'next/image';
import style from '@/styles/BestProduct.module.css';
import bestBedge from '@/public/assets/img_badge.png';

//UI만 잡음
export default function BestProduct() {
  return (
    <div className={style.itemBlock}>
      <Image src={bestBedge} alt="best item bedge" />
      <div className={style.titleImg}>
        <h1 className={style.title}>
          맥북 16인치 16기가 1테라 정도 사양이면 얼마에 팔아야하나요?
        </h1>
        <Image className={style.productImg} />
      </div>
      <div className={style.blockBottom}>
        <div className={style.bottomLeft}>
          <p className={style.bottom}>총명한판다</p>
          <p className={style.bottom}>9999+</p>
        </div>
        <p className={style.date}>2024. 04. 16</p>
      </div>
    </div>
  );
}
