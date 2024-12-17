import styles from '@/styles/ProductDetail.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getProduct,
  deleteProduct,
  getProductCommentList,
  createProductFavorite,
  deleteProductFavorite
} from '@/lib/api/ProductService';
import ProductCommentAdd from '@/components/ProductDetail/ProductCommentAdd';
import ProductCommentList from '@/components/ProductDetail/ProductCommentList';
import ProductDropdown from '@/components/ProductDetail/ProductDropdown';
import formatDate from '@/lib/formatDate';
import formatPrice from '@/lib/formatPrice';
import ConfirmModal from '@/components/Common/ConfirmModal';
import Spinner from '@/components/Common/Spinner';

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [productComments, setProductComments] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const router = useRouter();
  const productId = router.query['id'];

  useEffect(() => {
    if (!productId) return;

    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        router.push('/signin');
        return;
      }

      try {
        const productData = await getProduct(productId, token);
        const commentsData = await getProductCommentList(productId, token);

        setProduct(productData);
        setProductComments(commentsData || []);
        setFavoriteCount(productData.favoriteCount);
        setIsFavorited(productData.isFavorite);
        setLoading(false);
      } catch (err) {
        console.error('데이터를 가져오는 중 오류 발생:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) return <Spinner />;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const handleBackList = () => router.push('/items');
  const handleMenuClick = () => setDropdownOpen((prev) => !prev);

  const handleDeleteClick = () => {
    setDropdownOpen(false);
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteProduct(id);
      setIsModalOpen(false);
      router.push('/items');
    } catch (err) {
      console.error('삭제 요청 중 오류 발생:', err);
      setLoading(false);
    }
  };

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/signin');
      return;
    }

    try {
      if (isFavorited) {
        await deleteProductFavorite(productId);
        setFavoriteCount(favoriteCount - 1);
      } else {
        await createProductFavorite(productId);
        setFavoriteCount(favoriteCount + 1);
      }
      setIsFavorited(!isFavorited);
    } catch (err) {
      setLoading(false);
      console.error('좋아요 처리 중 오류 발생:', err);
    }
  };

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
                      src="/images/ic_kebab.png"
                      width={24}
                      height={24}
                      onClick={handleMenuClick}
                      alt="메뉴 아이콘"
                    />
                    {dropdownOpen && (
                      <div className={styles.dropdown}>
                        <ProductDropdown onDeleteClick={handleDeleteClick} />
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
                <div className={styles.favorite} onClick={handleFavoriteClick}>
                  <Image
                    src={
                      isFavorited
                        ? '/images/ic_heart_active.png'
                        : '/images/ic_heart.png'
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
      {isModalOpen && (
        <ConfirmModal
          onCancel={handleCancel}
          onDelete={() => handleDelete(product.id)}
          loading={loading}
        />
      )}
    </div>
  );
}
