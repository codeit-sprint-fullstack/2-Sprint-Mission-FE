import Image from "next/image";
import style from "@/src/styles/items/ProductDetail.module.css";
import profileImg from "@/public/assets/img_profile.png";
import heartIcon from "@/public/assets/icon_heart.png";

export default function ProductDetail() {
  return (
    <div>
      <div>
        <Image />
      </div>
      <div className={style.detailContainer}>
        <div className={style.titleContainer}>
          <h2 className={style.title}>아이패드 미니 팔아요</h2>
          <h1 className={style.price}>500,000원</h1>
        </div>
        <hr className={style.lineHorizontal} />
        <div className={style.bottomContainer}>
          <div className={style.descriptionContainer}>
            <p className={style.subtitle}>상품 소개</p>
            <p className={style.description}>
              액정이 잔기스랑 어쩌고 저쩌고 있습니다 와랄랄라 올롤롤로
            </p>
          </div>
          <div className={style.descriptionContainer}>
            <p className={style.subtitle}>상품 태그</p>
            <div>
              {/* TODO: 컴포넌트화 시키기 */}
              <p>아이패드 미니</p>
            </div>
          </div>
        </div>
        <div className={style.userContainer}>
          <div className={style.profileContainer}>
            <Image src={profileImg} alt="a white panda with grey background" />
            <div className={style.nicknameDataContainer}>
              <p className={style.nickname}>총명한 판다</p>
              <p className={style.date}>2022.01.11</p>
            </div>
          </div>
          <hr className={style.line} />
          <div className={style.likeContainer}>
            <Image src={heartIcon} alt="heart icon" />
            <p className={style.likes}>123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
