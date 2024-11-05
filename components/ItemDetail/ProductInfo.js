import styles from './ProductInfo.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dropdown from '@/components/Common/Dropdown';
import { addProductFavorite, deleteProduct, removeProductFavorite } from '@/lib/api/ProductService';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import ModalConfirm from '../Common/ModalConfirm';

export default function ProductInfo({ product }) {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(product.favoriteCount || 0);
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useAuth(true);  // 인가된 사용자만 접근 허용

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(product.id);
      router.push('/items');
    } catch (error) {
      alert('제품 삭제에 실패했습니다.');
    } finally {
      setIsModalOpen(false); // 모달 닫기
    }
  };

  const handleEdit = () => {
    router.push(`/items/edit?id=${product.id}`);
  };

  const handleDropdownChange = (name, value) => {
    if (value === 'edit') handleEdit();
    if (value === 'delete') handleDelete();
  };

  const handleFavoriteToggle = async () => {
    try {
      let updatedProduct;
      if (isFavorite) {
        updatedProduct = await removeProductFavorite(product.id);
      } else {
        updatedProduct = await addProductFavorite(product.id);
      }
      setLikeCount(updatedProduct.favoriteCount || 0);
      setIsFavorite(updatedProduct.isFavorite);
    } catch (error) {
      console.error('좋아요 상태 변경에 실패하였습니다.', error);
    }
  }
  const productImage =
    product.images[0]?.includes('sprint-fe-project.s3.ap-northeast-2.amazonaws.com')
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
        {/* 제목 */}
        <h1 className={styles.title}>{product.name}</h1>
        
        {/* 가격 */}
        <p className={styles.price}>{product.price.toLocaleString()}원</p>
        
        {/* 상품 소개 (타이틀) */}
        <h2 className={styles.sectionTitle}>상품 소개</h2>

        {/* 상품 소개 내용 */}
        <p className={styles.description}>{product.description}</p>

        {/* 상품 태그 (타이틀) */}
        <h2 className={styles.sectionTitle}>상품 태그</h2>

        {/* 상품 태그 */}
        <div className={styles.tags}>
          {product.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        {/* 좋아요 및 작성자 정보 */}
        <div className={styles.infoWrapper}>
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

          <div className={styles.likesWrapper}>
            <div className={styles.likesIconWrapper} onClick={handleFavoriteToggle}>
              <Image
                src={
                  isFavorite 
                  ? '/images/ic_heart_active.svg' 
                  : '/images/ic_heart.svg'
                }
                alt="좋아요 아이콘"
                fill
                sizes="3.2rem"
              />
            </div>
            <span className={styles.likesCount}>{likeCount > 9999 ? '9999+' : likeCount}</span>
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
