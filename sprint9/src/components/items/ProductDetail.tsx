import Image from "next/image";
import style from "@/src/styles/items/ProductDetail.module.css";
import profileImg from "@/public/assets/img_profile.png";
import heartIcon from "@/public/assets/icon_heart.png";
import formatDate from "@/src/utils/formatDate";
import DropBox from "../DropBox";

interface ProductDetailProps {
  data: {
    id: number;
    name: string;
    description: string;
    price: number;
    tags: string[];
    images: string[];
    ownerId: number;
    favoriteCount: number;
    createdAt: string;
    updatedAt: string;
    ownerNickname: string;
    isFavorite: boolean;
  } | null;
}

//TODO: Dropbox props 전달
export default function ProductDetail({ data }: ProductDetailProps) {
  if (!data) return null;

  return (
    <div className={style.container}>
      <div>
        <Image
          className={style.image}
          src={data.images[0]}
          alt={`${data.name} image`}
          width={486}
          height={486}
        />
      </div>
      <div className={style.detailContainer}>
        <div className={style.titleContainer}>
          <div className={style.dropBoxContainer}>
            <h2 className={style.title}>{data.name}</h2>
            <DropBox />
          </div>
          <h1 className={style.price}>{`${data.price}원`}</h1>
        </div>
        <hr className={style.lineHorizontal} />
        <div className={style.bottomContainer}>
          <div className={style.descriptionContainer}>
            <p className={style.subtitle}>상품 소개</p>
            <p className={style.description}>{data.description}</p>
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
              <p className={style.nickname}>{data.ownerNickname}</p>
              <p className={style.date}>{formatDate(data.createdAt)}</p>
            </div>
          </div>
          <hr className={style.line} />
          <div className={style.likeContainer}>
            <Image src={heartIcon} alt="heart icon" />
            <p className={style.likes}>{data.favoriteCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
