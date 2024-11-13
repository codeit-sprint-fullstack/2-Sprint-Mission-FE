import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/api/axios";
import ProductImg from "public/default_product_img.svg";
import profile from "public/ic_profile.svg";
import styles from "@/styles/Detail.module.css";
import barImg from "public/bar_img.svg";
import heartImg from "public/ic_heart.svg";

interface ProductDetail {
  name: string;
  description: string;
  price: number;
  tags: string[];
  favoriteCount: number;
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
        {productDetail && (
          <div className={styles.sale_info}>
            <div className={styles.sales_info_header}>
              <p className={styles.product_name}>{productDetail.name}</p>
              <p className={styles.product_price}>{productDetail.price}원</p>
            </div>
            <div className={styles.br} />
            <div className={styles.more_info}>
              <div className={styles.description}>
                <p className={styles.product_produce}>상품 소개</p>
                <p className={styles.product_description}>
                  {productDetail.description}
                </p>
              </div>
              <div className={styles.tags}>
                <p className={styles.product_produce}>상품 태그</p>
                <div className={styles.product_tags}>
                  {productDetail.tags.map((tag, index) => (
                    <p key={index} className={styles.tag}>
                      #{tag}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.profile}>
              <div className={styles.owner_info}>
                <Image
                  src={profile}
                  alt="프로필"
                  className={styles.profile_img}
                />
                <div className={styles.no_profile_img}>
                  <p className={styles.panda}>총명한 판다</p>
                  <p className={styles.date}>2024. 01. 02</p>
                </div>
              </div>
              <div className={styles.heart_info}>
                <Image src={barImg} alt="작대기" />
                <div className={styles.divider}>
                  <Image src={heartImg} alt="하트" />
                  <p className={styles.favorite}>
                    {productDetail.favoriteCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.br_two} />
      <div className={styles.comment}>
        <div className={styles.new_comment_wrapper}>
          <p className={styles.contact_text}>문의하기</p>
          <textarea
            className={styles.contact_input}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          />
          <div className={styles.button_wrapper}>
            <button className={styles.register_button}>등록</button>
          </div>
        </div>
      </div>
    </div>
  );
}
