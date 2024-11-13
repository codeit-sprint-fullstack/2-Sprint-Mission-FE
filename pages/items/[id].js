import style from "@/styles/ProductDetail.module.css";
import KebabMenu from "@/components/KebabMenu";
import Comment from "@/components/Comment";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/formatDate";
import { deleteProduct, getProduct } from "@/pages/api/ProductService";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import profile from "@/public/ic_profile.png";
import defaultImg from "@/public/img_default.png";
import LikeButton from "@/components/LikeButton";

export default function ProductDetail() {
  const router = useRouter();
  const { user, isPending } = useAuth(true);
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  const handleEdit = () => {
    if (product.ownerId === user.id) {
      router.push({
        pathname: '/registration',
        query: { id, name: product.name, description: product.description, price: product.price, images: JSON.stringify(product.images), tags: JSON.stringify(product.tags)  },
      });
    } else {
      alert("본인이 작성한 글만 수정할 수 있습니다.");
    }
  };

  const handleDelete = async () => {
    if (product.ownerId === user.id) {
      if (confirm("정말 삭제하시겠습니까?")) {
        try {
          await deleteProduct(id);
          router.push('/items');
        } catch (error) {
          console.error(error.message);
        }
      }
    } else {
      alert("본인이 작성한 글만 삭제할 수 있습니다.");
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProduct(id);
          setProduct(productData);
        } catch (error) {
          console.error(error.message);
        }
      }
    };
    fetchProduct();
  }, [id, user]);

  if (!product || isPending)
    return (
      <div className={style.loading}>
        <Spinner />
      </div>
    );

  return (
    <div className={style.container}>
      <div className={style.body}>
      <div className={style.productGroup}>
        <Image
          className={style.productImg}
          src={!product.images.includes('example.com') ? defaultImg : product.images[0] }
          alt="product"
          width={300}
          height={300}
        />
        <div className={style.productInfo}>
          <div className={style.productTop}>
            <p className={style.productName}>{product.name}</p>
            <KebabMenu className={style.kebab} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
          <p className={style.productPrice}>{product.price}원</p>
          <span className={style.divider} />
          <div className={style.productDetail}>
            <p className={style.productDetailTitle}>상품 소개</p>
            <p className={style.productDetailContent}>{product.description}</p>
            <p className={style.tagTitle}>상품 태그</p>
            <div className={style.tagGroup}>
              {product.tags.map((tag, index) => (
                <div key={index} className={style.tag}>
                  # {tag}
                </div>
              ))}
            </div>
            <div className={style.user}>
              <div className={style.profileDate}>
                <Image
                  className={style.profileImg}
                  src={profile}
                  alt="profile"
                />
                <div className={style.nameDate}>
                  <p className={style.userName}>{product.ownerNickname}</p>
                  <p className={style.date}>{formatDate(product.createdAt)}</p>
                </div>
              </div>
              <LikeButton isItem={true} id={id} liked={product.isFavorite} cnt={product.favoriteCount} />
            </div>
          </div>
        </div>
      </div>
      <span className={style.btmdivider} />
      <div className={style.comment}>
        <Comment />
      </div>
      </div>
    </div>
  );
}
