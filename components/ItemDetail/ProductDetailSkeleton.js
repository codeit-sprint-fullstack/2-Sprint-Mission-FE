import styles from './ProductDetailSkeleton.module.css';

export default function ProductDetailSkeleton() {
  return (
    <div className={styles.container}>
      {/* 이미지 영역 스켈레톤 */}
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.imageSkeleton} />
        </div>
      </div>

      {/* 제품 상세 정보 스켈레톤 */}
      <div className={styles.productDetails}>
        <div className={styles.titleSkeleton}>로딩 중...</div>
        <div className={styles.priceSkeleton} />
        <div className={styles.sectionTitleSkeleton} />
        <div className={styles.descriptionSkeleton} />
        
        <div className={styles.sectionTitleSkeleton} />
        <div className={styles.tagsSkeleton}>
          <div className={styles.tagSkeleton} />
          <div className={styles.tagSkeleton} />
          <div className={styles.tagSkeleton} />
        </div>

        {/* 좋아요 및 작성자 정보 스켈레톤 */}
        <div className={styles.infoWrapper}>
          <div className={styles.writerInfoSkeleton}>
            <div className={styles.profileImageSkeleton} />
            <div className={styles.writerDetailsSkeleton}>
              <div className={styles.nicknameSkeleton} />
              <div className={styles.dateSkeleton} />
            </div>
          </div>

          <div className={styles.likesSkeleton}>
            <div className={styles.likesIconSkeleton} />
            <div className={styles.likesCountSkeleton} />
          </div>
        </div>
      </div>
    </div>
  );
}
