import { getComments, getProduct } from '@/lib/api';
import styles from '@/components/ProductDetail/ProductDetail.module.css';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import formatPrice from '@/lib/formatPrice';
import formatDate from '@/lib/formatDate';
import ProductDropdown from './ProductDropdown';
import ProductCommentAdd from './ProductCommentAdd';
import ProductCommentList from './ProductCommentList';
import ConfirmModal from '../Common/ConfirmModal';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductDetail({ id }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const router = useRouter();

  const handleBackList = () => router.push('/items');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        await deleteProductFavorite(id);
        setFavoriteCount(favoriteCount - 1);
      } else {
        await createProductFavorite(id);
        setFavoriteCount(favoriteCount + 1);
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      console.error('좋아요 처리 중 오류 발생:', err);
    }
  };

  const {
    data: product,
    isLoading: productLoading,
    error: productError
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
  });

  const {
    data: productComments,
    isLoading: commentsLoading,
    error: commentsError
  } = useQuery({
    queryKey: ['productComments', id],
    queryFn: () => getComments(id)
  });

  if (productLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (productError || commentsError) {
    return <div>Error: {productError?.message || commentsError?.message}</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles[`product-comments`]}>
        <div className={styles[`product-info`]}>
          <div className={styles['product-image-wrapper']}>
            <Image
              className={styles[`product-image`]}
              src={product.images[0]}
              alt="상품 이미지"
              fill
              priority
              sizes="100%"
            />
          </div>
          <div className={styles[`contents-wrap`]}>
            <div className={styles.contents}>
              <div className={styles.title}>
                <div className={styles[`title-menu`]}>
                  <p>{product.name}</p>
                  <div className={styles.menu}>
                    <Image
                      src="/images/ic_kebab.svg"
                      width={24}
                      height={24}
                      onClick={handleMenuClick}
                      alt="메뉴 아이콘"
                    />
                    {dropdownOpen && (
                      <div className={styles.dropdown}>
                        <ProductDropdown />
                      </div>
                    )}
                  </div>
                </div>
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
                    {product.tags.map((tag, i) => (
                      <p key={i} className={styles.tag}>
                        #{tag}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles[`user-wrap`]}>
              <div className={styles[`user-info`]}>
                <Image
                  className={styles[`user-image`]}
                  src="/images/default_user.svg"
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
                <div className={styles.favorite} onClick={handleFavoriteClick}>
                  <Image
                    src={
                      isFavorited
                        ? '/images/ic_heart_active.svg'
                        : '/images/ic_heart.svg'
                    }
                    width={32}
                    height={32}
                    alt="좋아요 아이콘"
                  />
                  <p>{favoriteCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.comments}>
          <ProductCommentAdd />
          <ProductCommentList />
        </div>
      </div>
      <button className={styles[`back-list`]} onClick={handleBackList}>
        목록으로 돌아가기
        <Image
          src="/images/ic_back.svg"
          width={24}
          height={24}
          alt="목록 아이콘"
        />
      </button>
      {isModalOpen && <ConfirmModal />}
    </div>
  );
}
