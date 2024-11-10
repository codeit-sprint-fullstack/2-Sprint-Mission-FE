"use client"; //TODO: 서버 컴포넌트로 변경하는 방법 고안해보기,,(useRouter 사용으로 클라이언트 전환됨)

import Image from "next/image";
import style from "@/src/styles/items/ProductDetail.module.css";
import profileImg from "@/public/assets/img_profile.png";
import heartIcon from "@/public/assets/icon_heart.png";
import formatDate from "@/src/utils/formatDate";
import DropBoxWrapper from "./DropBoxWrapper";
import ProductTag from "./ProductTag";
import defaultImg from "@/public/assets/img_default.png";
import { deleteProduct } from "@/src/api/productServices";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/useAuth";

interface ProductDetail {
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
    ownerNickname: string;
  } | null;
}

export default function ProductDetail({ data }: ProductDetail) {
  const router = useRouter();
  const { user } = useAuth();
  const currentUserId = user?.id;

  if (!data) return null;

  const productImg = data.images[0] ? data.images[0] : defaultImg;

  const handleDeleteProduct = async () => {
    await deleteProduct(data.id.toString());
    router.push("/products");
  };

  const handleEditClick = () => {
    router.push(`/products/${data.id}/edit-product`);
  };

  return (
    <div className={style.container}>
      <div>
        <Image
          className={style.image}
          src={productImg}
          alt={`${data.name} image`}
          width={486}
          height={486}
        />
      </div>
      <div className={style.detailContainer}>
        <div className={style.titleContainer}>
          <div className={style.dropBoxContainer}>
            <h2 className={style.title}>{data.name}</h2>
            {data.ownerId === currentUserId && (
              <DropBoxWrapper
                editOnClick={() => handleEditClick()}
                deleteOnClick={() => handleDeleteProduct()}
              />
            )}
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
            <div className={style.tagContainer}>
              <ProductTag data={data.tags} />
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
