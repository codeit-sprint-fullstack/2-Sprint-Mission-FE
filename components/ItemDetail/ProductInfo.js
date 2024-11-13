import styles from './ProductInfo.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Common/Dropdown';
//import Spinner from '@/components/Common/Spinner';           
import ProductDetailSkeleton from './ProductDetailSkeleton'; 
import { deleteProduct } from '@/lib/api/ProductService';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import ModalConfirm from '../Common/ModalConfirm';
import { useProduct, useProductFavorite } from '@/lib/hooks/useProductHooks';

//const SPINNER_DELAY = 500;

export default function ProductInfo({ productId }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 확인 모달 상태
  //const [showSpinner, setShowSpinner] = useState(false); // 스피너 표시 상태

  useAuth(true); // 인가된 사용자만 접근 허용

  // React Query 훅 사용 - 상품 정보, 로딩, 에러 상태 관리
  const { data: product, isLoading, isError } = useProduct(productId);
  const { addFavoriteMutation, removeFavoriteMutation } = useProductFavorite(productId);

  /*
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSpinner(true), SPINNER_DELAY);
      return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 해제
    } else {
      setShowSpinner(false); // 로딩이 끝나면 스피너 숨기기
    }
  }, [isLoading]);
  */

  const handleDelete = () => {
    setIsModalOpen(true); // 삭제 모달 열기
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productId);
      router.push('/items'); // 삭제 후 리스트 페이지로 이동
    } catch (error) {
      alert('제품 삭제에 실패했습니다.');
    } finally {
      setIsModalOpen(false); // 모달 닫기
    }
  };

  const handleEdit = () => {
    router.push(`/items/edit?id=${productId}`); // 수정 페이지로 이동
  };

  // 드롭다운 메뉴 선택에 따른 핸들러
  const handleDropdownChange = (name, value) => {
    if (value === 'edit') handleEdit();
    if (value === 'delete') handleDelete();
  };

  // 좋아요 상태 변경 핸들러
  const handleFavoriteToggle = async () => {
    try {
      if (product.isFavorite) {
        await removeFavoriteMutation.mutateAsync();
      } else {
        await addFavoriteMutation.mutateAsync();
      }
    } catch (error) {
      console.error('좋아요 상태 변경에 실패하였습니다.', error);
    }
  };

  // 로딩 중일 때 스켈레톤 -> 일정 시간이 지나면 스피너로 전환
  //if (isLoading) return showSpinner ? <Spinner /> : <ProductDetailSkeleton />;
  if (isLoading) return <ProductDetailSkeleton />;

  // 에러 상태일 때 메시지 표시
  if (isError) return <p>상품 정보를 불러오는 데 오류가 발생했습니다.</p>;

  // 제품 이미지: 기본 이미지로 대체
  const productImage = product.images[0]?.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com')
    ? product.images[0]
    : '/images/items/img_default_product.png';

  return (
    <div className={styles.container}>
      {/* 제품 이미지 */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image
            src={productImage}
            alt="제품 이미지"
            fill
            sizes="48.6rem"
            priority
          />
        </div>
      </div>

      {/* 제품 상세 정보 */}
      <div className={styles.productDetails}>
        <h1 className={styles.title}>{product.name}</h1> {/* 상품명 */}
        <p className={styles.price}>{product.price.toLocaleString()}원</p> {/* 가격 */}
        <h2 className={styles.sectionTitle}>상품 소개</h2>
        <p className={styles.description}>{product.description}</p> {/* 상품 설명 */}

        <h2 className={styles.sectionTitle}>상품 태그</h2>
        <div className={styles.tags}>
          {product.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>#{tag}</span> // 상품 태그 목록
          ))}
        </div>

        {/* 좋아요 및 작성자 정보 */}
        <div className={styles.infoWrapper}>
          {/* 작성자 정보 */}
          <div className={styles.writerInfo}>
            <div className={styles.profileImageWrapper}>
              <Image
                src="/images/user_profile.png"
                alt="프로필 이미지"
                fill
                sizes="4rem"
              />
            </div>
            <div className={styles.writerDetails}>
              <span className={styles.nickname}>{product.ownerNickname || '익명'}</span>
              <span className={styles.date}>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          {/* 좋아요 정보 */}
          <div className={styles.likesWrapper}>
            <div className={styles.likesIconWrapper} onClick={handleFavoriteToggle}>
              <Image
                src={product.isFavorite ? '/images/ic_heart_active.svg' : '/images/ic_heart.svg'}
                alt="좋아요 아이콘"
                fill
                sizes="3.2rem"
              />
            </div>
            <span className={styles.likesCount}>{product.favoriteCount > 9999 ? '9999+' : product.favoriteCount}</span>
          </div>

          {/* 드롭다운 메뉴 */}
          <div className={styles.dropdownContainer}>
            <Dropdown
              name="productOptions"
              iconMode={true}
              options={[
                { label: '수정하기', value: 'edit' },
                { label: '삭제하기', value: 'delete' },
              ]}
              value="" // 기본 선택 없음
              onChange={handleDropdownChange}
              className={styles.dropdownToggle}
            />
          </div>
        </div>
      </div>
      
      {/* 삭제 확인 모달 */}
      <ModalConfirm
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
        message="정말로 삭제하시겠습니까?"
      />
    </div>
  );
}
