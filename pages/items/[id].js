import styles from '@/styles/ProductDetail.module.css';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { getProduct, getProductCommentList } from '@/lib/api/ProductService';
import ProductCommentAdd from '@/components/ProductDetail/ProductCommentAdd';
import ProductCommentList from '@/components/ProductDetail/ProductCommentList';
import ProductDropdown from '@/components/ProductDetail/ProductDropdown';
import formatDate from '@/lib/formatDate';
import formatPrice from '@/lib/formatPrice';

export async function getServerSideProps(context) {
  try {
    const productId = context.params['id'];

    const product = await getProduct(productId);
    const productComments = await getProductCommentList(productId);

    return {
      props: {
        product,
        productComments
      }
    };
  } catch (err) {
    console.error('데이터를 불러오는 중 문제가 발생하였습니다.', err.message);
    throw new Error(
      '서버에서 데이터를 가져오는 중 문제가 발생했습니다.' + err.message
    );
  }
}

export default function ProductDetail({ product, productComments }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();

  if (!product) return <div>No product found for this ID.</div>;

  const handleBackList = () => router.push('/items');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  return (
    <div className={styles.wrapper}>
      <div className={styles[`product-comments`]}>
        <div className={styles[`product-info`]}>
          <Image
            className={styles[`product-image`]}
            src={product.images[0]}
            width={486}
            height={486}
            alt="상품 이미지"
            priority
          />
          <div className={styles[`contents-wrap`]}>
            <div className={styles.contents}>
              <div className={styles.title}>
                <p>{product.name}</p>
                <h1>{formatPrice(product.price)}원</h1>
              </div>
              <div className={styles[`description-tags`]}>
                <div className={styles[`description-wrap`]}>
                  <p className={styles.subtitle}>상품 소개</p>
                  <p className={styles.description}>{product.description}</p>
                </div>
                <div className={styles.tags}>
                  <p className={styles.subtitle}>상품 태그</p>
                  <div className={styles[`tag-wrap`]}>
                    {product.tags.map((tag) => (
                      <p className={styles.tag}>#{tag}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles[`user-wrap`]}>
              <div className={styles[`user-info`]}>
                <Image
                  className={styles[`user-image`]}
                  src="/images/size=large.png"
                  width={40}
                  height={40}
                  alt="유저 아이콘"
                />
                <div className={styles.user}>
                  <p className={styles.nickname}>{product.ownerNickname}</p>
                  <p className={styles.date}>{formatDate(product.createdAt)}</p>
                </div>
              </div>
              <div className={styles[`favorite-wrap`]}>
                <div className={styles.favorite}>
                  <Image
                    src="/images/ic_heart.png"
                    width={32}
                    height={32}
                    alt="좋아요 아이콘"
                  />
                  <p>{product.favoriteCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.comments}>
          <ProductCommentAdd />
          <ProductCommentList productComments={productComments.list || []} />
        </div>
      </div>
      <button className={styles[`back-list`]} onClick={handleBackList}>
        목록으로 돌아가기
        <Image
          src="/images/ic_back.png"
          width={24}
          height={24}
          alt="목록 아이콘"
        />
      </button>
    </div>
  );
}
