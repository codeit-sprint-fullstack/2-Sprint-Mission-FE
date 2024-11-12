import { useRouter } from "next/router";
import ProductImg from "public/default_product_img.svg";
import profile from "public/ic_profile.svg";
import styles from "@/styles/Detail.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/axios";

interface ProductDetail {
  name: string;
  description: string;
  price: number;
  tags: string[];
  favoriteCount: number;
  ownerNickname: string;
}

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  console.log(typeof id);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(
    null
  );

  useEffect(() => {
    const loadProducts = async (productId: string) => {
      try {
        setLoading(true);
        const data = await getProductDetail(productId);
        setProductDetail(data);
      } catch (error) {
        const errorMessage = (error as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (typeof id === "string") {
      loadProducts(id);
      console.log(111);
    } else {
      setError("ID가 정의되지 않았습니다.");
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.detail}>
      <div className={styles.product_detail}>
        <Image src={ProductImg} alt="제품 사진" />
        <div className={styles.sale_info}>
          {productDetail && (
            <div>
              <p>{productDetail.name}</p>
              <p>{productDetail.price}원</p>
              <p>상품 소개</p>
              <p>{productDetail.description}</p>
              <p>상품 태그</p>
              <p>{productDetail.tags}</p>
              <Image src={profile} alt="프로필" />
              <p>총명한 판다</p>
              <p>2024. 01. 02</p>
              <p>{productDetail.favoriteCount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
